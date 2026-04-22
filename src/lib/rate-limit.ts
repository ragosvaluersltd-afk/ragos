const requestLog = new Map<string, number[]>();

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
};

export function applyRateLimit(key: string, limit = 8, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const requests = (requestLog.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

  if (requests.length >= limit) {
    requestLog.set(key, requests);
    return { allowed: false, remaining: 0 };
  }

  requests.push(now);
  requestLog.set(key, requests);

  return { allowed: true, remaining: limit - requests.length };
}
