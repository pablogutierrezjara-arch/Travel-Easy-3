"use client";

import { useState } from "react";
import type { TripBrief } from "@/lib/types";

export default function TripForm({ onGenerate }: { onGenerate: (brief: TripBrief) => void }) {
  const [form, setForm] = useState<TripBrief>({
    origin: "FCO",
    destination: "BCN",
    startDate: "2026-03-10",
    endDate: "2026-03-15",
    pax: 2,
    currency: "EUR",
    budget: 1500,
    hotelClass: "midscale"
  });

  function update<K extends keyof TripBrief>(key: K, value: TripBrief[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Trip brief</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Origin (IATA/city)">
          <input
            className="input"
            value={form.origin}
            onChange={(e) => update("origin", e.target.value.toUpperCase())}
          />
        </Field>
        <Field label="Destination (IATA/city)">
          <input
            className="input"
            value={form.destination}
            onChange={(e) => update("destination", e.target.value.toUpperCase())}
          />
        </Field>
        <Field label="Start date">
          <input
            type="date"
            className="input"
            value={form.startDate}
            onChange={(e) => update("startDate", e.target.value)}
          />
        </Field>
        <Field label="End date">
          <input
            type="date"
            className="input"
            value={form.endDate}
            onChange={(e) => update("endDate", e.target.value)}
          />
        </Field>
        <Field label="Travelers">
          <input
            type="number"
            min={1}
            className="input"
            value={form.pax}
            onChange={(e) => update("pax", Number(e.target.value))}
          />
        </Field>
        <Field label="Currency">
          <input
            className="input"
            value={form.currency}
            onChange={(e) => update("currency", e.target.value.toUpperCase().slice(0, 3))}
          />
        </Field>
        <Field label="Budget (optional)">
          <input
            type="number"
            className="input"
            value={form.budget || 0}
            onChange={(e) => update("budget", Number(e.target.value))}
          />
        </Field>
        <Field label="Hotel class">
          <select
            className="input"
            value={form.hotelClass}
            onChange={(e) => update("hotelClass", e.target.value as any)}
          >
            <option value="economy">Economy</option>
            <option value="midscale">Midscale</option>
            <option value="upscale">Upscale</option>
            <option value="luxury">Luxury</option>
          </select>
        </Field>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          className="rounded bg-black px-4 py-2 text-white"
          onClick={() => {
            onGenerate(form);
          }}
        >
          Generate itinerary
        </button>
        <p className="text-xs text-gray-600">
          This demo uses mocked flight and hotel providers. We can connect real APIs later.
        </p>
      </div>
      <style jsx>{`
        .input {
          @apply w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-gray-700">{label}</span>
      {children}
    </label>
  );
}
