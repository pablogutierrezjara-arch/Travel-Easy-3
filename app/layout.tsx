import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Itinerary Builder",
  description: "Generate travel itineraries with flight and hotel suggestions"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Itinerary Builder</h1>
            <nav className="text-sm space-x-4">
              <a className="hover:underline" href="/">Home</a>
              <a className="hover:underline" href="/itinerary">Itinerary</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="border-t py-6 mt-10 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Itinerary Builder
        </footer>
      </body>
    </html>
  );
}
