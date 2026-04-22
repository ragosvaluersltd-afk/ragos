export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type ValuationPayload = {
  name: string;
  email: string;
  phone?: string;
  propertyLocation: string;
  propertyType: string;
  valuationType: string;
  additionalNotes?: string;
};

export type InquiryPayload = {
  propertyId?: string;
  propertySlug?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredContactMethod?: "email" | "phone";
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

export function validateContactPayload(input: unknown): ContactPayload {
  const payload = input as Record<string, unknown>;
  const data = {
    name: clean(payload.name),
    email: clean(payload.email).toLowerCase(),
    phone: clean(payload.phone),
    message: clean(payload.message)
  };

  if (!data.name || data.name.length < 2) throw new Error("Name is required");
  if (!isValidEmail(data.email)) throw new Error("A valid email is required");
  if (!data.message || data.message.length < 10) throw new Error("Message should be at least 10 characters");

  return data;
}

export function validateValuationPayload(input: unknown): ValuationPayload {
  const payload = input as Record<string, unknown>;
  const data = {
    name: clean(payload.name),
    email: clean(payload.email).toLowerCase(),
    phone: clean(payload.phone),
    propertyLocation: clean(payload.propertyLocation),
    propertyType: clean(payload.propertyType),
    valuationType: clean(payload.valuationType),
    additionalNotes: clean(payload.additionalNotes)
  };

  if (!data.name || data.name.length < 2) throw new Error("Name is required");
  if (!isValidEmail(data.email)) throw new Error("A valid email is required");
  if (!data.propertyLocation) throw new Error("Property location is required");
  if (!data.propertyType) throw new Error("Property type is required");
  if (!data.valuationType) throw new Error("Valuation type is required");

  return data;
}

export function validateInquiryPayload(input: unknown): InquiryPayload {
  const payload = input as Record<string, unknown>;
  const preferredContactMethod = clean(payload.preferredContactMethod);
  const data = {
    propertyId: clean(payload.propertyId),
    propertySlug: clean(payload.propertySlug),
    name: clean(payload.name),
    email: clean(payload.email).toLowerCase(),
    phone: clean(payload.phone),
    message: clean(payload.message),
    preferredContactMethod: (preferredContactMethod === "phone" ? "phone" : "email") as "email" | "phone"
  };

  if (!data.name || data.name.length < 2) throw new Error("Name is required");
  if (!isValidEmail(data.email)) throw new Error("A valid email is required");
  if (!data.message || data.message.length < 10) throw new Error("Message should be at least 10 characters");

  return data;
}
