import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { useSafari } from '../context/SafariContext';
import {
  Car,
  ShieldCheck,
  Star,
  CheckCircle2,
  Users,
  Compass,
  Zap,
  Radio,
  Camera,
  Award,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Fuel,
  Wrench,
  Clock,
  Sparkles,
} from 'lucide-react';

const VEHICLE_SPECS = [
  {
    icon: Camera,
    title: 'Custom Pop-Up Safari Roof',
    desc: 'Heavy-duty fiberglass roof hatch lifts seamlessly, providing 360-degree unobstructed angles for wildlife photography and game viewing.',
  },
  {
    icon: Zap,
    title: '220V Inverter & USB Ports',
    desc: 'Charge cameras, drone batteries, and smartphones on the go with onboard power inverters at every seating row.',
  },
  {
    icon: Sparkles,
    title: '40L Electric Fridge / Cooler',
    desc: 'Keep drinking water, soft drinks, and snacks refreshingly chilled during warm African afternoon game drives.',
  },
  {
    icon: Radio,
    title: 'VHF Long-Range Two-Way Radio',
    desc: 'Stay connected with park rangers and sister safari guides for real-time alerts on rare predator movements and river crossings.',
  },
  {
    icon: Wrench,
    title: 'Twin Spares & High-Lift Jack',
    desc: 'Fitted with dual spare all-terrain tires, sand tracks, and a heavy-duty jack for total self-sufficiency in remote wilderness tracks.',
  },
  {
    icon: Users,
    title: 'Ergonomic Window Seats (7-8 Pax)',
    desc: 'Every guest is guaranteed an expansive sliding window seat with comfortable armrests and high-density foam cushions.',
  },
];

const CAR_HIRE_FAQS = [
  {
    q: 'Can I hire a 4x4 Safari Land Cruiser on self-drive basis in Kenya?',
    a: 'Smugsafaris provides 4x4 Safari Land Cruisers primarily with professional, certified English-speaking driver-guides. Kenyan national parks and remote bush tracks present extreme off-road terrain, flash riverbeds, and strict wildlife encounter regulations. A seasoned safari guide ensures your safety, handles complex park logistics, and spots animals that untrained eyes easily miss.',
  },
  {
    q: 'How much does it cost to hire a 4x4 Safari Land Cruiser in Kenya per day?',
    a: 'Our daily rental rates for customized Toyota Safari Land Cruisers typically range from $180 to $260 per day depending on duration and season. This rate includes the custom pop-up roof vehicle, professional driver-guide allowance, vehicle insurance, and comprehensive mechanical support.',
  },
  {
    q: 'Can we pick up or return the safari vehicle in Nairobi or Eldoret?',
    a: 'Yes! We offer flexible pick-up and drop-off hubs in Nairobi (JKIA Airport or hotels), Eldoret (Eldoret International Airport or town center), Kisumu, and Nakuru. One-way drop-offs can easily be arranged across Kenya.',
  },
  {
    q: 'Are cross-border safari trips to Tanzania or Uganda allowed?',
    a: 'Yes, with advance notice we arrange COMESA yellow cards, international vehicle registration permits, and cross-border customs clearances for safaris connecting Maasai Mara with the Serengeti, Ngorongoro Crater, or Uganda gorilla tracking circuits.',
  },
  {
    q: 'What is included in the vehicle hire rate?',
    a: 'Vehicle hire includes: 4x4 Toyota Land Cruiser with pop-up roof, services of an experienced KPSGA-certified driver-guide, comprehensive commercial insurance, vehicle entry permits for designated parks, onboard cooler box, device charging sockets, and 24/7 backup breakdown assistance.',
  },
];

export const CarHirePillarPage: React.FC = () => {
  const { openInquiry } = useSafari();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const carHireSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: '4x4 Safari Land Cruiser Hire Kenya with Driver Guide',
        image: 'https://www.smugsafaris.co.ke/images/fleet/cruiser-amboseli-kilimanjaro.jpg',
        description: 'Hire a customized Toyota 4x4 Safari Land Cruiser with pop-up roof, 220V charging, onboard cooler box, and professional naturalist driver-guide across Kenya.',
        brand: {
          '@type': 'Brand',
          name: 'Smugsafaris Fleet',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: '200',
          availability: 'https://schema.org/InStock',
          url: 'https://www.smugsafaris.co.ke/4x4-safari-land-cruiser-hire-kenya',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '658',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: CAR_HIRE_FAQS.map((faq) => ({
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
            item: 'https://www.smugsafaris.co.ke',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '4x4 Safari Land Cruiser Hire Kenya',
            item: 'https://www.smugsafaris.co.ke/4x4-safari-land-cruiser-hire-kenya',
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-20">
      <SeoHead
        title="4x4 Safari Land Cruiser Hire Kenya with Driver | Safari Car Rental Eldoret & Nairobi"
        description="Hire custom 4x4 Toyota Safari Land Cruisers in Kenya with certified driver-guides. Pop-up roofs, 220V charging, twin spares, and onboard fridge. Pick-up in Nairobi or Eldoret."
        canonicalPath="/4x4-safari-land-cruiser-hire-kenya"
        keywords="safari land cruiser hire kenya, 4x4 car hire eldoret, safari vehicle rental nairobi with driver, toyota land cruiser safari conversion hire, pop up roof car rental kenya, cross border safari car hire tanzania"
        ogImage="/images/fleet/cruiser-amboseli-kilimanjaro.jpg"
        schema={carHireSchema}
      />

      {/* Hero Section */}
      <div className="relative bg-[#0A2610] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fleet/cruiser-amboseli-kilimanjaro.jpg"
            alt="4x4 Safari Land Cruiser in Amboseli Kenya"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2610] via-[#0A2610]/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">4x4 Safari Land Cruiser Hire</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Car className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>Premium Safari Fleet Across Kenya</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              4x4 Safari Land Cruiser Hire Kenya
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8">
              Conquer the African savanna in comfort and style. Rent our custom-built Toyota 4x4 Safari Land Cruisers with pop-up photography roofs, 220V inverter power sockets, and licensed naturalist driver-guides. Available for dispatch from Nairobi and Eldoret.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openInquiry('4x4 Safari Land Cruiser Hire Inquiry')}
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#F7941D] to-[#E8720C] hover:from-[#f99f34] hover:to-[#f07b15] rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Check Vehicle Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/254769920741?text=Hello%20Smugsafaris,%20I%20am%20inquiring%20about%20hiring%20a%204x4%20Safari%20Land%20Cruiser."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#1E7A2E] hover:bg-[#166527] rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#FDB913]" />
                <span>Instant WhatsApp Quote</span>
              </a>
            </div>

            {/* Quick Proof Badges */}
            <div className="mt-8 pt-6 border-t border-emerald-900/80 flex flex-wrap items-center gap-6 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7CC142]" />
                <span>TRA Licensed Fleet Operator</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#FDB913] fill-[#FDB913]" />
                <span>4.9 / 5 Star Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#FDB913]" />
                <span>Includes Professional Driver-Guide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Stats Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#1E7A2E]">Toyota 70</span>
            <span className="text-xs text-stone-600 font-medium">Heavy Duty Safari Conversions</span>
          </div>
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#1E7A2E]">360°</span>
            <span className="text-xs text-stone-600 font-medium">Pop-Up Roof Photography Hatch</span>
          </div>
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#1E7A2E]">220V</span>
            <span className="text-xs text-stone-600 font-medium">Inverter Power Sockets Onboard</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#F7941D]">2 Hubs</span>
            <span className="text-xs text-stone-600 font-medium">Nairobi & Eldoret Depots</span>
          </div>
        </div>
      </div>

      {/* Vehicle Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Engineered For The Savanna
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
            Why Our 4x4 Safari Land Cruisers Stand Out
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Every vehicle in our fleet is custom outfitted specifically for tough African wildlife photography and off-road expedition comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEHICLE_SPECS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-[#1E7A2E]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-stone-900 mb-2">{spec.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{spec.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fleet Showcase & Comparison */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
                Vehicle Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1 mb-4">
                The Iconic Safari Land Cruiser Extended Wheelbase
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                Unlike ordinary rental SUVs or cramped safari vans, our customized Toyota Land Cruisers feature an extended chassis with heavy-duty suspension engineered to absorb corrugated dirt roads without tiring passengers.
              </p>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A2E] shrink-0" />
                  <span><strong>Seating Capacity:</strong> 7 to 8 passengers, all with individual window seats</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A2E] shrink-0" />
                  <span><strong>Drive System:</strong> 4x4 High/Low Range with differential lock for deep mud & sand</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A2E] shrink-0" />
                  <span><strong>Luggage Space:</strong> Oversized rear boot fitting soft duffle bags and camera gear</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A2E] shrink-0" />
                  <span><strong>Fuel Tank:</strong> Dual long-range diesel tanks giving 1,000+ km safari endurance</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => openInquiry('Safari Land Cruiser Hire Booking')}
                  className="px-6 py-3 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#166527] rounded-xl transition-all cursor-pointer"
                >
                  Book This Vehicle
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-300">
              <img
                src="/images/fleet/cruiser-amboseli-kilimanjaro.jpg"
                alt="Toyota 4x4 Safari Land Cruiser on safari with pop up roof"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Car Hire FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
            Kenya Safari Vehicle Rental FAQs
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Answers to common questions regarding car hire rates, driver allowances, and permits.
          </p>
        </div>

        <div className="space-y-3">
          {CAR_HIRE_FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-[#1E7A2E] transition-colors"
                >
                  <span className="text-sm">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#1E7A2E]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#0B3813] rounded-2xl p-8 sm:p-12 text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black">
            Reserve Your 4x4 Safari Land Cruiser Today
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto mt-2 mb-6">
            Contact our transport coordinator for guaranteed availability, tailored daily rates, and professional driver allocations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openInquiry('Reserve Safari Land Cruiser')}
              className="px-6 py-3.5 text-xs font-bold text-[#0B3813] bg-[#FDB913] hover:bg-amber-400 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Get Vehicle Quote
            </button>
            <a
              href="tel:+254769920741"
              className="px-6 py-3.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>Call +254 769 920 741</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
