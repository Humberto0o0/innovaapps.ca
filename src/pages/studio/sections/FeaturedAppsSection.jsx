// Home section: featured builds.
import { motion } from "framer-motion";
import SectionTitle from "../../../components/ui/SectionTitle";
import ButtonLink from "../../../components/ui/ButtonLink";
import { siteContent } from "../../../data/site";
import SectionGlow from "../../../components/effects/SectionGlow";
import SectionScrollFx from "../../../components/effects/SectionScrollFx";

export default function FeaturedAppsSection() {
  const accents = [
    {
      cardBorder: "border-cyan-300/40",
      pillBorder: "border-cyan-200",
      metric: "text-cyan-600",
      glow: "bg-cyan-400/25",
      glowPos: "-left-10 -top-10",
    },
    {
      cardBorder: "border-fuchsia-300/40",
      pillBorder: "border-fuchsia-200",
      metric: "text-fuchsia-600",
      glow: "bg-fuchsia-400/25",
      glowPos: "-right-8 -top-8",
    },
    {
      cardBorder: "border-emerald-300/40",
      pillBorder: "border-emerald-200",
      metric: "text-emerald-600",
      glow: "bg-emerald-400/25",
      glowPos: "-right-8 -bottom-8",
    },
  ];

  return (
    <section id="featured" className="relative pt-20 pb-8">
      <SectionGlow variant="blue" drift={34} />
      <SectionScrollFx distance={28} rotate={-0.4} scale={1.015} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.featuredApps.eyebrow}
          title={siteContent.featuredApps.title}
          desc={siteContent.featuredApps.desc}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {siteContent.featuredApps.items.map((item, index) => {
            const accent = accents[index % accents.length];
            return (
            <motion.div
              key={item.name}
              className={`relative overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.18)] ${accent.cardBorder}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                <span className={`rounded-full border bg-white px-3 py-1 text-xs text-slate-700 ${accent.pillBorder}`}>
                  {item.status}
                </span>
              </div>
              <div className="mt-4">
                <div className={`text-3xl font-semibold ${accent.metric}`}>{item.metricValue}</div>
                <div className="text-sm text-slate-600">{item.metricLabel}</div>
                <div className="mt-2 text-xs text-slate-500">{item.metricNote}</div>
              </div>
              <div
                className={`pointer-events-none absolute h-32 w-32 rounded-full blur-2xl ${accent.glowPos} ${accent.glow}`}
              />
            </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <ButtonLink to="/apps" variant="ghost" className="directory-cta-ghost">
            {siteContent.featuredApps.cta}
          </ButtonLink>
        </div>
      </SectionScrollFx>
    </section>
  );
}
