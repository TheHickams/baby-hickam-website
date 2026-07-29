export function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function ordinal(day: number): string {
  const tens = day % 100;
  if (tens >= 11 && tens <= 13) return `${day}th`;
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  return `${day}${suffixes[day % 10] ?? "th"}`;
}

export function formatDueDate(isoDate: string): string {
  const date = parseLocalDate(isoDate);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date,
  );
  return `${month} ${ordinal(date.getDate())}`;
}

export function formatMonthYear(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(parseLocalDate(isoDate));
}

export function formatEventDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parseLocalDate(isoDate));
}

export function isAfterDueDate(isoDate: string, today = new Date()): boolean {
  const dueDate = parseLocalDate(isoDate);
  const localToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return localToday > dueDate;
}

export function daysUntilDueDate(isoDate: string, today = new Date()): number {
  const dueDate = parseLocalDate(isoDate);
  const dueUtc = Date.UTC(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate(),
  );
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return Math.max(0, Math.round((dueUtc - todayUtc) / 86_400_000));
}
