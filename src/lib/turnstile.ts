import "server-only";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileVerifyResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
};

export function isTurnstileEnabled(): boolean {
  return !!TURNSTILE_SECRET_KEY;
}

export async function verifyTurnstile(
  token: string
): Promise<{ success: boolean }> {
  if (!TURNSTILE_SECRET_KEY) {
    return { success: true };
  }

  if (!token) {
    return { success: false };
  }

  try {
    const response = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data: TurnstileVerifyResponse = await response.json();

    return { success: data.success };
  } catch {
    return { success: false };
  }
}
