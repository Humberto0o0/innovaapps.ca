// UI: section title block.
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Pill from "./Pill";
import { useMotionSettings } from "../../context/MotionSettings";

export default function SectionTitle({ eyebrow, title, desc }) {
  const { reducedMotion } = useMotionSettings();

  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-3 flex justify-center">
        <Pill className="bg-white">
          <Sparkles className="h-4 w-4" />
          <span>{eyebrow}</span>
        </Pill>
      </div>
      <motion.h2
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.1 }}
      >
        <span className="bg-gradient-to-r from-cyan-500 via-slate-900 to-fuchsia-500 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      <motion.p
        className="mt-3 text-base leading-relaxed text-slate-700"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.15 }}
      >
        {desc}
      </motion.p>
    </motion.div>
  );
}
