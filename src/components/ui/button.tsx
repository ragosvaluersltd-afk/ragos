import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-blue text-white shadow-[0_10px_24px_rgba(46,48,146,0.32)] hover:bg-[#25277a]",
  secondary: "bg-brand-orange text-brand-navy shadow-[0_10px_24px_rgba(248,148,29,0.35)] hover:bg-[#de8215]",
  outline: "border border-brand-blue/35 bg-white text-brand-blue hover:border-brand-blue hover:bg-brand-blue hover:text-white"
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
