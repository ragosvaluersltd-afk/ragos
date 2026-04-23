import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/supabase/admin-auth";

export default async function AdminLoginPage() {
  try {
    const session = await getAdminSession();

    if (session) {
      redirect("/admin/dashboard");
    }
  } catch (error) {
    console.error("[admin-login] Unable to resolve admin session; rendering login page", error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <AdminLoginForm />
    </div>
  );
}
