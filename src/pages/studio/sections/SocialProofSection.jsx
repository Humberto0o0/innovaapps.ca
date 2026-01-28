// Home section: social proof.
import { motion } from "framer-motion";
import SectionTitle from "../../../components/ui/SectionTitle";
import { siteContent } from "../../../data/site";
import SectionGlow from "../../../components/effects/SectionGlow";
import SectionScrollFx from "../../../components/effects/SectionScrollFx";

export default function SocialProofSection() {
  return (
    <section id="proof" className="section-band section-band--emerald relative pt-20">
      <SectionGlow variant="fuchsia" drift={36} />
      <SectionScrollFx distance={26} rotate={-0.35} skewY={0.45} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.socialProof.eyebrow}
          title={siteContent.socialProof.title}
          desc={siteContent.socialProof.desc}
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {siteContent.socialProof.logos.map((logo) => (
            <span
              key={logo}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-widest text-slate-700"
            >
              {logo}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {siteContent.socialProof.testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              className="rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.16)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <p className="text-sm text-slate-600">“{item.quote}”</p>
              <div className="mt-4 text-sm font-semibold text-slate-900">{item.name}</div>
              <div className="text-xs text-slate-500">{item.role}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {siteContent.socialProof.caseStudies.map((study) => (
            <div
              key={study.title}
              className="rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.12)]"
            >
              <div className="text-sm font-semibold text-slate-900">{study.title}</div>
              <div className="mt-2 text-2xl font-semibold text-cyan-600">{study.metric}</div>
              <p className="mt-2 text-sm text-slate-600">{study.summary}</p>
            </div>
          ))}
        </div>
      </SectionScrollFx>
    </section>
  );
}
