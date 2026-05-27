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
    // Fire init for hosts in the active slide (deck-stage case) OR
    // any host in a [data-deck-active]/[data-slide]/.slide container
    // (standalone HTML case — no deck-stage wrapper).
    requestAnimationFrame(() => {
      const stage = document.querySelector("deck-stage");
      if (stage) {
        const active = stage.querySelector("[data-deck-active]");
        if (active && active.contains(host)) fn({ slide: active, reason: "init" });
        return;
      }
      // Standalone: no deck-stage. Find nearest slide-like container and fire.
      const slide = host.closest("[data-deck-active], [data-slide], .slide") || document.body;
      fn({ slide, reason: "init-standalone" });
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

  // ── shared d3 loader (lazy CDN ESM) ──────────────────────────────
  // d3-force + d3-scale + d3-array loaded on-demand from esm.sh.
  // Cached on first use; subsequent <lore-scatter>/<lore-callout> instances
  // await the same promise. Safe to import from a classic-script context
  // because dynamic import() works regardless of how the host script is loaded.
  let _d3Modules = null;
  let _d3Loading = null;
  async function loadD3() {
    if (_d3Modules) return _d3Modules;
    if (_d3Loading) return _d3Loading;
    _d3Loading = (async () => {
      try {
        const [force, scale, array] = await Promise.all([
          import("https://esm.sh/d3-force@3"),
          import("https://esm.sh/d3-scale@4"),
          import("https://esm.sh/d3-array@3"),
        ]);
        _d3Modules = {
          forceSimulation: force.forceSimulation,
          forceX: force.forceX,
          forceY: force.forceY,
          forceCollide: force.forceCollide,
          scaleLinear: scale.scaleLinear,
          scaleOrdinal: scale.scaleOrdinal,
          extent: array.extent,
        };
        return _d3Modules;
      } catch (e) {
        console.warn("[lore-elements] d3 modules failed to load — scatter/callout will render statically", e);
        _d3Loading = null;
        throw e;
      }
    })();
    return _d3Loading;
  }

  // ── <lore-scatter> ───────────────────────────────────────────────
  // Scatter plot with d3-force label collision avoidance.
  // <lore-scatter
  //   data='[{name,x,y,size,color}, ...]'
  //   x-key="x" y-key="y" size-key="size" label-key="name" color-by="color"
  //   x-label="EASE" y-label="IMPACT"
  //   x-min="0" x-max="10" y-min="0" y-max="10"   (optional, autocomputed if omitted)
  //   collision="force"  max-labels="8"  height="480">
  // </lore-scatter>
  //
  // Honors token contract: axes use --family-mono, dots use lore palette,
  // labels respect max-labels cap (editorial restraint per design-critique 6a).
  const SVG_NS = "http://www.w3.org/2000/svg";

  function svgEl(name, attrs = {}) {
    const el = document.createElementNS(SVG_NS, name);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  class LoreScatter extends HTMLElement {
    static get observedAttributes() {
      return [
        "data", "x-key", "y-key", "size-key", "label-key", "color-by",
        "x-label", "y-label", "collision", "height",
        "x-min", "x-max", "y-min", "y-max", "max-labels",
      ];
    }
    connectedCallback() {
      if (this._wired) return;
      this._wired = true;
      this.style.display = "block";
      this.style.position = "relative";
      this.style.width = this.style.width || "100%";
      // Defer real render until slide enters or now if no stage exists
      onSlideEnter(this, () => this._render());
    }
    _parseData() {
      const raw = (this.getAttribute("data") || this.textContent || "").trim();
      if (!raw) return null;
      try { return JSON.parse(raw); }
      catch (e) {
        console.warn("[lore-scatter] invalid data JSON", e);
        return null;
      }
    }
    async _render() {
      const data = this._parseData();
      if (!Array.isArray(data) || data.length === 0) return;

      // Clear the JSON text immediately and show a loading state — this way
      // the raw data never flashes if d3 takes time (or hangs under file://).
      this.innerHTML = `<div style="padding:24px;color:var(--text-muted, #6B6E64);font-family:var(--family-mono, monospace);font-size:11px;letter-spacing:0.14em;text-transform:uppercase">Loading chart…</div>`;

      let d3;
      try { d3 = await loadD3(); }
      catch (e) { this._renderStatic(data); return; }

      const xKey = this.getAttribute("x-key") || "x";
      const yKey = this.getAttribute("y-key") || "y";
      const sizeKey = this.getAttribute("size-key");
      const labelKey = this.getAttribute("label-key") || "label";
      const colorBy = this.getAttribute("color-by");
      const xLabel = this.getAttribute("x-label") || xKey;
      const yLabel = this.getAttribute("y-label") || yKey;
      const collision = this.getAttribute("collision") || "force";
      const maxLabels = parseInt(this.getAttribute("max-labels") || "8", 10);

      const rect = this.getBoundingClientRect();
      const width = Math.max(rect.width || 800, 320);
      const height = parseInt(this.getAttribute("height") || "480", 10);
      const margin = { top: 24, right: 48, bottom: 56, left: 64 };
      const iw = width - margin.left - margin.right;
      const ih = height - margin.top - margin.bottom;

      const xExt = this.hasAttribute("x-min") && this.hasAttribute("x-max")
        ? [parseFloat(this.getAttribute("x-min")), parseFloat(this.getAttribute("x-max"))]
        : d3.extent(data, d => +d[xKey]);
      const yExt = this.hasAttribute("y-min") && this.hasAttribute("y-max")
        ? [parseFloat(this.getAttribute("y-min")), parseFloat(this.getAttribute("y-max"))]
        : d3.extent(data, d => +d[yKey]);
      const sExt = sizeKey ? d3.extent(data, d => +d[sizeKey]) : [10, 10];

      const xScale = d3.scaleLinear().domain(xExt).nice().range([0, iw]);
      const yScale = d3.scaleLinear().domain(yExt).nice().range([ih, 0]);
      const rScale = d3.scaleLinear().domain(sExt).range([8, 28]);

      // Token-aligned palette (matches series_palette_extended in tokens.json)
      const palette = [
        "#D4F24B", "#3B5A2E", "#3E4B55", "#2D3558",
        "#B85C3A", "#BB4227", "#9BBD1C", "#5E7A4E",
        "#5A6B75", "#4A5278", "#D88B6A", "#D67960",
      ];
      const categories = colorBy
        ? Array.from(new Set(data.map(d => d[colorBy])))
        : [];
      const colorScale = colorBy
        ? d3.scaleOrdinal(palette).domain(categories)
        : () => palette[0];

      const svg = svgEl("svg", {
        width, height,
        viewBox: `0 0 ${width} ${height}`,
      });
      svg.style.maxWidth = "100%";
      svg.style.height = "auto";
      svg.style.fontFamily = "var(--family-sans, Aeonik, system-ui)";

      const g = svgEl("g", { transform: `translate(${margin.left}, ${margin.top})` });
      svg.appendChild(g);

      const axisColor = "var(--text-muted, #6B6E64)";
      const axisFont = "var(--family-mono, 'Aeonik Mono', ui-monospace, monospace)";

      // X axis
      const xAxisG = svgEl("g", { transform: `translate(0, ${ih})` });
      xAxisG.appendChild(svgEl("line", { x1: 0, x2: iw, y1: 0, y2: 0, stroke: axisColor, "stroke-width": 0.75 }));
      for (const t of xScale.ticks(5)) {
        const tg = svgEl("g", { transform: `translate(${xScale(t)}, 0)` });
        tg.appendChild(svgEl("line", { y2: 4, stroke: axisColor }));
        const txt = svgEl("text", { y: 18, "text-anchor": "middle", "font-family": axisFont, "font-size": 11, fill: axisColor });
        txt.textContent = t;
        tg.appendChild(txt);
        xAxisG.appendChild(tg);
      }
      const xLab = svgEl("text", { x: iw / 2, y: 44, "text-anchor": "middle", "font-family": axisFont, "font-size": 10, fill: axisColor, "letter-spacing": "0.14em" });
      xLab.textContent = xLabel.toUpperCase();
      xAxisG.appendChild(xLab);
      g.appendChild(xAxisG);

      // Y axis
      const yAxisG = svgEl("g");
      yAxisG.appendChild(svgEl("line", { x1: 0, x2: 0, y1: 0, y2: ih, stroke: axisColor, "stroke-width": 0.75 }));
      for (const t of yScale.ticks(5)) {
        const tg = svgEl("g", { transform: `translate(0, ${yScale(t)})` });
        tg.appendChild(svgEl("line", { x2: -4, stroke: axisColor }));
        const txt = svgEl("text", { x: -8, y: 4, "text-anchor": "end", "font-family": axisFont, "font-size": 11, fill: axisColor });
        txt.textContent = t;
        tg.appendChild(txt);
        yAxisG.appendChild(tg);
      }
      const yLab = svgEl("text", {
        transform: `translate(-44, ${ih / 2}) rotate(-90)`,
        "text-anchor": "middle", "font-family": axisFont, "font-size": 10,
        fill: axisColor, "letter-spacing": "0.14em",
      });
      yLab.textContent = yLabel.toUpperCase();
      yAxisG.appendChild(yLab);
      g.appendChild(yAxisG);

      // Dots
      const dotsG = svgEl("g");
      const points = data.map(d => ({
        x: xScale(+d[xKey]),
        y: yScale(+d[yKey]),
        r: sizeKey ? rScale(+d[sizeKey]) : 10,
        color: colorScale(d[colorBy]),
        label: d[labelKey],
        data: d,
      }));
      for (const p of points) {
        const c = svgEl("circle", {
          cx: p.x, cy: p.y, r: 0,
          fill: p.color, "fill-opacity": 0.85,
          stroke: "var(--bg-primary, #F1ECE0)", "stroke-width": 1.5,
        });
        c.style.transition = "r 480ms cubic-bezier(.2,.8,.2,1)";
        dotsG.appendChild(c);
        p._circle = c;
      }
      g.appendChild(dotsG);

      // Labels with collision (top maxLabels by size, else first N)
      const sortedForLabels = sizeKey
        ? [...points].sort((a, b) => (+b.data[sizeKey]) - (+a.data[sizeKey]))
        : points;
      const labeled = sortedForLabels.slice(0, maxLabels);

      // Smart initial placement: label goes ABOVE the bubble by default,
      // but BELOW if the bubble is near the top of the chart (otherwise
      // the label clips outside the SVG viewBox).
      const labelPadTop = 12;
      const labelPadBottom = 6;
      const labelPadSide = 4;
      const labelNodes = labeled.map(p => {
        const labelW = (p.label || "").length * 6.4 + 8;
        const labelH = 14;
        // Default: place above. If above clips, place below.
        let initialY = p.y - p.r - 6;
        if (initialY < labelH / 2 + labelPadTop) {
          initialY = p.y + p.r + 12;
        }
        return {
          x: p.x,
          y: initialY,
          targetX: p.x,
          targetY: initialY,
          width: labelW,
          height: labelH,
          label: p.label,
          _point: p,
        };
      });

      if (collision === "force" && labelNodes.length > 1) {
        const sim = d3.forceSimulation(labelNodes)
          .force("x", d3.forceX(d => d.targetX).strength(0.5))
          .force("y", d3.forceY(d => d.targetY).strength(0.3))
          .force("collide", d3.forceCollide(d => Math.max(d.width, d.height) / 2 + 4))
          .stop();
        // Run ticks AND clamp labels to inner chart bounds each iteration
        // so the force can't push a label outside the visible area.
        for (let i = 0; i < 180; i++) {
          sim.tick();
          for (const ln of labelNodes) {
            ln.x = Math.max(ln.width / 2 + labelPadSide,
                           Math.min(iw - ln.width / 2 - labelPadSide, ln.x));
            ln.y = Math.max(ln.height / 2 + labelPadTop,
                           Math.min(ih - labelPadBottom, ln.y));
          }
        }
      }

      const labelsG = svgEl("g");
      for (const ln of labelNodes) {
        const dx = ln.x - ln.targetX, dy = ln.y - ln.targetY;
        const moved = Math.sqrt(dx * dx + dy * dy) > 8;
        if (moved) {
          const line = svgEl("line", {
            x1: ln.targetX, y1: ln.targetY + 4,
            x2: ln.x, y2: ln.y + 4,
            stroke: "var(--text-muted, #6B6E64)", "stroke-width": 0.5,
            opacity: 0,
          });
          line.style.transition = "opacity 400ms cubic-bezier(.2,.8,.2,1)";
          labelsG.appendChild(line);
          ln._line = line;
        }
        const t = svgEl("text", {
          x: ln.x, y: ln.y,
          "text-anchor": "middle",
          "font-family": "var(--family-sans, Aeonik, system-ui)",
          "font-size": 11,
          "font-weight": 500,
          fill: "var(--text-primary, #141613)",
          opacity: 0,
        });
        t.style.transition = "opacity 400ms cubic-bezier(.2,.8,.2,1)";
        t.textContent = ln.label;
        labelsG.appendChild(t);
        ln._text = t;
      }
      g.appendChild(labelsG);

      this.innerHTML = "";
      this.appendChild(svg);

      // Animate in: dots first, then labels
      requestAnimationFrame(() => {
        for (const p of points) p._circle.setAttribute("r", p.r);
        setTimeout(() => {
          for (const ln of labelNodes) {
            ln._text.setAttribute("opacity", 1);
            if (ln._line) ln._line.setAttribute("opacity", 0.6);
          }
        }, 320);
      });
    }
    _renderStatic(data) {
      // d3 failed to load — render a minimal fallback so the slide doesn't crash
      this.innerHTML = `<div style="padding:24px;color:var(--text-muted, #6B6E64);font-family:var(--family-mono, monospace);font-size:12px;border:1px dashed currentColor;border-radius:4px">[lore-scatter] D3 modules failed to load. Check console.</div>`;
    }
    forceFinal() {
      // For PPTX export — render synchronously without animation
      const data = this._parseData();
      if (data && !this.querySelector("svg")) this._render();
    }
  }
  customElements.define("lore-scatter", LoreScatter);

  // ── <lore-callout> ──────────────────────────────────────────────
  // Annotation box connected to a target element by a leader line.
  // <lore-callout target="#bubble-3" position="top-right" offset="32"
  //               variant="accent" label="$7.7M risk-weighted"></lore-callout>
  //
  // Positioning is relative to the nearest [data-deck-active] slide;
  // the callout overlays the slide and uses absolute SVG coordinates.
  // Variants: default, accent, warn (token-aligned colors).
  class LoreCallout extends HTMLElement {
    static get observedAttributes() {
      return ["target", "position", "offset", "label", "variant"];
    }
    connectedCallback() {
      if (this._wired) return;
      this._wired = true;
      this.style.display = "block";
      this.style.position = "absolute";
      this.style.inset = "0";
      this.style.pointerEvents = "none";
      this.style.zIndex = "5";
      onSlideEnter(this, () => this._render());
      // Re-render on resize (target positions change with viewport)
      if (!this._ro) {
        this._ro = new ResizeObserver(() => {
          if (this._rendered) this._render();
        });
        const slide = this.closest("[data-deck-active]") || this.parentElement;
        if (slide) this._ro.observe(slide);
      }
    }
    disconnectedCallback() {
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
    }
    _render() {
      const targetSel = this.getAttribute("target");
      const position = this.getAttribute("position") || "top-right";
      const offset = parseInt(this.getAttribute("offset") || "32", 10);
      const label = this.getAttribute("label") || (this.textContent || "").trim();
      const variant = this.getAttribute("variant") || "default";
      if (!targetSel || !label) return;

      const slide = this.closest("[data-deck-active]")
        || this.closest("[data-slide]")
        || this.closest(".slide")
        || this.parentElement;
      if (!slide) return;
      const target = slide.querySelector(targetSel);
      if (!target) {
        console.warn(`[lore-callout] target not found in slide: ${targetSel}`);
        return;
      }

      // Use offset-based positioning instead of getBoundingClientRect to
      // get coordinates in the slide's INTERNAL (un-scaled) coordinate
      // system. getBoundingClientRect returns scaled viewport pixels which
      // double-scales when the slide itself has a transform: scale(...).
      const offsetWithin = (el, ancestor) => {
        let x = 0, y = 0, node = el;
        while (node && node !== ancestor && node !== document.body) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent;
        }
        return { x, y };
      };
      const tPos = offsetWithin(target, slide);
      const tx = tPos.x + target.offsetWidth / 2;
      const ty = tPos.y + target.offsetHeight / 2;
      const slideW = slide.offsetWidth;
      const slideH = slide.offsetHeight;

      let lx, ly, anchor;
      switch (position) {
        case "top-left":     lx = tx - offset; ly = ty - offset; anchor = "end"; break;
        case "bottom-right": lx = tx + offset; ly = ty + offset; anchor = "start"; break;
        case "bottom-left":  lx = tx - offset; ly = ty + offset; anchor = "end"; break;
        case "top":          lx = tx;          ly = ty - offset; anchor = "middle"; break;
        case "bottom":       lx = tx;          ly = ty + offset; anchor = "middle"; break;
        case "left":         lx = tx - offset; ly = ty;          anchor = "end"; break;
        case "right":        lx = tx + offset; ly = ty;          anchor = "start"; break;
        case "top-right":
        default:             lx = tx + offset; ly = ty - offset; anchor = "start";
      }

      const palettes = {
        default: { stroke: "var(--text-secondary, #3A3D36)", fill: "var(--text-primary, #141613)", bg: "var(--bg-elevated, #FFFFFF)" },
        accent:  { stroke: "var(--accent-primary-deep, #9BBD1C)", fill: "var(--text-primary, #141613)", bg: "var(--accent-primary-soft, #EEF9C4)" },
        warn:    { stroke: "var(--semantic-warning, #B85C3A)", fill: "var(--text-primary, #141613)", bg: "var(--semantic-warning-soft, #F1D3C2)" },
      };
      const c = palettes[variant] || palettes.default;

      this.style.left = "0px";
      this.style.top = "0px";
      this.style.width = `${slideW}px`;
      this.style.height = `${slideH}px`;

      const svg = svgEl("svg", {
        width: slideW,
        height: slideH,
      });
      svg.style.position = "absolute";
      svg.style.inset = "0";
      svg.style.overflow = "visible";

      const dot = svgEl("circle", {
        cx: tx, cy: ty, r: 3, fill: c.stroke, opacity: 0,
      });
      dot.style.transition = "opacity 360ms cubic-bezier(.2,.8,.2,1)";
      svg.appendChild(dot);

      const line = svgEl("line", {
        x1: tx, y1: ty, x2: lx, y2: ly,
        stroke: c.stroke, "stroke-width": 1, opacity: 0,
      });
      line.style.transition = "opacity 360ms cubic-bezier(.2,.8,.2,1) 80ms";
      svg.appendChild(line);

      const labelLen = label.length;
      const lineCount = Math.max(1, Math.ceil(labelLen / 26));
      const w = Math.min(280, Math.max(120, labelLen * 6.4 + 24));
      const h = lineCount * 16 + 14;
      let fx;
      if (anchor === "start") fx = lx;
      else if (anchor === "end") fx = lx - w;
      else fx = lx - w / 2;
      let fy = ly < ty ? ly - h : ly;

      const fo = svgEl("foreignObject", {
        x: fx, y: fy, width: w, height: h, opacity: 0,
      });
      fo.style.transition = "opacity 360ms cubic-bezier(.2,.8,.2,1) 160ms";

      const box = document.createElement("div");
      box.style.background = c.bg;
      box.style.color = c.fill;
      box.style.border = `1px solid ${c.stroke}`;
      box.style.borderRadius = "4px";
      box.style.padding = "6px 10px";
      box.style.fontFamily = "var(--family-sans, Aeonik, system-ui)";
      box.style.fontSize = "12px";
      box.style.lineHeight = "1.3";
      box.style.fontWeight = "500";
      box.style.boxShadow = "0 2px 8px rgba(20,22,19,0.08)";
      box.style.boxSizing = "border-box";
      box.textContent = label;
      fo.appendChild(box);
      svg.appendChild(fo);

      this.innerHTML = "";
      this.appendChild(svg);
      this._rendered = true;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dot.setAttribute("opacity", 1);
          line.setAttribute("opacity", 1);
          fo.setAttribute("opacity", 1);
        });
      });
    }
    forceFinal() {
      if (!this._rendered) this._render();
    }
  }
  customElements.define("lore-callout", LoreCallout);

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
      for (const el of document.querySelectorAll("lore-scatter")) {
        if (typeof el.forceFinal === "function") el.forceFinal();
      }
      for (const el of document.querySelectorAll("lore-callout")) {
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
