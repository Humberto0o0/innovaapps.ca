// Home section: motion guide.
import { motion } from "framer-motion";
import SectionTitle from "../../../components/ui/SectionTitle";
import { siteContent } from "../../../data/site";
import SectionGlow from "../../../components/effects/SectionGlow";
import SectionScrollFx from "../../../components/effects/SectionScrollFx";

export default function MotionGuideSection() {
  return (
    <section id="motion" className="section-band section-band--cyan relative overflow-hidden pt-20">
      <SectionGlow variant="cyan" drift={18} />
      <SectionScrollFx distance={18} rotate={-0.2} scale={1.01} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.motionGuide.eyebrow}
          title={siteContent.motionGuide.title}
          desc={siteContent.motionGuide.desc}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {siteContent.motionGuide.principles.map((item, index) => {
            const accents = [
              "border-cyan-300/60",
              "border-fuchsia-300/60",
              "border-emerald-300/60",
              "border-blue-300/60",
            ];
            const border = accents[index % accents.length];

            return (
              <motion.div
                key={item.title}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_0_30px_rgba(56,189,248,0.12)] ${border}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.6, delay: index * 0.06, type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tokens.map((token, tokenIndex) => {
                    const tones = [
                      "border-cyan-200/70 bg-cyan-50 text-cyan-700",
                      "border-fuchsia-200/70 bg-fuchsia-50 text-fuchsia-700",
                      "border-blue-200/70 bg-blue-50 text-blue-700",
                    ];
                    const tone = tones[tokenIndex % tones.length];

                    return (
                      <span
                        key={token}
                        className={`rounded-full border px-3 py-1 text-xs ${tone}`}
                      >
                        {token}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionScrollFx>
    </section>
  );
}
