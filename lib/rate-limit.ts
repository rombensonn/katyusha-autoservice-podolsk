type Hit = {
  count: number;
  resetAt: number;
};

const hits = new Map<string, Hit>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = hits.get(key);

  if (!current || current.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  hits.set(key, current);

  return current.count > limit;
}
