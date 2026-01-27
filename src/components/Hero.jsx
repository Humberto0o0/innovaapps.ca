// Component: hero/studio section with background effects.
import { motion, useScroll, useTransform } from "framer-motion";
import HoloBackdrop from "./effects/HoloBackdrop";
import FloatingOrbs from "./effects/FloatingOrbs";
import MouseGlow from "./effects/MouseGlow";
import NoiseOverlay from "./effects/NoiseOverlay";
import AuroraGlow from "./effects/AuroraGlow";
import Button from "./ui/Button";
import Pill from "./ui/Pill";
import TiltCard from "./cards/TiltCard";
import Marquee from "./Marquee";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Container from "./layout/Container";
import { heroCards, heroPills, marqueeWords, siteContent } from "../data/site";
import { useMotionSettings } from "../context/MotionSettings";

const LazyThreeBackground = lazy(() => import("./effects/ThreeBackground"));

export default function Hero({ x, y }) {
  const { reducedMotion } = useMotionSettings();
  const heroRef = useRef(null);
  const [canRenderThree, setCanRenderThree] = useState(false);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? 0 : 140]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, reducedMotion ? 1 : 0.25]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(min-width: 900px)");
    const handleChange = () => setCanRenderThree(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <header ref={heroRef} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
      <AuroraGlow />
      {siteContent.background?.mode === "three" && !reducedMotion && canRenderThree ? (
        <Suspense fallback={null}>
          <LazyThreeBackground x={x} y={y} />
        </Suspense>
      ) : (
        <HoloBackdrop />
      )}
      {!reducedMotion && <FloatingOrbs x={x} y={y} />}
      {!reducedMotion && <MouseGlow x={x} y={y} />}
      <NoiseOverlay />

      <Container className="pb-20 pt-14 sm:pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {heroPills.map(({ Icon, label }, index) => (
              <Pill key={label}>
                <Icon
                  className={`h-4 w-4 ${index % 2 === 0 ? "text-cyan-500" : "text-fuchsia-500"}`}
                />
                <span>{label}</span>
              </Pill>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
            className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl"
          >
            {siteContent.hero.title ? <span>{siteContent.hero.title} </span> : null}
            {siteContent.hero.accent ? (
              <span className="text-cyan-600 drop-shadow-[0_0_18px_rgba(14,116,144,0.75)]">
                {siteContent.hero.accent}
              </span>
            ) : null}
            {siteContent.hero.tail ? <span> {siteContent.hero.tail}</span> : null}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {siteContent.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
              {siteContent.hero.ctaPrimary}
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" })}>
              {siteContent.hero.ctaSecondary}
            </Button>
          </motion.div>

          <div className="mt-12 grid w-full gap-4 md:grid-cols-3">
            {heroCards.map((card) => (
              <TiltCard
                key={card.title}
                icon={card.Icon}
                title={card.title}
                desc={card.desc}
                tag={card.tag}
                tone={card.tone}
              />
            ))}
          </div>

          <div className="mt-6 w-full">
            <Marquee words={marqueeWords} />
          </div>
        </div>
        </motion.div>
      </Container>
    </header>
  );
}
