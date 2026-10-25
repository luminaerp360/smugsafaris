import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { useSafari } from '../context/SafariContext';
import { TOURS_DATA } from '../data/safariData';
import {
  ShieldCheck,
  Star,
  Compass,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Award,
  Car,
  Plane,
  Users,
  Sparkles,
  Camera,
  HelpCircle,
  Clock,
  ChevronDown,
  Navigation,
  Globe,
  MessageCircle,
  MapPin,
  HeartHandshake,
} from 'lucide-react';

const KENYA_FAQS = [
  {
    q: 'Which are the best tours and travel companies in Kenya?',
    a: 'When choosing among the best tours and travel companies in Kenya, prioritize licensed and bonded operators registered with the Kenya Association of Tour Operators (KATO) and the Tourism Regulatory Authority (TRA). Smugsafaris Tours & Travel (KATO Bonded #482) is a top-rated Kenyan tour operator renowned for bespoke 4x4 Land Cruiser safaris, certified KPSGA naturalist guides, transparent pricing with all park conservation fees included, and AMREF Flying Doctors emergency medical cover.',
  },
  {
    q: 'Why should I book with a local Kenyan tour operator instead of an international agency?',
    a: 'Booking directly with a local Kenyan tour company like Smugsafaris saves you 20% to 35% by cutting out foreign brokers and middlemen. You communicate directly with the local safari architects who design your day-by-day itinerary, you get custom private 4x4 vehicles with native naturalist guides who understand animal movements intimately, and your tourism spend directly supports local Kenyan wildlife conservation and community empowerment.',
  },
  {
    q: 'How much does a Kenya wildlife safari tour cost per person?',
    a: 'Kenya safari costs vary depending on accommodation tier and season. Budget camping safaris range from $180 to $280 per person/day; mid-range tented lodges range from $320 to $550 per person/day; and luxury flying safaris range from $650 to $1,400+ per person/day. With Smugsafaris, our rates are fully transparent: all park entry fees, private 4x4 Land Cruiser transport, full board meals, and certified guides are included upfront with no hidden surcharges.',
  },
  {
    q: 'What is the best time of year to visit Kenya for a safari?',
    a: 'Kenya is an exceptional year-round wildlife destination. The peak dry season from late June to October is ideal for witnessing the world-famous Great Wildebeest Migration in the Maasai Mara. January to March is warm, dry, and superb for big cat sightings and newborn animals. April to May (green season) offers lush emerald landscapes, fewer tourists, and discounted lodge rates.',
  },
  {
    q: 'What is the difference between a 4x4 Safari Land Cruiser and a safari minivan?',
    a: 'A custom 4x4 Toyota Safari Land Cruiser offers higher ground clearance, superior off-road handling in muddy terrain, larger pop-up roof hatches for 360-degree wildlife photography, and enhanced comfort on long corrugated park tracks compared to standard safari minivans. At Smugsafaris, 100% of our guided safaris operate exclusively in customized 4x4 Land Cruisers with power charging ports and onboard cooler boxes.',
  },
  {
    q: 'How do I verify if a tour company in Kenya is legitimate and safe?',
    a: 'Always verify three credentials before paying any deposit: 1) KATO Membership (check the official KATO directory for bonded status, such as Smugsafaris Bond #482); 2) Valid Tourism Regulatory Authority (TRA) operator license; and 3) Verified reviews on independent platforms like SafariBookings, TripAdvisor, and Google. Reputable companies provide formal VAT invoices and official Kenyan company bank accounts.',
  },
];

export const KenyaToursPage: React.FC = () => {
  const { openInquiry } = useSafari();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const kenyaSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TravelAgency', 'LocalBusiness'],
        '@id': 'https://www.smugsafaris.co.ke/tours-and-travel-companies-in-kenya#travelagency',
        name: 'Smugsafaris Tours & Travel Kenya',
        alternateName: [
          'Smugsafaris',
          'Tours and Travel Companies in Kenya',
          'Best Tour Operators in Kenya',
          'Kenya Safari Company',
        ],
        url: 'https://www.smugsafaris.co.ke/tours-and-travel-companies-in-kenya',
        telephone: '+254769920741',
        email: 'info@smugsafaris.co.ke',
        priceRange: '$$$',
        currenciesAccepted: 'USD, KES, EUR, GBP',
        paymentAccepted: 'Credit Card, Bank Wire, M-Pesa',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Eldoret & Nairobi Operations',
          addressLocality: 'Eldoret',
          addressRegion: 'Uasin Gishu County',
          postalCode: '30100',
          addressCountry: 'KE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 0.5143,
          longitude: 35.2698,
        },
        areaServed: [
          'Kenya',
          'East Africa',
          'Maasai Mara',
          'Amboseli',
          'Serengeti',
          'Nairobi',
          'Eldoret',
          'Mombasa',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '650',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: KENYA_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.smugsafaris.co.ke/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tours and Travel Companies in Kenya',
            item: 'https://www.smugsafaris.co.ke/tours-and-travel-companies-in-kenya',
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1A1A1A]">
      <SeoHead
        title="Best Tours and Travel Companies in Kenya | Smugsafaris"
        description="Looking for the best tours and travel companies in Kenya? Smugsafaris is a licensed Kenyan tour operator (KATO Bonded #482). Custom 4x4 African wildlife safaris, Maasai Mara, Amboseli, and bespoke luxury holidays."
        keywords="tours and travel companies in kenya, tour companies in kenya, best tour operators in kenya, travel agents in kenya, kenya safari companies, kenya wildlife tours, tour operators kenya, safari packages kenya, smugsafaris kenya, travel agency kenya"
        canonicalPath="/tours-and-travel-companies-in-kenya"
        schema={kenyaSchema}
      />

      {/* Hero Header */}
      <section className="relative isolate bg-[#122415] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden border-b border-[#25462A]">
        <div className="absolute inset-0 bg-[#122415]/90 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>Licensed & Bonded Kenyan Tour Operator · KATO Bonded #482</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Leading Tours and Travel Companies in{' '}
              <span className="bg-gradient-to-r from-[#FDB913] via-[#F7941D] to-[#E8720C] bg-clip-text text-transparent">
                Kenya
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              When searching for the <strong>best tours and travel companies in Kenya</strong>, trust, local authenticity, and private 4x4 logistics are everything. <strong>Smugsafaris Tours & Travel</strong> is a premier Kenyan safari specialist offering tailor-made Big Five safaris, Great Wildebeest Migration journeys, and luxury tented experiences with native naturalist guides across Kenya and East Africa.
            </p>

            {/* Quick Action CTA Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => openInquiry('Kenya Safari Consultation')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-sm font-extrabold shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Plan Your Kenya Safari</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20am%20inquiring%20about%20tours%20and%20travel%20packages%20in%20Kenya."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-600/60 text-emerald-200 text-sm font-bold transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Safari Concierge</span>
              </a>

              <Link
                to="/tours"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#FDB913]" />
                <span>Explore Packages</span>
              </Link>
            </div>

            {/* Credibility Marks */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>KATO Bonded #482</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Private 4x4 Cruisers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AMREF Flying Doctors Medevac</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FDB913] fill-[#FDB913] shrink-0" />
                <span>4.9★ from 650+ Travelers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide: What Sets Top Tour Companies in Kenya Apart */}
      <section className="py-14 sm:py-18 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              The Smugsafaris Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-2">
              Why Travelers Rank Smugsafaris Among the Best Tour Companies in Kenya
            </h2>
            <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
              Kenya has hundreds of tour operators, but only a selective group delivers authentic wildlife encounters, certified native expertise, and 100% financial security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1E7A2E] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">100% Financial Protection</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                As a fully bonded member of the Kenya Association of Tour Operators (KATO Bonded #482), your deposits and tour payments are completely insured and secured from the moment you book until the conclusion of your safari.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">No Minivans — 100% Private 4x4 Cruisers</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                We never compromise on your safari experience. Every tour travels in our custom-built Toyota 4x4 Land Cruisers with wide-aperture pop-up roofs, onboard refrigeration, power charging docks, and guaranteed window seats for every traveler.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1E7A2E] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Native KPSGA Naturalist Guides</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Our safari driver-guides are certified by the Kenya Professional Safari Guides Association (KPSGA). Born and raised in Kenya, they possess an intuitive understanding of animal behavior, tracking techniques, and birding biology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Kenya Safari Packages */}
      <section className="py-14 sm:py-18 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
                Top Safari Packages
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                Kenya’s Most Popular Wildlife Tours & Itineraries
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                All packages feature private 4x4 Land Cruisers, full board lodge stays, park fees, and certified guides.
              </p>
            </div>
            <Link
              to="/tours"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7A2E] hover:text-emerald-700"
            >
              <span>View All Safari Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOURS_DATA.slice(0, 6).map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-lg flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-[#EAE3D2]">
                  <img
                    src={tour.heroImage}
                    alt={`${tour.title} - Kenya Safari Tour`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#122415]/80 backdrop-blur-md text-emerald-200 border border-white/20">
                      {tour.style}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-white shadow">
                      {tour.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1E7A2E]" />
                      <span>{tour.destinations.join(' · ')}</span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                      {tour.overview}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-neutral-400 font-medium">Starting from</div>
                      <div className="text-sm font-extrabold text-[#1E7A2E]">
                        ${tour.priceUSD} <span className="text-[11px] font-normal text-neutral-400">/ person</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/tours/${tour.id}`}
                        className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-800 text-xs font-bold transition-all"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => openInquiry(`Inquiry for ${tour.title}`)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Covered Across Kenya */}
      <section className="py-14 sm:py-18 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Kenya’s Premier National Parks & Safari Circuits
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              From open savannahs and snow-capped mountain vistas to flamingo-fringed Rift Valley lakes and tropical white-sand coastlines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Compass className="w-7 h-7 text-[#1E7A2E] mb-2" />
              <h3 className="text-sm font-bold text-neutral-900">Maasai Mara National Reserve</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                World-famous Great Migration from July to October, Big Five predator territory, and luxury tented camps along the Mara River.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Compass className="w-7 h-7 text-amber-600 mb-2" />
              <h3 className="text-sm font-bold text-neutral-900">Amboseli National Park</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Free-ranging giant elephant herds framed against snow-capped Mount Kilimanjaro, Africa’s highest freestanding peak.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Compass className="w-7 h-7 text-[#1E7A2E] mb-2" />
              <h3 className="text-sm font-bold text-neutral-900">Lake Nakuru & Naivasha</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Protected black and white rhino sanctuaries, millions of lesser flamingos, boat safaris on Lake Naivasha, and Hell’s Gate cycling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Compass className="w-7 h-7 text-amber-600 mb-2" />
              <h3 className="text-sm font-bold text-neutral-900">Tsavo & Samburu Reserves</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Vast red elephant herds in Tsavo, volcanic lava flows, and the rare Samburu Special Five species in northern Kenya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Kenya FAQ Section (FAQ Schema Target) */}
      <section className="py-14 sm:py-18 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
              Essential Travel Advice
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Frequently Asked Questions About Tour Companies in Kenya
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Expert advice on selecting operators, planning budgets, and ensuring a safe African safari.
            </p>
          </div>

          <div className="space-y-3">
            {KENYA_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 hover:text-[#1E7A2E] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1E7A2E]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Consultation Section */}
      <section className="py-14 sm:py-18 bg-[#122415] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FDB913]">
                Start Planning Today
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                Connect With Kenya’s Trusted Safari Experts
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Whether you are organizing a private family holiday to the Maasai Mara, an Amboseli photography expedition, or a coastal beach extension to Diani, our senior safari architects respond promptly with custom day-by-day itineraries.
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#FDB913] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Phone Support</div>
                    <div className="text-emerald-100/80">
                      Kenya Desk: <a href="tel:+254769920741" className="underline hover:text-white">+254 769 920 741</a> / 0769 920 741
                    </div>
                    <div className="text-emerald-100/80">
                      USA Office: <a href="tel:+12569477516" className="underline hover:text-white">+1 (256) 947-7516</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#FDB913] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Email Inquiries</div>
                    <div className="text-emerald-100/80">
                      <a href="mailto:info@smugsafaris.co.ke" className="underline hover:text-white">info@smugsafaris.co.ke</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FDB913] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Licensed & Certified</div>
                    <div className="text-emerald-100/80">KATO Bonded #482 · KPSGA Professional Guides · AMREF Medevac Cover</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Request Form CTA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-neutral-900 shadow-2xl">
              <h3 className="text-xl font-bold text-neutral-900">
                Request a Free Custom Kenya Safari Itinerary
              </h3>
              <p className="text-xs text-neutral-600 mt-1 mb-6">
                Tell us your travel dates, preferred national parks, and budget. We will craft a bespoke day-by-day proposal within 24 hours.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => openInquiry('Kenya Custom Safari Proposal Request')}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-sm font-extrabold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FDB913]" />
                  <span>Open Safari Itinerary Builder</span>
                </button>

                <a
                  href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20safari%20in%20Kenya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#0F5E1F] text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#1E7A2E]" />
                  <span>Chat With Our Safari Desk on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
