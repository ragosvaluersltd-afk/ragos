import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/supabase/admin-auth";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const session = await getAdminSession();

    if (!session) {
      redirect("/admin/login");
    }

    return <AdminShell email={session.email}>{children}</AdminShell>;
  } catch (error) {
    console.error("[admin-layout] Unable to resolve admin session; redirecting to login", error);
    redirect("/admin/login");
  }
}
