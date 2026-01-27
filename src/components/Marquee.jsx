// Component: animated marquee pills.
import { motion } from "framer-motion";
import { useMotionSettings } from "../context/MotionSettings";

export default function Marquee({ words = [] }) {
  const { reducedMotion } = useMotionSettings();
  const line = [...words, ...words];
  const animate = reducedMotion ? { x: 0 } : { x: ["0%", "-50%"] };
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 32, ease: "linear", repeat: Infinity };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-5">
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,1),transparent)]" />
      <motion.div className="flex w-max gap-4 px-6" animate={animate} transition={transition}>
        {line.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="whitespace-nowrap rounded-full border border-cyan-500/50 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_0_16px_rgba(56,189,248,0.18)]"
          >
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
