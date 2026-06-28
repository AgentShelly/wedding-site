"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function validateField(type: string, value: string): string | null {
  if (type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email e.g. alice@gmail.com";
  }
  if (type === "tel" && value) {
    const digits = value.replace(/[\s+\-()]/g, "");
    if (digits.length < 4) return "Please enter a valid phone number e.g. 91234567";
  }
  return null;
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dietaryRestrictions: string;
}

const blank = (): GuestInfo => ({ firstName: "", lastName: "", email: "", phone: "", dietaryRestrictions: "" });

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const [touched, setTouched] = useState(false);
  const fieldError = touched ? validateField(type, value) : null;
  const isEmpty = touched && required && !value;

  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-xs font-semibold uppercase tracking-wider text-teal-dark">
        {label}
        {required && <span className="text-coral ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        required={required}
        placeholder={placeholder}
        className={`px-4 py-2.5 border rounded-sm bg-white text-dark font-body text-sm placeholder:text-muted/40 focus:outline-none focus:ring-1 transition-colors ${
          fieldError || isEmpty
            ? "border-coral focus:border-coral focus:ring-coral/20"
            : "border-gold/40 focus:border-teal focus:ring-teal/20"
        }`}
      />
      {isEmpty && <p className="text-coral text-xs mt-0.5">This field is required</p>}
      {fieldError && !isEmpty && <p className="text-coral text-xs mt-0.5">{fieldError}</p>}
    </div>
  );
}

function GuestBlock({
  guest,
  label,
  onChange,
}: {
  guest: GuestInfo;
  label: string;
  onChange: (f: keyof GuestInfo, v: string) => void;
}) {
  return (
    <div className="border border-gold/25 rounded-sm p-5 bg-cream/40">
      <p className="font-display text-teal text-lg mb-4 italic">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" value={guest.firstName} onChange={(v) => onChange("firstName", v)} required />
        <Field label="Last Name" value={guest.lastName} onChange={(v) => onChange("lastName", v)} required />
        <div className="sm:col-span-2">
          <Field
            label="Dietary Restrictions"
            value={guest.dietaryRestrictions}
            onChange={(v) => onChange("dietaryRestrictions", v)}
            placeholder="e.g. vegetarian, halal, nut allergy — leave blank if none"
          />
        </div>
      </div>
    </div>
  );
}

export function RSVPYesForm() {
  const router = useRouter();
  const [primary, setPrimary] = useState<GuestInfo>(blank());
  const [extras, setExtras] = useState<GuestInfo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePrimary = (f: keyof GuestInfo, v: string) =>
    setPrimary((p) => ({ ...p, [f]: v }));

  const updateExtra = (idx: number, f: keyof GuestInfo, v: string) =>
    setExtras((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [f]: v };
      return next;
    });

  const addGuest = () => {
    if (extras.length < 5) setExtras((p) => [...p, blank()]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp-yes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ primaryGuest: primary, additionalGuests: extras }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Submission failed");
      }
      router.push("/rsvp-yes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const totalGuests = 1 + extras.length;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ivory border border-gold/30 rounded-sm p-6 md:p-10 shadow-sm peranakan-grid"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-gold" />
          <span className="text-gold">✦</span>
          <div className="h-px w-10 bg-gold" />
        </div>
        <h3 className="font-display text-3xl text-teal">We&apos;re so glad!</h3>
        <p className="font-body text-muted text-sm mt-1">
          Please fill in your details below. You may RSVP on behalf of your immediate family group.
        </p>
      </div>

      <div className="space-y-5">
        {/* Primary guest */}
        <div className="border border-gold/25 rounded-sm p-5 bg-cream/40">
          <p className="font-display text-teal text-lg mb-4 italic">Your Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" value={primary.firstName} onChange={(v) => updatePrimary("firstName", v)} required />
            <Field label="Last Name" value={primary.lastName} onChange={(v) => updatePrimary("lastName", v)} required />
            <Field label="Email" type="email" value={primary.email} onChange={(v) => updatePrimary("email", v)} placeholder="e.g. alice@gmail.com" required />
            <Field label="Phone" type="tel" value={primary.phone} onChange={(v) => updatePrimary("phone", v)} placeholder="e.g. 91234567 or +65 9123 4567" required />
            <div className="sm:col-span-2">
              <Field
                label="Dietary Restrictions"
                value={primary.dietaryRestrictions}
                onChange={(v) => updatePrimary("dietaryRestrictions", v)}
                placeholder="e.g. vegetarian, halal, nut allergy — leave blank if none"
              />
            </div>
          </div>
        </div>

        {/* Additional guests */}
        {extras.map((g, i) => (
          <GuestBlock
            key={i}
            guest={g}
            label={`Guest ${i + 1}`}
            onChange={(f, v) => updateExtra(i, f, v)}
          />
        ))}

        {/* Add guest button — disappears after 5 additions */}
        {extras.length < 5 && (
          <button
            type="button"
            onClick={addGuest}
            className="flex items-center gap-2 font-body text-sm font-semibold text-teal hover:text-teal-dark border border-teal/30 hover:border-teal rounded-sm px-4 py-2.5 transition-colors hover:bg-teal/5"
          >
            <span className="text-base font-bold">+</span>
            Add a guest
            <span className="text-muted font-normal">
              ({4 - extras.length} more allowed)
            </span>
          </button>
        )}

        {/* Error */}
        {error && (
          <div className="bg-coral/10 border border-coral/30 rounded-sm px-4 py-3 font-body text-sm text-coral">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-coral text-ivory font-body font-semibold text-base tracking-wide rounded-sm hover:bg-coral-light active:scale-[0.99] transition-all disabled:opacity-55 disabled:cursor-not-allowed shadow-sm"
          >
            {submitting ? "Sending your RSVP…" : "Confirm Attendance 🎉"}
          </button>
          <p className="text-center text-muted text-xs mt-3 font-body">
            Your party:{" "}
            <span className="font-semibold text-teal">
              {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}
