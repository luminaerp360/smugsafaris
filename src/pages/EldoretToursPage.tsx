import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { useSafari } from '../context/SafariContext';
import {
  MapPin,
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
} from 'lucide-react';

interface EldoretPackage {
  id: string;
  title: string;
  duration: string;
  destination: string;
  priceKES: string;
  priceUSD: number;
  highlight: string;
  image: string;
  category: 'Local North Rift' | 'National Safari' | 'Day Trip';
  link: string;
}

const ELDORET_PACKAGES: EldoretPackage[] = [
  {
    id: 'eldoret-kerio-valley-rimoi',
    title: '3-Day Kerio Valley & Rimoi Elephant Sanctuary',
    duration: '3 Days / 2 Nights',
    destination: 'Kerio Valley, Rimoi National Reserve & Chebloch Gorge',
    priceKES: 'From KES 38,500 / person',
    priceUSD: 420,
    highlight: 'Largest wild elephant herds in North Rift & panoramic viewpoints at Iten',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    category: 'Local North Rift',
    link: '/tours/classic-kenya-big-five',
  },
  {
    id: 'eldoret-maasai-mara-express',
    title: '4-Day Maasai Mara Safari Departing from Eldoret',
    duration: '4 Days / 3 Nights',
    destination: 'Maasai Mara National Reserve via Kericho / Narok',
    priceKES: 'From KES 78,000 / person',
    priceUSD: 850,
    highlight: 'Direct pickup from your home, hotel, or Eldoret Airport (EDL) in private 4x4 Cruiser',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    category: 'National Safari',
    link: '/tours/maasai-mara-great-migration',
  },
  {
    id: 'lake-bogoria-baringo-day-tour',
    title: 'Full-Day Lake Bogoria Hot Springs & Flamingo Tour',
    duration: '1 Full Day',
    destination: 'Lake Bogoria National Reserve & Lake Baringo',
    priceKES: 'From KES 14,500 / person',
    priceUSD: 160,
    highlight: 'Geysers, boiling springs, Greater & Lesser Flamingos, boat safari on Baringo',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
    category: 'Day Trip',
    link: '/tours',
  },
  {
    id: 'torok-falls-cherangani-hiking',
    title: 'Iten High Altitude & Torok Waterfall Adventure',
    duration: '1 Full Day',
    destination: 'Iten Viewpoint, Torok Falls & Cherangani Escarpment',
    priceKES: 'From KES 9,500 / person',
    priceUSD: 110,
    highlight: 'Home of Champions running camp visit, 200m waterfall hike & Great Rift Valley vistas',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    category: 'Day Trip',
    link: '/tours',
  },
  {
    id: 'eldoret-nakuru-naivasha-safari',
    title: '5-Day Lake Nakuru & Lake Naivasha Crescent Island',
    duration: '5 Days / 4 Nights',
    destination: 'Lake Nakuru Rhino Sanctuary & Naivasha Hell’s Gate',
    priceKES: 'From KES 92,000 / person',
    priceUSD: 1050,
    highlight: 'Black and white rhinos, cycling among zebras in Hell’s Gate, walking safari',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    category: 'National Safari',
    link: '/tours/classic-kenya-big-five',
  },
  {
    id: 'kakamega-forest-rainforest-safari',
    title: '2-Day Kakamega Equatorial Rainforest Expedition',
    duration: '2 Days / 1 Night',
    destination: 'Kakamega Rainforest Reserve',
    priceKES: 'From KES 28,000 / person',
    priceUSD: 310,
    highlight: 'Only remnant of Guineo-Congolian rainforest in Kenya: Colobus monkeys & rare birding',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    category: 'Local North Rift',
    link: '/tours',
  },
];

const ELDORET_FAQS = [
  {
    q: 'Which is the top-rated tours and travel company in Eldoret, Kenya?',
    a: 'Smugsafaris Tours & Travel is widely recognized as the premier licensed tours and travel company based in Eldoret, Kenya (KATO Bonded #482). We specialize in bespoke African wildlife safaris, North Rift regional excursions (Kerio Valley, Rimoi, Lake Bogoria), custom 4x4 Safari Land Cruiser hire, corporate travel, and airport transfers at Eldoret International Airport (EDL).',
  },
  {
    q: 'Can I book a Maasai Mara or Amboseli safari starting directly from Eldoret?',
    a: 'Yes, absolutely! We provide seamless door-to-door safari departures directly from Eldoret. Our customized 4x4 Safari Land Cruisers pick you up from your residence, hotel in Eldoret, or upon arrival at Eldoret International Airport (EDL) and take you straight to the Maasai Mara, Lake Nakuru, Amboseli, or Samburu without needing to detour through Nairobi.',
  },
  {
    q: 'What local day trips and excursions are available from Eldoret?',
    a: 'Eldoret is the gateway to the scenic North Rift. Popular day trips include the Iten World Athletics Viewpoint & Torok Falls, Kerio Valley panoramic drives and Chebloch Gorge, Rimoi National Reserve elephant watching, Lake Bogoria geysers and flamingos, and birdwatching in Kakamega Rainforest.',
  },
  {
    q: 'Do you offer 4x4 Safari Land Cruiser car hire in Eldoret?',
    a: 'Yes! Smugsafaris maintains an exclusive fleet of custom-built 4x4 Safari Land Cruisers in Eldoret equipped with pop-up photography roofs, high-clearance off-road suspension, long-range fuel tanks, UHF/VHF safari communication radios, onboard cool-boxes, and USB/220V charging ports. All vehicles come with professional KPSGA-certified naturalist driver-guides.',
  },
  {
    q: 'How do I get airport transfers from Eldoret International Airport (EDL)?',
    a: 'You can pre-book our executive airport transfer service via WhatsApp (+254 741 938 127) or phone (+254 769 920 741). Our professional chauffeur meets you inside the terminal with a personalized name-board, handles your luggage, and drives you safely to any hotel, lodge, or private residence in Eldoret, Kitale, Kapsabet, or Iten.',
  },
  {
    q: 'Where is Smugsafaris located in Eldoret and what are the working hours?',
    a: 'Our main safari operations desk is headquartered in Eldoret, Uasin Gishu County, Kenya (P.O. Box 30100 Eldoret). Our reservations team is available daily from 7:00 AM to 8:00 PM, and our 24/7 guest helpline operates round-the-clock for travelers on active safaris.',
  },
];

export const EldoretToursPage: React.FC = () => {
  const { openInquiry } = useSafari();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // Eldoret-specific Schema Graph
  const eldoretSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TravelAgency', 'LocalBusiness'],
        '@id': 'https://www.smugsafaris.co.ke/tours-and-travel-companies-in-eldoret#travelagency',
        name: 'Smugsafaris Tours & Travel - Eldoret',
        alternateName: [
          'Smugsafaris Eldoret',
          'Tours and Travel Company in Eldoret',
          'Eldoret Safari Agency',
        ],
        url: 'https://www.smugsafaris.co.ke/tours-and-travel-companies-in-eldoret',
        telephone: '+254769920741',
        email: 'info@smugsafaris.co.ke',
        priceRange: '$$',
        currenciesAccepted: 'KES, USD, EUR, GBP',
        paymentAccepted: 'Credit Card, Bank Wire, M-Pesa',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Eldoret Town Center',
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
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '07:00',
            closes: '20:00',
          },
        ],
        areaServed: [
          'Eldoret',
          'Uasin Gishu County',
          'North Rift',
          'Iten',
          'Kitale',
          'Nandi Hills',
          'Kenya',
          'East Africa',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '148',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: ELDORET_FAQS.map((faq) => ({
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
            name: 'Tours & Travel Companies in Eldoret',
            item: 'https://www.smugsafaris.co.ke/tours-and-travel-companies-in-eldoret',
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1A1A1A]">
      <SeoHead
        title="Tours and Travel Companies in Eldoret, Kenya | Smugsafaris"
        description="Top-rated tours and travel company in Eldoret, Kenya. Book custom African safaris starting from Eldoret, Maasai Mara tours, 4x4 Land Cruiser hire, and North Rift excursions."
        keywords="tours and travel companies in eldoret, tour companies in eldoret, tours and travel in eldoret, travel agents in eldoret, best tour company in eldoret, eldoret safari company, eldoret car hire, eldoret airport transfers, north rift tours, smugsafaris eldoret"
        canonicalPath="/tours-and-travel-companies-in-eldoret"
        schema={eldoretSchema}
      />

      {/* Hero Header Section */}
      <section className="relative isolate bg-[#122415] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden border-b border-[#25462A]">
        <div className="absolute inset-0 bg-[#122415]/90 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Local Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>Headquartered in Eldoret, Uasin Gishu County · KATO Bonded #482</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Premier Tours and Travel Company in{' '}
              <span className="bg-gradient-to-r from-[#FDB913] via-[#F7941D] to-[#E8720C] bg-clip-text text-transparent">
                Eldoret, Kenya
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              Looking for trusted <strong>tours and travel companies in Eldoret</strong>? Smugsafaris is your home-grown safari specialist. From direct departures to the Maasai Mara and Amboseli, to scenic North Rift excursions and airport transfers, we offer 100% private 4x4 safaris tailored to your exact budget and travel style.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => openInquiry('Eldoret Safari Inquiry')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-sm font-extrabold shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request Eldoret Safari Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/254741938127?text=Hello%20Smugsafaris%20Eldoret!%20I%20am%20inquiring%20about%20tours%20and%20travel%20services%20in%20Eldoret."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-600/60 text-emerald-200 text-sm font-bold transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Eldoret Desk</span>
              </a>

              <a
                href="tel:+254769920741"
                className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#FDB913]" />
                <span>+254 769 920 741</span>
              </a>
            </div>

            {/* Verification Stats */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>KATO Bonded #482</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Private 4x4 Fleet in Eldoret</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Eldoret Airport (EDL) Pickups</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FDB913] fill-[#FDB913] shrink-0" />
                <span>4.9★ Local Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Smugsafaris as Your Eldoret Tour Operator */}
      <section className="py-14 sm:py-18 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Direct From Eldoret
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-2">
              Why Smugsafaris is Eldoret’s Trusted Tours & Travel Company
            </h2>
            <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
              Unlike online booking brokers who subcontract your trip, we are locally based right here in Eldoret. When you travel with us, you deal directly with the owners, licensed guides, and fleet managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1E7A2E] mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Custom 4x4 Fleet in Eldoret</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Our custom Toyota Land Cruisers are parked and serviced in Eldoret. Each vehicle features pop-up safari roof hatches, power inverters for camera batteries, onboard cooler boxes, and high-frequency communication radios.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Eldoret Airport (EDL) Transfers</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Flying in via Eldoret International Airport? We offer meet-and-greet terminal services, VIP transfers to Rupa Mills, Sirikwa, Boma Inn, or direct transfers to national parks without stopping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1E7A2E] mb-4">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">North Rift & National Safari Circuits</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Whether you want a day excursion to Kerio Valley & Chebloch Gorge, a weekend at Rimoi Elephant Reserve, or a 7-day Big Five safari to Maasai Mara, Lake Nakuru, and Amboseli, we curate seamless itineraries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours & Safaris Starting in Eldoret */}
      <section className="py-14 sm:py-18 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
                Itineraries & Excursions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                Popular Safaris & Trips Departing from Eldoret
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                All itineraries include 4x4 Land Cruiser transport, certified driver-guide, and full logistics.
              </p>
            </div>
            <Link
              to="/tours"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7A2E] hover:text-emerald-700"
            >
              <span>Explore All Safari Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ELDORET_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-lg flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={`${pkg.title} - Tours in Eldoret`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#122415]/80 backdrop-blur-md text-emerald-200 border border-white/20">
                      {pkg.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-white shadow">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1E7A2E]" />
                      <span>{pkg.destination}</span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                      {pkg.highlight}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-neutral-400 font-medium">Pricing</div>
                      <div className="text-xs font-bold text-[#1E7A2E]">{pkg.priceKES}</div>
                    </div>

                    <button
                      onClick={() => openInquiry(`Inquiry for ${pkg.title} (Eldoret Departure)`)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered in Eldoret */}
      <section className="py-14 sm:py-18 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Comprehensive Tours & Travel Services in Eldoret
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              From individual vacationers and international travelers to corporate team retreats and wedding travel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Car className="w-8 h-8 text-[#1E7A2E] mb-3" />
              <h3 className="text-sm font-bold text-neutral-900">4x4 Safari Car Hire</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Safari-customized Land Cruisers with pop-up roofs for hire in Eldoret, accompanied by licensed, English-speaking driver-guides.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Plane className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="text-sm font-bold text-neutral-900">Airport & Hotel Transfers</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Seamless, punctual connections between Eldoret Airport (EDL), Kisumu Airport, Wilson Airport, and major regional hotels.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Users className="w-8 h-8 text-[#1E7A2E] mb-3" />
              <h3 className="text-sm font-bold text-neutral-900">Corporate & Group Retreats</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Custom team-building weekends in Iten, Kerio Valley, Naivasha, and Bogoria for Eldoret businesses, NGOs, and government delegations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200">
              <Globe className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="text-sm font-bold text-neutral-900">Flight & Lodge Bookings</h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Direct partnerships with Kenya’s leading lodge chains (Serena, Sarova, Sopa) and regional safari bush flight operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section (FAQ Schema Target) */}
      <section className="py-14 sm:py-18 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Questions About Tours & Travel in Eldoret
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Everything you need to know about booking safaris, day trips, and car hire in Eldoret.
            </p>
          </div>

          <div className="space-y-3">
            {ELDORET_FAQS.map((faq, idx) => {
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

      {/* Eldoret Contact & Office Section */}
      <section className="py-14 sm:py-18 bg-[#122415] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FDB913]">
                Contact Our Eldoret Office
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                Plan Your Safari With Eldoret’s Dedicated Specialists
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Whether you need a quick quote for a 4x4 Land Cruiser in Eldoret, a family holiday to Maasai Mara, or an airport pick-up at EDL, our safari architects are ready to assist.
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FDB913] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Eldoret Safari Desk</div>
                    <div className="text-emerald-100/80">Eldoret Town, Uasin Gishu County, Kenya (P.O. Box 30100 Eldoret)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#FDB913] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Direct Phone Lines</div>
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
                    <div className="font-bold text-white">Email Address</div>
                    <div className="text-emerald-100/80">
                      <a href="mailto:info@smugsafaris.co.ke" className="underline hover:text-white">info@smugsafaris.co.ke</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FDB913] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Hours of Operation</div>
                    <div className="text-emerald-100/80">Daily: 7:00 AM – 8:00 PM (EAT) · 24/7 Helpline for Active Safari Guests</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Request Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-neutral-900 shadow-2xl">
              <h3 className="text-xl font-bold text-neutral-900">
                Request a Free Custom Safari Itinerary
              </h3>
              <p className="text-xs text-neutral-600 mt-1 mb-6">
                Tell us your preferred dates and interests. We will respond with a day-by-day plan within 24 hours.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => openInquiry('Eldoret Direct Quote Request')}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-sm font-extrabold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FDB913]" />
                  <span>Open Safari Itinerary Builder</span>
                </button>

                <a
                  href="https://wa.me/254741938127?text=Hello%20Smugsafaris%20Eldoret!%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20safari%20departing%20from%20Eldoret."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#0F5E1F] text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#1E7A2E]" />
                  <span>Chat With Our Eldoret Desk on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
