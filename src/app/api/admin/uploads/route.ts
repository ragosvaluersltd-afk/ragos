import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/supabase/admin-auth";
import { uploadPropertyImage } from "@/lib/supabase/admin-queries";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.formData();
  const folder = (data.get("folder") as string) || "general";
  const files = data
    .getAll("files")
    .filter((item): item is File => item instanceof File && item.size > 0);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  try {
    const urls = await Promise.all(files.map((file) => uploadPropertyImage(file, folder)));
    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
