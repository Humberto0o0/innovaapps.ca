// Home section: conversion/CTA panel.
import { motion } from "framer-motion";
import SectionTitle from "../../../components/ui/SectionTitle";
import Button from "../../../components/ui/Button";
import ButtonLink from "../../../components/ui/ButtonLink";
import { siteContent } from "../../../data/site";
import SectionGlow from "../../../components/effects/SectionGlow";
import SectionScrollFx from "../../../components/effects/SectionScrollFx";

export default function ConversionSection() {
  return (
    <section id="cta" className="section-band section-band--fuchsia relative overflow-hidden pt-20">
      <SectionGlow variant="blue" drift={20} />
      <SectionScrollFx distance={18} rotate={-0.3} scale={1.01} enabled={false}>
        <SectionTitle
          eyebrow={siteContent.conversion.eyebrow}
          title={siteContent.conversion.title}
          desc={siteContent.conversion.desc}
        />

        <motion.div
          className="mt-10 rounded-3xl border border-cyan-300/40 bg-white p-6 shadow-[0_0_30px_rgba(56,189,248,0.12)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{siteContent.conversion.panelTitle}</h3>
              <p className="mt-2 text-sm text-slate-700">{siteContent.conversion.panelDesc}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                className="directory-cta-ghost"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {siteContent.conversion.ctaPrimary}
              </Button>
              <ButtonLink to="/apps" variant="ghost" className="directory-cta-ghost">
                {siteContent.conversion.ctaSecondary}
              </ButtonLink>
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {siteContent.conversion.ctaTertiary}
              </Button>
            </div>
          </div>
        </motion.div>
      </SectionScrollFx>
    </section>
  );
}
