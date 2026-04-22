"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";
import { contactDetails } from "@/data/contact";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const filteredNavLinks = useMemo(
    () => navLinks.filter((link) => link.href !== "/" && link.label.toLowerCase() !== "home"),
    []
  );

  const makeHeaderSolid = !isHomePage || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        makeHeaderSolid
          ? "border-b border-slate-200/70 bg-white/95 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "hidden lg:block transition-all duration-300",
          makeHeaderSolid
            ? "border-b border-slate-200/70 bg-[#0d1430] text-slate-100"
            : "border-b border-white/10 bg-black/20 text-white backdrop-blur-md"
        )}
      >
        <Container className="flex h-10 items-center justify-between text-[11px]">
          <p className={cn("font-medium tracking-[0.16em] uppercase", makeHeaderSolid ? "text-slate-300" : "text-white/80")}>
            Professional valuation and real estate advisory since 2005
          </p>

          <div className="flex items-center gap-5">
            <a
              href={contactDetails.valuationPhoneHref}
              className={cn(
                "transition",
                makeHeaderSolid ? "hover:text-brand-orange text-slate-200" : "text-white/85 hover:text-white"
              )}
            >
              Valuation: {contactDetails.valuationPhoneDisplay}
            </a>
            <a
              href={contactDetails.inquiriesPhoneHref}
              className={cn(
                "transition",
                makeHeaderSolid ? "hover:text-brand-orange text-slate-200" : "text-white/85 hover:text-white"
              )}
            >
              Inquiries: {contactDetails.inquiriesPhoneDisplay}
            </a>
            <a
              href={contactDetails.emailHref}
              className={cn(
                "transition",
                makeHeaderSolid ? "hover:text-brand-orange text-slate-200" : "text-white/85 hover:text-white"
              )}
            >
              {contactDetails.email}
            </a>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-[84px] items-center justify-between gap-6 lg:h-[96px]">
          <Link href="/" className="group flex items-center gap-4" onClick={() => setOpen(false)}>
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl transition-all duration-300",
                makeHeaderSolid
                  ? "h-14 w-14 border border-brand-blue/15 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                  : "h-14 w-14 border border-white/20 bg-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.2)] backdrop-blur-md"
              )}
            >
              <Image
                src="/images/logo.png"
                alt="Ragos Valuers logo"
                fill
                priority
                className="object-contain p-2"
              />
            </div>

            <div className="min-w-0">
              <p
                className={cn(
                  "text-sm font-bold uppercase tracking-[0.16em] transition-colors duration-300 sm:text-base",
                  makeHeaderSolid ? "text-brand-navy" : "text-white"
                )}
              >
                Ragos
              </p>
              
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-semibold transition-colors duration-300 after:absolute after:left-0 after:top-[120%] after:h-[2px] after:w-0 after:rounded-full after:bg-brand-orange after:transition-all after:duration-300 hover:after:w-full",
                  makeHeaderSolid ? "text-brand-slate hover:text-brand-blue" : "text-white/85 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/valuation"
              variant="primary"
              className={cn(
                "px-6 py-3 text-sm shadow-[0_14px_30px_rgba(46,48,146,0.18)] transition-all duration-300",
                makeHeaderSolid
                  ? "bg-brand-blue text-white hover:bg-[#25277d]"
                  : "bg-white text-brand-blue hover:bg-brand-orange hover:text-brand-navy"
              )}
            >
              Request Valuation
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 lg:hidden",
              makeHeaderSolid
                ? "border border-slate-300 bg-white text-brand-navy shadow-sm"
                : "border border-white/20 bg-white/10 text-white backdrop-blur-md"
            )}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t transition-all duration-300 lg:hidden",
          open
            ? makeHeaderSolid
              ? "max-h-[520px] border-slate-200 bg-white"
              : "max-h-[520px] border-white/10 bg-[#0d1430]/95 backdrop-blur-xl"
            : "max-h-0 border-transparent"
        )}
      >
        <Container className="space-y-5 py-5">
          <nav className="flex flex-col gap-2">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm font-semibold transition",
                  makeHeaderSolid
                    ? "text-brand-slate hover:bg-brand-mist hover:text-brand-blue"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "rounded-2xl border p-4 text-xs",
              makeHeaderSolid
                ? "border-slate-200 bg-brand-mist/60 text-brand-slate"
                : "border-white/10 bg-white/10 text-white/85"
            )}
          >
            <p>
              <span className={cn("font-semibold", makeHeaderSolid ? "text-brand-navy" : "text-white")}>
                Valuation:
              </span>{" "}
              {contactDetails.valuationPhoneDisplay}
            </p>
            <p className="mt-2">
              <span className={cn("font-semibold", makeHeaderSolid ? "text-brand-navy" : "text-white")}>
                Inquiries:
              </span>{" "}
              {contactDetails.inquiriesPhoneDisplay}
            </p>
            <p className="mt-2 break-all">
              <span className={cn("font-semibold", makeHeaderSolid ? "text-brand-navy" : "text-white")}>
                Email:
              </span>{" "}
              {contactDetails.email}
            </p>
          </div>

          <Button href="/valuation" className="w-full" variant="primary">
            Request a Valuation
          </Button>
        </Container>
      </div>
    </header>
  );
}