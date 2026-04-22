import { cookies } from "next/headers";
import { getSupabasePublicConfig, getSupabaseServiceRoleKey } from "@/lib/supabase/config";

type QueryValue = string | number | boolean | null | undefined;

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, QueryValue>;
  useServiceRole?: boolean;
};

function buildUrl(path: string, params?: Record<string, QueryValue>) {
  const { url } = getSupabasePublicConfig();
  const endpoint = new URL(`/rest/v1/${path}`, url);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === null || value === undefined || value === "") continue;
    endpoint.searchParams.set(key, String(value));
  }

  return endpoint;
}

async function getAuthToken() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("sb-access-token")?.value;
  return tokenCookie ?? null;
}

export function createSupabaseServerClient() {
  return {
    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
      const { anonKey } = getSupabasePublicConfig();
      const authToken = options.useServiceRole ? getSupabaseServiceRoleKey() : (await getAuthToken()) ?? anonKey;
      const apiKey = options.useServiceRole ? getSupabaseServiceRoleKey() : anonKey;

      const response = await fetch(buildUrl(path, options.params), {
        method: options.method ?? "GET",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: "no-store"
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Supabase request failed (${response.status}): ${message}`);
      }

      if (response.status === 204) {
        return [] as T;
      }

      return (await response.json()) as T;
    }
  };
}
