// Path: apps\web\app\services\page.tsx

// Services page — /services
//
// Architecture: Full Server Component.
// No client state needed — all 6 service cards are
// static content. Framer Motion scroll animations
// are handled via whileInView inside the child
// component (ServicesGrid), which is "use client".
//
// SEO: generateMetadata gives each page its own
// <title> and <meta description> — critical for
// ranking on search terms like "airport transfer
// Mumbai" or "outstation car rental India".

import type { Metadata } from 'next';
import { SERVICES } from '@/lib/data/services';
import { SITE } from '@/lib/constants';
import ServicesGrid from '@/components/services/ServicesGrid';

// ── SEO metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `Our Services — ${SITE.name}`,
  description:
    'Chauffeur-driven rides, self-drive rentals, airport transfers, outstation trips, corporate leasing and event fleets — all across 50+ cities in India.',
  openGraph: {
    title: `Our Services — ${SITE.name}`,
    description:
      'Every kind of ride, across every city in India. Book via WhatsApp in minutes.',
    url: '/services',
  },
};

// ── Why-us trust points (shown in the bottom banner) ───────────────
const TRUST_POINTS = [
  { icon: '🛡️', text: 'Fully Insured Fleet' },
  { icon: '✅', text: 'Verified Drivers' },
  { icon: '🔒', text: 'No Hidden Charges' },
  { icon: '📞', text: '24 / 7 Support' },
];

// ── Page ────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-[#0B1F3A] pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Glow */}
        <div
          className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px]
                        rounded-full pointer-events-none
                        bg-[radial-gradient(circle,rgba(46,111,216,0.3)_0%,transparent_70%)]"
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
              <li className="text-white/60">Services</li>
            </ol>
          </nav>

          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 bg-[#2E6FD8]/20
                          border border-[#2E6FD8]/35 text-[#7EB3FF]
                          text-xs font-semibold tracking-wide uppercase
                          px-4 py-1.5 rounded-full mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7EB3FF] animate-pulse" />
            What We Offer
          </div>

          <h1
            className="font-poppins text-4xl md:text-5xl font-semibold
                         text-white leading-tight mb-4"
          >
            Services Built for{' '}
            <em className="not-italic text-[#7EB3FF]">India</em>
          </h1>

          <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
            From airport transfers to cross-state road trips — every service is
            built around how Indians actually travel. Book in minutes via
            WhatsApp or a single call.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10">
            {[
              { value: '6', label: 'Service types' },
              { value: '50+', label: 'Cities covered' },
              { value: '₹799', label: 'Starts from' },
              { value: '15 min', label: 'Avg. response time' },
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

      {/* ── Services grid (client — needs whileInView) ──────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <ServicesGrid services={SERVICES} />
      </section>

      {/* ── "How to Book" steps ─────────────────────────────────── */}
      <section className="bg-[#0B1F3A] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-[#7EB3FF] text-xs font-semibold tracking-[2px]
                          uppercase mb-3"
            >
              How It Works
            </p>
            <h2
              className="font-poppins text-2xl md:text-3xl font-semibold
                           text-white"
            >
              On the Road in{' '}
              <em className="not-italic text-[#7EB3FF]">3 Minutes</em>
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px
                          bg-white/5 rounded-2xl overflow-hidden border border-white/8"
          >
            {[
              {
                step: '01',
                icon: '🔍',
                title: 'Choose a Service',
                desc: 'Pick the service type that fits your journey — city ride, airport run, outstation, or corporate.',
              },
              {
                step: '02',
                icon: '💬',
                title: 'WhatsApp or Call',
                desc: "Tap 'Book Now' and a pre-filled WhatsApp message opens instantly. Or just call us directly.",
              },
              {
                step: '03',
                icon: '✅',
                title: 'Get Confirmed',
                desc: 'Receive booking confirmation, driver name, and vehicle details on WhatsApp before your trip.',
              },
              {
                step: '04',
                icon: '🚗',
                title: 'Travel Comfortably',
                desc: 'Your car arrives at your doorstep. Sit back — we handle everything from here.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-8 bg-white/3 hover:bg-white/[0.07]
                           transition-colors duration-300 relative"
              >
                <p
                  className="font-poppins text-5xl font-semibold
                              text-white/6 leading-none mb-4"
                >
                  {item.step}
                </p>
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3
                  className="font-poppins text-base font-semibold
                               text-white mb-2"
                >
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-100 py-6 px-6">
        <div
          className="max-w-7xl mx-auto flex flex-wrap items-center
                        justify-center gap-6 md:gap-12"
        >
          {TRUST_POINTS.map((t, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-lg">{t.icon}</span>
              <span className="text-sm font-medium text-slate-600">
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-poppins text-2xl md:text-3xl font-semibold
                         text-[#0B1F3A] mb-3"
          >
            Not sure which service fits?
          </h2>
          <p className="text-slate-500 text-base mb-8 max-w-lg mx-auto">
            Just tell us where you're going and when — our team will recommend
            the right option and confirm pricing in minutes.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center
                          justify-center gap-3"
          >
            <a
              href={`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
                'Hi Yana Transit! I need help choosing the right service for my trip.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#0B1F3A]
                         hover:bg-[#2E6FD8] text-white font-semibold
                         px-7 py-3.5 rounded-xl transition-all duration-300
                         hover:-translate-y-0.5 hover:shadow-lg
                         hover:shadow-[#2E6FD8]/25 w-full sm:w-auto
                         justify-center"
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
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-2.5 border border-slate-200
                         hover:border-[#0B1F3A] text-slate-600 hover:text-[#0B1F3A]
                         font-semibold px-7 py-3.5 rounded-xl transition-all
                         duration-300 w-full sm:w-auto justify-center"
            >
              📞 {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
