// Path: apps\web\components\fleet\CarCard.tsx

'use client';

// Reusable car card — used on /fleet page grid
// and can replace home FleetSection cards too.
//
// Props:
//   car     — Car object from lib/data/fleet.ts
//   priority — pass true for above-the-fold cards (LCP optimisation)

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Fuel, Settings2, ArrowRight } from 'lucide-react';
import { Car, formatPrice } from '@/lib/data/fleet';
import { buildWhatsAppUrl } from '@/lib/constants';

// ── WhatsApp SVG icon (Lucide doesn't include it) ──────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Badge colour map ────────────────────────────────────────────────
const badgeClasses: Record<string, string> = {
  blue: 'bg-sky-50 text-[#2E6FD8] border border-sky-200',
  navy: 'bg-[#0B1F3A] text-white',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

// ── Fuel label helper ───────────────────────────────────────────────
const fuelLabel: Record<string, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  electric: 'Electric',
  hybrid: 'Hybrid',
};

// ── Component ───────────────────────────────────────────────────────
interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  const waUrl = buildWhatsAppUrl(
    `Hi! I'm interested in booking the *${car.name}*. Could you share availability and pricing?`
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden
                 shadow-sm hover:shadow-xl hover:border-blue-200 transition-shadow duration-300"
    >
      {/* ── Car image ─────────────────────────────────────────── */}
      <div className="relative h-48 bg-slate-50 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          // Fallback gradient shown while image loads or if missing
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = '0';
          }}
        />

        {/* Gradient overlay — subtle, bottom only */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent" />

        {/* Badge */}
        {car.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-700 tracking-wide
                        uppercase px-2.5 py-1 rounded-md ${
                          badgeClasses[car.badgeStyle ?? 'blue']
                        }`}
          >
            {car.badge}
          </span>
        )}

        {/* Self-drive pill — top right */}
        {car.selfDrivePrice && (
          <span
            className="absolute top-3 right-3 text-[11px] font-600 tracking-wide
                           bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200
                           px-2.5 py-1 rounded-full"
          >
            Self-Drive
          </span>
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name + type */}
        <div className="mb-3">
          <h3 className="font-poppins text-xl font-semibold text-[#0B1F3A] leading-tight">

            {car.name}
          </h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5 font-500">
            {car.typeLabel}
          </p>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 mb-4 text-slate-500 text-xs font-500">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 shrink-0" />
            {car.seats} Seats
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <Settings2 className="w-3.5 h-3.5 shrink-0" />
            {car.transmission}
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 shrink-0" />
            {fuelLabel[car.fuel]}
          </span>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {car.features.slice(0, 4).map((feat) => (
            <span
              key={feat}
              className="text-[11px] font-500 text-slate-600 bg-slate-100
                         px-2.5 py-0.5 rounded-full border border-slate-200"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Spacer pushes footer to bottom */}
        <div className="flex-1" />

        {/* ── Footer: price + actions ─────────────────────────── */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-100">
          {/* Pricing */}
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-0.5">
              Starting from
            </p>
            <p className="font-poppins text-2xl font-semibold text-[#0B1F3A] leading-none">

              {formatPrice(car.pricePerDay)}
              <span className="font-outfit text-xs font-400 text-slate-400 ml-1">
                / day
              </span>
            </p>
            {car.pricePerKm && (
              <p className="text-[11px] text-slate-400 mt-0.5">
                or {formatPrice(car.pricePerKm)} / km outstation
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Detail page link */}
            <Link
              href={`/fleet/${car.id}`}
              className="flex items-center justify-center w-9 h-9 rounded-lg
                         border border-slate-200 text-slate-500
                         hover:border-[#2E6FD8] hover:text-[#2E6FD8]
                         transition-colors duration-200"
              aria-label={`View details for ${car.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* WhatsApp enquire */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#EBF2FF] text-[#2E6FD8]
                         hover:bg-[#2E6FD8] hover:text-white
                         px-3.5 py-2 rounded-lg text-xs font-600
                         transition-all duration-200"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
              Enquire
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
