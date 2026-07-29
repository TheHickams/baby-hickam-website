import { getSafeExternalUrl } from "../utils/rsvp";
import { Icon } from "./Icon";
import { InformationCard } from "./InformationCard";

interface RegistryCardProps {
  copy: string;
  url: string;
}

export function RegistryCard({ copy, url }: RegistryCardProps) {
  const safeUrl = getSafeExternalUrl(url, "registryUrl");

  return (
    <InformationCard
      accent="teal"
      icon={<Icon name="gift" />}
      title="Registry"
      action={
        safeUrl ? (
          <a
            className="button button--teal"
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="gift" />
            View Our Registry
          </a>
        ) : undefined
      }
    >
      <p>{copy}</p>
    </InformationCard>
  );
}
