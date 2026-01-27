// Home section: featured builds.
import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import ButtonLink from "../components/ui/ButtonLink";
import { siteContent } from "../data/site";
import SectionGlow from "../components/effects/SectionGlow";
import SectionScrollFx from "../components/effects/SectionScrollFx";

export default function FeaturedAppsSection() {
  return (
    <section id="featured" className="relative pt-20">
      <SectionGlow variant="blue" drift={34} />
      <SectionScrollFx distance={28} rotate={-0.4} scale={1.015} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.featuredApps.eyebrow}
          title={siteContent.featuredApps.title}
          desc={siteContent.featuredApps.desc}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {siteContent.featuredApps.items.map((item, index) => (
            <motion.div
              key={item.name}
              className="relative rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.18)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs text-slate-700">
                  {item.status}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-semibold text-cyan-600">{item.metricValue}</div>
                <div className="text-sm text-slate-600">{item.metricLabel}</div>
                <div className="mt-2 text-xs text-slate-500">{item.metricNote}</div>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/25 blur-2xl" />
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <ButtonLink to="/apps" variant="ghost">
            {siteContent.featuredApps.cta}
          </ButtonLink>
        </div>
      </SectionScrollFx>
    </section>
  );
}
