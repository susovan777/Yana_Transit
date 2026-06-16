// Path: apps\web\app\fleet\page.tsx

// Path: apps/web/app/fleet/page.tsx
//
// Fleet listing page — /fleet
//
// Architecture:
//   • This file is a SERVER COMPONENT (no "use client")
//     → Next.js renders it on the server → good for SEO,
//       fast initial paint, no JS needed for static content.
//
//   • FleetClient (below) is the ONLY client component here.
//     It holds filter state and renders FilterBar + CarGrid.
//     Keeping the client boundary as small as possible is a
//     Next.js App Router best practice.
//
// SEO:
//   • generateMetadata exports page-level meta tags.
//   • The car grid is server-rendered on first load so
//     Google sees all cars without running JavaScript.

import type { Metadata } from 'next';
import {
  FLEET,
  filterFleet,
  FLEET_CATEGORIES,
  CarCategory,
} from '@/lib/data/fleet';
import { SITE } from '@/lib/constants';
import FleetClient from '@/components/fleet/FleetClient';

// ── SEO metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `Our Fleet — ${SITE.name}`,
  description:
    'Browse our complete fleet — economy hatchbacks, comfortable sedans, spacious SUVs and luxury executive cars. Available across 50+ cities in India.',
  openGraph: {
    title: `Our Fleet — ${SITE.name}`,
    description:
      'Economy to luxury — the right car for every journey across India.',
    url: '/fleet',
  },
};

// ── Page (Server Component) ─────────────────────────────────────────
export default function FleetPage() {
  // Data fetched at build time (static) — swap for fetch() when API is ready
  const allCars = FLEET;

  return (
    <main className="min-h-screen bg-white">
      {/* ── Page hero ──────────────────────────────────────────── */}
      <section className="bg-[#0B1F3A] pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Dot pattern — matches homepage hero */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Blue glow */}
        <div
          className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full
                        bg-[radial-gradient(circle,rgba(46,111,216,0.3)_0%,transparent_70%)]
                        pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <a href="/" className="hover:text-white/70 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white/20">/</li>
              <li className="text-white/60">Fleet</li>
            </ol>
          </nav>

          {/* Pill */}
          <div
            className="inline-flex items-center gap-2 bg-[#2E6FD8]/20 border border-[#2E6FD8]/35
                          text-[#7EB3FF] text-xs font-semibold tracking-wide uppercase
                          px-4 py-1.5 rounded-full mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7EB3FF] animate-pulse" />
            Our Fleet
          </div>

          <h1 className="font-poppins text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            Vehicles for{' '}
            <em className="not-italic text-[#7EB3FF]">Every Journey</em>
          </h1>
          <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
            Economy to luxury — every car is fully insured, GPS tracked, and
            serviced before your trip. Available across 50+ cities.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10">
            {[
              { value: `${allCars.length}+`, label: 'Vehicles' },
              { value: '4', label: 'Categories' },
              { value: '50+', label: 'Cities' },
              { value: '₹999', label: 'Starting / day' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-poppins text-3xl font-semibold text-white leading-none">
                  {s.value}
                </p>
                <p className="text-white/40 text-xs mt-1 tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet grid (client component) ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <FleetClient cars={allCars} categories={FLEET_CATEGORIES} />
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-poppins text-2xl md:text-3xl font-semibold text-[#0B1F3A] mb-3">
            Can't find the right car?
          </h2>
          <p className="text-slate-500 text-base mb-8">
            WhatsApp us your requirements — pickup city, dates, and group size.
            We'll find the perfect vehicle and confirm within minutes.
          </p>
          <a
            href={`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
              'Hi Yana Transit! I need help finding the right car for my trip.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0B1F3A] hover:bg-[#2E6FD8]
                       text-white font-semibold px-8 py-3.5 rounded-xl
                       transition-all duration-300 hover:-translate-y-0.5
                       hover:shadow-lg hover:shadow-[#2E6FD8]/25"
          >
            {/* WhatsApp icon */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
