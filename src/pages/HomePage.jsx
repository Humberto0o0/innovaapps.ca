// Page: home layout and section ordering.
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import WorkSection from "../sections/WorkSection";
import StackSection from "../sections/StackSection";
import AppsSection from "../sections/AppsSection";
import ContactSection from "../sections/ContactSection";
import Footer from "../components/Footer";
import { useRafMouse } from "../hooks/useRafMouse";
import Container from "../components/layout/Container";
import FeaturedAppsSection from "../sections/FeaturedAppsSection";
import MotionGuideSection from "../sections/MotionGuideSection";
import SocialProofSection from "../sections/SocialProofSection";
import StorySection from "../sections/StorySection";
import ConversionSection from "../sections/ConversionSection";
import { useMotionSettings } from "../context/MotionSettings";

export default function HomePage() {
  const { reducedMotion } = useMotionSettings();
  const { x, y } = useRafMouse(!reducedMotion);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  return (
    <div className="min-h-screen text-white">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
        style={{ scaleX: progress }}
      />

      <Nav />
      <Hero x={x} y={y} />

      <main>
        <MotionConfig reducedMotion="always">
          <Container className="pb-24">
            <WorkSection />
            <FeaturedAppsSection />
            <StackSection />
            <MotionGuideSection />
            <AppsSection />
            <SocialProofSection />
            <StorySection />
            <ConversionSection />
            <ContactSection />
          </Container>
        </MotionConfig>
      </main>

      <Footer />
    </div>
  );
}
