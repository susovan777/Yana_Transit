// Path: apps\web\lib\data\fleet.ts

// ─────────────────────────────────────────
// FLEET DATA — YAANA Transit
// Add your cars here. Images go in:
// /public/images/cars/<id>.jpg
// All white-coloured vehicles only.
// No pricing displayed (B2B corporate only).
// ─────────────────────────────────────────

export type CarCategory =
  | 'sedan'
  | 'muv'
  | 'suv'
  | 'premium-suv'
  | 'premium'
  | 'luxury';

export type BadgeStyle = 'blue' | 'navy' | 'green';

export type Car = {
  id: string;
  name: string;
  category: CarCategory;
  typeLabel: string;
  seats: number;
  transmission: string;
  badge?: string;
  badgeStyle?: BadgeStyle;
};

export const FLEET: Car[] = [
  // ── SEDAN ──
  {
    id: 'maruti-dzire',
    name: 'Maruti Suzuki Dzire',
    category: 'sedan',
    typeLabel: 'Sedan',
    seats: 4,
    transmission: 'Manual / Automatic',
    badge: 'Sedan',
    badgeStyle: 'blue',
  },

  // ── MUV ──
  {
    id: 'maruti-ertiga',
    name: 'Maruti Suzuki Ertiga',
    category: 'muv',
    typeLabel: 'MUV · 7-Seater',
    seats: 7,
    transmission: 'Manual / Automatic',
    badge: 'MUV',
    badgeStyle: 'blue',
  },
  {
    id: 'toyota-rumion',
    name: 'Toyota Rumion',
    category: 'muv',
    typeLabel: 'MUV · 7-Seater',
    seats: 7,
    transmission: 'Automatic',
    badge: 'MUV',
    badgeStyle: 'blue',
  },

  // ── SUV ──
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'suv',
    typeLabel: 'SUV · 7-Seater',
    seats: 7,
    transmission: 'Automatic',
    badge: 'SUV',
    badgeStyle: 'navy',
  },

  // ── PREMIUM SUV ──
  {
    id: 'innova-hycross',
    name: 'Toyota Innova HyCross',
    category: 'premium-suv',
    typeLabel: 'Premium SUV · Hybrid',
    seats: 7,
    transmission: 'e-CVT (Hybrid)',
    badge: 'Premium SUV',
    badgeStyle: 'navy',
  },

  // ── PREMIUM ──
  {
    id: 'kia-carnival',
    name: 'Kia Carnival',
    category: 'premium',
    typeLabel: 'Premium · 8-Seater',
    seats: 8,
    transmission: 'Automatic',
    badge: 'Premium',
    badgeStyle: 'green',
  },

  // ── LUXURY ──
  {
    id: 'mercedes-e-class',
    name: 'Mercedes-Benz E-Class',
    category: 'luxury',
    typeLabel: 'Luxury · Executive Sedan',
    seats: 4,
    transmission: 'Automatic',
    badge: 'Luxury',
    badgeStyle: 'blue',
  },
  {
    id: 'bmw-5-series',
    name: 'BMW 5 Series',
    category: 'luxury',
    typeLabel: 'Luxury · Executive Sedan',
    seats: 4,
    transmission: 'Automatic',
    badge: 'Luxury',
    badgeStyle: 'blue',
  },
];
