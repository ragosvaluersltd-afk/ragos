"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/site";
import { contactDetails } from "@/data/contact";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="hidden border-b border-white/10 bg-brand-navy text-slate-100 lg:block">
        <Container className="flex h-10 items-center justify-between text-xs">
          <p className="font-medium tracking-[0.08em] text-slate-300">Trusted valuation and real estate advisory in Kenya since 2005</p>
          <div className="flex items-center gap-5">
            <a href={contactDetails.valuationPhoneHref} className="transition hover:text-brand-orange">Valuation: {contactDetails.valuationPhoneDisplay}</a>
            <a href={contactDetails.inquiriesPhoneHref} className="transition hover:text-brand-orange">Inquiries: {contactDetails.inquiriesPhoneDisplay}</a>
            <a href={contactDetails.emailHref} className="transition hover:text-brand-orange">{contactDetails.email}</a>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-24 items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-4" onClick={() => setOpen(false)}>
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-brand-blue/25 bg-white shadow-sm">
              <Image src="/images/logo.svg" alt="Ragos Valuers logo" fill priority className="object-contain p-1.5" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-navy">Ragos Valuers</p>
              <p className="text-xs font-medium tracking-[0.08em] text-brand-slate transition group-hover:text-brand-blue">Estate Agents & Advisory</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-brand-slate transition hover:text-brand-blue">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/valuation" variant="primary" className="px-6 py-3">
              Request Valuation
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-brand-navy lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      <div className={cn("border-t border-slate-200 bg-white lg:hidden", open ? "block" : "hidden")}>
        <Container className="space-y-4 py-5">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-brand-slate transition hover:bg-brand-mist hover:text-brand-blue"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="rounded-xl border border-slate-200 bg-brand-mist/70 p-4 text-xs text-brand-slate">
            <p><span className="font-semibold text-brand-navy">Valuation:</span> {contactDetails.valuationPhoneDisplay}</p>
            <p className="mt-1"><span className="font-semibold text-brand-navy">Inquiries:</span> {contactDetails.inquiriesPhoneDisplay}</p>
            <p className="mt-1 break-all"><span className="font-semibold text-brand-navy">Email:</span> {contactDetails.email}</p>
          </div>
          <Button href="/valuation" className="w-full" variant="primary">
            Request a Valuation
          </Button>
        </Container>
      </div>
    </header>
  );
}
