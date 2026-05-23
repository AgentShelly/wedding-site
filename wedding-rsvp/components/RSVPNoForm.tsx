"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const REASONS = [
  "A pet grooming appointment",
  "My grooming appointment",
  "Child enrichment activity",
  "Church cell group",
  "All of the above",
] as const;

type Reason = (typeof REASONS)[number];

export function RSVPNoForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [reason, setReason] = useState<Reason | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      setError("Please select a reason so we know where we went wrong. 😄");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp-no", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, reason }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Submission failed");
      }
      router.push("/rsvp-no");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ivory border border-gold/30 rounded-sm p-6 md:p-10 shadow-sm max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-gold" />
          <span className="text-gold">✦</span>
          <div className="h-px w-10 bg-gold" />
        </div>
        <h3 className="font-display text-3xl text-teal">We&apos;ll miss you!</h3>
        <p className="font-body text-muted text-sm mt-1">
          No worries — but do let us know a little more.
        </p>
      </div>

      <div className="space-y-6">
        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-teal-dark">
            Full Name <span className="text-coral">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Your full name"
            className="px-4 py-2.5 border border-gold/40 rounded-sm bg-white text-dark font-body text-sm placeholder:text-muted/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/20 transition-colors"
          />
        </div>

        {/* Reason */}
        <div className="flex flex-col gap-2">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-teal-dark">
            I cannot be at your celebration because: <span className="text-coral">*</span>
          </label>
          <div className="space-y-2">
            {REASONS.map((r) => (
              <label
                key={r}
                className={`flex items-start gap-3 p-3.5 rounded-sm border cursor-pointer transition-all ${
                  reason === r
                    ? "border-teal bg-teal/8 shadow-sm"
                    : "border-gold/25 bg-white hover:bg-cream/60 hover:border-gold/50"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="mt-0.5 accent-teal shrink-0"
                />
                <span className="font-body text-sm text-dark">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-coral/10 border border-coral/30 rounded-sm px-4 py-3 font-body text-sm text-coral">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-muted text-ivory font-body font-semibold text-base tracking-wide rounded-sm hover:bg-dark active:scale-[0.99] transition-all disabled:opacity-55 disabled:cursor-not-allowed shadow-sm"
        >
          {submitting ? "Sending…" : "Send My Apologies"}
        </button>
      </div>
    </form>
  );
}
