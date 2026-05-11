import { motion } from "framer-motion";
import { Network, BarChart3, Building2, Briefcase, ArrowRight, ArrowDown } from "lucide-react";

// ----- Tile data --------------------------------------------------------------

interface PartnerTile {
  id: string;
  icon: React.ElementType;
  eyebrow: string;
  headline: string;
  body: string;
  cta: { label: string; href: string };
}

const tiles: PartnerTile[] = [
  {
    id: "defi",
    icon: Network,
    eyebrow: "DeFi protocols",
    headline: "Native LTP integrations across major chains.",
    body: "Plug LTPs into protocol vaults as yield-bearing collateral. Lore handles NAV and settlement.",
    cta: {
      label: "Talk to integrations",
      href: "mailto:tom@lore.financial?subject=Lore%20DeFi%20integration",
    },
  },
  {
    id: "cex",
    icon: BarChart3,
    eyebrow: "Regional CEXs",
    headline: "Listed as institutional spot markets.",
    body: "Tokenized fund exposure as standard spot pairs. Partners own the surface; Lore provides product.",
    cta: {
      label: "Talk to listings",
      href: "mailto:tom@lore.financial?subject=Lore%20spot%20listing",
    },
  },
  {
    id: "fintech",
    icon: Building2,
    eyebrow: "EM fintechs",
    headline: "White-label custody and tokenized portfolios.",
    body: "Drop qualified custody and a curated LTP catalog into existing fintech distribution.",
    cta: {
      label: "Talk to distribution",
      href: "mailto:tom@lore.financial?subject=Lore%20fintech%20distribution",
    },
  },
  {
    id: "asset-mgr",
    icon: Briefcase,
    eyebrow: "Asset managers",
    headline: "Tokenize private funds onchain.",
    body: "Bring an existing fund onchain. Lore operates tokenization and the custody perimeter.",
    cta: {
      label: "Talk to fund operations",
      href: "mailto:tom@lore.financial?subject=Lore%20tokenization%20engine",
    },
  },
];

// ----- Per-tile mockups -------------------------------------------------------

// 1. DeFi protocols — terminal-style code snippet showing LTP integration call
const DeFiMockup = () => (
  <div className="card-surface p-4 font-mono text-[11px] leading-relaxed select-none">
    <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border/50">
      <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
      <span className="ml-2 text-[10px] text-muted-foreground tracking-wider">
        vault.ts
      </span>
    </div>
    <pre className="text-foreground/90 whitespace-pre overflow-hidden">
      <span className="text-muted-foreground">import </span>
      {"{ "}<span className="text-accent">lore</span>{" } "}
      <span className="text-muted-foreground">from </span>
      <span className="text-foreground">"@lore/sdk"</span>
      {"\n\n"}
      <span className="text-muted-foreground">// route vault yield into LTP</span>
      {"\n"}
      <span className="text-muted-foreground">await </span>
      <span className="text-accent">lore</span>.route({"{"}
      {"\n  "}asset: <span className="text-foreground">"LORE25-BR"</span>,
      {"\n  "}amount: <span className="text-foreground">1_000_000n</span>,
      {"\n  "}chain: <span className="text-foreground">"solana"</span>,
      {"\n"}{"}"});
    </pre>
  </div>
);

// 2. Regional CEXs — mini spot ticker card
const CEXMockup = () => (
  <div className="card-surface p-4">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-foreground tracking-wide">
          LORE25-BR
        </span>
        <span className="text-xs text-muted-foreground">/ USDT</span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">
        Spot
      </span>
    </div>
    <div className="flex items-baseline gap-3 mb-3">
      <span className="font-mono text-2xl font-semibold text-foreground tabular-nums">
        10.37
      </span>
      <span className="font-mono text-xs text-accent tabular-nums">+0.52%</span>
    </div>
    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50 text-[10px]">
      <div>
        <p className="uppercase tracking-wider text-muted-foreground mb-0.5">NAV</p>
        <p className="font-mono text-foreground tabular-nums">10.37</p>
      </div>
      <div>
        <p className="uppercase tracking-wider text-muted-foreground mb-0.5">24h vol</p>
        <p className="font-mono text-foreground tabular-nums">2.4M</p>
      </div>
      <div>
        <p className="uppercase tracking-wider text-muted-foreground mb-0.5">Spread</p>
        <p className="font-mono text-foreground tabular-nums">3 bps</p>
      </div>
    </div>
  </div>
);

// 3. EM fintechs — shareholder registry table fragment
const FintechMockup = () => {
  const rows = [
    { id: "ACC-0184", asset: "LORE25-BR", units: "1,240.00" },
    { id: "ACC-0185", asset: "EMG-LATAM", units: "  864.50" },
    { id: "ACC-0186", asset: "STBL-USD ", units: "  500.00" },
    { id: "ACC-0187", asset: "LORE25-BR", units: "  120.75" },
  ];
  return (
    <div className="card-surface p-4">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/50">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Investor registry
        </span>
        <span className="text-[10px] font-mono text-accent tabular-nums">312 active</span>
      </div>
      <div className="font-mono text-[11px] space-y-1.5">
        <div className="grid grid-cols-[1fr_1.1fr_0.9fr] gap-2 text-[9px] uppercase tracking-wider text-muted-foreground">
          <span>Account</span>
          <span>Asset</span>
          <span className="text-right">Units</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_1.1fr_0.9fr] gap-2 text-foreground/90 tabular-nums"
          >
            <span>{row.id}</span>
            <span>{row.asset}</span>
            <span className="text-right whitespace-pre">{row.units}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Asset managers — fund issuance flow diagram
const AssetManagerMockup = () => (
  <div className="card-surface p-4">
    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/50">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        Issuance flow
      </span>
      <span className="text-[10px] font-mono text-accent tabular-nums">T+0</span>
    </div>
    <div className="flex flex-col items-center gap-1.5 py-1">
      <div className="w-full px-3 py-2 rounded-md border border-border/60 bg-background/60 text-center">
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Fund</p>
        <p className="text-xs font-medium text-foreground">EMG-LATAM strategy</p>
      </div>
      <ArrowDown className="w-3 h-3 text-muted-foreground" />
      <div className="w-full px-3 py-2 rounded-md border border-accent/40 bg-accent/5 text-center">
        <p className="text-[9px] uppercase tracking-wider text-accent">Lore</p>
        <p className="text-xs font-medium text-foreground">Tokenization + custody</p>
      </div>
      <ArrowDown className="w-3 h-3 text-muted-foreground" />
      <div className="w-full px-3 py-2 rounded-md border border-border/60 bg-background/60 text-center">
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Investors</p>
        <p className="text-xs font-medium text-foreground font-mono tabular-nums">
          312 allowlisted
        </p>
      </div>
    </div>
  </div>
);

const mockups: Record<string, React.FC> = {
  defi: DeFiMockup,
  cex: CEXMockup,
  fintech: FintechMockup,
  "asset-mgr": AssetManagerMockup,
};

// ----- Section ----------------------------------------------------------------

export const PartnerModelsSection = () => {
  return (
    <section
      id="partner-models"
      className="py-16 md:py-24 lg:py-28 px-6 lg:px-16 relative overflow-hidden"
    >
      {/* Subtle background continuation */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Distribution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Four partner types. One settlement layer.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Lore plugs into existing distribution surfaces. Partners own the customer.
          </p>
        </div>

        {/* Tile grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            const Mockup = mockups[tile.id];
            return (
              <motion.div
                key={tile.id}
                className="card-surface p-6 md:p-8 flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-accent" />
                </div>

                {/* Eyebrow */}
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-accent mb-2">
                  {tile.eyebrow}
                </p>

                {/* Headline */}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 leading-snug">
                  {tile.headline}
                </h3>

                {/* Body */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  {tile.body}
                </p>

                {/* Mockup */}
                <div className="mb-6">
                  <Mockup />
                </div>

                {/* CTA — text-link, not button */}
                <a
                  href={tile.cta.href}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-foreground transition-colors group"
                >
                  {tile.cta.label}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
