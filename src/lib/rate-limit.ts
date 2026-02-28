const rateMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple in-memory rate limiter.
 * Returns true if the request should be BLOCKED.
 *
 * @param key - Unique identifier (e.g. IP address)
 * @param limit - Max requests allowed in the window
 * @param windowMs - Time window in milliseconds
 */
export function isRateLimited(
  key: string,
  limit: number = 10,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();

  // Inline cleanup of expired entries (max 50 per call to avoid slowdown)
  let cleaned = 0;
  for (const [k, entry] of rateMap) {
    if (now > entry.resetTime) {
      rateMap.delete(k);
      if (++cleaned >= 50) break;
    }
  }

  const entry = rateMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  entry.count++;
  if (entry.count > limit) {
    return true;
  }

  return false;
}
