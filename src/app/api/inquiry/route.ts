import { NextResponse } from "next/server";
import { createInquirySubmission } from "@/lib/supabase/form-submissions";
import { applyRateLimit } from "@/lib/rate-limit";
import { isSpamSubmission } from "@/lib/spam-protection";
import { validateInquiryPayload } from "@/lib/validation/forms";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rateLimit = applyRateLimit(`inquiry:${ip}`);
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, message: "Too many submissions. Please try again shortly." }, { status: 429 });
    }

    const rawPayload = (await request.json()) as Record<string, unknown>;
    if (isSpamSubmission(rawPayload)) {
      return NextResponse.json({ success: true, message: "Property inquiry submitted." }, { status: 202 });
    }

    const payload = validateInquiryPayload(rawPayload);
    await createInquirySubmission(payload);

    return NextResponse.json({ success: true, message: "Property inquiry submitted." }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    const message = error instanceof Error ? error.message : "Unable to submit inquiry";
    const status = message.includes("required") || message.includes("valid") ? 400 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}
