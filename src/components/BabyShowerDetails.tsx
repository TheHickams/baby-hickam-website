import { useEffect, useRef, useState } from "react";
import type { SiteConfig } from "../config/site";
import { formatEventDate } from "../utils/dueDate";
import { getSafeExternalUrl } from "../utils/externalUrl";
import { Icon } from "./Icon";

interface BabyShowerDetailsProps {
  config: SiteConfig;
}

export function BabyShowerDetails({ config }: BabyShowerDetailsProps) {
  const detailsRef = useRef<HTMLElement>(null);
  const [detailsReached, setDetailsReached] = useState(false);
  const { babyShower, registryUrl } = config;
  const safeRsvpUrl = getSafeExternalUrl(
    babyShower.rsvpUrl,
    "babyShower.rsvpUrl",
  );
  const safeRegistryUrl = getSafeExternalUrl(registryUrl, "registryUrl");
  const locationLines = babyShower.location.replace(/\\n/g, "\n").split("\n");

  useEffect(() => {
    const updateJumpVisibility = () => {
      const detailsTop = detailsRef.current?.getBoundingClientRect().top;
      if (detailsTop === undefined) return;

      const hideAt = Math.max(140, window.innerHeight * 0.28);
      setDetailsReached((current) => {
        const next = detailsTop <= hideAt;
        return current === next ? current : next;
      });
    };

    updateJumpVisibility();
    window.addEventListener("scroll", updateJumpVisibility, { passive: true });
    window.addEventListener("resize", updateJumpVisibility);

    return () => {
      window.removeEventListener("scroll", updateJumpVisibility);
      window.removeEventListener("resize", updateJumpVisibility);
    };
  }, []);

  return (
    <>
      <a
        className={`shower-details-jump${detailsReached ? " shower-details-jump--hidden" : ""}`}
        href="#baby-shower-details"
        aria-hidden={detailsReached}
        tabIndex={detailsReached ? -1 : undefined}
      >
        <span>Baby Shower Details</span>
        <Icon name="arrowDown" />
      </a>

      <section
        className="shower-details"
        id="baby-shower-details"
        aria-labelledby="shower-details-title"
        ref={detailsRef}
      >
        <div className="shower-details__intro">
          <p className="shower-details__eyebrow">Come celebrate with us</p>
          <h2 id="shower-details-title">A sweet day to celebrate</h2>
          <p>{babyShower.details.welcome}</p>
        </div>

        <article className="shower-invitation" aria-label="Baby shower event">
          <div className="shower-invitation__heading">
            <span className="shower-invitation__icon" aria-hidden="true">
              <Icon name="calendar" />
            </span>
            <div>
              <p>Baby Shower Celebration</p>
              <h3>{formatEventDate(babyShower.date)}</h3>
            </div>
          </div>

          <dl className="shower-invitation__facts">
            <div>
              <dt>
                <Icon name="clock" />
                Time
              </dt>
              <dd>{babyShower.time}</dd>
            </div>
            <div>
              <dt>
                <Icon name="location" />
                Location
              </dt>
              <dd>
                {locationLines.map((line, index) => (
                  <span key={`${index}-${line}`}>{line}</span>
                ))}
              </dd>
            </div>
          </dl>

          {safeRsvpUrl && (
            <a
              className="button button--coral shower-invitation__rsvp"
              href={safeRsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="heart" />
              RSVP Here
            </a>
          )}
        </article>

        <div className="shower-notes" aria-label="What to know">
          <article className="shower-note shower-note--refreshments">
            <span className="shower-note__icon" aria-hidden="true">
              <Icon name="sparkles" />
            </span>
            <p className="shower-note__number">01</p>
            <h3>Come hungry</h3>
            <p>{babyShower.details.refreshments}</p>
          </article>

          <article className="shower-note shower-note--gifts">
            <span className="shower-note__icon" aria-hidden="true">
              <Icon name="gift" />
            </span>
            <p className="shower-note__number">02</p>
            <h3>Gifts &amp; registry</h3>
            <p>{babyShower.details.gifts}</p>
            <p className="shower-note__aside">{babyShower.details.clothing}</p>
            {safeRegistryUrl && (
              <a
                className="shower-note__link"
                href={safeRegistryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View our registry <span aria-hidden="true">→</span>
              </a>
            )}
          </article>

          <article className="shower-note shower-note--books">
            <span className="shower-note__icon" aria-hidden="true">
              <Icon name="book" />
            </span>
            <p className="shower-note__number">03</p>
            <h3>A book instead of a card</h3>
            <p>{babyShower.details.books}</p>
          </article>

          <article className="shower-note shower-note--diapers">
            <span className="shower-note__icon" aria-hidden="true">
              <Icon name="ticket" />
            </span>
            <p className="shower-note__number">04</p>
            <h3>Diaper raffle</h3>
            <p>{babyShower.details.diaperRaffle}</p>
            <p className="shower-note__aside">
              Preferred brand: <strong>Freestyle</strong>
              <br />
              Available at Walmart, Target &amp; Amazon
            </p>
          </article>
        </div>

        <div className="shower-details__closing">
          <span aria-hidden="true">♥</span>
          <p>We can’t wait to celebrate with you!</p>
        </div>
      </section>
    </>
  );
}
