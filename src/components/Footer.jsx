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
    <footer className="border-t border-white/10 bg-black/40">
      <Container className="py-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-white">{siteContent.brand.name}</div>
            <div className="mt-1 text-xs text-white/60">
              © {new Date().getFullYear()} • {siteContent.footer.note}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-white/70 hover:text-slate-900"
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
