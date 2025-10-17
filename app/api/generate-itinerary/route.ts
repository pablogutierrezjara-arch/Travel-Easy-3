import { NextResponse } from "next/server";
import { scoreFlights, scoreHotels } from "@/lib/scoring";
import type { TripBrief, ApiResponse, FlightOption, HotelOption } from "@/lib/types";
import { daysBetween, randomId } from "@/lib/utils";

// Mock providers (replace with real APIs later)
function mockFlights(brief: TripBrief): FlightOption[] {
  const base = 120; // minutes
  const options = [
    { carrier: "AZ", number: "AZ123", duration: "2h 10m", durationMin: base + 10, stops: 0, price: 140 },
    { carrier: "VY", number: "VY2211", duration: "2h 30m", durationMin: base + 30, stops: 0, price: 110 },
    { carrier: "IB", number: "IB3520", duration: "4h 45m", durationMin: base + 185, stops: 1, price: 95 },
    { carrier: "U2", number: "U26701", duration: "2h 25m", durationMin: base + 25, stops: 0, price: 125 }
  ];
  return options.map((o) => ({
    id: randomId(),
    ...o,
    from: brief.origin,
    to: brief.destination,
    currency: brief.currency || "EUR",
    departISO: `${brief.startDate}T08:00:00`,
    arriveISO: `${brief.startDate}T10:10:00`
  }));
}

function mockHotels(brief: TripBrief): HotelOption[] {
  const nights = daysBetween(brief.startDate, brief.endDate);
  const list = [
    { name: "Central Plaza Hotel", rating: 4.4, pricePerNight: 130, distanceKm: 0.8 },
    { name: "Riverside Suites", rating: 4.6, pricePerNight: 160, distanceKm: 1.2 },
    { name: "City Garden Inn", rating: 4.2, pricePerNight: 110, distanceKm: 2.1 },
    { name: "Grand Metropolitan", rating: 4.8, pricePerNight: 220, distanceKm: 0.5 }
  ];
  return list.map((h) => ({
    id: randomId(),
    name: h.name,
    city: brief.destination,
    nights,
    rating: h.rating,
    total: h.pricePerNight * nights,
    currency: brief.currency || "EUR",
    distanceKm: h.distanceKm
  }));
}

export async function POST(req: Request) {
  const brief = (await req.json()) as TripBrief;

  if (!brief.origin || !brief.destination || !brief.startDate || !brief.endDate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const flights = scoreFlights(mockFlights(brief)).slice(0, 5);
  const hotels = scoreHotels(mockHotels(brief)).slice(0, 5);

  const payload: ApiResponse = {
    title: `${brief.destination} Trip`,
    origin: brief.origin,
    destination: brief.destination,
    startDate: brief.startDate,
    endDate: brief.endDate,
    pax: brief.pax || 2,
    currency: brief.currency || "EUR",
    flights,
    hotels
  };

  // Store for /itinerary view
  try {
    // This is fine server-side; we return payload and let client store it.
  } catch {}

  return NextResponse.json(payload);
}
