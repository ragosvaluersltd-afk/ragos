import { NextResponse } from "next/server";
import { deleteAdminProperty, updateAdminProperty } from "@/lib/supabase/admin-queries";
import { getAdminSession } from "@/lib/supabase/admin-auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const property = await updateAdminProperty(id, body);
    return NextResponse.json({ property });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update property" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteAdminProperty(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to delete property" }, { status: 400 });
  }
}
