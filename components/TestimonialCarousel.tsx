"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/content/testimonials/index";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrentIndex((i) => (i + 1) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <div
      role="region"
      aria-label="Guest testimonials"
      aria-roledescription="carousel"
      className="relative max-w-4xl mx-auto"
    >
      {/* Main testimonial */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-white rounded-3xl p-8 md:p-12 border border-line text-center"
      >
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6" aria-label={`${current.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < current.rating
                  ? "text-gold-500 fill-gold-500"
                  : "text-ink-300"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote>
          <p className="text-ink-600 text-lg md:text-xl leading-relaxed mb-8 italic">
            &ldquo;{current.text}&rdquo;
          </p>
          <footer>
            <div className="flex items-center justify-center gap-3">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                aria-hidden="true"
              >
                {current.avatarInitials}
              </div>
              <div className="text-left">
                <p className="font-semibold text-ink-900">{current.name}</p>
                <p className="text-ink-600 text-sm">{current.location}</p>
                {current.propertyName && (
                  <p className="text-emerald-500 text-xs mt-0.5">
                    Stayed at {current.propertyName}
                  </p>
                )}
              </div>
            </div>
          </footer>
        </blockquote>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 rounded-full border border-line text-ink-600 hover:border-emerald-500 hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div role="tablist" aria-label="Testimonials" className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`View testimonial ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  i === currentIndex
                    ? "w-6 bg-emerald-500"
                    : "bg-ink-300 hover:bg-ink-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 rounded-full border border-line text-ink-600 hover:border-emerald-500 hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
