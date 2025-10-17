"use client";

import type { ApiResponse } from "@/lib/types";

export default function Suggestions({ data }: { data: ApiResponse }) {
  function save() {
    localStorage.setItem("last_itinerary", JSON.stringify(data));
    alert("Itinerary saved. See the Itinerary page to print/PDF.");
  }

  return (
    <div className="grid gap-6">
      <header>
        <h2 className="text-lg font-semibold">Suggestions</h2>
        <p className="text-sm text-gray-600">
          {data.origin} → {data.destination} | {data.startDate} – {data.endDate} | Travelers: {data.pax}
        </p>
      </header>

      <section className="grid gap-4">
        <h3 className="font-medium">Flights</h3>
        <div className="grid gap-3">
          {data.flights.map((f) => (
            <div key={f.id} className="rounded border bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium">
                  {f.carrier} {f.number} — {f.from} → {f.to}
                </div>
                <div className="text-sm text-gray-700">
                  {f.duration}, {f.stops} stop(s), {f.price} {f.currency}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h3 className="font-medium">Hotels</h3>
        <div className="grid gap-3">
          {data.hotels.map((h) => (
            <div key={h.id} className="rounded border bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium">
                  {h.name} — {h.city}
                </div>
                <div className="text-sm text-gray-700">
                  {h.nights} nights, {h.rating}★, {h.total} {h.currency}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div>
        <button className="rounded bg-black px-4 py-2 text-white" onClick={save}>
          Save itinerary
        </button>
      </div>
    </div>
  );
}
