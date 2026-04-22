const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function requireEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getSupabasePublicConfig() {
  return {
    url: requireEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL),
    anonKey: requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", SUPABASE_ANON_KEY)
  };
}

export function getSupabaseServiceRoleKey() {
  return requireEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY);
}
