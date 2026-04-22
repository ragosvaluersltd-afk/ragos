import { NextResponse } from "next/server";
import { createInquirySubmission } from "@/lib/supabase/form-submissions";
import { validateInquiryPayload } from "@/lib/validation/forms";

export async function POST(request: Request) {
  try {
    const payload = validateInquiryPayload(await request.json());
    await createInquirySubmission(payload);

    return NextResponse.json({ success: true, message: "Property inquiry submitted." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit inquiry";
    const status = message.includes("required") || message.includes("valid") ? 400 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}
