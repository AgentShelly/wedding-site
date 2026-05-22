/**
 * Cloudflare Turnstile server-side verification.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

interface TurnstileResponse {
  success: boolean;
  "error-codes": string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstile(
  token: string,
  remoteip?: string
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // In development/test mode, skip verification if secret key is not set
  if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] TURNSTILE_SECRET_KEY is not set in production");
      return false;
    }
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set, skipping verification in dev mode");
    return true;
  }

  // Cloudflare provides a test token that always succeeds
  if (token === "1x00000000000000000000AA") {
    return true;
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteip) {
      formData.append("remoteip", remoteip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("[turnstile] HTTP error:", response.status);
      return false;
    }

    const data = (await response.json()) as TurnstileResponse;
    if (!data.success) {
      console.warn("[turnstile] verification failed:", data["error-codes"]);
    }
    return data.success;
  } catch (error) {
    console.error("[turnstile] verification error:", error);
    return false;
  }
}
