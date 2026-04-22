import { getSupabasePublicConfig } from "@/lib/supabase/config";

type QueryValue = string | number | boolean | null | undefined;

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, QueryValue>;
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

export function createSupabasePublicClient() {
  return {
    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
      const { anonKey } = getSupabasePublicConfig();
      const response = await fetch(buildUrl(path, options.params), {
        method: options.method ?? "GET",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: "force-cache"
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Supabase public request failed (${response.status}): ${message}`);
      }

      if (response.status === 204) {
        return [] as T;
      }

      return (await response.json()) as T;
    }
  };
}
