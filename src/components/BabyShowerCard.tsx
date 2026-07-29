import type { SiteConfig } from "../config/site";
import { formatEventDate } from "../utils/dueDate";
import { getSafeExternalUrl } from "../utils/rsvp";
import { Icon } from "./Icon";
import { InformationCard } from "./InformationCard";

interface BabyShowerCardProps {
  shower: SiteConfig["babyShower"];
  copy: string;
}

export function BabyShowerCard({ shower, copy }: BabyShowerCardProps) {
  const safeUrl = getSafeExternalUrl(shower.rsvpUrl, "babyShower.rsvpUrl");
  const location = shower.location.replace(/\\n/g, "\n");
  const locationLines = location.split("\n");

  return (
    <InformationCard
      accent="coral"
      icon={<Icon name="calendar" />}
      title="Baby Shower Celebration"
      action={
        safeUrl ? (
          <a
            className="button button--coral"
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="heart" />
            RSVP Here
          </a>
        ) : undefined
      }
    >
      <p className="shower-copy">{copy}</p>
      <dl className="event-list">
        <div>
          <dt>
            <Icon name="calendar" />
            <span className="sr-only">Date</span>
          </dt>
          <dd>{formatEventDate(shower.date)}</dd>
        </div>
        <div>
          <dt>
            <Icon name="clock" />
            <span className="sr-only">Time</span>
          </dt>
          <dd>{shower.time}</dd>
        </div>
        <div>
          <dt>
            <Icon name="location" />
            <span className="sr-only">Location</span>
          </dt>
          <dd className="event-location">
            {locationLines.map((line, index) => {
              const boldLine = line.match(/^\*\*(.+)\*\*$/);
              const key = `${index}-${line}`;

              return boldLine ? (
                <strong key={key}>{boldLine[1]}</strong>
              ) : (
                <span key={key}>{line}</span>
              );
            })}
          </dd>
        </div>
      </dl>
    </InformationCard>
  );
}
