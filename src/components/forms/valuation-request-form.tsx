"use client";

import { FormEvent, useState } from "react";
import { TextArea, TextInput } from "@/components/ui/form-controls";

const valuationTypes = [
  "Mortgage Valuation",
  "Market Valuation",
  "Insurance Valuation",
  "Rental Assessment",
  "Commercial Valuation",
  "Land Valuation"
];

export function ValuationRequestForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      propertyLocation: formData.get("propertyLocation"),
      propertyType: formData.get("propertyType"),
      valuationType: formData.get("valuationType"),
      additionalNotes: formData.get("additionalNotes")
    };

    const response = await fetch("/api/valuation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { message: string };

    if (!response.ok) {
      setState("error");
      setMessage(data.message || "Unable to submit request");
      return;
    }

    event.currentTarget.reset();
    setState("success");
    setMessage(data.message || "Valuation request submitted");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <h3 className="text-xl font-semibold text-brand-navy">Request a valuation</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <TextInput name="name" placeholder="Full Name" required />
        <TextInput name="email" type="email" placeholder="Email Address" required />
        <TextInput name="phone" placeholder="Phone Number" className="sm:col-span-2" />
        <TextInput name="propertyLocation" placeholder="Property Location" required />
        <TextInput name="propertyType" placeholder="Property Type" required />
        <select
          name="valuationType"
          required
          className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 sm:col-span-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select valuation type
          </option>
          {valuationTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <TextArea name="additionalNotes" placeholder="Additional notes" rows={4} className="sm:col-span-2" />
      </div>
      <button type="submit" className="mt-5 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white" disabled={state === "submitting"}>
        {state === "submitting" ? "Submitting..." : "Submit request"}
      </button>
      {message ? <p className="mt-3 text-sm text-brand-slate">{message}</p> : null}
    </form>
  );
}
