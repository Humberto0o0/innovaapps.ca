// Page: app detail view.
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Container from "../components/layout/Container";
import ButtonLink from "../components/ui/ButtonLink";
import { appTiles } from "../data/site";

export default function AppDetailPage() {
  const { slug } = useParams();
  const app = useMemo(() => appTiles.find((item) => item.slug === slug), [slug]);

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
