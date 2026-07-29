interface FooterProps {
  parents: string[];
}

export function Footer({ parents }: FooterProps) {
  return (
    <footer className="footer">
      <p>Made with love by {parents.join(" & ")}</p>
    </footer>
  );
}
