import type { ReactNode } from "react";

interface InformationCardProps {
  accent: "teal" | "coral" | "blue";
  icon: ReactNode;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  decorativeArtwork?: string;
}

export function InformationCard({
  accent,
  icon,
  title,
  children,
  action,
  decorativeArtwork,
}: InformationCardProps) {
  return (
    <article className={`info-card info-card--${accent}`}>
      <div className="info-card__icon">{icon}</div>
      <h2>{title}</h2>
      <div className="info-card__content">{children}</div>
      {action && <div className="info-card__action">{action}</div>}
      {decorativeArtwork && (
        <img
          className="info-card__art"
          src={`${import.meta.env.BASE_URL}assets/${decorativeArtwork}`}
          alt=""
          width="220"
          height="140"
          loading="lazy"
        />
      )}
    </article>
  );
}
