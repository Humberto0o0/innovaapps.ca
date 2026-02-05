// Component: static card.
import { cx } from "../../utils/cx";

export default function TiltCard({ icon: Icon, title, desc, tag, tone = "blue" }) {
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

  return (
    <div
      className={cx(
        "card-opaque relative rounded-3xl border p-8 shadow-[0_0_40px_rgba(56,189,248,0.16)] mb-4",
        borderClass
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={cx("flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 border", borderClass)}>
          <Icon className={cx("h-6 w-6", iconClass)} />
        </div>
        <span className={cx("rounded-full border bg-white/95 px-3 py-1 text-xs", badgeClass)}>
          {tag}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed tilt-desc">{desc}</p>

    </div>
  );
}
