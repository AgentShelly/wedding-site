"use client";
import { useState } from "react";
import { RSVPYesForm } from "./RSVPYesForm";
import { RSVPNoForm } from "./RSVPNoForm";
import { CountdownClock } from "./CountdownClock";

type Choice = "yes" | "no" | null;

export function RSVPSection() {
  const [choice, setChoice] = useState<Choice>(null);

  return (
    <section id="rsvp" className="py-20 px-6 bg-ivory peranakan-grid">
      {/* Countdown Strip */}
      <div className="text-center pb-10 mb-10 border-b border-gold/20">
        <p className="font-body text-[11px] uppercase tracking-[0.25em] text-muted mb-5">Counting down to the celebration</p>
        <CountdownClock />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-5xl text-teal mt-6 heading-underline">
            Will you join us?
          </h2>
          <p className="font-body text-muted mt-6 max-w-sm mx-auto text-sm leading-relaxed">
            We would be honoured to have you celebrate with us on our special day.
            Kindly respond by <strong>30 June 2026</strong>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => setChoice(choice === "yes" ? null : "yes")}
            className={`group relative px-10 py-4 rounded-sm font-body font-semibold text-base tracking-wide border-2 transition-all duration-300 overflow-hidden ${
              choice === "yes"
                ? "bg-coral border-coral text-ivory shadow-lg"
                : "bg-coral/90 border-coral text-ivory hover:bg-coral hover:shadow-md"
            }`}
          >
            <span className="relative z-10">🎉 Yes, I&apos;ll be there!</span>
          </button>

          <button
            onClick={() => setChoice(choice === "no" ? null : "no")}
            className={`px-10 py-4 rounded-sm font-body font-semibold text-base tracking-wide border-2 transition-all duration-300 ${
              choice === "no"
                ? "bg-muted border-muted text-ivory shadow-md"
                : "bg-muted/75 border-muted/75 text-ivory hover:bg-muted hover:shadow-md"
            }`}
          >
            No, we&apos;ll catch up later
          </button>
        </div>

        {/* Inline form */}
        {choice === "yes" && (
          <div className="animate-[fadeSlideDown_0.35s_ease-out]">
            <RSVPYesForm />
          </div>
        )}
        {choice === "no" && (
          <div className="animate-[fadeSlideDown_0.35s_ease-out]">
            <RSVPNoForm />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px w-14 bg-gold/60" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold shrink-0">
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        <ellipse cx="10" cy="3" rx="2" ry="4" fill="currentColor" opacity="0.6" />
        <ellipse cx="10" cy="17" rx="2" ry="4" fill="currentColor" opacity="0.6" />
        <ellipse cx="3" cy="10" rx="4" ry="2" fill="currentColor" opacity="0.6" />
        <ellipse cx="17" cy="10" rx="4" ry="2" fill="currentColor" opacity="0.6" />
      </svg>
      <div className="h-px w-14 bg-gold/60" />
    </div>
  );
}
