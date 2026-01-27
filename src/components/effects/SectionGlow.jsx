// Effect: ambient section glow.
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionSettings } from "../../context/MotionSettings";

export default function SectionGlow({ variant = "cyan", drift = 26 }) {
  const { reducedMotion } = useMotionSettings();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.9, 0.2]);
  const palette =
    variant === "fuchsia"
      ? "rgba(217,70,239,0.2)"
      : variant === "blue"
        ? "rgba(59,130,246,0.2)"
        : "rgba(56,189,248,0.2)";

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
      style={{
        y: reducedMotion ? 0 : y,
        opacity: reducedMotion ? 0.85 : opacity,
        background: `radial-gradient(720px 360px at 50% 0%, ${palette}, transparent 70%)`,
        mixBlendMode: "screen",
        filter: "blur(2px)",
      }}
    />
  );
}
