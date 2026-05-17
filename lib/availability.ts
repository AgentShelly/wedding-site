import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { eachDayOfInterval, parseISO, format } from "date-fns";

const AVAILABILITY_DIR = join(process.cwd(), "content", "properties", "availability");

interface AvailabilityData {
  slug: string;
  blockedDates: string[]; // YYYY-MM-DD format
  source: string;
  lastUpdated: string;
}

async function readAvailability(slug: string): Promise<AvailabilityData> {
  const filePath = join(AVAILABILITY_DIR, `${slug}.json`);
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as AvailabilityData;
  } catch {
    // Return empty availability if file doesn't exist
    return {
      slug,
      blockedDates: [],
      source: "manual",
      lastUpdated: new Date().toISOString(),
    };
  }
}

async function writeAvailability(data: AvailabilityData): Promise<void> {
  const filePath = join(AVAILABILITY_DIR, `${data.slug}.json`);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * Check if a property is available for the given date range.
 * Returns true if no blocked dates overlap with the requested range.
 */
export async function isAvailable(
  slug: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const data = await readAvailability(slug);

  if (data.blockedDates.length === 0) return true;

  const blockedSet = new Set(data.blockedDates);

  // Get all dates in the requested range (excluding checkout date)
  const checkInDate = parseISO(checkIn);
  const checkOutDate = parseISO(checkOut);

  // The last night is the day before checkout
  const lastNight = new Date(checkOutDate);
  lastNight.setDate(lastNight.getDate() - 1);

  const requestedDates = eachDayOfInterval({
    start: checkInDate,
    end: lastNight,
  }).map((d) => format(d, "yyyy-MM-dd"));

  return !requestedDates.some((d) => blockedSet.has(d));
}

/**
 * Mark all dates in a range as booked (blocked).
 */
export async function markDatesBooked(
  slug: string,
  checkIn: string,
  checkOut: string
): Promise<void> {
  const data = await readAvailability(slug);

  const checkInDate = parseISO(checkIn);
  const checkOutDate = parseISO(checkOut);
  const lastNight = new Date(checkOutDate);
  lastNight.setDate(lastNight.getDate() - 1);

  const newDates = eachDayOfInterval({
    start: checkInDate,
    end: lastNight,
  }).map((d) => format(d, "yyyy-MM-dd"));

  const combined = Array.from(new Set([...data.blockedDates, ...newDates])).sort();

  await writeAvailability({
    ...data,
    blockedDates: combined,
    lastUpdated: new Date().toISOString(),
  });
}

/**
 * Get all blocked dates for a property.
 */
export async function getBlockedDates(slug: string): Promise<string[]> {
  const data = await readAvailability(slug);
  return data.blockedDates;
}

/**
 * Calculate the total cost for a booking.
 */
export function calculateTotal(
  pricePerNight: number,
  nights: number,
  cleaningFee: number
): {
  nightlyTotal: number;
  cleaningFee: number;
  total: number;
} {
  const nightlyTotal = pricePerNight * nights;
  const total = nightlyTotal + cleaningFee;
  return { nightlyTotal, cleaningFee, total };
}
