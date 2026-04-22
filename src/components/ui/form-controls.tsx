import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-300/80 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15",
        props.className
      )}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-lg border border-slate-300/80 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15",
        props.className
      )}
    />
  );
}
