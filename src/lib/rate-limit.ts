// Simple in-memory rate limiter for auth endpoints
const attempts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10; // 10 attempts per window

/**
 * Check if the key is rate-limited WITHOUT incrementing the counter.
 * Use `incrementRateLimit` separately on failure.
 */
export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  return { allowed: true, retryAfterMs: 0 };
}

/**
 * Increment the rate-limit counter for the given key. Call on failure only.
 */
export function incrementRateLimit(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count++;
  }
}

// Periodic cleanup to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of attempts) {
      if (now > entry.resetAt) {
        attempts.delete(key);
      }
    }
  }, 60_000);
}
