"use client";
import { useEffect, useState } from "react";

const WEDDING = new Date("2026-09-12T00:00:00+08:00");

function getTimeLeft() {
  const diff = WEDDING.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

export function CountdownClock() {
  const [t, setT] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-4">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-end gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            <div className="countdown-unit font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white tabular-nums min-w-[2ch] text-center">
              {String(value).padStart(2, "0")}
            </div>
            <div className="font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold-light mt-1.5 opacity-90">
              {label}
            </div>
          </div>
          {i < 3 && (
            <div className="font-display text-3xl sm:text-4xl text-gold-light mb-6 opacity-70">:</div>
          )}
        </div>
      ))}
    </div>
  );
}
