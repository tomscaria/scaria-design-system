import { ProductDemoMockup } from "./ProductDemoMockup";
import { FundManagerConsole } from "./FundManagerConsole";
import { useRef, useState, useEffect } from "react";
import loreCoins from "@/assets/partners/lore-coins.svg";

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger reveal after mount (hero is always in viewport)
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex flex-col px-6 lg:px-16 pt-24 pb-12 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-background" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center text-center">
        {/* LORE logo centered */}
        <div
          className={`mb-4 reveal-up ${visible ? "revealed" : ""}`}
          style={{ transitionDelay: "60ms" }}
        >
          <img src={loreCoins} alt="LORE" className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        {/* Main headline */}
        <h1
          className={`text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-3 reveal-up ${visible ? "revealed" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Move{" "}
          <span className="text-accent">emerging-market funds</span>{" "}
          onchain.
        </h1>

        <a
          href="https://lore-teaser-prea.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm md:text-base font-semibold hover:bg-primary/90 transition-colors mb-8 reveal-up ${visible ? "revealed" : ""}`}
          style={{ transitionDelay: "180ms" }}
        >
          Read TLDR Pitch
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>

        {/* Description box */}
        <div
          className={`bg-card/50 border border-border/40 rounded-xl p-6 mb-12 w-full reveal-up ${visible ? "revealed" : ""}`}
          style={{ transitionDelay: "250ms" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 mt-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path
                  d="M6 12 Q12 4 18 12 Q12 20 6 12"
                  fill="none"
                  stroke="hsl(var(--lore-accent))"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              <span className="text-foreground font-medium">
                Lore is the qualified-custody and tokenization platform for emerging-market fund managers.
              </span>{" "}
              Partners own the customer.{" "}
              <span className="text-foreground font-semibold">
                Lore owns the rails.
              </span>
            </p>
          </div>
        </div>

        {/* Visual stage — 2-up: Fund Manager Console (left) + Investor Phone (right) */}
        <div
          className={`flex-1 flex flex-col items-center justify-center w-full reveal-up ${visible ? "revealed" : ""}`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="relative w-full flex flex-col md:flex-row items-stretch md:items-center justify-center gap-8 md:gap-6 lg:gap-10">
            {/* Fund Manager Console — left, ~62% on desktop */}
            <div className="flex-1 flex flex-col items-center min-w-0 w-full md:max-w-[640px]">
              <div className="relative w-full">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-50"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--accent) / 0.18) 0%, transparent 70%)",
                  }}
                />
                <div className="relative">
                  <FundManagerConsole />
                </div>
              </div>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Fund manager console
              </p>
            </div>

            {/* Investor Phone — right, hidden on smallest screens.
                Explicit width required: ProductDemoMockup uses w-full max-w-sm
                inside, which collapses to 0 in a shrink-0 flex item with no width. */}
            <div className="hidden sm:flex flex-col items-center shrink-0 w-64 lg:w-72">
              <div className="relative w-full">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-50"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
                  }}
                />
                <div className="relative w-full">
                  <ProductDemoMockup />
                </div>
              </div>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Investor experience
              </p>
            </div>
          </div>

          {/* SDK Description */}
          <div
            className={`mt-10 max-w-3xl text-center reveal-fade ${visible ? "revealed" : ""}`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              <span className="text-foreground font-semibold">One platform, two surfaces.</span>{" "}
              Fund managers operate from the Lore Console. Their investors transact through partner brokerages and apps. Lore handles custody, compliance, and settlement on both sides.
            </p>
          </div>
        </div>
      </div>

      <div id="hero" className="absolute top-0 left-0" />
    </section>
  );
};
