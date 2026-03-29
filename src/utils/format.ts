export function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function formatDate(date: Date, month: "long" | "short" = "short"): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month, day: "numeric", timeZone: "UTC" });
}
