import { NextResponse } from "next/server";
import { createValuationSubmission } from "@/lib/supabase/form-submissions";
import { validateValuationPayload } from "@/lib/validation/forms";

export async function POST(request: Request) {
  try {
    const payload = validateValuationPayload(await request.json());
    await createValuationSubmission(payload);

    return NextResponse.json({ success: true, message: "Valuation request submitted." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit valuation request";
    const status = message.includes("required") || message.includes("valid") ? 400 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}
