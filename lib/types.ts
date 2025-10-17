export type TripBrief = {
  origin: string;
  destination: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  pax?: number;
  currency?: string;
  budget?: number;
  hotelClass?: "economy" | "midscale" | "upscale" | "luxury";
};

export type FlightOption = {
  id: string;
  carrier: string;
  number: string;
  from: string;
  to: string;
  duration: string;     // "2h 10m"
  durationMin: number;  // for scoring
  stops: number;
  price: number;
  currency: string;
  departISO: string;
  arriveISO: string;
};

export type HotelOption = {
  id: string;
  name: string;
  city: string;
  nights: number;
  rating: number;   // 0-5
  total: number;
  currency: string;
  distanceKm: number;
};

export type ApiResponse = {
  title: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  pax: number;
  currency: string;
  flights: FlightOption[];
  hotels: HotelOption[];
};
