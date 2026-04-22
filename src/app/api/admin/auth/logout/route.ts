import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  ["sb-access-token", "sb-refresh-token", "admin-role", "admin-user-id", "admin-email"].forEach((key) => {
    response.cookies.set(key, "", { path: "/", expires: new Date(0) });
  });

  return response;
}
