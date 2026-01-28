// Page: apps directory listing.
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Container from "../../components/layout/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import AppTiles from "../../components/AppTiles";
import { siteContent } from "../../data/site";

export default function DirectoryPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main>
        <Container className="pb-24 pt-16">
          <SectionTitle
            eyebrow="App directory"
            title="Explore the Innova ecosystem"
            desc={siteContent.apps.desc}
          />

          <div className="mt-10">
            <AppTiles variant="detailed" />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
