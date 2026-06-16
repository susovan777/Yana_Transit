// Path: apps\web\components\fleet\FleetClient.tsx

'use client';

// Path: apps/web/components/fleet/FleetClient.tsx
//
// Client boundary for the fleet page.
// Owns the active filter state — everything above this
// (app/fleet/page.tsx) stays a Server Component.
//
// Why a separate file?
//   Next.js App Router requires "use client" to be at the
//   TOP of a file. If we put filter state directly in page.tsx,
//   the entire page becomes a client component and loses
//   server-rendering benefits (SEO, faster initial paint).
//   Keeping this wrapper thin is the right pattern.

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Car, CarCategory, filterFleet } from '@/lib/data/fleet';
import CarGrid from '@/components/fleet/CarGrid';
import FilterBar from './FilterBar';

interface FleetClientProps {
  cars: Car[];
  categories: { value: CarCategory | 'all'; label: string }[];
}

export default function FleetClient({ cars, categories }: FleetClientProps) {
  const [active, setActive] = useState<CarCategory | 'all'>('all');

  // Memoised so we don't re-filter on every render
  const filtered = useMemo(
    () => (active === 'all' ? cars : cars.filter((c) => c.category === active)),
    [active, cars]
  );

  return (
    <div>
      {/* ── Filter bar + result count ─────────────────────────── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                      gap-4 mb-10"
      >
        <FilterBar active={active} onChange={setActive} />

        <motion.p
          key={filtered.length}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-sm text-slate-400 shrink-0"
        >
          {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''}
          {active !== 'all' && (
            <button
              onClick={() => setActive('all')}
              className="ml-2 text-[#2E6FD8] hover:underline font-medium"
            >
              Clear filter
            </button>
          )}
        </motion.p>
      </div>

      {/* ── Car grid ─────────────────────────────────────────── */}
      <CarGrid cars={filtered} />
    </div>
  );
}
