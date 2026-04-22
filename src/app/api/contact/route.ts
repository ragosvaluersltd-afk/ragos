import { NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/supabase/form-submissions";
import { validateContactPayload } from "@/lib/validation/forms";

export async function POST(request: Request) {
  try {
    const payload = validateContactPayload(await request.json());
    await createContactSubmission(payload);

    return NextResponse.json({ success: true, message: "Contact inquiry received." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit contact inquiry";
    const status = message.includes("required") || message.includes("valid") ? 400 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}
