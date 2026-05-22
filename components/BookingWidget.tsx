"use client";

import { useState } from "react";
import { format, differenceInCalendarDays, parseISO, addDays } from "date-fns";
import { Loader2, AlertCircle, Calendar, Users, Star } from "lucide-react";
import type { Property } from "@/content/properties/index";

interface BookingWidgetProps {
  property: Property;
}

export default function BookingWidget({ property }: BookingWidgetProps) {
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const dayAfterTomorrow = format(addDays(new Date(), 3), "yyyy-MM-dd");

  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(dayAfterTomorrow);
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const nights =
    checkIn && checkOut
      ? Math.max(0, differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn)))
      : 0;

  const nightlyTotal = property.pricePerNight * nights;
  const cleaningFee = property.cleaningFee;
  const total = nightlyTotal + cleaningFee;

  const isValid = nights >= 1 && guests >= 1 && guests <= property.maxGuests;

  const handleBook = async () => {
    if (!isValid) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertySlug: property.slug,
          checkIn,
          checkOut,
          guests,
          locale: "en",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to create booking");
      }

      // Redirect to Stripe Checkout
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-line">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-display text-3xl text-ink-900 font-semibold">
            ${property.pricePerNight}
          </span>
          <span className="text-ink-600 text-sm">/ night</span>
        </div>
        {property.rating && (
          <div className="flex items-center gap-1 text-sm text-ink-600">
            <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
            <span className="font-semibold">{property.rating}</span>
            <span className="text-ink-300">·</span>
            <span>{property.reviewCount} reviews</span>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="booking-checkin"
              className="block text-xs font-semibold text-ink-900 uppercase tracking-wider mb-1"
            >
              <Calendar className="w-3 h-3 inline mr-1" />
              Check-in
            </label>
            <input
              id="booking-checkin"
              type="date"
              value={checkIn}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => {
                setCheckIn(e.target.value);
                // Ensure checkout is after checkin
                if (e.target.value >= checkOut) {
                  setCheckOut(
                    format(
                      addDays(parseISO(e.target.value), 2),
                      "yyyy-MM-dd"
                    )
                  );
                }
              }}
              className="w-full px-3 py-2 rounded-xl border border-line text-ink-900 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="booking-checkout"
              className="block text-xs font-semibold text-ink-900 uppercase tracking-wider mb-1"
            >
              <Calendar className="w-3 h-3 inline mr-1" />
              Check-out
            </label>
            <input
              id="booking-checkout"
              type="date"
              value={checkOut}
              min={checkIn || format(addDays(new Date(), 1), "yyyy-MM-dd")}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-line text-ink-900 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label
            htmlFor="booking-guests"
            className="block text-xs font-semibold text-ink-900 uppercase tracking-wider mb-1"
          >
            <Users className="w-3 h-3 inline mr-1" />
            Guests (max {property.maxGuests})
          </label>
          <select
            id="booking-guests"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 rounded-xl border border-line text-ink-900 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors bg-white"
          >
            {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(
              (n) => (
                <option key={n} value={n}>
                  {n} guest{n !== 1 ? "s" : ""}
                </option>
              )
            )}
          </select>
        </div>

        {/* Price breakdown */}
        {nights > 0 && (
          <div className="space-y-2 py-4 border-t border-b border-line">
            <div className="flex justify-between text-sm text-ink-600">
              <span>
                ${property.pricePerNight} × {nights} night{nights !== 1 ? "s" : ""}
              </span>
              <span>${nightlyTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-ink-600">
              <span>Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-ink-900 pt-2 border-t border-line">
              <span>Total</span>
              <span>${total} USD</span>
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Book Now CTA */}
        <button
          onClick={handleBook}
          disabled={!isValid || status === "loading"}
          aria-label={
            isValid
              ? `Book ${property.name} for ${nights} nights — $${total} total`
              : "Select dates to book"
          }
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 text-white font-semibold hover:bg-gold-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 text-lg"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Preparing checkout...
            </>
          ) : (
            "Book Now"
          )}
        </button>

        <p className="text-xs text-ink-300 text-center">
          You won&apos;t be charged yet — review your booking on the next page.
        </p>

        {/* OTA fallback links */}
        <div className="text-center text-xs text-ink-300">
          <span>Also available on: </span>
          {property.airbnbUrl && (
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Airbnb
            </a>
          )}
          {property.airbnbUrl && property.vrboUrl && (
            <span className="mx-1">·</span>
          )}
          {property.vrboUrl && (
            <a
              href={property.vrboUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              VRBO
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
