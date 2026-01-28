// Component: top navigation bar.
import { Menu, Moon, Sun, Wand2, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Button from "./ui/Button";
import Container from "./layout/Container";
import { navLinks, siteContent } from "../data/site";
import { useMotionSettings } from "../context/MotionSettings";
import { cx } from "../utils/cx";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { reducedMotion, userReduce, setUserReduce } = useMotionSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("theme");
    if (stored) return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sectionLinks = navLinks.filter((link) => link.type === "section");
    const targets = sectionLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter(Boolean);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        setActiveSection(`#${visible[0].target.id}`);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.35, 0.6] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const activeKey = useMemo(() => {
    if (isHome) {
      if (!isScrolled) return "/";
      if (activeSection) return activeSection;
      if (location.hash) return location.hash;
      return location.pathname;
    }
    return location.pathname;
  }, [activeSection, isHome, isScrolled, location.hash, location.pathname]);

  const handleSectionClick = (e, href) => {
    if (href === "/" && isHome) {
      e.preventDefault();
      if (location.hash) {
        navigate("/", { replace: true });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!isHome || !href.startsWith("#")) return;
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="h-24 sm:h-28" aria-hidden="true" />
      <nav className="fixed top-0 left-0 right-0 z-50" aria-label="Primary">
        <Container>
          <div
            className={cx(
              "nav-surface relative flex items-center justify-between rounded-3xl border bg-black/40 px-4 backdrop-blur transition-all duration-300",
              "border-cyan-300/30 shadow-[0_0_40px_rgba(56,189,248,0.16)]",
              isScrolled
                ? "mt-0 translate-y-0 py-2 shadow-[0_12px_40px_rgba(56,189,248,0.18)]"
                : "mt-4 translate-y-2 py-3"
            )}
          >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          <div className="flex items-center gap-3">
            <div className="nav-brand flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/60 bg-white/90 shadow-[0_0_14px_rgba(56,189,248,0.18)]">
              <Wand2 className="h-5 w-5 text-cyan-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-tight">{siteContent.brand.name}</div>
              <div className="text-xs text-white/60">{siteContent.brand.tagline}</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={cx(
                  "nav-link rounded-2xl px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  "text-slate-700 hover:bg-white/80 hover:text-slate-900",
                  activeKey === link.href || (isHome && activeKey === `/${link.href}`)
                    ? "nav-link-active bg-cyan-200 text-cyan-900 shadow-[0_0_12px_rgba(20,195,248,0.5)]"
                    : "bg-transparent"
                )}
                to={link.type === "section" ? `/${link.href}` : link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="nav-pill hidden items-center gap-2 rounded-2xl border border-cyan-300/50 bg-white/90 px-3 py-2 text-xs text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:inline-flex"
              aria-pressed={userReduce}
              onClick={() => setUserReduce(!userReduce)}
            >
              {reducedMotion ? "Motion off" : "Motion on"}
            </button>
            <button
              type="button"
              className="nav-pill inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/50 bg-white/90 text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="nav-pill inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/50 bg-white/90 text-[10px] font-semibold text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden"
              aria-pressed={userReduce}
              aria-label={reducedMotion ? "Enable motion" : "Disable motion"}
              onClick={() => setUserReduce(!userReduce)}
            >
              {reducedMotion ? "Off" : "On"}
            </button>
            <span className="nav-divider hidden h-6 w-px bg-slate-200/70 lg:inline-flex" />
            <Button
              variant="ghost"
              className="nav-cta-ghost hidden lg:inline-flex"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let’s build
            </Button>
            <Button
              className="hidden lg:inline-flex"
              onClick={() => document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" })}
            >
              View apps
            </Button>
            <button
              type="button"
              className="nav-pill inline-flex items-center justify-center rounded-2xl border border-cyan-300/50 bg-white/90 p-2 text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={cx(
            "nav-mobile-surface overflow-hidden rounded-3xl border border-cyan-300/30 bg-white/90 shadow-[0_0_30px_rgba(56,189,248,0.12)] backdrop-blur transition-all duration-200 lg:hidden",
            isMenuOpen
              ? "mt-3 max-h-[480px] opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={cx(
                  "nav-mobile-link rounded-2xl px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  "text-slate-700 hover:bg-white/80 hover:text-slate-900",
                  activeKey === link.href || (isHome && activeKey === `/${link.href}`)
                    ? "nav-mobile-active bg-cyan-200 text-cyan-900 shadow-[0_0_12px_rgba(20,195,248,0.5)]"
                    : "bg-transparent"
                )}
                to={link.type === "section" ? `/${link.href}` : link.href}
                onClick={(e) => {
                  handleSectionClick(e, link.href);
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              className="nav-mobile-pill mt-2 inline-flex items-center justify-between gap-2 rounded-2xl border border-cyan-300/50 bg-white/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-pressed={userReduce}
              onClick={() => setUserReduce(!userReduce)}
            >
              {reducedMotion ? "Motion off" : "Motion on"}
              <span className="text-[10px] uppercase tracking-wide text-slate-500">Toggle</span>
            </button>

            <div className="mt-2 grid gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
              >
                View apps
              </Button>
              <Button
                variant="ghost"
                className="nav-cta-ghost w-full"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
              >
                Let’s build
              </Button>
            </div>
          </div>
        </div>
        </Container>
      </nav>
    </>
  );
}
