import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoTileProps {
  eyebrow: string;
  title: string;
  body: string;
  visual: ReactNode;
  className?: string;
  index?: number;
  /** When true, visual sits beside body (wide tile); otherwise stacked. */
  wide?: boolean;
}

/**
 * Single bento-grid tile. Title + body on the left, mockup/icon area on the right (wide)
 * or below (stacked). Uses card-surface utility for institutional-neutral styling.
 */
export const BentoTile = ({
  eyebrow,
  title,
  body,
  visual,
  className = "",
  index = 0,
  wide = false,
}: BentoTileProps) => {
  return (
    <motion.div
      className={`card-surface relative overflow-hidden p-6 md:p-7 flex ${
        wide ? "flex-col md:flex-row md:items-center md:gap-8" : "flex-col"
      } ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease: "easeOut" }}
    >
      <div className={wide ? "md:flex-1 md:max-w-md" : ""}>
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-accent mb-3">
          {eyebrow}
        </p>
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 leading-snug tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
      <div
        className={`${
          wide
            ? "mt-6 md:mt-0 md:flex-1 md:min-w-0"
            : "mt-6"
        } flex items-center justify-center`}
      >
        {visual}
      </div>
    </motion.div>
  );
};
