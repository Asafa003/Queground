import type { Event } from "@/types";

export function isEventEnded(event: Event): boolean {
  if (!event.endsAt) return false;
  return Date.now() >= new Date(event.endsAt).getTime();
}
