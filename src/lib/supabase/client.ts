"use client";

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

export function createSupabaseBrowserClient() {
  const { anonKey } = getSupabasePublicConfig();

  return {
    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
      const response = await fetch(buildUrl(path, options.params), {
        method: options.method ?? "GET",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (!response.ok) {
        throw new Error(`Supabase request failed with status ${response.status}`);
      }

      return (await response.json()) as T;
    }
  };
}
