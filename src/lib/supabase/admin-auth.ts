import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { getAuthenticatedUser, getProfileById } from "@/lib/supabase/auth";
import { AdminSession } from "@/types/admin";

type AuthTokenResponse = {
  access_token: string;
  refresh_token: string;
  user: { id: string; email?: string };
};

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
  const profile = await getProfileById(authData.user.id);

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
  const user = await getAuthenticatedUser();

  if (!user) return null;

  const profile = await getProfileById(user.id);

  if (!profile || profile.role !== "admin" || !profile.email) {
    return null;
  }

  return {
    id: profile.id,
    email: profile.email,
    role: "admin"
  };
}
