// UI: button component.
import { ArrowRight } from "lucide-react";
import { cx } from "../../utils/cx";

export default function Button({ children, variant = "primary", className, type = "button", ...props }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-black shadow-[0_0_24px_rgba(56,189,248,0.55)] hover:shadow-[0_0_32px_rgba(56,189,248,0.75)]"
      : "border border-cyan-400/50 bg-white/70 text-slate-900 hover:bg-white";

  return (
    <button className={cx(base, styles, className)} type={type} {...props}>
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </button>
  );
}
