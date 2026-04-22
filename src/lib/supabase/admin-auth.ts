import { cookies } from "next/headers";
import { getSupabasePublicConfig, getSupabaseServiceRoleKey } from "@/lib/supabase/config";
import { AdminSession } from "@/types/admin";
import { ProfileRow } from "@/types/supabase";

type AuthTokenResponse = {
  access_token: string;
  refresh_token: string;
  user: { id: string; email?: string };
};

async function getProfile(userId: string) {
  const { url } = getSupabasePublicConfig();
  const serviceRole = getSupabaseServiceRoleKey();

  const response = await fetch(`${url}/rest/v1/profiles?select=id,email,role&id=eq.${encodeURIComponent(userId)}&limit=1`, {
    headers: {
      apikey: serviceRole,
      Authorization: `Bearer ${serviceRole}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as Pick<ProfileRow, "id" | "email" | "role">[];
  return rows[0] ?? null;
}

export async function loginAdmin(email: string, password: string) {
  const { url, anonKey } = getSupabasePublicConfig();

  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password })
  });

  if (!response.ok) {
    throw new Error("Invalid login credentials");
  }

  const authData = (await response.json()) as AuthTokenResponse;
  const profile = await getProfile(authData.user.id);

  if (!profile || profile.role !== "admin") {
    throw new Error("This account is not authorized for admin access");
  }

  return {
    accessToken: authData.access_token,
    refreshToken: authData.refresh_token,
    user: {
      id: profile.id,
      email: profile.email,
      role: profile.role
    }
  };
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const role = cookieStore.get("admin-role")?.value;
  const userId = cookieStore.get("admin-user-id")?.value;
  const email = cookieStore.get("admin-email")?.value;

  if (role !== "admin" || !userId || !email) return null;

  return {
    id: userId,
    email,
    role: "admin"
  };
}
