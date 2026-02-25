/**
 * Date helpers: local timezone, dd.mm.yyyy format, no past dates.
 * All use the user's local date (no UTC) so "today" is correct everywhere.
 */

/** Format a Date as local YYYY-MM-DD (for input type="date" and min attributes). */
function toLocalISOString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Today's date in local timezone, YYYY-MM-DD. */
export function todayISO(): string {
  return toLocalISOString(new Date());
}

/**
 * Add days to an ISO date string (YYYY-MM-DD). Handles month/year overflow.
 * Uses local timezone for parsing and formatting.
 */
export function addDaysISO(iso: string, days: number): string {
  if (!iso) return todayISO();
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return toLocalISOString(date);
}

/** Format ISO (YYYY-MM-DD) as dd.mm.yyyy for display. */
export function formatISOToDDMMYYYY(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/** Format ISO (YYYY-MM-DD) as dd.mm for display (no year). */
export function formatISOToDDMM(iso: string): string {
  if (!iso) return "";
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
}

/** Default range: check-in today, check-out today + 3 days. */
export function getDefaultCheckInCheckOut(): { checkIn: string; checkOut: string } {
  const checkIn = todayISO();
  return { checkIn, checkOut: addDaysISO(checkIn, 3) };
}
