#!/usr/bin/env node
/**
 * Flora base pipeline — brand-token-driven asset generation, cached as committed assets.
 * ROLR-ready by construction: the SAME manifest re-skins for any brand by swapping its token file.
 *
 *   FLORA_API_KEY=xxx node flora-pipeline.mjs generate revenant [--only hero] [--variants 1] [--cap 30] [--limit 99] [--dry]
 *   FLORA_API_KEY=xxx node flora-pipeline.mjs variant  rolr     [--from revenant] [--cap 30]   # i2i-recolour existing bases (the cheap "tiny tweak" path)
 *
 * Bases are written to  bases/<brand>/<category>/<id>.<ext>  + a .meta.json sidecar.
 * Re-runs are resume-safe (cached ids are skipped). Spend is tracked against --cap (USD).
 * Requires Node 18+ (global fetch / FormData / Blob).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://app.flora.ai/api/v1";
const WS = "ws_qd74x6e2vdpf2h04w7vwn0d3r98832rt";
const KEY = process.env.FLORA_API_KEY;
if (!KEY) { console.error("set FLORA_API_KEY (e.g. export FLORA_API_KEY=$(grep ^FLORA_API_KEY= ~/scaria/swarm-fund-mvp/swarm-fund-mvp/.env | cut -d= -f2-))"); process.exit(1); }
const H = { Authorization: `Bearer ${KEY}`, Accept: "application/json" };

const argv = process.argv.slice(2);
const mode = argv[0] || "generate";
const brand = argv[1] || "revenant";
const flag = (n, d) => { const i = argv.indexOf("--" + n); if (i < 0) return d; const v = argv[i + 1]; return (v && !v.startsWith("--")) ? v : true; };
const only = flag("only"), variants = +(flag("variants", 1)), capUSD = +(flag("cap", 30)), limit = +(flag("limit", 999)), fromBrand = flag("from", "revenant"), dry = !!flag("dry", false);

const tokens = JSON.parse(fs.readFileSync(path.join(DIR, "brand-tokens", `${brand}.json`)));
const fill = (s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => tokens[k] ?? tokens.palette?.[k] ?? "");

// ── small persistent state (project ids) — gitignored ──────────────────────
const stateF = path.join(DIR, ".state.json");
let state = fs.existsSync(stateF) ? JSON.parse(fs.readFileSync(stateF)) : {};
const saveState = () => fs.writeFileSync(stateF, JSON.stringify(state, null, 2));

async function api(p, opt = {}) { return fetch(BASE + p, opt).then(r => r.json()); }

async function ensureProject() {
  const k = "project_" + brand;
  if (state[k]) return state[k];
  const r = await api("/projects", { method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ workspace_id: WS, name: `DS bases — ${brand}` }) });
  state[k] = r.project_id; saveState(); return r.project_id;
}

async function uploadSeed(file) {
  const fd = new FormData();
  fd.append("file", new Blob([fs.readFileSync(file)]), path.basename(file));
  fd.append("workspace_id", WS);
  const r = await fetch(BASE + "/assets", { method: "POST", headers: H, body: fd }).then(r => r.json());
  return r.url;
}

async function runOne({ id, category, model, prompt, params, image_url }, PJ) {
  const outDir = path.join(DIR, "bases", brand, category);
  fs.mkdirSync(outDir, { recursive: true });
  if (fs.readdirSync(outDir).some(f => f.startsWith(id + "."))) return { id, cost: 0, skipped: true };
  if (dry) { return { id, cost: 0, dry: true, model }; }
  const body = { type: "image", model, prompt, workspace_id: WS, project_id: PJ, parameters: params || {} };
  if (image_url) body.image_url = image_url;
  const post = await api("/generate", { method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!post.run_id) return { id, cost: 0, error: JSON.stringify(post).slice(0, 160) };
  let cost = post.charged_cost || 0, url = "", st = "";
  for (let i = 0; i < 70; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const p = await api(`/runs/${post.run_id}`, { headers: H });
    st = p.status || p.state || "";
    if (/complete|succeed|done|finish/i.test(st)) {
      const o = p.outputs || p.output || []; const a = Array.isArray(o) ? o : [o];
      url = a.map(x => x && (x.url || x.image_url || x.value)).filter(Boolean)[0] || p.url || ""; break;
    }
    if (/fail|error|cancel/i.test(st)) return { id, cost, error: "run " + st };
  }
  if (!url) return { id, cost, error: "timeout last=" + st };
  const resp = await fetch(url); const ct = resp.headers.get("content-type") || "";
  const ext = /svg/.test(ct) ? "svg" : /(jpeg|jpg)/.test(ct) ? "jpg" : /webp/.test(ct) ? "webp" : /png/.test(ct) ? "png" : (url.split("?")[0].split(".").pop() || "png").slice(0, 4);
  const buf = Buffer.from(await resp.arrayBuffer());
  fs.writeFileSync(path.join(outDir, `${id}.${ext}`), buf);
  fs.writeFileSync(path.join(outDir, `${id}.meta.json`), JSON.stringify({ id, brand, model, cost, prompt, url, at: Date.now() }, null, 2));
  return { id, cost, bytes: buf.length };
}

// build the worklist for the chosen mode
async function worklist(PJ) {
  if (mode === "variant") {
    // the cheap "tiny tweak" path: i2i-recolour each existing <from> base into <brand>
    const fromRoot = path.join(DIR, "bases", fromBrand);
    if (!fs.existsSync(fromRoot)) { console.error(`no bases for '${fromBrand}' to vary from`); process.exit(1); }
    const items = [];
    for (const cat of fs.readdirSync(fromRoot)) {
      if (only && cat !== only) continue;
      const cd = path.join(fromRoot, cat);
      for (const f of fs.readdirSync(cd).filter(f => /\.(png|jpg|jpeg|webp)$/.test(f))) {
        const id = f.replace(/\.[^.]+$/, "");
        const seedUrl = await uploadSeed(path.join(cd, f));
        items.push({
          id, category: cat, model: "i2i-gemini-3-pro", image_url: seedUrl, params: { resolution: "2K" },
          prompt: `Recolour and restyle this exact image to: ${fill("{{style}}")}. Keep the composition, structure, layout and ALL text labels identical. Tiny tweaks only — new palette, ${fill("{{corner}}")}, ${fill("{{line}}")}. Do not add, remove, or change any labels.`,
        });
      }
    }
    return items;
  }
  // generate mode
  const { manifest } = await import("./manifest.mjs");
  return manifest.filter(a => !only || a.category === only).map(a => ({ ...a, prompt: fill(a.prompt) }));
}

(async () => {
  const PJ = await ensureProject();
  let items = (await worklist(PJ)).slice(0, limit);
  // expand variants (generate mode only)
  if (mode === "generate" && variants > 1) items = items.flatMap(a => Array.from({ length: variants }, (_, v) => ({ ...a, id: `${a.id}-v${v + 1}` })));
  console.log(`flora-pipeline · mode=${mode} brand=${brand} items=${items.length} cap=$${capUSD}${dry ? " (DRY)" : ""}`);
  let spent = 0, done = 0; const pool = 4;
  for (let i = 0; i < items.length && spent < capUSD; i += pool) {
    const rs = await Promise.all(items.slice(i, i + pool).map(a => runOne(a, PJ).then(r => { spent += r.cost || 0; return r; })));
    for (const r of rs) { done++; console.log(`[$${spent.toFixed(3)}] ${r.id} · ${r.skipped ? "cached" : r.dry ? "dry:" + r.model : r.error ? "ERR " + r.error : "$" + (r.cost || 0).toFixed(3) + " " + (r.bytes || 0) + "b"}`); }
  }
  if (spent >= capUSD) console.log(`\n⚠ cap $${capUSD} reached`);
  console.log(`\nDONE · ${done} items · spend $${spent.toFixed(3)} · bases in bases/${brand}/`);
})();
