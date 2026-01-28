// UI: pill badge.
import { cx } from "../../utils/cx";

export default function Pill({ children, className }) {
  return (
    <span
      className={cx(
        "pill inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-white/95 px-3 py-1 text-xs text-slate-800 shadow-[0_0_16px_rgba(56,189,248,0.18)] backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}
