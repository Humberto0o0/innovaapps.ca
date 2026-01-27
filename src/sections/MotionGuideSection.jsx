// Home section: motion guide.
import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import { siteContent } from "../data/site";
import SectionGlow from "../components/effects/SectionGlow";
import SectionScrollFx from "../components/effects/SectionScrollFx";

export default function MotionGuideSection() {
  return (
    <section id="motion" className="relative overflow-hidden pt-20">
      <SectionGlow variant="cyan" drift={18} />
      <SectionScrollFx distance={18} rotate={-0.2} scale={1.01} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.motionGuide.eyebrow}
          title={siteContent.motionGuide.title}
          desc={siteContent.motionGuide.desc}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {siteContent.motionGuide.principles.map((item, index) => (
            <motion.div
              key={item.title}
              className="rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_30px_rgba(56,189,248,0.12)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tokens.map((token) => (
                  <span
                    key={token}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionScrollFx>
    </section>
  );
}
