// Home section: stack and upgrades.
import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import { siteContent } from "../data/site";
import SectionGlow from "../components/effects/SectionGlow";
import SectionScrollFx from "../components/effects/SectionScrollFx";

export default function StackSection() {
  return (
    <section id="stack" className="relative overflow-hidden pt-20">
      <SectionGlow variant="fuchsia" drift={28} />
      <SectionScrollFx distance={20} rotate={0.25} skewX={0.5} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.stack.eyebrow}
          title={siteContent.stack.title}
          desc={siteContent.stack.desc}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_30px_rgba(56,189,248,0.12)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-slate-900">Animations included</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Sticky glass nav + subtle hover motion</li>
              <li>• Scroll progress bar</li>
              <li>• Hero parallax (scroll) + mouse glow (pointer)</li>
              <li>• Tilt cards with sheen overlay</li>
              <li>• In-view section reveals</li>
              <li>• Infinite marquee</li>
            </ul>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_30px_rgba(56,189,248,0.12)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <h3 className="text-lg font-semibold text-slate-900">Easy upgrades</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Replace tiles with real products</li>
              <li>• Add blog/docs route</li>
              <li>• Hook CTAs to email capture</li>
              <li>• Add dark/light theme toggle</li>
              <li>• Connect analytics + deployments</li>
              <li>• Turn cards into live demos</li>
            </ul>
          </motion.div>
        </div>
      </SectionScrollFx>
    </section>
  );
}
