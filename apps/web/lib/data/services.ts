// Path: apps\web\lib\data\services.ts

// ─────────────────────────────────────────
// SERVICES DATA — Yana Transite
// Each service maps to a card in ServicesSection.
// priceLabel is the display string shown on the card.
// ─────────────────────────────────────────

export type Service = {
  id: string;
  icon: string;
  name: string;
  description: string; // short — used on homepage ServicesSection card
  longDescription: string; // longer — used on /services page
  priceLabel: string;
  waMessage: string;
  highlights: string[]; // 3–4 bullet points shown on /services page card
  available: string; // e.g. "All India · 50+ Cities"
};

export const SERVICES: Service[] = [
  {
    id: 'chauffeur-driven',
    icon: '👨‍✈️',
    name: 'Chauffeur-Driven',
    description:
      'Sit back, relax and arrive in comfort. Our vetted, uniformed drivers know every city road and outstation route across India.',
    longDescription:
      'Our chauffeur service puts a trained, uniformed driver behind the wheel so you can focus on what matters — work, rest, or simply enjoying the journey. Every driver is police-verified, route-trained, and rated by customers after each trip.',
    priceLabel: 'Starts ₹1,200 / day',
    waMessage:
      "Hi! I'm interested in a Chauffeur-Driven car rental with Yana Transit.",
    highlights: [
      'Police-verified & uniformed drivers',
      'On-time pickup, every time',
      'Available for local, outstation & airport',
      'GST invoice on every booking',
    ],
    available: 'All India · 50+ Cities',
  },
  {
    id: 'self-drive',
    icon: '🗝️',
    name: 'Self-Drive',
    description:
      'Take the wheel yourself. Well-maintained cars, flexible pickup, and GPS included — your adventure, your pace.',
    longDescription:
      'Freedom to go wherever, whenever. Our self-drive fleet is well-maintained, fully insured, and GPS-equipped. Flexible pickup and drop locations, easy paperwork on WhatsApp, and 24/7 roadside assistance — your adventure, your rules.',
    priceLabel: 'Starts ₹999 / day',
    waMessage: "Hi! I'm interested in a Self-Drive rental with Yana Transit.",
    highlights: [
      'Fully insured with zero hidden charges',
      'GPS tracker included in every car',
      '24/7 roadside assistance',
      'Flexible pickup & doorstep delivery',
    ],
    available: 'Select Cities · Expanding Soon',
  },
  {
    id: 'airport-transfer',
    icon: '✈️',
    name: 'Airport Transfers',
    description:
      "On-time pickups and drops at all major airports. Flight tracking included — we wait even if you're delayed.",
    longDescription:
      "Never stress about catching a flight again. We track your flight in real time — if it's delayed, so is your driver. Clean cars, professional drivers, and a meet-and-greet option at all major Indian airports.",
    priceLabel: 'Starts ₹799 / transfer',
    waMessage: 'Hi! I need an Airport Transfer booking with Yana Transit.',
    highlights: [
      'Real-time flight tracking',
      'No charge for flight delays',
      'Meet & greet at arrival gate',
      '20+ airports across India',
    ],
    available: '20+ Airports · Pan India',
  },
  {
    id: 'outstation',
    icon: '🛣️',
    name: 'Outstation Trips',
    description:
      'One-way or round-trip. Rajasthan, Kerala, Himachal — our drivers handle long-distance with ease and care.',
    longDescription:
      'From weekend getaways to cross-state road trips, our outstation service covers every route. Experienced long-distance drivers, well-maintained cars with highway capability, and transparent per-km pricing with no surprises.',
    priceLabel: 'Starts ₹12 / km',
    waMessage: 'Hi! I want to book an Outstation Trip with Yana Transit.',
    highlights: [
      'One-way & round-trip packages',
      'Transparent per-km pricing',
      'Experienced highway drivers',
      'Rajasthan, Kerala, Himachal & more',
    ],
    available: 'All India · Any Route',
  },
  {
    id: 'corporate',
    icon: '🏢',
    name: 'Corporate Rentals',
    description:
      'Managed accounts, GST invoices, monthly billing and a dedicated fleet for your business travel needs.',
    longDescription:
      "Streamline your company's travel with a dedicated Yana Transit account. Monthly billing, GST-compliant invoices, a single point of contact, and a reserved fleet — so your team always travels on time.",
    priceLabel: 'Custom pricing',
    waMessage:
      "Hi! I'm interested in Corporate Rental services from Yana Transit.",
    highlights: [
      'GST-compliant invoicing',
      'Monthly billing & managed accounts',
      'Dedicated account manager',
      'Multi-city fleet management',
    ],
    available: 'Pan India · Custom Plans',
  },
  {
    id: 'events',
    icon: '🎉',
    name: 'Events & Occasions',
    description:
      'Weddings, conferences, pilgrimages — book a fleet. Tempo Travellers and luxury cars available for groups.',
    longDescription:
      'Make every occasion memorable with Yana Transit. From wedding convoys with decorated luxury cars to pilgrimage groups needing Tempo Travellers — we manage full fleet logistics so you can focus on celebrating.',
    priceLabel: 'Starts ₹4,500 / day',
    waMessage:
      'Hi! I want to book cars for an Event or Occasion with Yana Transit.',
    highlights: [
      'Wedding convoys & decorated cars',
      'Group bookings with Tempo Travellers',
      'Conference & corporate event fleets',
      'Pilgrimage & tour group packages',
    ],
    available: 'All India · Group Bookings',
  },
];
