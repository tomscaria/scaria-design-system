import { Shield, BadgeCheck, Layers } from "lucide-react";

interface Pillar {
  icon: React.ElementType;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Shield,
    title: "Qualified custody.",
    body: "Segregated accounts. 1:1 backed. Never commingled. Audit trail on every position.",
  },
  {
    icon: BadgeCheck,
    title: "Compliance, built in.",
    body: "KYC/AML stays with your partner brokerage. Reporting and surveillance run on Lore.",
  },
  {
    icon: Layers,
    title: "Extend your brokerage. Don't rebuild it.",
    body: "Lore sits behind your existing brand. Customer relationships stay yours. Custody and execution sit with us.",
  },
];

export const AccountsSection = () => {
  return (
    <section
      id="section-accounts"
      className="py-16 md:py-24 lg:py-28 px-6 lg:px-16 relative overflow-hidden"
    >
      {/* Subtle background continuation */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Eyebrow + heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Custodial accounts
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Three accounts. One platform. Built for fund managers.
          </h2>
        </div>

        {/* 3-pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="card-surface p-6 md:p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
