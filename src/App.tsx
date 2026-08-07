import { Navigate, Route, Routes } from "react-router-dom";
import { BabyShowerCard } from "./components/BabyShowerCard";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { NoteCard } from "./components/NoteCard";
import { RegistryCard } from "./components/RegistryCard";
import { siteConfig } from "./config/site";

interface BabyHickamPageProps {
  showShower: boolean;
}

function BabyHickamPage({ showShower }: BabyHickamPageProps) {
  return (
    <>
      <main>
        <Hero config={siteConfig} />
        <section
          className="details-section"
          aria-label="Baby Hickam information"
        >
          <div className={`card-grid${showShower ? "" : " card-grid--two"}`}>
            <RegistryCard
              copy={siteConfig.copy.registry}
              url={siteConfig.registryUrl}
            />
            {showShower && (
              <BabyShowerCard
                shower={siteConfig.babyShower}
                copy={siteConfig.copy.shower}
              />
            )}
            <NoteCard copy={siteConfig.copy.note} />
          </div>
        </section>
      </main>
      <Footer parents={siteConfig.parents} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BabyHickamPage showShower={false} />} />
      <Route
        path="/rsvp"
        element={<BabyHickamPage showShower={siteConfig.babyShower.enabled} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
