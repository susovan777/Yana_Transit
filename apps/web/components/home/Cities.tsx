// Path: apps\web\components\home\Cities.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CITIES, OFFICES, City } from '@/lib/data/cities';

// ─────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────
const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─────────────────────────────────────────
// OFFICE BADGE
// Looks up office type from OFFICES array
// ─────────────────────────────────────────
function OfficeBadge({ cityId }: { cityId: string }) {
  const office = OFFICES.find((o) => o.cityId === cityId);
  if (!office) return null;

  const isHead = office.type === 'head';

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-1 rounded-full
        text-[10px] font-bold tracking-[0.6px] uppercase mt-2
        ${
          isHead
            ? 'bg-sky-brand text-white'
            : 'bg-white/15 text-white/80 border border-white/20'
        }
      `}
    >
      {isHead ? '★ Head Office' : 'Branch Office'}
    </span>
  );
}

// ─────────────────────────────────────────
// CITY CARD
// ─────────────────────────────────────────
function CityCard({
  city,
  className = '',
}: {
  city: City;
  className?: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
    >
      {/* Gradient fallback */}
      <div className="absolute inset-0" style={{ background: city.gradient }} />

      {/*
        City photo — /public/images/cities/<id>.jpg
        Landscape, 800×600px min. Gradient shows as fallback.
      */}
      <Image
        src={`/images/cities/${city.id}.jpg`}
        alt={`Corporate car rental in ${city.name}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {/* Bottom-up overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(11,31,58,0.88) 0%, rgba(11,31,58,0.2) 55%, transparent 100%)',
        }}
      />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-[22px] font-bold text-white leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {city.name}
        </p>
        <p className="text-[12px] text-white/65 mt-0.5 tracking-[0.3px]">
          {city.state}
        </p>
        {/* <OfficeBadge cityId={city.id} /> */}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// CITIES SECTION
//
// Grid layout (6 cities):
//
// Desktop — 3 columns:
// ┌──────────────┬───────┬───────┐
// │              │ Delhi │ Mumbai│  row 1 (260px)
// │  Bengaluru   ├───────┼───────┤
// │  (rowspan 2) │ Hyd   │ Pune  │  row 2 (260px)
// ├──────────────┴───────┴───────┤
// │       Chennai (full width)   │  row 3 (180px)
// └──────────────────────────────┘
//
// Mobile — 2 columns, all equal height
// ─────────────────────────────────────────
export default function CitiesSection() {
  // CITIES[0] = Bengaluru (featured)
  // CITIES[1] = New Delhi
  // CITIES[2] = Mumbai
  // CITIES[3] = Hyderabad
  // CITIES[4] = Pune
  // CITIES[5] = Chennai
  const [bengaluru, delhi, mumbai, hyderabad, pune, chennai] = CITIES;

  return (
    <section id="cities" className="bg-white py-24 px-6 md:px-10 xl:px-14">
      <div className="max-w-[1280px] mx-auto">
        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-pale border border-sky-soft text-[12px] font-semibold text-sky-brand tracking-[0.5px] mb-4"
          >
            📍 Our Presence
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,4vw,48px)] font-bold leading-[1.12] text-navy"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            We Operate Across{' '}
            <em className="not-italic text-sky-brand">India</em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-[16px] leading-[1.75] text-muted max-w-[480px] mx-auto"
          >
            From metro business hubs to branch offices — YAANA Transit provides
            reliable corporate transport wherever your business operates.
          </motion.p>
        </motion.div>

        {/* ── Bento grid ── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* ── Top block: Bengaluru + 2×2 right ── */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3.5 mb-3 lg:mb-3.5">
            {/* Bengaluru — tall left card (row-span-2 on desktop) */}
            <motion.div
              variants={cardVariants}
              className="row-span-2 hidden lg:block"
              style={{ gridRow: 'span 2' }}
            >
              <CityCard city={bengaluru} className="h-full min-h-[537px]" />
            </motion.div>

            {/* Bengaluru — shown only on mobile (single row) */}
            <motion.div
              variants={cardVariants}
              className="lg:hidden col-span-2"
            >
              <CityCard city={bengaluru} className="h-[220px]" />
            </motion.div>

            {/* Right column top: Delhi + Mumbai */}
            <CityCard city={delhi} className="h-[220px] lg:h-[260px]" />
            <CityCard city={mumbai} className="h-[220px] lg:h-[260px]" />

            {/* Right column bottom: Hyderabad + Pune — desktop only in this block */}
            <CityCard city={hyderabad} className="hidden lg:block h-[260px]" />
            <CityCard city={pune} className="hidden lg:block h-[260px]" />
          </div>

          {/* ── Mobile: Hyderabad + Pune ── */}
          <div className="grid grid-cols-2 gap-3 mb-3 lg:hidden">
            <CityCard city={hyderabad} className="h-[180px]" />
            <CityCard city={pune} className="h-[180px]" />
          </div>

          {/* ── Chennai — full width bottom strip ── */}
          <motion.div variants={cardVariants}>
            <CityCard city={chennai} className="h-[180px] lg:h-[200px]" />
          </motion.div>
        </motion.div>

        {/* ── Overflow cities note + CTA ── */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-[13px] text-muted text-center sm:text-left">
            Also operating in · Ahmedabad · Kochi · Chandigarh · Agra · Udaipur
            · Coimbatore · Nagpur · Surat + 40 more cities
          </p>

          <Link
            href="/cities"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn border border-line text-[13px] font-semibold text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 shrink-0"
          >
            View all locations
            <ArrowRight size={14} />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
