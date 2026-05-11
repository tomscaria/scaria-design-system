import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
 * Six lightweight SVG / styled-div mockups for the /accounts bento grid.
 * Each renders ≤120px tall; designed to stay legible in a small tile cell.
 * ───────────────────────────────────────────────────────────────────── */

/** 1. Qualified custody — segregated-account ledger snapshot */
export const CustodyVisual = () => (
  <div className="w-full max-w-[260px] rounded-lg border border-border/60 bg-muted/30 p-3 font-mono text-[10px]">
    <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/50">
      <span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        Segregated ledger
      </span>
      <span className="flex items-center gap-1 text-[9px] text-emerald-600">
        <span className="w-1 h-1 rounded-full bg-emerald-500" />
        1:1 backed
      </span>
    </div>
    {[
      { acct: "ACC-LR-0042", asset: "USDC", bal: "187,300,000" },
      { acct: "ACC-LR-0043", asset: "TBILL", bal: "142,800,000" },
      { acct: "ACC-LR-0044", asset: "USDC", bal: "98,400,000" },
    ].map((row, i) => (
      <motion.div
        key={row.acct}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + i * 0.08 }}
        className="flex items-center justify-between py-1.5"
      >
        <span className="text-foreground/80">{row.acct}</span>
        <span className="text-muted-foreground">{row.asset}</span>
        <span className="text-foreground tabular-nums">${row.bal}</span>
      </motion.div>
    ))}
  </div>
);

/** 2. Compliance perimeter — concentric ring with allowlist count */
export const PerimeterVisual = () => (
  <div className="relative w-[140px] h-[140px] flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="perimeterFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#perimeterFill)" />
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="32"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeOpacity="0.3"
        strokeWidth="0.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      />
      <circle cx="50" cy="50" r="18" fill="hsl(var(--background))" />
      <circle
        cx="50"
        cy="50"
        r="18"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="0.6"
      />
    </svg>
    <div className="relative z-10 text-center">
      <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        Allowlist
      </p>
      <p className="text-base font-mono font-semibold text-foreground">312</p>
    </div>
  </div>
);

/** 3. Tokenization engine — flow diagram from off-chain to onchain */
export const TokenizationVisual = () => (
  <div className="w-full max-w-[260px] flex items-center justify-between gap-2 text-[10px] font-mono">
    {[
      { label: "NAV strike", sub: "Off-chain" },
      { label: "Mint", sub: "Engine" },
      { label: "LTP", sub: "Onchain" },
    ].map((node, i) => (
      <div key={node.label} className="flex items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.18 }}
          className="rounded-md border border-border/60 bg-card px-2.5 py-2 text-center min-w-[64px]"
        >
          <p className="text-foreground font-semibold leading-none">
            {node.label}
          </p>
          <p className="text-[8px] text-muted-foreground mt-1 uppercase tracking-wide">
            {node.sub}
          </p>
        </motion.div>
        {i < 2 && (
          <motion.svg
            viewBox="0 0 24 8"
            className="w-5 h-2 mx-1 text-accent"
            initial={{ opacity: 0, x: -4 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.18 }}
          >
            <path
              d="M0 4 H20 M16 1 L20 4 L16 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </div>
    ))}
  </div>
);

/** 4. DeFi integrations — a row of chain pills */
export const DefiVisual = () => {
  const protocols = ["Solana", "Sui", "Base", "Mantle", "Monad"];
  return (
    <div className="w-full max-w-[280px] flex flex-wrap items-center justify-center gap-1.5">
      {protocols.map((name, i) => (
        <motion.span
          key={name}
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.06 }}
          className="px-2.5 py-1 rounded-full text-[10px] font-medium border border-border/60 bg-muted/40 text-foreground/80 font-mono"
        >
          {name}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 + protocols.length * 0.06 }}
        className="px-2.5 py-1 rounded-full text-[10px] font-medium border border-accent/40 bg-accent/10 text-accent font-mono"
      >
        + 4 more
      </motion.span>
    </div>
  );
};

/** 5. Investor allowlist — onboarding row with status pills */
export const AllowlistVisual = () => (
  <div className="w-full max-w-[260px] rounded-lg border border-border/60 bg-card overflow-hidden font-mono text-[10px]">
    <div className="px-3 py-2 bg-muted/40 border-b border-border/50 flex items-center justify-between">
      <span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        Investor onboarding
      </span>
      <span className="text-[9px] text-muted-foreground">312 verified</span>
    </div>
    {[
      { id: "INV-218", country: "BR", status: "Verified", tone: "ok" },
      { id: "INV-219", country: "IN", status: "KYC review", tone: "wait" },
      { id: "INV-220", country: "MX", status: "Verified", tone: "ok" },
    ].map((row, i) => (
      <motion.div
        key={row.id}
        initial={{ opacity: 0, x: -4 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 + i * 0.08 }}
        className="flex items-center justify-between px-3 py-1.5 border-b border-border/30 last:border-b-0"
      >
        <span className="text-foreground/80">{row.id}</span>
        <span className="text-muted-foreground">{row.country}</span>
        <span
          className={`px-1.5 py-0.5 rounded text-[9px] ${
            row.tone === "ok"
              ? "bg-emerald-500/10 text-emerald-700"
              : "bg-amber-500/10 text-amber-700"
          }`}
        >
          {row.status}
        </span>
      </motion.div>
    ))}
  </div>
);

/** 6. Reporting + statements — mini bar chart of monthly statements */
export const ReportingVisual = () => {
  const bars = [38, 52, 45, 61, 58, 72, 68, 81, 79, 88, 92, 96];
  return (
    <div className="w-full max-w-[260px]">
      <div className="flex items-end gap-1.5 h-[72px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: `${h}%`, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.04 }}
            className={`flex-1 rounded-sm ${
              i === bars.length - 1 ? "bg-accent" : "bg-foreground/15"
            }`}
            style={{ minHeight: "6px" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40 text-[9px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
        <span>12 months</span>
        <span className="text-foreground">312 statements</span>
      </div>
    </div>
  );
};
