"use client";

import { useState } from "react";
import TripForm from "@/components/TripForm";
import Suggestions from "@/components/Suggestions";
import type { ApiResponse, TripBrief } from "@/lib/types";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  async function handleGenerate(brief: TripBrief) {
    setLoading(true);
    setData(null);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief)
      });
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as ApiResponse;
      setData(json);
    } catch (e: any) {
      alert(e.message || "Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <TripForm onGenerate={handleGenerate} />
      {loading && <p className="text-sm text-gray-600">Generating suggestions…</p>}
      {data && <Suggestions data={data} />}
    </div>
  );
}
