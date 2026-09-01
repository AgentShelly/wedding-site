"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/photos/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      router.refresh();
    } else {
      setError("Wrong password");
    }
  }

  return (
    <form onSubmit={submit} className="max-w-xs mx-auto mt-24 text-center">
      <h1 className="font-display text-3xl text-ivory">Album admin</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mt-6 px-4 py-2.5 border border-gold/30 rounded-sm bg-teal text-ivory font-body text-sm focus:outline-none focus:ring-1 focus:ring-gold"
      />
      {error && <p className="text-coral font-body text-xs mt-2">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full mt-4 bg-gold hover:bg-gold-light disabled:opacity-50 text-teal-dark font-body font-semibold text-sm uppercase tracking-[0.2em] px-6 py-3 rounded-sm"
      >
        {busy ? "…" : "Enter"}
      </button>
    </form>
  );
}
