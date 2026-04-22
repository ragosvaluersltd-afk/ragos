export function isSpamSubmission(payload: Record<string, unknown>) {
  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";
  const startedAt = Number(payload.formStartedAt ?? 0);
  const tookTooFast = Number.isFinite(startedAt) ? Date.now() - startedAt < 1500 : false;

  return Boolean(honeypot) || tookTooFast;
}
