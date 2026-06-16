// Path: apps\web\components\fleet\CarGrid.tsx

'use client';

// Renders the filtered grid of CarCards.
// Uses AnimatePresence so cards animate out smoothly
// when the filter changes — not just a sudden swap.
//
// Props:
//   cars      — already-filtered Car[] from parent
//   emptyText — optional custom message when no cars match

import { AnimatePresence, motion, Variants } from 'framer-motion';
import CarCard from '@/components/fleet/CarCard';
import { Car } from '@/lib/data/fleet';

interface CarGridProps {
  cars: Car[];
  emptyText?: string;
}

// Stagger config — each card animates in with a slight delay
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function CarGrid({
  cars,
  emptyText = 'No vehicles found in this category.',
}: CarGridProps) {
  // Empty state
  if (cars.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <span className="text-5xl mb-4">🚗</span>
        <p className="text-slate-500 text-base font-medium">{emptyText}</p>
        <p className="text-slate-400 text-sm mt-1">
          Try selecting a different category above.
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // Key change forces AnimatePresence to re-run exit → enter
        // when the car list changes (i.e. filter changes)
        key={cars.map((c) => c.id).join('-')}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cars.map((car, index) => (
          <motion.div key={car.id} variants={cardVariants}>
            <CarCard
              car={car}
              // Prioritise first 3 cards for LCP (above the fold)
              priority={index < 3}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
