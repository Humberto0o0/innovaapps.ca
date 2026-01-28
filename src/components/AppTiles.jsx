// Component: app tiles grid.
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { appTiles } from "../data/site";

export default function AppTiles({ limit, variant = "compact" }) {
  const items = limit ? appTiles.slice(0, limit) : appTiles;
  const gridClass = variant === "detailed" ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {items.map((it, i) => (
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
            <span className="opacity-80">View</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl" />
        </motion.div>
      ))}
    </div>
  );
}
