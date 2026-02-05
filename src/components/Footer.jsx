// Component: site footer.
import { Link, useLocation } from "react-router-dom";
import Container from "./layout/Container";
import { navLinks, siteContent } from "../data/site";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleSectionClick = (e, href) => {
    if (!isHome || !href.startsWith("#")) return;
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/40">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -top-20 right-20 h-36 w-36 rounded-full bg-fuchsia-400/15 blur-3xl" />
      <Container className="py-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-white">
              <span className="brand-gradient bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                {siteContent.brand.name}
              </span>
            </div>
            <div className="mt-1 text-xs text-white/60">
              © {new Date().getFullYear()} • {siteContent.footer.note}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:shadow-[0_0_14px_rgba(56,189,248,0.18)]"
                to={link.type === "section" ? `/${link.href}` : link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
