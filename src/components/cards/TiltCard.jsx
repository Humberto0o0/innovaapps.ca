// Component: tilt hover card.
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMotionSettings } from "../../context/MotionSettings";
import { cx } from "../../utils/cx";

export default function TiltCard({ icon: Icon, title, desc, tag, tone = "blue" }) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ rx: 0, ry: 0 });
  const { reducedMotion } = useMotionSettings();

  const hoverGlow =
    tone === "pink"
      ? "0_0_50px_rgba(217,70,239,0.25)"
      : "0_0_50px_rgba(56,189,248,0.25)";

  const overlayGlow =
    tone === "pink"
      ? "radial-gradient(420px 260px at 20% 20%, rgba(217,70,239,0.25), transparent 60%)"
      : "radial-gradient(420px 260px at 20% 20%, rgba(56,189,248,0.25), transparent 60%)";

  const borderClass =
    tone === "pink"
      ? "border-fuchsia-300/60"
      : tone === "blue"
        ? "border-cyan-300/60"
        : "border-emerald-300/60";

  const badgeClass =
    tone === "pink"
      ? "border-fuchsia-200/80 text-fuchsia-700"
      : tone === "blue"
        ? "border-cyan-200/80 text-cyan-700"
        : "border-emerald-200/80 text-emerald-700";

  const iconClass =
    tone === "pink"
      ? "text-fuchsia-700"
      : tone === "blue"
        ? "text-cyan-700"
        : "text-emerald-700";

  const onMove = (e) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 10;
    const rx = -(py - 0.5) * 10;
    setRot({ rx, ry });
  };

  const onLeave = () => setRot({ rx: 0, ry: 0 });

  return (
    <motion.div
      ref={ref}
      onPointerMove={reducedMotion ? undefined : onMove}
      onPointerLeave={reducedMotion ? undefined : onLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={cx(
        "relative rounded-3xl border bg-white/90 p-6 shadow-[0_0_40px_rgba(56,189,248,0.16)]",
        borderClass
      )}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -6,
              boxShadow: `0 0 40px rgba(56,189,248,0.16), ${hoverGlow}`,
            }
      }
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <motion.div
        style={{
          transform: `rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className={cx("flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 border", borderClass)}>
            <Icon className={cx("h-6 w-6", iconClass)} />
          </div>
          <span className={cx("rounded-full border bg-white/90 px-3 py-1 text-xs", badgeClass)}>
            {tag}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>

        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span className="opacity-80">Explore</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -inset-24 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          background: overlayGlow,
        }}
      />
    </motion.div>
  );
}
