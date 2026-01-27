// Effect: scroll-based transforms wrapper.
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionSettings } from "../../context/MotionSettings";

export default function SectionScrollFx({
  children,
  distance = 22,
  rotate = 0,
  scale = 1,
  skewX = 0,
  skewY = 0,
  enabled = true,
}) {
  const { reducedMotion } = useMotionSettings();
  const parallaxEnabled = enabled && !reducedMotion;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.25"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [scale - 0.005, scale, scale - 0.005]);
  const skewXValue = useTransform(scrollYProgress, [0, 1], [-skewX, skewX]);
  const skewYValue = useTransform(scrollYProgress, [0, 1], [-skewY, skewY]);

  return (
    <motion.div
      ref={ref}
      className="relative z-10"
      initial={reducedMotion ? false : { y: 24, scale: 0.98 }}
      whileInView={reducedMotion ? {} : { y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.6 }}
      style={{
        y: parallaxEnabled ? y : undefined,
        rotateZ: parallaxEnabled ? rotateZ : undefined,
        scale: parallaxEnabled ? scaleValue : undefined,
        skewX: parallaxEnabled ? skewXValue : undefined,
        skewY: parallaxEnabled ? skewYValue : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
