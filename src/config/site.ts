import rawConfig from "./site.json";

export interface SiteConfig {
  babyName: string;
  parents: string[];
  dueDate: string;
  registryUrl: string;
  copy: {
    beforeDueDateMessage: string;
    afterDueDateMessage: string;
    registry: string;
    shower: string;
    note: string;
  };
  babyShower: {
    enabled: boolean;
    date: string;
    time: string;
    location: string;
    rsvpUrl: string;
  };
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function isValidIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !isoDatePattern.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function assertNonEmptyString(
  value: unknown,
  path: string,
): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`site.json: ${path} must be a non-empty string.`);
  }
}

function validateSiteConfig(value: unknown): asserts value is SiteConfig {
  if (!value || typeof value !== "object") {
    throw new Error("site.json must contain an object.");
  }

  const config = value as Record<string, unknown>;
  assertNonEmptyString(config.babyName, "babyName");

  if (
    !Array.isArray(config.parents) ||
    config.parents.length === 0 ||
    config.parents.some(
      (parent) => typeof parent !== "string" || parent.trim() === "",
    )
  ) {
    throw new Error("site.json: parents must be a non-empty array of names.");
  }

  if (!isValidIsoDate(config.dueDate)) {
    throw new Error(
      "site.json: dueDate must be a valid date in YYYY-MM-DD format.",
    );
  }

  if (typeof config.registryUrl !== "string") {
    throw new Error("site.json: registryUrl must be a string.");
  }

  if (!config.copy || typeof config.copy !== "object") {
    throw new Error("site.json: copy must be an object.");
  }
  const copy = config.copy as Record<string, unknown>;
  for (const key of [
    "beforeDueDateMessage",
    "afterDueDateMessage",
    "registry",
    "shower",
    "note",
  ]) {
    assertNonEmptyString(copy[key], `copy.${key}`);
  }

  if (!config.babyShower || typeof config.babyShower !== "object") {
    throw new Error("site.json: babyShower must be an object.");
  }
  const shower = config.babyShower as Record<string, unknown>;
  if (typeof shower.enabled !== "boolean") {
    throw new Error("site.json: babyShower.enabled must be true or false.");
  }
  if (!isValidIsoDate(shower.date)) {
    throw new Error(
      "site.json: babyShower.date must be a valid date in YYYY-MM-DD format.",
    );
  }
  assertNonEmptyString(shower.time, "babyShower.time");
  assertNonEmptyString(shower.location, "babyShower.location");
  if (typeof shower.rsvpUrl !== "string") {
    throw new Error("site.json: babyShower.rsvpUrl must be a string.");
  }
}

try {
  validateSiteConfig(rawConfig);
} catch (error) {
  if (import.meta.env.DEV) {
    console.error("Invalid Baby Hickam site configuration:", error);
  }
  throw error;
}

export const siteConfig: SiteConfig = rawConfig;
