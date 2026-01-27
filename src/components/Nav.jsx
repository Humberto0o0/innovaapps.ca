// Component: top navigation bar.
import { Wand2 } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeKey = useMemo(() => {
    if (location.hash) return location.hash;
    return location.pathname;
  }, [location.hash, location.pathname]);

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
    <nav className="sticky top-0 z-50" aria-label="Primary">
      <Container>
        <div
          className={cx(
            "relative mt-4 flex items-center justify-between rounded-3xl border bg-black/40 px-4 backdrop-blur transition-all",
            "border-cyan-300/30 shadow-[0_0_40px_rgba(56,189,248,0.16)]",
            isScrolled
              ? "py-2 shadow-[0_12px_40px_rgba(56,189,248,0.18)]"
              : "py-3"
          )}
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/60 bg-white/90 shadow-[0_0_14px_rgba(56,189,248,0.18)]">
              <Wand2 className="h-5 w-5 text-cyan-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-tight">{siteContent.brand.name}</div>
              <div className="text-xs text-white/60">{siteContent.brand.tagline}</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={cx(
                  "rounded-2xl px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  "text-slate-700 hover:bg-white/80 hover:text-slate-900",
                  activeKey === link.href || (isHome && activeKey === `/${link.href}`)
                    ? "bg-cyan-200 text-cyan-900 shadow-[0_0_12px_rgba(20,195,248,0.5)]"
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
              className="hidden items-center gap-2 rounded-2xl border border-cyan-300/50 bg-white/90 px-3 py-2 text-xs text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:inline-flex"
              aria-pressed={userReduce}
              onClick={() => setUserReduce(!userReduce)}
            >
              {reducedMotion ? "Motion off" : "Motion on"}
            </button>
            <span className="hidden h-6 w-px bg-slate-200/70 md:inline-flex" />
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let’s build
            </Button>
            <Button onClick={() => document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" })}>
              View apps
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
