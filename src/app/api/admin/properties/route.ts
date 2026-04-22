import { NextResponse } from "next/server";
import { createAdminProperty } from "@/lib/supabase/admin-queries";
import { getAdminSession } from "@/lib/supabase/admin-auth";

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const property = await createAdminProperty(body);
    return NextResponse.json({ property });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create property" }, { status: 400 });
  }
}
