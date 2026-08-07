import { copyFile, mkdir } from "node:fs/promises";

const outputRoot = new globalThis.URL("../dist/", import.meta.url);
const rsvpDirectory = new globalThis.URL("rsvp/", outputRoot);

await mkdir(rsvpDirectory, { recursive: true });
await copyFile(
  new globalThis.URL("index.html", outputRoot),
  new globalThis.URL("index.html", rsvpDirectory),
);
