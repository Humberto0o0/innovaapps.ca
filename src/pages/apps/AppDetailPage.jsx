// Page: app detail view.
import { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Container from "../../components/layout/Container";
import ButtonLink from "../../components/ui/ButtonLink";
import AuroraGlow from "../../components/effects/AuroraGlow";
import FloatingOrbs from "../../components/effects/FloatingOrbs";
import HoloBackdrop from "../../components/effects/HoloBackdrop";
import SectionGlow from "../../components/effects/SectionGlow";
import { useMotionSettings } from "../../context/MotionSettings";
import { useRafMouse } from "../../hooks/useRafMouse";
import oneShot from "../../assets/one.png";
import twoShot from "../../assets/two.png";
import threeShot from "../../assets/three.png";
import slideOne from "../../assets/mpr.jpeg";
import slideTwo from "../../assets/mpr2.jpeg";
import slideThree from "../../assets/mpr3.jpeg";
import slideFour from "../../assets/mpr5.jpeg";
import slideFive from "../../assets/mpr6.jpeg";
import routineLogo from "../../assets/LOGO-ROUTINE.png";
import { appTiles } from "../../data/site";

export default function AppDetailPage() {
  const { slug } = useParams();
  const app = useMemo(() => appTiles.find((item) => item.slug === slug), [slug]);
  const { reducedMotion } = useMotionSettings();
  const { x, y } = useRafMouse(!reducedMotion);
  const carouselRef = useRef(null);
  const rotateRef = useRef(0);
  const carouselIndexRef = useRef(0);

  const fadeUp = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { once: true, amount: 0.25 },
  };

  const floatA = reducedMotion
    ? {}
    : {
        animate: { y: [0, -14, 0] },
        transition: { duration: 9, repeat: Infinity, ease: "easeInOut" },
      };
  const floatB = reducedMotion
    ? {}
    : {
        animate: { y: [0, 12, 0] },
        transition: { duration: 11, repeat: Infinity, ease: "easeInOut" },
      };
  const floatC = reducedMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
      };

  if (!app) {
    return (
      <div className="min-h-screen text-white">
        <Nav />
        <Container className="py-24">
          <h1 className="text-3xl font-semibold">App not found</h1>
          <p className="mt-3 text-white/70">The app you’re looking for isn’t in the directory yet.</p>
          <div className="mt-6">
            <Link className="text-cyan-300 hover:text-cyan-200" to="/apps">
              Back to directory
            </Link>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (app.slug === "my-perfect-routine") {
    const highlights = [
      {
        title: "Guided morning flow",
        desc: "Timed steps, affirmations, and gratitude prompts that keep the experience focused and achievable.",
        image: oneShot,
      },
      {
        title: "Calm completion loops",
        desc: "Built around small wins that compound into consistency without creating pressure or noise.",
        image: twoShot,
      },
      {
        title: "Evening wind-down",
        desc: "A gentle close to the day with reflection cues and intentional transitions.",
        image: threeShot,
      },
    ];

    const carousel = [
      {
        title: "Start your day with intention",
        caption: "Meditation to ground your focus.",
        image: slideOne,
      },
      {
        title: "Guided morning flow",
        caption: "A routine built for calm, focus, and clarity.",
        image: slideTwo,
      },
      {
        title: "Daily affirmations",
        caption: "Small prompts that build confidence.",
        image: slideThree,
      },
      {
        title: "Small gratitude, big impact",
        caption: "Reflection that feels achievable.",
        image: slideFour,
      },
      {
        title: "Finish your morning grounded",
        caption: "A gentle close that keeps the pace human.",
        image: slideFive,
      },
    ];

    const step = 360 / carousel.length;

    const applyIndex = (nextIndex) => {
      const el = carouselRef.current;
      if (!el) return;
      carouselIndexRef.current = nextIndex;
      rotateRef.current = -nextIndex * step;
      el.style.setProperty("--mpr-rotate", `${rotateRef.current}deg`);
    };

    const goNext = () => applyIndex(carouselIndexRef.current + 1);
    const goPrev = () => applyIndex(carouselIndexRef.current - 1);

    useEffect(() => {
      applyIndex(0);
    }, []);

    useEffect(() => {
      if (reducedMotion) return undefined;
      const timer = setInterval(() => {
        goNext();
      }, 4600);
      return () => clearInterval(timer);
    }, [reducedMotion]);

    useEffect(() => {
      const sources = [oneShot, twoShot, threeShot, slideOne];
      const links = sources.map((href) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = href;
        document.head.appendChild(link);
        return link;
      });

      return () => {
        links.forEach((link) => {
          if (link.parentNode) link.parentNode.removeChild(link);
        });
      };
    }, []);


    return (
      <div className="min-h-screen text-white">
        <Nav />
        <main className="relative overflow-hidden">
          <section className="relative overflow-hidden pb-20 pt-14">
            <AuroraGlow />
            <HoloBackdrop vignette={false} />
            <FloatingOrbs x={x} y={y} />
            <Container className="relative z-10">
              <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div {...fadeUp}>
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-cyan-700/80">
                    <span className="mpr-chip border-cyan-300/90 bg-white/90 text-slate-600 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]">Live</span>
                    <span className="mpr-chip border-cyan-300/90 bg-white/90 text-slate-600 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]">App Store</span>
                    <span className="mpr-chip border-cyan-300/90 bg-white/90 text-slate-600 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]">Web</span>
                  </div>
                  <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                    My Perfect Routine
                    <span className="block text-2xl font-medium text-slate-600 sm:text-3xl">
                      A habit-building app designed for real life, created and engineered end-to-end by the InnovaApps
                      team.
                    </span>
                  </h1>
                  <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
                    My Perfect Routine is a guided daily routine app built to help people start and end their day with
                    intention, clarity, and consistency. It combines behavioral design, thoughtful UX, and solid
                    engineering into a calm experience that users actually stick with.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <ButtonLink href="https://apps.apple.com/ca/app/my-perfect-routine/id6757348904" external className="mpr-glow">
                      View on App Store
                    </ButtonLink>
                    <ButtonLink
                      href="https://myperfectroutine.com"
                      external
                      variant="ghost"
                      className="border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    >
                      Explore website
                    </ButtonLink>
                  </div>
                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        value: "8 min",
                        label: "Average routine flow",
                      },
                      {
                        value: "Calm",
                        label: "Motion-first UI system",
                      },
                      {
                        value: "100%",
                        label: "Designed + built in-house",
                      },
                    ].map((stat) => (
                      <div key={stat.label} className="mpr-glass text-slate-900">
                        <div className="text-lg font-semibold text-slate-900">{stat.value}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="relative flex h-[420px] items-center justify-center sm:h-[520px]">
                  <motion.img
                    {...floatA}
                    src={oneShot}
                    alt="My Perfect Routine interface view"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    className="absolute right-2 top-2 w-[62%] max-w-[320px] rounded-[28px]"
                  />
                  <motion.img
                    {...floatB}
                    src={twoShot}
                    alt="My Perfect Routine routine screen"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    className="absolute left-1 top-14 w-[54%] max-w-[280px] -rotate-6 rounded-[28px] opacity-100"
                  />
                  <motion.img
                    {...floatC}
                    src={threeShot}
                    alt="My Perfect Routine evening flow"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    className="absolute bottom-[-28px] right-10 w-[78%] max-w-[420px] rotate-6 rounded-[28px] opacity-100"
                  />
                </div>
              </div>
            </Container>
          </section>

          <section className="relative py-20">
            <SectionGlow variant="blue" />
            <Container className="relative z-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <motion.div
                  {...fadeUp}
                  className="mpr-day-card mpr-day-card--fuchsia rounded-3xl border border-fuchsia-200/70 bg-white p-6 shadow-[0_0_40px_rgba(217,70,239,0.12)]"
                >
                  <h2 className="text-2xl font-semibold text-slate-900">Why We Built It</h2>
                  <p className="mt-4 text-slate-600">
                    Like many people, we struggled with consistency more than motivation. Most productivity and habit
                    apps are either too complex, too generic, or abandoned after a few days. We wanted to build something
                    different: an app that feels human instead of demanding. Something that guides instead of
                    overwhelms.
                  </p>
                  <img
                    src={routineLogo}
                    alt="My Perfect Routine logo"
                    className="mt-6 h-20 w-auto rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
                <motion.div
                  {...fadeUp}
                  className="mpr-day-card mpr-day-card--cyan rounded-3xl border border-cyan-200/70 bg-white p-6 shadow-[0_0_40px_rgba(56,189,248,0.12)]"
                >
                  <h2 className="text-2xl font-semibold text-slate-900">What the App Does</h2>
                  <p className="mt-4 text-slate-600">
                    My Perfect Routine guides users through structured daily routines using small, intentional steps
                    instead of rigid schedules. The experience focuses on completion, flow, and calm rather than
                    pressure.
                  </p>
                  <ul className="mt-6 grid gap-3 text-sm text-slate-600">
                    <li className="mpr-day-pill mpr-day-pill--cyan rounded-2xl border border-cyan-200/70 bg-white px-4 py-3">Timed steps with steady pacing</li>
                    <li className="mpr-day-pill mpr-day-pill--blue rounded-2xl border border-blue-200/70 bg-white px-4 py-3">Affirmations aligned with daily focus</li>
                    <li className="mpr-day-pill mpr-day-pill--fuchsia rounded-2xl border border-fuchsia-200/70 bg-white px-4 py-3">Gratitude prompts that encourage reflection</li>
                    <li className="mpr-day-pill mpr-day-pill--emerald rounded-2xl border border-emerald-200/70 bg-white px-4 py-3">Gentle transitions that keep attention grounded</li>
                  </ul>
                </motion.div>
              </div>
            </Container>
          </section>

          <section className="relative py-16">
            <SectionGlow variant="cyan" />
            <Container className="relative z-10">
              <motion.div {...fadeUp} className="mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-700">Storyboard</p>
                    <h2 className="mt-3 text-2xl font-semibold">Scroll through the full routine arc</h2>
                    <p className="mt-3 max-w-xl text-white/70">
                      A 3D carousel that mirrors the real flow inside the app—from intention to reflection.
                    </p>
                  </div>
                  <div className="mpr-chip">Scroll →</div>
                </div>
              </motion.div>
              <div ref={carouselRef} className="mpr-3d-carousel" role="group" aria-label="3D perspective card carousel">
                <div className="mpr-3d-grid holo-grid" aria-hidden="true" />
                <div className="mpr-3d-haze" aria-hidden="true" />
                <div className="mpr-3d-ground" aria-hidden="true" />
                <div
                  className="mpr-3d-track"
                  style={{
                    "--mpr-count": carousel.length,
                    "--mpr-radius": "300px",
                  }}
                >
                  {carousel.map((item, index) => (
                    <div key={item.title} className="mpr-3d-item" style={{ "--mpr-index": index }}>
                      <div className="mpr-3d-card">
                        <div className="mpr-3d-media">
                          <img src={item.image} alt={item.title} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mpr-3d-controls">
                  <button type="button" className="mpr-3d-arrow" onClick={goPrev} aria-label="Previous card">
                    ‹
                  </button>
                  <button type="button" className="mpr-3d-arrow" onClick={goNext} aria-label="Next card">
                    ›
                  </button>
                </div>
              </div>
            </Container>
          </section>

          <section className="relative py-16">
            <SectionGlow variant="fuchsia" />
            <Container className="relative z-10">
              <motion.div {...fadeUp} className="mpr-glass">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <h2 className="text-2xl font-semibold">Product and Technical Design</h2>
                    <p className="mt-4 text-white/70">
                      From the beginning, the app was designed with long-term maintainability and performance in mind.
                      The routine system is modular and expandable. State management for timers and steps is clean and
                      predictable. The architecture supports subscriptions and future feature growth without adding
                      unnecessary complexity.
                    </p>
                    <p className="mt-4 text-white/70">
                      On the UX side, motion design is intentional and subtle. Typography and spacing reduce cognitive
                      load. Feedback is immediate but never distracting. The goal is for the technology to disappear so
                      the habit can form naturally.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Modular routine engine",
                      "Predictable timer state",
                      "Subscription-ready architecture",
                      "Motion-first UI system",
                      "Low-cognitive-load typography",
                    ].map((item, index) => {
                      const tones = [
                        "mpr-day-pill--cyan border-cyan-200/70",
                        "mpr-day-pill--blue border-blue-200/70",
                        "mpr-day-pill--fuchsia border-fuchsia-200/70",
                        "mpr-day-pill--emerald border-emerald-200/70",
                      ];
                      const tone = tones[index % tones.length];

                      return (
                        <div
                          key={item}
                          className={`mpr-day-pill ${tone} rounded-2xl border bg-white px-4 py-3 text-sm text-slate-600`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </Container>
          </section>

          <section className="relative py-16">
            <SectionGlow variant="cyan" />
            <Container className="relative z-10">
              <div className="grid gap-8 lg:grid-cols-3">
                {highlights.map((item, index) => {
                  const overlays = [
                    "from-cyan-500/30 via-blue-500/20 to-transparent",
                    "from-fuchsia-500/30 via-purple-500/20 to-transparent",
                    "from-emerald-500/30 via-teal-500/20 to-transparent",
                  ];
                  const overlay = overlays[index % overlays.length];

                  return (
                    <motion.div
                      {...fadeUp}
                      key={item.title}
                      className="mpr-glass overflow-hidden"
                      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 ease-out hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${overlay}`} />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-3 text-sm text-white/70">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Container>
          </section>

          <section className="relative py-16">
            <SectionGlow variant="blue" />
            <Container className="relative z-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <motion.div {...fadeUp} className="mpr-glass">
                  <h2 className="text-2xl font-semibold">Built Entirely by Our Team</h2>
                  <p className="mt-4 text-white/70">
                    My Perfect Routine was fully designed and developed by the InnovaApps team. This includes product
                    strategy, UX and UI design, front-end logic, animations, copywriting, testing, iteration, and App
                    Store deployment.
                  </p>
                  <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    {[
                      "Product strategy",
                      "UX/UI design",
                      "Front-end engineering",
                      "Motion design",
                      "Copywriting",
                      "Testing + iteration",
                    ].map((item, index) => {
                      const tones = [
                        "mpr-day-pill--cyan border-cyan-200/70",
                        "mpr-day-pill--blue border-blue-200/70",
                        "mpr-day-pill--fuchsia border-fuchsia-200/70",
                        "mpr-day-pill--emerald border-emerald-200/70",
                      ];
                      const tone = tones[index % tones.length];

                      return (
                        <div
                          key={item}
                          className={`mpr-day-pill ${tone} rounded-2xl border bg-white px-4 py-3`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
                <motion.div {...fadeUp} className="mpr-glass">
                  <h2 className="text-2xl font-semibold">Available on Web and App Store</h2>
                  <p className="mt-4 text-white/70">
                    The website at https://myperfectroutine.com allows users to explore the concept, understand the
                    product, and follow updates. The iOS app is designed specifically for iPhone, where daily routines
                    naturally live. It supports in-app purchases and is optimized for mobile performance and battery
                    usage.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href="https://apps.apple.com/ca/app/my-perfect-routine/id6757348904" external className="mpr-glow">
                      Open App Store
                    </ButtonLink>
                    <ButtonLink
                      href="https://myperfectroutine.com"
                      external
                      variant="ghost"
                      className="mpr-ghost-btn border border-white/25 bg-white/10 text-white hover:bg-white/20"
                    >
                      Visit the web app
                    </ButtonLink>
                  </div>
                </motion.div>
              </div>
            </Container>
          </section>

          <section className="relative py-16">
            <SectionGlow variant="fuchsia" />
            <Container className="relative z-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <motion.div {...fadeUp} className="mpr-glass">
                  <h2 className="text-2xl font-semibold">Why It Engages Users</h2>
                  <p className="mt-4 text-white/70">
                    Engagement in My Perfect Routine comes from reducing friction rather than adding features. The app
                    respects attention, minimizes decision fatigue, and rewards completion without guilt or pressure.
                  </p>
                  <p className="mt-4 text-white/70">
                    Users do not feel like they are managing a system. They feel like they are finishing something
                    meaningful. This emotional response is what keeps people coming back.
                  </p>
                </motion.div>
                <motion.div {...fadeUp} className="mpr-glass">
                  <h2 className="text-2xl font-semibold">Part of the InnovaApps Studio</h2>
                  <p className="mt-4 text-white/70">
                    My Perfect Routine is one of the flagship products developed under InnovaApps. It represents how
                    we approach product creation through intentional design, solid engineering, and a focus on solving
                    real human problems.
                  </p>
                  <p className="mt-4 text-white/70">Everything we build follows this same mindset.</p>
                </motion.div>
              </div>
            </Container>
          </section>

          <section className="relative pb-24 pt-12">
            <SectionGlow variant="cyan" />
            <Container className="relative z-10">
              <motion.div
                {...fadeUp}
                className="mpr-glass flex flex-col gap-6 border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10"
              >
                <div>
                  <h2 className="text-2xl font-semibold">What Comes Next</h2>
                  <p className="mt-4 text-white/70">
                    The app continues to evolve with new routine modules, deeper personalization, long-term programs,
                    and smarter habit reinforcement. Development is intentional and paced to ensure quality and clarity
                    remain at the core of the experience.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <span className="mpr-chip">Built slowly</span>
                  <span className="mpr-chip">Built properly</span>
                  <span className="mpr-chip">Built to last</span>
                </div>
              </motion.div>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main>
        <Container className="pb-24 pt-16">
          <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 shadow-[0_0_40px_rgba(56,189,248,0.12)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-cyan-200/70">{app.status}</div>
                <h1 className="mt-2 text-3xl font-semibold">
                  <span className="bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
                    {app.name}
                  </span>
                </h1>
                {app.tagline && <p className="mt-3 text-white/70">{app.tagline}</p>}
              </div>
              {app.url ? (
                <ButtonLink href={app.url} external>
                  Visit site
                </ButtonLink>
              ) : (
                <ButtonLink to="/apps" variant="ghost">
                  Back to directory
                </ButtonLink>
              )}
            </div>

            <p className="mt-6 text-sm text-white/70">{app.description}</p>

            {app.features?.length ? (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-white">Key features</h2>
                <ul className="mt-3 grid gap-2 text-sm text-white/70 md:grid-cols-2">
                  {app.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-2xl border border-cyan-400/20 bg-black/30 px-4 py-3"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-8 text-sm text-white/60">
            <Link className="text-cyan-300 hover:text-cyan-200" to="/apps">
              ← Back to directory
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
