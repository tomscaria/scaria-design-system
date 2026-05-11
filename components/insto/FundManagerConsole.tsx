import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Plausible mock positions — 5 LTPs anchored to EM/regional flavor
const positions = [
  { name: "LORE25-BR", nav: "1.0847", change: 0.42, aum: "187.3M", investors: 47 },
  { name: "LORE25-IN", nav: "1.1203", change: 0.31, aum: "142.8M", investors: 38 },
  { name: "EMG-BLUE", nav: "0.9821", change: -0.12, aum: "98.4M", investors: 29 },
  { name: "STBL-LATAM", nav: "1.0091", change: 0.08, aum: "76.2M", investors: 64 },
  { name: "DEFI-CORE", nav: "1.4231", change: 1.24, aum: "63.1M", investors: 21 },
];

// 90-day AUM trajectory, normalized 0-100 (rises overall — bull-ish)
const aumPoints = [
  42, 45, 43, 48, 51, 49, 53, 56, 54, 58,
  62, 60, 65, 68, 66, 70, 73, 71, 76, 79,
  77, 81, 84, 82, 86, 89, 87, 91, 94, 92,
  95, 96, 94, 97, 95, 98, 96, 99, 100,
];

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const FundManagerConsole = () => {
  const [aum, setAum] = useState(847.3);
  const [investors, setInvestors] = useState(312);

  // Subtle live ticks
  useEffect(() => {
    const aumTimer = setInterval(() => {
      setAum((prev) => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
    }, 4500);
    const invTimer = setInterval(() => {
      setInvestors((prev) => (Math.random() > 0.6 ? prev + 1 : prev));
    }, 7000);
    return () => {
      clearInterval(aumTimer);
      clearInterval(invTimer);
    };
  }, []);

  // SVG chart path construction
  const W = 100;
  const H = 30;
  const chartPath = aumPoints
    .map((y, i) => {
      const x = (i / (aumPoints.length - 1)) * W;
      const yPos = H - (y / 100) * H;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${yPos.toFixed(2)}`;
    })
    .join(" ");
  const fillPath = `${chartPath} L${W} ${H} L0 ${H} Z`;

  return (
    <div className="w-full bg-card rounded-2xl border border-border/60 shadow-[0_2px_24px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-muted/40">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground tracking-tight">Lore Console</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70 border border-border/50">
            Fund Manager
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground px-2 py-1 rounded-md bg-background border border-border/50">
            <span>Brazil · BRL</span>
            <ChevronDown />
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[11px] text-muted-foreground">Live</span>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-px bg-border/60">
        {[
          { label: "Total AUM", value: `$${aum.toFixed(1)}M`, delta: "+12.4% YTD", mono: true },
          { label: "Active LTPs", value: "14", delta: "2 launching", mono: false },
          { label: "Investors", value: investors.toString(), delta: "+28 this month", mono: false },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="bg-card px-5 py-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
              {kpi.label}
            </p>
            <motion.p
              key={kpi.value}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`text-xl md:text-2xl font-semibold text-foreground ${kpi.mono ? "font-mono tracking-tight" : ""}`}
            >
              {kpi.value}
            </motion.p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              <span className="text-foreground font-medium">{kpi.delta}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* AUM chart */}
      <div className="px-5 py-4 border-t border-border/60">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            AUM · last 90 days
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">+18.7%</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aumFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={fillPath}
            fill="url(#aumFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          <motion.path
            d={chartPath}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Positions table */}
      <div className="border-t border-border/60">
        <div className="grid grid-cols-[1.4fr_0.9fr_0.7fr_1fr_0.7fr] gap-3 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground bg-muted/40 border-b border-border/60">
          <span>LTP</span>
          <span className="text-right">NAV</span>
          <span className="text-right">24h</span>
          <span className="text-right">AUM</span>
          <span className="text-right">Investors</span>
        </div>
        {positions.map((p, i) => (
          <motion.div
            key={p.name}
            className="grid grid-cols-[1.4fr_0.9fr_0.7fr_1fr_0.7fr] gap-3 px-5 py-2.5 text-sm border-b border-border/40 last:border-b-0 hover:bg-muted/30 transition-colors"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
          >
            <span className="font-medium text-foreground font-mono text-[13px]">{p.name}</span>
            <span className="text-right text-foreground font-mono text-[13px]">{p.nav}</span>
            <span
              className={`text-right font-mono text-[13px] ${
                p.change >= 0 ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {p.change >= 0 ? "+" : ""}
              {p.change.toFixed(2)}%
            </span>
            <span className="text-right text-muted-foreground font-mono text-[13px]">${p.aum}</span>
            <span className="text-right text-muted-foreground font-mono text-[13px]">{p.investors}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
