// Home section: stack and upgrades.
import { motion } from "framer-motion";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/ui/Button";
import { siteContent } from "../../data/site";
import SectionGlow from "../../components/effects/SectionGlow";
import SectionScrollFx from "../../components/effects/SectionScrollFx";

export default function StackSection() {
  return (
    <section id="stack" className="section-band section-band--fuchsia relative overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[45vw] bg-[radial-gradient(65%_80%_at_0%_18%,rgba(236,72,153,0.16),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[45vw] bg-[radial-gradient(65%_80%_at_100%_18%,rgba(244,114,182,0.16),transparent_70%)]" />
      <SectionGlow variant="fuchsia" drift={28} />
      <SectionScrollFx distance={20} rotate={0.25} skewX={0.5} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.stack.eyebrow}
          title={siteContent.stack.title}
          desc={siteContent.stack.desc}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-cyan-300/50 bg-white p-6 shadow-[0_0_30px_rgba(56,189,248,0.12)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 18 }}
          >
            <h3 className="text-lg font-semibold text-slate-900">Thoughtful UI behavior</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• DOM-driven interactions and state logic</li>
              <li>• AJAX-powered flows and async updates</li>
              <li>• Motion used to clarify, not decorate</li>
              <li>• Pointer, scroll, and view-based behavior</li>
              <li>• Performance-conscious UI patterns</li>
              <li>• Designed to scale with real usage</li>
            </ul>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-fuchsia-300/40 bg-white p-6 shadow-[0_0_30px_rgba(56,189,248,0.12)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.6, delay: 0.08, type: "spring", stiffness: 220, damping: 18 }}
          >
            <h3 className="text-lg font-semibold text-slate-900">Built to evolve</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Start simple, grow without rewrites</li>
              <li>• Modular features and extendable logic</li>
              <li>• Integrates APIs, services, and plugins</li>
              <li>• Production-ready patterns from day one</li>
              <li>• Supports refactors and migrations over time</li>
              <li>• Works across apps, plugins, and sites</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.18)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -4, scale: 1.005 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{siteContent.apps.ctaTitle}</h3>
              <p className="mt-2 text-sm text-slate-600">{siteContent.apps.ctaDesc}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="directory-cta-ghost"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {siteContent.apps.ctaSecondary}
              </Button>
              <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                {siteContent.apps.ctaPrimary}
              </Button>
            </div>
          </div>
        </motion.div>
      </SectionScrollFx>
    </section>
  );
}
