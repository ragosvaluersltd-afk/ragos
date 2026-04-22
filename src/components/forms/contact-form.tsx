"use client";

import { FormEvent, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { TextArea, TextInput } from "@/components/ui/form-controls";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      website: formData.get("website"),
      formStartedAt: startedAt.current
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { message: string };

    if (!response.ok) {
      setState("error");
      setMessage(data.message || "Submission failed");
      return;
    }

    trackEvent("contact_submission", { form: "contact" });
    event.currentTarget.reset();
    startedAt.current = Date.now();
    setState("success");
    setMessage(data.message || "Submitted");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-card sm:p-8" aria-live="polite">
      <h2 className="text-2xl font-semibold text-brand-navy">Quick Inquiry</h2>
      <p className="mt-2 text-xs text-brand-slate">Response time: typically within one business day.</p>
      <div className="mt-5 space-y-4">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <TextInput name="name" placeholder="Full Name" required />
        <TextInput name="email" type="email" placeholder="Email Address" required />
        <TextInput name="phone" placeholder="Phone Number" />
        <TextArea name="message" placeholder="How can we assist you?" rows={5} required />
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-5 inline-flex items-center rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? "Submitting..." : "Submit Inquiry"}
      </button>
      {message ? <p className="mt-3 text-sm text-brand-slate">{message}</p> : null}
    </form>
  );
}
