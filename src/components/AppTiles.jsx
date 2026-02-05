// Component: app tiles grid.
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { appTiles } from "../data/site";

export default function AppTiles({ limit, variant = "compact" }) {
  const items = limit ? appTiles.slice(0, limit) : appTiles;
  const gridClass = variant === "detailed" ? "md:grid-cols-2" : "md:grid-cols-3";
  const glows = [
    {
      primary: "bg-cyan-400/20",
      primaryPos: "-right-10 -top-12",
      secondary: "bg-fuchsia-400/15",
      secondaryPos: "-left-8 -bottom-10",
    },
    {
      primary: "bg-fuchsia-400/20",
      primaryPos: "-left-8 -bottom-10",
      secondary: "bg-emerald-400/15",
      secondaryPos: "-right-6 -top-10",
    },
    {
      primary: "bg-emerald-400/20",
      primaryPos: "-right-6 -bottom-12",
      secondary: "bg-blue-400/15",
      secondaryPos: "-left-10 -top-10",
    },
    {
      primary: "bg-blue-400/20",
      primaryPos: "-left-10 -top-10",
      secondary: "bg-cyan-400/15",
      secondaryPos: "-right-8 -bottom-10",
    },
  ];
  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {items.map((it, i) => {
        const glow = glows[i % glows.length];
        return (
        <motion.div
          key={it.name}
          className="relative overflow-hidden rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.16)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <div className="flex items-center justify-between gap-4">
            <h4 className="text-base font-semibold text-slate-900">{it.name}</h4>
            <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs text-slate-700">
              {it.status}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{it.blurb}</p>
          {variant === "detailed" && it.tagline && (
            <p className="mt-3 text-xs uppercase tracking-wide text-cyan-600">{it.tagline}</p>
          )}
          <Link
            to={`/apps/${it.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <span className="opacity-80">
              {it.slug === "humberto-ai"
                ? "View app"
                : it.name === "Humberto AI"
                  ? "View project"
                  : "View"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div
            className={`pointer-events-none absolute h-40 w-40 rounded-full blur-2xl ${glow.primary} ${glow.primaryPos}`}
          />
          <div
            className={`pointer-events-none absolute h-28 w-28 rounded-full blur-2xl ${glow.secondary} ${glow.secondaryPos}`}
          />
        </motion.div>
        );
      })}
    </div>
  );
}
