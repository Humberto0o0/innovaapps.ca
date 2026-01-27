// Effect: cursor-following glow.
import { motion, useSpring } from "framer-motion";

export default function MouseGlow({ x, y }) {
  const glowX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.4 });
  const glowY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        background:
          "radial-gradient(240px 240px at var(--mx) var(--my), rgba(56,189,248,0.28), transparent 60%)",
        "--mx": glowX,
        "--my": glowY,
      }}
    />
  );
}
