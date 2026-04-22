"use client";

import { FormEvent, useState } from "react";
import { TextArea, TextInput } from "@/components/ui/form-controls";

type PropertyInquiryFormProps = {
  propertyId: string;
  propertySlug: string;
};

export function PropertyInquiryForm({ propertyId, propertySlug }: PropertyInquiryFormProps) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      propertyId,
      propertySlug,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      preferredContactMethod: formData.get("preferredContactMethod"),
      message: formData.get("message")
    };

    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { message: string };

    if (!response.ok) {
      setState("error");
      setMessage(data.message || "Unable to submit inquiry");
      return;
    }

    event.currentTarget.reset();
    setState("success");
    setMessage(data.message || "Inquiry submitted successfully");
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-3 text-sm">
      <TextInput name="name" placeholder="Full name" required />
      <TextInput name="email" type="email" placeholder="Email" required />
      <TextInput name="phone" placeholder="Phone number" />
      <select
        name="preferredContactMethod"
        defaultValue="email"
        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
      >
        <option value="email">Prefer email</option>
        <option value="phone">Prefer phone</option>
      </select>
      <TextArea name="message" placeholder="Message" rows={4} required />
      <button type="submit" className="w-full rounded-lg bg-brand-blue px-4 py-2.5 font-semibold text-white" disabled={state === "submitting"}>
        {state === "submitting" ? "Submitting..." : "Make an inquiry"}
      </button>
      {message ? <p className="text-xs text-brand-slate">{message}</p> : null}
    </form>
  );
}
