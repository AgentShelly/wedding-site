/**
 * iCal import script.
 *
 * Usage: pnpm import-ical [propertySlug] [icalUrl]
 *
 * Or set ICAL_BASE_URL in .env and provide just the slug:
 *   pnpm import-ical romantic-maya-lun-nirvana abc123.ics
 *
 * This script:
 * 1. Fetches the iCal file from the URL
 * 2. Parses VEVENT entries to extract blocked dates
 * 3. Merges with existing availability JSON
 * 4. Writes the updated JSON back to disk
 */

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { eachDayOfInterval, parseISO, format, isValid } from "date-fns";

const AVAILABILITY_DIR = join(
  process.cwd(),
  "content",
  "properties",
  "availability"
);

interface AvailabilityData {
  slug: string;
  blockedDates: string[];
  source: string;
  lastUpdated: string;
}

interface CalEvent {
  uid: string;
  dtstart: string;
  dtend: string;
  summary?: string;
}

/**
 * Parse a simple iCal file — handles VEVENT blocks with DTSTART and DTEND.
 */
function parseIcal(content: string): CalEvent[] {
  const events: CalEvent[] = [];
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  let inEvent = false;
  let current: Partial<CalEvent> = {};

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      current = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (current.dtstart && current.dtend && current.uid) {
        events.push(current as CalEvent);
      }
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).split(";")[0].toUpperCase();
    const value = line.slice(colonIndex + 1).trim();

    if (key === "UID") current.uid = value;
    if (key === "DTSTART") current.dtstart = normalizeDate(value);
    if (key === "DTEND") current.dtend = normalizeDate(value);
    if (key === "SUMMARY") current.summary = value;
  }

  return events;
}

/**
 * Normalize iCal date format (YYYYMMDD or YYYYMMDDTHHMMSSZ) to YYYY-MM-DD.
 */
function normalizeDate(value: string): string {
  // Strip time component
  const dateOnly = value.replace(/T.*$/, "");
  if (dateOnly.length === 8) {
    return `${dateOnly.slice(0, 4)}-${dateOnly.slice(4, 6)}-${dateOnly.slice(6, 8)}`;
  }
  return dateOnly;
}

/**
 * Get all dates between start and end (exclusive of end).
 */
function getDatesInRange(dtstart: string, dtend: string): string[] {
  const start = parseISO(dtstart);
  const end = parseISO(dtend);

  if (!isValid(start) || !isValid(end)) return [];

  // End date is typically checkout day — don't block it
  const lastNight = new Date(end);
  lastNight.setDate(lastNight.getDate() - 1);

  if (start > lastNight) return [format(start, "yyyy-MM-dd")];

  return eachDayOfInterval({ start, end: lastNight }).map((d) =>
    format(d, "yyyy-MM-dd")
  );
}

async function importIcal(slug: string, url: string): Promise<void> {
  console.log(`\nImporting iCal for: ${slug}`);
  console.log(`URL: ${url}`);

  // Fetch iCal
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch iCal: HTTP ${response.status}`);
  }
  const content = await response.text();
  console.log(`  Fetched ${content.length} characters`);

  // Parse events
  const events = parseIcal(content);
  console.log(`  Found ${events.length} events`);

  // Extract blocked dates
  const blockedSet = new Set<string>();
  for (const event of events) {
    const dates = getDatesInRange(event.dtstart, event.dtend);
    dates.forEach((d) => blockedSet.add(d));
  }

  // Load existing availability
  const filePath = join(AVAILABILITY_DIR, `${slug}.json`);
  let existing: AvailabilityData;
  try {
    const raw = await readFile(filePath, "utf-8");
    existing = JSON.parse(raw) as AvailabilityData;
  } catch {
    existing = {
      slug,
      blockedDates: [],
      source: "ical",
      lastUpdated: new Date().toISOString(),
    };
  }

  // Keep manually added dates, merge with iCal dates
  const manualDates = existing.source === "manual" ? existing.blockedDates : [];
  const combined = Array.from(
    new Set([...manualDates, ...Array.from(blockedSet)])
  ).sort();

  const updated: AvailabilityData = {
    slug,
    blockedDates: combined,
    source: "ical",
    lastUpdated: new Date().toISOString(),
  };

  await writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");
  console.log(`  ✓ Blocked ${combined.length} dates (${Array.from(blockedSet).length} from iCal)`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Import all properties that have ICAL_BASE_URL configured
    console.log("Usage: pnpm import-ical <slug> <ical-url>");
    console.log("       pnpm import-ical <slug>  (uses ICAL_BASE_URL env var)");
    process.exit(0);
  }

  const slug = args[0];
  let url = args[1];

  if (!url) {
    const base = process.env.ICAL_BASE_URL;
    if (!base) {
      console.error("No URL provided and ICAL_BASE_URL is not set");
      process.exit(1);
    }
    // TODO: Map slug to iCal URL suffix
    console.error("Please provide the full iCal URL as the second argument");
    process.exit(1);
  }

  try {
    await importIcal(slug, url);
    console.log("\n✅ Import complete!");
  } catch (err) {
    console.error("\n❌ Import failed:", err);
    process.exit(1);
  }
}

main();
