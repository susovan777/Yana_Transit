// Path: lib\fleet.ts

// Path: apps/web/lib/data/fleet.ts
//
// ─────────────────────────────────────────
// FLEET DATA — Yana Transit
//
// Car images go in:   /public/images/cars/<id>.jpg
// Interior images:    /public/images/cars/<id>-interior.jpg
//
// When real photos are available, just drop them in
// public/images/cars/ with the matching filename —
// no code change needed.
// ─────────────────────────────────────────

export type CarCategory = 'economy' | 'sedan' | 'suv' | 'luxury';

export type BadgeStyle = 'blue' | 'navy' | 'green';

// Services this car is available for
export type CarService =
  | 'chauffeur'
  | 'self-drive'
  | 'airport'
  | 'outstation'
  | 'corporate'
  | 'events';

export type Car = {
  id: string; // used in URL: /fleet/[id]
  name: string;
  category: CarCategory;
  typeLabel: string; // displayed under car name on cards
  seats: number;
  transmission: string;
  pricePerDay: number; // ₹ per day (chauffeur-driven)
  pricePerKm?: number; // ₹ per km (outstation) — optional
  selfDrivePrice?: number; // ₹ per day (self-drive) — optional
  badge?: string;
  badgeStyle?: BadgeStyle;
  // Feature pills shown on card & detail page
  features: string[];
  // Short description for detail page hero
  description: string;
  // Available service types
  services: CarService[];
  // Image paths — use placeholder until real photos are added
  image: string; // /public/images/cars/<id>.jpg
  // Fuel type
  fuel: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  // AC — almost always true, but explicit
  ac: boolean;
};

export const FLEET: Car[] = [
  // ── ECONOMY ──────────────────────────────
  {
    id: 'maruti-swift',
    name: 'Maruti Swift',
    category: 'economy',
    typeLabel: 'Hatchback · Economy',
    seats: 4,
    transmission: 'Manual / Auto',
    fuel: 'petrol',
    ac: true,
    pricePerDay: 1200,
    pricePerKm: 10,
    selfDrivePrice: 999,
    badge: 'Best Value',
    badgeStyle: 'blue',
    description:
      "India's most popular hatchback — nimble in city traffic, fuel-efficient on highways. Perfect for solo travellers and couples looking for an economical, reliable ride.",
    features: ['Full AC', 'GPS Tracked', 'Insured', 'USB Charging'],
    services: ['chauffeur', 'self-drive', 'airport', 'outstation'],
    image: '/images/cars/maruti-swift.jpg',
  },
  {
    id: 'maruti-dzire',
    name: 'Maruti Dzire',
    category: 'sedan',
    typeLabel: 'Sedan · Economy',
    seats: 4,
    transmission: 'Manual / Auto',
    fuel: 'petrol',
    ac: true,
    pricePerDay: 1500,
    pricePerKm: 11,
    selfDrivePrice: 1200,
    description:
      'A compact, comfortable sedan beloved by outstation travellers. Excellent mileage, smooth ride, and spacious enough for a family of four with luggage.',
    features: ['Full AC', 'GPS Tracked', 'Insured', 'Music System'],
    services: ['chauffeur', 'self-drive', 'airport', 'outstation', 'corporate'],
    image: '/images/cars/maruti-dzire.jpg',
  },

  // ── SEDAN ────────────────────────────────
  {
    id: 'honda-city',
    name: 'Honda City',
    category: 'sedan',
    typeLabel: 'Sedan · Mid-Range',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'petrol',
    ac: true,
    pricePerDay: 2100,
    pricePerKm: 14,
    selfDrivePrice: 1800,
    badge: 'Popular',
    badgeStyle: 'navy',
    description:
      'A premium sedan with a refined cabin, powerful engine, and smooth automatic gearbox. Ideal for business travel, airport transfers, and comfortable city commutes.',
    features: [
      'Full AC',
      'GPS Tracked',
      'Insured',
      'Leather Seats',
      'USB Charging',
    ],
    services: ['chauffeur', 'self-drive', 'airport', 'outstation', 'corporate'],
    image: '/images/cars/honda-city.jpg',
  },
  {
    id: 'hyundai-verna',
    name: 'Hyundai Verna',
    category: 'sedan',
    typeLabel: 'Sedan · Mid-Range',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'petrol',
    ac: true,
    pricePerDay: 2000,
    pricePerKm: 13,
    selfDrivePrice: 1700,
    description:
      'A stylish, feature-packed sedan with a sunroof and ventilated seats. Great for corporate travel and long-distance comfort.',
    features: [
      'Full AC',
      'Sunroof',
      'GPS Tracked',
      'Insured',
      'Ventilated Seats',
    ],
    services: ['chauffeur', 'self-drive', 'airport', 'outstation', 'corporate'],
    image: '/images/cars/hyundai-verna.jpg',
  },

  // ── SUV / MPV ────────────────────────────
  {
    id: 'innova-crysta',
    name: 'Innova Crysta',
    category: 'suv',
    typeLabel: 'MPV · 7-Seater',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'diesel',
    ac: true,
    pricePerDay: 3500,
    pricePerKm: 16,
    badge: 'Family Fav',
    badgeStyle: 'green',
    description:
      'The gold standard for family travel and group outstation trips in India. Spacious, powerful diesel engine, and a premium cabin that handles both city and highway with ease.',
    features: [
      'Full AC',
      'GPS Tracked',
      'Insured',
      '7 Seats',
      'Luggage Space',
      'Verified Driver',
    ],
    services: ['chauffeur', 'airport', 'outstation', 'corporate', 'events'],
    image: '/images/cars/innova-crysta.jpg',
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    category: 'suv',
    typeLabel: 'SUV · Full-Size',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'diesel',
    ac: true,
    pricePerDay: 5500,
    pricePerKm: 22,
    badge: 'Premium',
    badgeStyle: 'navy',
    description:
      'A bold, commanding SUV built for every terrain — from Rajasthan highways to Himalayan mountain roads. The top choice for premium group travel and VIP transfers.',
    features: [
      'Full AC',
      'GPS Tracked',
      'Insured',
      '4WD Ready',
      'Leather Seats',
      'Sunroof',
    ],
    services: ['chauffeur', 'airport', 'outstation', 'corporate', 'events'],
    image: '/images/cars/toyota-fortuner.jpg',
  },
  {
    id: 'kia-carens',
    name: 'Kia Carens',
    category: 'suv',
    typeLabel: 'MPV · 6-Seater',
    seats: 6,
    transmission: 'Automatic',
    fuel: 'diesel',
    ac: true,
    pricePerDay: 2800,
    pricePerKm: 15,
    selfDrivePrice: 2400,
    description:
      'A modern, feature-rich MPV with a panoramic sunroof and ventilated front seats. Perfect for family trips and comfortable corporate group transfers.',
    features: [
      'Full AC',
      'Sunroof',
      'GPS Tracked',
      'Insured',
      '6 Seats',
      'USB Charging',
    ],
    services: ['chauffeur', 'self-drive', 'airport', 'outstation', 'corporate'],
    image: '/images/cars/kia-carens.jpg',
  },

  // ── LUXURY ───────────────────────────────
  {
    id: 'mercedes-e-class',
    name: 'Mercedes E-Class',
    category: 'luxury',
    typeLabel: 'Luxury · Executive',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'petrol',
    ac: true,
    pricePerDay: 9500,
    pricePerKm: 35,
    badge: 'Luxury',
    badgeStyle: 'blue',
    description:
      'The pinnacle of executive travel. Buttery smooth ride, hand-stitched leather interior, and a commanding presence that makes every arrival unforgettable.',
    features: [
      'Full AC',
      'GPS Tracked',
      'Insured',
      'Leather Interior',
      'Chauffeur Uniform',
      'Privacy Glass',
    ],
    services: ['chauffeur', 'airport', 'corporate', 'events'],
    image: '/images/cars/mercedes-e-class.jpg',
  },
  {
    id: 'bmw-5-series',
    name: 'BMW 5 Series',
    category: 'luxury',
    typeLabel: 'Luxury · Premium',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'petrol',
    ac: true,
    pricePerDay: 10500,
    pricePerKm: 38,
    description:
      'Sport meets luxury. The BMW 5 Series combines dynamic driving pleasure with a refined interior — ideal for senior executives, high-profile events, and wedding convoys.',
    features: [
      'Full AC',
      'GPS Tracked',
      'Insured',
      'Leather Interior',
      'Ambient Lighting',
      'Chauffeur Uniform',
    ],
    services: ['chauffeur', 'airport', 'corporate', 'events'],
    image: '/images/cars/bmw-5-series.jpg',
  },
];

// ─────────────────────────────────────────
// HELPER UTILITIES
// ─────────────────────────────────────────

/** Get all unique categories from the fleet */
export const FLEET_CATEGORIES: { value: CarCategory | 'all'; label: string }[] =
  [
    { value: 'all', label: 'All Vehicles' },
    { value: 'economy', label: 'Economy' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV / MPV' },
    { value: 'luxury', label: 'Luxury' },
  ];

/** Filter fleet by category */
export function filterFleet(category: CarCategory | 'all'): Car[] {
  if (category === 'all') return FLEET;
  return FLEET.filter((car) => car.category === category);
}

/** Get a single car by id (for detail page) */
export function getCarById(id: string): Car | undefined {
  return FLEET.find((car) => car.id === id);
}

/** Format price in Indian Rupee style */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
