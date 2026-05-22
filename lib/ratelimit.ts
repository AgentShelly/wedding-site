/**
 * Rate limiting wrapper.
 *
 * Uses Upstash Redis when the env vars are available.
 * Falls back to an in-memory store (not suitable for multi-instance production,
 * but works fine for development and single-instance deploys).
 */

interface RatelimitOptions {
  requests: number;
  window: "1m" | "10m" | "1h" | "24h";
}

interface RatelimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

// In-memory fallback store (development only)
const memoryStore = new Map<string, { count: number; resetAt: number }>();

function windowToMs(window: RatelimitOptions["window"]): number {
  const map: Record<string, number> = {
    "1m": 60_000,
    "10m": 600_000,
    "1h": 3_600_000,
    "24h": 86_400_000,
  };
  return map[window] ?? 3_600_000;
}

async function ratelimitUpstash(
  key: string,
  options: RatelimitOptions
): Promise<RatelimitResult> {
  // Dynamic import to avoid errors when Upstash is not configured
  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const windowMap: Record<
      string,
      Parameters<typeof Ratelimit.slidingWindow>[1]
    > = {
      "1m": "1 m",
      "10m": "10 m",
      "1h": "1 h",
      "24h": "24 h",
    };

    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(options.requests, windowMap[options.window] ?? "1 h"),
    });

    const result = await limiter.limit(key);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch {
    // If Upstash fails, fall through to memory store
    return ratelimitMemory(key, options);
  }
}

function ratelimitMemory(
  key: string,
  options: RatelimitOptions
): RatelimitResult {
  const now = Date.now();
  const windowMs = windowToMs(options.window);
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: options.requests - 1, reset: now + windowMs };
  }

  if (entry.count >= options.requests) {
    return { success: false, remaining: 0, reset: entry.resetAt };
  }

  entry.count++;
  return {
    success: true,
    remaining: options.requests - entry.count,
    reset: entry.resetAt,
  };
}

export async function ratelimit(
  identifier: string,
  action: string,
  options: RatelimitOptions
): Promise<RatelimitResult> {
  const key = `ratelimit:${action}:${identifier}`;

  const hasUpstash =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

  if (hasUpstash) {
    return ratelimitUpstash(key, options);
  }

  return ratelimitMemory(key, options);
}
