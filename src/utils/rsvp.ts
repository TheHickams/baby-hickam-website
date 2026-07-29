export function hasRsvpAccess(search: string): boolean {
  return new URLSearchParams(search).has("rsvp");
}

export function getSafeExternalUrl(
  value: string,
  label: string,
): string | null {
  if (!value.trim()) return null;

  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    // A warning below gives editors a clear, actionable message in development.
  }

  if (import.meta.env.DEV) {
    console.error(
      `site.json: ${label} must be a valid http(s) URL. The link is hidden.`,
    );
  }
  return null;
}
