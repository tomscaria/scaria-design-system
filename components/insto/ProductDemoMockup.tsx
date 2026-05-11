import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, ChevronRight, Check, Wallet, PieChart } from "lucide-react";

// Token icons
import btcIcon from "@/assets/tokens/btc.svg";
import ethIcon from "@/assets/tokens/eth.svg";
import solIcon from "@/assets/tokens/sol.svg";
import usdcIcon from "@/assets/tokens/usdc.svg";

const STEP_DURATION = 2500;

interface PortfolioAsset {
  icon: string;
  name: string;
  symbol: string;
  allocation: number;
  color: string;
}

const portfolioAssets: PortfolioAsset[] = [
  { icon: btcIcon, name: "Bitcoin", symbol: "BTC", allocation: 40, color: "#F7931A" },
  { icon: ethIcon, name: "Ethereum", symbol: "ETH", allocation: 30, color: "#627EEA" },
  { icon: solIcon, name: "Solana", symbol: "SOL", allocation: 20, color: "#9945FF" },
  { icon: usdcIcon, name: "USD Coin", symbol: "USDC", allocation: 10, color: "#2775CA" },
];

export const ProductDemoMockup = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(0);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Animate amount counting
  useEffect(() => {
    if (step === 2) {
      setAmount(0);
      const target = 1000;
      const duration = 800;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setAmount(Math.floor(target * eased));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [step]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="relative bg-card/80 backdrop-blur-xl rounded-[2.5rem] border border-border/50 p-3 shadow-2xl">
        {/* Screen */}
        <div className="bg-background rounded-[2rem] overflow-hidden aspect-[9/16] relative">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-6 z-20">
            <span className="text-[10px] text-muted-foreground">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-muted-foreground/50 rounded-sm">
                <div className="w-3/4 h-full bg-accent rounded-sm" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 pt-10 pb-4 px-4 flex flex-col">
            <AnimatePresence mode="wait">
              {/* Step 0: Home/Portfolio Overview */}
              {step === 0 && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">Smart Invest</h3>
                  <p className="text-xs text-muted-foreground mb-4">Your portfolio at a glance</p>
                  
                  {/* Balance card */}
                  <motion.div 
                    className="bg-card/60 rounded-2xl p-4 mb-4 border border-border/30"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
                    <p className="text-2xl font-bold text-foreground">$12,847.32</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent">+12.4% this month</span>
                    </div>
                  </motion.div>

                  {/* LTP Card */}
                  <motion.div
                    className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-4 border border-accent/30"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px hsl(var(--accent) / 0.1)",
                        "0 0 30px hsl(var(--accent) / 0.2)",
                        "0 0 20px hsl(var(--accent) / 0.1)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center">
                          <PieChart className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">EMG-BLUE</p>
                          <p className="text-[10px] text-muted-foreground">Lore 25 Holdings</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      {portfolioAssets.slice(0, 4).map((asset, i) => (
                        <motion.img
                          key={asset.symbol}
                          src={asset.icon}
                          alt={asset.symbol}
                          className="w-5 h-5 rounded-full"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        />
                      ))}
                      <span className="text-[10px] text-muted-foreground">+21 more</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 1: Select Investment */}
              {step === 1 && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">Invest</h3>
                  <p className="text-xs text-muted-foreground mb-4">Choose a portfolio token</p>
                  
                  <div className="space-y-2">
                    {[
                      { name: "EMG-BLUE", desc: "EM Flagship Basket", apy: "8.2%", featured: true },
                      { name: "DEFI-CORE", desc: "DeFi Core Holdings", apy: "12.4%", featured: false },
                      { name: "STBL-LATAM", desc: "Stablecoin Latam", apy: "15.1%", featured: false },
                    ].map((token, i) => (
                      <motion.div
                        key={token.name}
                        className={`p-3 rounded-xl border ${token.featured ? 'border-accent/50 bg-accent/10' : 'border-border/30 bg-card/40'}`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${token.featured ? 'bg-accent/30' : 'bg-muted/50'}`}>
                              <PieChart className={`w-4 h-4 ${token.featured ? 'text-accent' : 'text-muted-foreground'}`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{token.name}</p>
                              <p className="text-[10px] text-muted-foreground">{token.desc}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-accent font-medium">{token.apy} APY</p>
                            {token.featured && (
                              <motion.div
                                className="w-4 h-4 rounded-full bg-accent flex items-center justify-center ml-auto mt-1"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                              >
                                <Check className="w-2.5 h-2.5 text-background" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Enter Amount */}
              {step === 2 && (
                <motion.div
                  key="amount"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">Buy EMG-BLUE</h3>
                  <p className="text-xs text-muted-foreground mb-6">Enter amount</p>
                  
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <motion.div
                      className="text-4xl font-bold text-foreground mb-2"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      ${amount.toLocaleString()}
                    </motion.div>
                    <p className="text-xs text-muted-foreground mb-8">≈ 108.7 EMG-BLUE</p>
                    
                    {/* Quick amounts */}
                    <div className="flex gap-2 mb-6">
                      {["$100", "$500", "$1,000"].map((amt, i) => (
                        <motion.div
                          key={amt}
                          className={`px-4 py-2 rounded-full text-xs ${amt === "$1,000" ? 'bg-accent text-background font-medium' : 'bg-muted/30 text-muted-foreground border border-border/30'}`}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          {amt}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="bg-accent text-background rounded-xl py-3 text-center font-medium text-sm"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 hsl(var(--accent) / 0)",
                        "0 0 20px 4px hsl(var(--accent) / 0.3)",
                        "0 0 0 0 hsl(var(--accent) / 0)",
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  >
                    Continue
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Confirm & Processing */}
              {step === 3 && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 hsl(var(--accent) / 0.2)",
                        "0 0 0 20px hsl(var(--accent) / 0)",
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Wallet className="w-8 h-8 text-accent" />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">Processing</h3>
                  <p className="text-xs text-muted-foreground text-center mb-6">
                    Minting EMG-BLUE tokens...
                  </p>

                  {/* Progress dots */}
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-accent"
                        animate={{ 
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Check className="w-10 h-10 text-background" strokeWidth={3} />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold text-foreground mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Investment Complete!
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-muted-foreground text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    You now own 108.7 EMG-BLUE
                  </motion.p>

                  {/* Mini pie chart */}
                  <motion.div
                    className="flex items-center gap-1 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {portfolioAssets.map((asset, i) => (
                      <motion.img
                        key={asset.symbol}
                        src={asset.icon}
                        alt={asset.symbol}
                        className="w-6 h-6 rounded-full border-2 border-background -ml-1 first:ml-0"
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      />
                    ))}
                  </motion.div>

                  <motion.p
                    className="text-[10px] text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Diversified across 25 assets
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom nav bar */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1.5 rounded-2xl bg-card/70 backdrop-blur-sm border border-border/30">
            {[
              { label: "PORTFOLIO", icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>, active: false },
              { label: "SAVE", icon: <PieChart className="w-4 h-4" />, active: false },
              { label: "", icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>, center: true, active: false },
              { label: "INVEST", icon: <TrendingUp className="w-4 h-4" />, active: true },
              { label: "SPEND", icon: <Wallet className="w-4 h-4" />, active: false },
            ].map((tab, i) => (
              tab.center ? (
                <div key={i} className="flex flex-col items-center -mt-3">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-background shadow-lg shadow-accent/30">
                    {tab.icon}
                  </div>
                </div>
              ) : (
                <div key={i} className={`flex flex-col items-center gap-0.5 ${tab.active ? 'text-accent' : 'text-muted-foreground'}`}>
                  {tab.icon}
                  <span className="text-[6px] font-semibold tracking-wider">{tab.label}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-foreground/20" />
      </div>
    </div>
  );
};
