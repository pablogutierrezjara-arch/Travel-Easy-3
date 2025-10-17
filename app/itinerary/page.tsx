"use client";

import { useEffect, useState } from "react";
import type { ApiResponse } from "@/lib/types";

export default function ItineraryPage() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("last_itinerary");
    if (raw) setData(JSON.parse(raw));
  }, []);

  if (!data) {
    return <p className="text-sm text-gray-600">No itinerary saved yet. Generate one on the home page.</p>;
  }

  return (
    <div className="prose max-w-none">
      <h2>{data.title}</h2>
      <p>
        {data.origin} → {data.destination} | {data.startDate} – {data.endDate} | Travelers: {data.pax}
      </p>
      <h3>Flights</h3>
      <ul>
        {data.flights.map((f) => (
          <li key={f.id}>
            {f.carrier} {f.number}: {f.from} → {f.to} — {f.duration} — {f.stops} stop(s) — {f.price} {f.currency}
          </li>
        ))}
      </ul>
      <h3>Hotels</h3>
      <ul>
        {data.hotels.map((h) => (
          <li key={h.id}>
            {h.name} ({h.city}) — {h.nights} nights — {h.rating}★ — {h.total} {h.currency}
          </li>
        ))}
      </ul>
      <button
        className="mt-6 rounded bg-black px-4 py-2 text-white"
        onClick={() => window.print()}
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
