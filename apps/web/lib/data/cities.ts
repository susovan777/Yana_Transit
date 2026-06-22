// Path: apps\web\lib\data\cities.ts

// ─────────────────────────────────────────
// CITIES DATA — YAANA Transit
//
// City photos go in /public/images/cities/
// named exactly as <id>.jpg
// e.g. /public/images/cities/bengaluru.jpg
//
// gradient is shown as fallback if no photo.
// carCount removed — B2B, no fleet numbers shown.
// ─────────────────────────────────────────

export type City = {
  id: string;
  name: string;
  state: string;
  gradient: string; // CSS fallback gradient
};

export type OfficeType = 'head' | 'branch';

export type Office = {
  cityId: string; // matches City.id
  name: string;
  state: string;
  type: OfficeType;
};

// ─────────────────────────────────────────
// CITIES — displayed in the Cities section
// index 0 = large card (col-span-2 / row-span-2)
// ─────────────────────────────────────────
export const CITIES: City[] = [
  // ─ index 0 — large card
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    gradient: 'linear-gradient(145deg, #1e3a1a, #122510)',
  },
  // ─ index 1–5 — regular 1×1 cards
  {
    id: 'new-delhi',
    name: 'New Delhi',
    state: 'National Capital',
    gradient: 'linear-gradient(145deg, #2a1a4e, #1a0f34)',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    gradient: 'linear-gradient(145deg, #1a3a6e, #0d2a52)',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    gradient: 'linear-gradient(145deg, #3a2010, #261508)',
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    gradient: 'linear-gradient(145deg, #1a2e4e, #0d1e3a)',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    gradient: 'linear-gradient(145deg, #0f3048, #081e30)',
  },
];

// ─────────────────────────────────────────
// OFFICES — used in footer / contact section
// ─────────────────────────────────────────
export const OFFICES: Office[] = [
  {
    cityId: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    type: 'head',
  },
  {
    cityId: 'new-delhi',
    name: 'New Delhi',
    state: 'NCT of Delhi',
    type: 'branch',
  },
  {
    cityId: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    type: 'branch',
  },
  {
    cityId: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    type: 'branch',
  },
  {
    cityId: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    type: 'branch',
  },
  {
    cityId: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    type: 'branch',
  },
];
