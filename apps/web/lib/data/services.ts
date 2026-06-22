// Path: apps\web\lib\data\services.ts

// ─────────────────────────────────────────
// SERVICES DATA — YAANA Transit
// Each service maps to a card in ServicesSection.
// Self-Drive removed. ETS added.
// No pricing displayed (B2B corporate only).
// ─────────────────────────────────────────

export type Service = {
  id: string;
  icon: string; // emoji icon
  name: string;
  description: string;
  waMessage: string; // pre-filled WhatsApp message
};

export const SERVICES: Service[] = [
  {
    id: 'chauffeur-driven',
    icon: '👨‍✈️',
    name: 'Chauffeur-Driven',
    description:
      'Sit back, relax and arrive in comfort. Our vetted, uniformed chauffeurs know every city road and outstation route across India.',
    waMessage:
      "Hi! I'm interested in a Chauffeur-Driven car rental with YAANA Transit.",
  },
  {
    id: 'employee-transportation',
    icon: '🏢',
    name: 'Employee Transportation Services',
    description:
      'End-to-end employee pick-up and drop solutions for corporates. Scheduled routes, real-time tracking, and dedicated fleet management for your workforce.',
    waMessage:
      "Hi! I'm interested in Employee Transportation Services (ETS) with YAANA Transit.",
  },
  {
    id: 'airport-transfer',
    icon: '✈️',
    name: 'Airport Transfers',
    description:
      "On-time pickups and drops at all major airports. Flight tracking included — our chauffeurs wait even if you're delayed.",
    waMessage: 'Hi! I need an Airport Transfer booking with YAANA Transit.',
  },
  {
    id: 'outstation',
    icon: '🛣️',
    name: 'Outstation Trips',
    description:
      'One-way or round-trip. Rajasthan, Kerala, Himachal — our experienced chauffeurs handle long-distance with ease and care.',
    waMessage: 'Hi! I want to book an Outstation Trip with YAANA Transit.',
  },
  {
    id: 'corporate',
    icon: '💼',
    name: 'Corporate Rentals',
    description:
      'Managed accounts, GST invoices, monthly billing and a dedicated fleet for your business travel needs across all major cities.',
    waMessage:
      "Hi! I'm interested in Corporate Rental services from YAANA Transit.",
  },
  {
    id: 'events',
    icon: '🎉',
    name: 'Events & Occasions',
    description:
      'Conferences, corporate events, and special occasions — book a dedicated fleet. Luxury sedans, premium SUVs and large-capacity vehicles available.',
    waMessage:
      'Hi! I want to book cars for an Event or Occasion with YAANA Transit.',
  },
];
