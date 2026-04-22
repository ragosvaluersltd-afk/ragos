"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/valuation-requests", label: "Valuation Requests" },
  { href: "/admin/contacts", label: "Contacts" }
];

export function AdminShell({ children, email }: { children: ReactNode; email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-64 rounded-2xl border border-slate-200 bg-white p-4 md:block">
          <h2 className="px-3 text-base font-bold text-brand-navy">Ragos Admin</h2>
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium",
                  pathname.startsWith(item.href) ? "bg-brand-blue text-white" : "text-slate-700 hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm text-slate-600">Signed in as <span className="font-semibold text-brand-navy">{email}</span></p>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-brand-navy disabled:opacity-60"
            >
              {isLoggingOut ? "Signing out..." : "Logout"}
            </button>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
