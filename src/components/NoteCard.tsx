import { Icon } from "./Icon";
import { InformationCard } from "./InformationCard";

interface NoteCardProps {
  copy: string;
}

export function NoteCard({ copy }: NoteCardProps) {
  return (
    <InformationCard accent="blue" icon={<Icon name="heart" />} title="A Note">
      <p>{copy}</p>
      <span className="note-heart" aria-hidden="true">
        ♥
      </span>
    </InformationCard>
  );
}
