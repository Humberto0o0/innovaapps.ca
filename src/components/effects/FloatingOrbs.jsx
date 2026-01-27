// Effect: floating orb glows.
import { motion, useSpring, useTransform } from "framer-motion";

export default function FloatingOrbs({ x, y }) {
  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const tx = useTransform(x, (v) => (v - centerX) / 55);
  const ty = useTransform(y, (v) => (v - centerY) / 55);

  const sx = useSpring(tx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(ty, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute top-48 left-10 h-72 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute top-24 right-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="absolute bottom-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-400/15 blur-3xl" />
    </motion.div>
  );
}
