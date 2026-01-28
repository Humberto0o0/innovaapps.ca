// Home section: studio structure (work).
import { motion } from "framer-motion";
import SectionTitle from "../../components/ui/SectionTitle";
import { growPhases, siteContent, workFeatures } from "../../data/site";
import SectionGlow from "../../components/effects/SectionGlow";
import SectionScrollFx from "../../components/effects/SectionScrollFx";

export default function WorkSection() {
  return (
    <section id="work" className="relative pt-20">
      <SectionGlow variant="cyan" drift={22} />
      <SectionScrollFx distance={24} rotate={0.35} scale={1.01} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.work.eyebrow}
          title={siteContent.work.title}
          desc={siteContent.work.desc}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-cyan-300/40 bg-white p-6 lg:col-span-7 shadow-[0_0_40px_rgba(56,189,248,0.16)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-slate-900">{siteContent.work.hubTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {siteContent.work.hubDesc}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {workFeatures.map((x, index) => {
                const accents = [
                  "border-cyan-300/70",
                  "border-fuchsia-300/70",
                  "border-emerald-300/70",
                  "border-blue-300/70",
                ];
                const border = accents[index % accents.length];

                return (
                  <motion.div
                    key={x}
                    className={`rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-600 transition ${border}`}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    {x}
                  </motion.div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-cyan-400/28 blur-3xl" />
          </motion.div>

          <motion.div
            className="relative rounded-3xl border border-cyan-300/40 bg-white p-6 lg:col-span-5 shadow-[0_0_40px_rgba(56,189,248,0.16)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <h3 className="text-lg font-semibold text-slate-900">{siteContent.work.growTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {siteContent.work.growDesc}
            </p>

            <div className="mt-5 space-y-3">
              {growPhases.map((r, index) => {
                const accents = [
                  { border: "border-cyan-300/70", text: "text-cyan-600" },
                  { border: "border-fuchsia-300/70", text: "text-fuchsia-600" },
                  { border: "border-emerald-300/70", text: "text-emerald-600" },
                ];
                const accent = accents[index % accents.length];

                return (
                <motion.div
                  key={r.k}
                  className={`flex items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3 transition ${accent.border}`}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <div className={`text-sm font-semibold ${accent.text}`}>{r.k}</div>
                  <div className="text-sm text-slate-600">{r.v}</div>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </SectionScrollFx>
    </section>
  );
}
