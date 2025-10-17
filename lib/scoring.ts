import type { FlightOption, HotelOption } from "./types";

export function scoreFlights(list: FlightOption[]): FlightOption[] {
  // Lower is better: price (0.6), duration (0.3), stops penalty (0.1)
  return [...list]
    .map((f) => ({ f, score: f.price * 0.6 + f.durationMin * 0.3 + f.stops * 0.1 * 200 }))
    .sort((a, b) => a.score - b.score)
    .map((x) => x.f);
}

export function scoreHotels(list: HotelOption[]): HotelOption[] {
  // Lower is better: price (0.5), distance (0.3), and reward high rating (-rating * 0.2*100)
  return [...list]
    .map((h) => ({ h, score: h.total * 0.5 + h.distanceKm * 0.3 * 100 - h.rating * 20 }))
    .sort((a, b) => a.score - b.score)
    .map((x) => x.h);
}
