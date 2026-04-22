"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="text-sm font-bold uppercase tracking-[0.14em] text-brand-navy sm:text-base">
            Ragos Valuers & Estate Agents
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-brand-slate transition hover:text-brand-blue">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/valuation" variant="primary">
              Request a Valuation
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-brand-navy lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>
      </Container>

      <div className={cn("border-t border-slate-200 bg-white lg:hidden", open ? "block" : "hidden")}>
        <Container className="py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-slate transition hover:text-brand-blue"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/valuation" className="mt-2 w-full" variant="primary">
              Request a Valuation
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}
