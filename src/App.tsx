import { Navigate, Route, Routes } from "react-router-dom";
import { BabyShowerDetails } from "./components/BabyShowerDetails";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { NoteCard } from "./components/NoteCard";
import { RegistryCard } from "./components/RegistryCard";
import { siteConfig } from "./config/site";

interface BabyHickamPageProps {
  isRsvpPage?: boolean;
}

function BabyHickamPage({ isRsvpPage = false }: BabyHickamPageProps) {
  return (
    <>
      <main>
        <Hero config={siteConfig} />
        {isRsvpPage ? (
          <BabyShowerDetails config={siteConfig} />
        ) : (
          <section
            className="details-section"
            aria-label="Baby Hickam information"
          >
            <div className="card-grid card-grid--two">
              <RegistryCard
                copy={siteConfig.copy.registry}
                url={siteConfig.registryUrl}
              />
              <NoteCard copy={siteConfig.copy.note} />
            </div>
          </section>
        )}
      </main>
      <Footer parents={siteConfig.parents} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BabyHickamPage />} />
      <Route
        path="/rsvp"
        element={
          siteConfig.babyShower.enabled ? (
            <BabyHickamPage isRsvpPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
