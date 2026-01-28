// Home section: apps directory preview.
import { motion } from "framer-motion";
import SectionTitle from "../../components/ui/SectionTitle";
import AppTiles from "../../components/AppTiles";
import Button from "../../components/ui/Button";
import ButtonLink from "../../components/ui/ButtonLink";
import { siteContent } from "../../data/site";
import SectionGlow from "../../components/effects/SectionGlow";
import SectionScrollFx from "../../components/effects/SectionScrollFx";

export default function AppsSection() {
  return (
    <section id="apps" className="section-band section-band--blue relative pt-20">
      <SectionGlow variant="blue" drift={30} />
      <SectionScrollFx distance={22} rotate={0.3} scale={1.01} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.apps.eyebrow}
          title={siteContent.apps.title}
          desc={siteContent.apps.desc}
        />

        <div className="mt-10">
          <AppTiles limit={3} />
        </div>

        <div className="mt-6 flex justify-center">
          <ButtonLink to="/apps" variant="ghost" className="directory-cta-ghost">
            {siteContent.apps.ctaExplore}
          </ButtonLink>
        </div>

        <motion.div
          className="mt-10 rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.18)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
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
