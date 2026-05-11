/**
 * lore-elements.js — branded web components for HTML decks.
 *
 * All elements are vanilla custom elements. They listen for the
 * `slidechange` CustomEvent that <deck-stage> dispatches and animate in
 * when their host slide becomes active.
 *
 * The HTML→PPTX exporter (scripts/html-to-pptx-extract.mjs) forces a
 * "final state" pass so every counter ends at its target value, every
 * bar at full width, every reveal at full opacity — the export captures
 * the slide as it looks once the presenter has clicked through it.
 *
 * Honors `prefers-reduced-motion: reduce` — animations short-circuit
 * to their final state instantly.
 *
 * Components:
 *   <lore-counter from="0" to="56.9" suffix="M" duration="800">
 *   <lore-bar value="48" max="100" color="chartreuse">
 *   <lore-reveal stagger="70">…[data-anim] children…</lore-reveal>
 *   <lore-typewriter speed="40">code…</lore-typewriter>
 *   <lore-spotlight>            (toggle with `s` key)
 */

(() => {
  const PREFERS_REDUCED = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── shared: slide-enter dispatcher ─────────────────────────────────
  // We listen once at document level for slidechange and call any
  // registered enter-callback whose host element is inside the new slide.
  const enterHooks = new Set();
  let _stageWired = false;

  function wireStage() {
    if (_stageWired) return;
    const stage = document.querySelector("deck-stage");
    if (!stage) return;
    stage.addEventListener("slidechange", (e) => {
      const newSlide = e.detail && e.detail.slide;
      if (!newSlide) return;
      // Reset hooks whose host left the new slide.
      for (const fn of enterHooks) {
        if (newSlide.contains(fn._host)) fn(e.detail);
      }
    });
    _stageWired = true;
  }

  function onSlideEnter(host, fn) {
    fn._host = host;
    enterHooks.add(fn);
    wireStage();
    // Also fire once on init if the host is in the active slide already.
    requestAnimationFrame(() => {
      const stage = document.querySelector("deck-stage");
      const active = stage && stage.querySelector("[data-deck-active]");
      if (active && active.contains(host)) fn({ slide: active, reason: "init" });
    });
  }

  // ── <lore-counter> ────────────────────────────────────────────────
  class LoreCounter extends HTMLElement {
    static get observedAttributes() {
      return ["from", "to", "duration", "prefix", "suffix", "decimals"];
    }
    connectedCallback() {
      if (this._wired) return;
      this._wired = true;
      this.style.fontVariantNumeric = "tabular-nums";
      this._renderFinal(); // initial: final value (so PPTX export sees it)
      onSlideEnter(this, () => this._animate());
    }
    _renderFinal() {
      this._stopAnim = true;
      if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = 0; }
      this.textContent = this._format(this._to());
    }
    _from() { return parseFloat(this.getAttribute("from") || "0"); }
    _to() { return parseFloat(this.getAttribute("to") || "0"); }
    _duration() { return parseInt(this.getAttribute("duration") || "800", 10); }
    _decimals() {
      const explicit = this.getAttribute("decimals");
      if (explicit !== null) return parseInt(explicit, 10);
      // Infer from the "to" attribute (e.g. "56.9" → 1, "251.9" → 1, "100" → 0).
      const raw = this.getAttribute("to") || "";
      const dot = raw.indexOf(".");
      return dot === -1 ? 0 : raw.length - dot - 1;
    }
    _format(v) {
      const decimals = this._decimals();
      const fixed = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
      return `${this.getAttribute("prefix") || ""}${fixed}${this.getAttribute("suffix") || ""}`;
    }
    _animate() {
      if (PREFERS_REDUCED()) { this._renderFinal(); return; }
      this._stopAnim = false;
      const start = performance.now();
      const from = this._from();
      const to = this._to();
      const dur = this._duration();
      // ease-out-back-ish (overshoot then settle), capped to avoid going negative.
      const ease = (t) => {
        const c1 = 1.70158, c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      const tick = (now) => {
        if (this._stopAnim) { this._rafId = 0; return; }
        const t = Math.min(1, (now - start) / dur);
        const v = from + (to - from) * ease(t);
        this.textContent = this._format(v);
        if (t < 1) this._rafId = requestAnimationFrame(tick);
        else { this._rafId = 0; this._renderFinal(); }
      };
      this._rafId = requestAnimationFrame(tick);
    }
  }
  customElements.define("lore-counter", LoreCounter);

  // ── <lore-bar> ────────────────────────────────────────────────────
  class LoreBar extends HTMLElement {
    static get observedAttributes() { return ["value", "max", "color", "duration"]; }
    connectedCallback() {
      if (this._wired) return;
      this._wired = true;
      // Build shadow-free internal markup so authored CSS can still target if needed.
      this.style.display = "block";
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.style.borderRadius = this.style.borderRadius || "2px";
      this.style.background = this.style.background || "rgba(241,236,224,.06)";
      const fill = document.createElement("div");
      fill.dataset.loreBarFill = "";
      fill.style.position = "absolute";
      fill.style.inset = "0 auto 0 0";
      fill.style.width = "0%";
      fill.style.background = this._color();
      fill.style.borderRadius = "inherit";
      fill.style.transition = `width var(--dur-slow, 600ms) var(--ease-lore, cubic-bezier(.2,.8,.2,1))`;
      this._fill = fill;
      this.appendChild(fill);
      // Initial: at final width (export-safe). Animation undoes this then runs in.
      this._setFinal();
      onSlideEnter(this, () => this._animate());
    }
    _pct() {
      const value = parseFloat(this.getAttribute("value") || "0");
      const max = parseFloat(this.getAttribute("max") || "100");
      if (max <= 0) return 0;
      return Math.max(0, Math.min(100, (value / max) * 100));
    }
    _color() {
      const c = this.getAttribute("color") || "chartreuse";
      const map = {
        chartreuse: "linear-gradient(90deg, var(--p-chartreuse-deep, #56730D), var(--p-chartreuse, #D4F24B))",
        positive: "var(--success, #2A6B2A)",
        negative: "var(--danger, #B83030)",
        warning: "var(--warn, #B85C3A)",
        muted: "rgba(241,236,224,.4)",
      };
      return map[c] || c;
    }
    _setFinal() {
      if (this._fill) this._fill.style.width = `${this._pct()}%`;
    }
    _animate() {
      if (!this._fill) return;
      if (PREFERS_REDUCED()) { this._setFinal(); return; }
      // collapse to 0 then animate to target on next frame
      this._fill.style.transition = "none";
      this._fill.style.width = "0%";
      // force reflow so the next width assignment re-triggers the transition
      void this._fill.offsetWidth;
      this._fill.style.transition = `width var(--dur-slow, 600ms) var(--ease-lore, cubic-bezier(.2,.8,.2,1))`;
      this._fill.style.width = `${this._pct()}%`;
    }
  }
  customElements.define("lore-bar", LoreBar);

  // ── <lore-reveal> ─────────────────────────────────────────────────
  // Wraps content; on slide-enter, walks descendant [data-anim] elements
  // and applies fade-up with stagger.
  class LoreReveal extends HTMLElement {
    connectedCallback() {
      if (this._wired) return;
      this._wired = true;
      const targets = this._targets();
      // Initial state: fade-up. After init, slide-enter triggers the reveal.
      // For PPTX export, the extractor forces final state so we don't rely
      // on the animation having actually run — but the in-DOM default must
      // also be "visible" to handle the case where deck-stage isn't present.
      for (const el of targets) {
        el.style.willChange = "opacity, transform";
        el.style.transition = `opacity var(--dur-medium, 360ms) var(--ease-lore, cubic-bezier(.2,.8,.2,1)), transform var(--dur-medium, 360ms) var(--ease-lore, cubic-bezier(.2,.8,.2,1))`;
      }
      // Hide initially; animation will reveal.
      this._setHidden();
      onSlideEnter(this, () => this._reveal());
    }
    _targets() {
      const explicit = this.querySelectorAll("[data-anim]");
      if (explicit.length > 0) return Array.from(explicit);
      // Fallback: direct children
      return Array.from(this.children);
    }
    _stagger() { return parseInt(this.getAttribute("stagger") || "70", 10); }
    _setHidden() {
      const targets = this._targets();
      for (const el of targets) {
        el.style.opacity = "0";
        el.style.transform = "translateY(10px)";
      }
    }
    _setVisible() {
      const targets = this._targets();
      for (const el of targets) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    }
    _reveal() {
      if (PREFERS_REDUCED()) { this._setVisible(); return; }
      const targets = this._targets();
      const step = this._stagger();
      // Reset (in case re-entering)
      this._setHidden();
      // Stagger reveal
      targets.forEach((el, i) => {
        el.style.transitionDelay = `${i * step}ms`;
        // Force a frame then reveal
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      });
    }
    forceFinal() { this._setVisible(); }
  }
  customElements.define("lore-reveal", LoreReveal);

  // ── <lore-typewriter> ─────────────────────────────────────────────
  class LoreTypewriter extends HTMLElement {
    connectedCallback() {
      if (this._wired) return;
      this._wired = true;
      // Custom elements upgrade before their inner HTML has been parsed —
      // capture the authored HTML on the next animation frame, after the
      // parser has populated descendants.
      const captureSoon = () => {
        if (this._fullHTML !== undefined) return;
        if (this.innerHTML.length > 0) {
          this._fullHTML = this.innerHTML;
        } else {
          // Still parsing; try again next frame.
          requestAnimationFrame(captureSoon);
        }
      };
      requestAnimationFrame(captureSoon);
      // Initial: full content (export-safe). Animation undoes this and types in.
      onSlideEnter(this, () => this._type());
    }
    _speed() { return parseInt(this.getAttribute("speed") || "40", 10); }
    _type() {
      if (!this._fullHTML) return; // deferred capture hasn't completed; skip
      if (PREFERS_REDUCED()) {
        this.innerHTML = this._fullHTML;
        return;
      }
      // Type plain text only — preserve markup by typing through textContent
      // approach: render full HTML, walk text nodes, mask with progressive reveal.
      this.innerHTML = this._fullHTML;
      const textNodes = [];
      const walker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) textNodes.push({ node: n, full: n.nodeValue });
      // Compute total chars + sequence
      let total = 0;
      for (const t of textNodes) total += t.full.length;
      // Reset all nodes to empty
      for (const t of textNodes) t.node.nodeValue = "";
      let typed = 0;
      const speed = this._speed();
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const target = Math.min(total, Math.floor(elapsed / speed));
        if (target > typed) {
          let remaining = target - typed;
          for (const t of textNodes) {
            const have = t.node.nodeValue.length;
            const need = t.full.length - have;
            if (need <= 0) continue;
            const take = Math.min(need, remaining);
            t.node.nodeValue = t.full.slice(0, have + take);
            remaining -= take;
            if (remaining <= 0) break;
          }
          typed = target;
        }
        if (typed < total) requestAnimationFrame(tick);
        else {
          // Ensure exact final state.
          for (const t of textNodes) t.node.nodeValue = t.full;
        }
      };
      requestAnimationFrame(tick);
    }
    forceFinal() {
      // If captureSoon hasn't completed yet, fall back to whatever's in
      // innerHTML (which may be the authored content if the parser already
      // got there). Otherwise restore from cached _fullHTML.
      if (this._fullHTML !== undefined && this._fullHTML.length > 0) {
        this.innerHTML = this._fullHTML;
      }
    }
  }
  customElements.define("lore-typewriter", LoreTypewriter);

  // ── <lore-spotlight> ──────────────────────────────────────────────
  // Body-level cursor-following radial gradient. Toggled by the `s` key.
  class LoreSpotlight extends HTMLElement {
    connectedCallback() {
      this.style.position = "fixed";
      this.style.inset = "0";
      this.style.pointerEvents = "none";
      this.style.zIndex = "2147482500";
      this.style.opacity = "0";
      this.style.transition = `opacity var(--dur-medium, 360ms) var(--ease-lore, cubic-bezier(.2,.8,.2,1))`;
      this.style.background =
        "radial-gradient(circle at 50% 50%, rgba(212,242,75,0.10), rgba(212,242,75,0) 240px)";
      this._on = false;
      this._mm = (e) => {
        this.style.background =
          `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(212,242,75,0.18), rgba(212,242,75,0) 280px)`;
      };
      this._kd = (e) => {
        if (e.key === "s" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          const t = e.target;
          if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
          this._on = !this._on;
          this.style.opacity = this._on ? "1" : "0";
          if (this._on) window.addEventListener("mousemove", this._mm);
          else window.removeEventListener("mousemove", this._mm);
          e.preventDefault();
        }
      };
      window.addEventListener("keydown", this._kd);
    }
    disconnectedCallback() {
      window.removeEventListener("keydown", this._kd);
      window.removeEventListener("mousemove", this._mm);
    }
  }
  customElements.define("lore-spotlight", LoreSpotlight);

  // ── public API for the PPTX exporter ───────────────────────────────
  window.__loreElements = {
    forceFinalEverywhere() {
      for (const el of document.querySelectorAll("lore-counter")) {
        if (typeof el._renderFinal === "function") el._renderFinal();
      }
      for (const el of document.querySelectorAll("lore-bar")) {
        if (typeof el._setFinal === "function") el._setFinal();
      }
      for (const el of document.querySelectorAll("lore-reveal")) {
        if (typeof el.forceFinal === "function") el.forceFinal();
      }
      for (const el of document.querySelectorAll("lore-typewriter")) {
        if (typeof el.forceFinal === "function") el.forceFinal();
      }
      // Reveal all build steps.
      for (const el of document.querySelectorAll("[data-build]")) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.transitionDelay = "0ms";
      }
    },
  };
})();
