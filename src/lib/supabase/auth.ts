import { cookies } from "next/headers";
import { getSupabasePublicConfig, getSupabaseServiceRoleKey } from "@/lib/supabase/config";
import { ProfileRow } from "@/types/supabase";

type AuthUser = {
  id: string;
  email?: string;
};

export async function getAuthenticatedUser() {
  const { url, anonKey } = getSupabasePublicConfig();
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  if (!token) {
    return null;
  }

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AuthUser;
}

export async function getProfileById(userId: string) {
  const { url } = getSupabasePublicConfig();
  const response = await fetch(`${url}/rest/v1/profiles?select=*&id=eq.${encodeURIComponent(userId)}&limit=1`, {
    headers: {
      apikey: getSupabaseServiceRoleKey(),
      Authorization: `Bearer ${getSupabaseServiceRoleKey()}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to fetch profile");
  }

  const rows = (await response.json()) as ProfileRow[];
  return rows[0] ?? null;
}

export async function isAdmin(userId: string) {
  const profile = await getProfileById(userId);
  return profile?.role === "admin";
}
