// Home section: studio story.
import { motion } from "framer-motion";
import SectionTitle from "../../../components/ui/SectionTitle";
import { siteContent } from "../../../data/site";
import SectionGlow from "../../../components/effects/SectionGlow";
import SectionScrollFx from "../../../components/effects/SectionScrollFx";

export default function StorySection() {
  return (
    <section id="story" className="section-band section-band--cyan relative pt-20">
      <SectionGlow variant="cyan" drift={24} />
      <SectionScrollFx distance={20} rotate={0.25} scale={1.015} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.story.eyebrow}
          title={siteContent.story.title}
          desc={siteContent.story.desc}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-fuchsia-300/40 bg-white p-6 lg:col-span-7 shadow-[0_0_40px_rgba(56,189,248,0.16)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-slate-900">{siteContent.story.panelTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{siteContent.story.panelDesc}</p>
            <div className="mt-5 space-y-3">
              {siteContent.story.highlights.map((item, index) => {
                const accents = ["border-cyan-200", "border-fuchsia-200", "border-emerald-200"];
                const accent = accents[index % accents.length];

                return (
                  <motion.div
                    key={item.title}
                    className={`rounded-2xl border bg-slate-50 px-4 py-3 transition ${accent}`}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-600">{item.desc}</div>
                  </motion.div>
                );
              })}
            </div>
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
          </motion.div>

          <motion.div
            className="grid gap-4 lg:col-span-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            {siteContent.story.stats.map((stat, index) => {
              const accents = [
                { text: "text-cyan-600", border: "border-cyan-300/40" },
                { text: "text-fuchsia-600", border: "border-fuchsia-300/40" },
                { text: "text-emerald-600", border: "border-emerald-300/40" },
              ];
              const accent = accents[index % accents.length];

              return (
              <motion.div
                key={stat.label}
                className={`rounded-3xl border bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.16)] ${accent.border}`}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className={`text-lg font-semibold ${accent.text}`}>{stat.label}</div>
                {stat.desc ? (
                  <div className="mt-2 text-xs text-slate-500">{stat.desc}</div>
                ) : null}
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </SectionScrollFx>
    </section>
  );
}
