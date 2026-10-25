import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { useSafari } from '../context/SafariContext';
import { TOURS_DATA } from '../data/safariData';
import {
  Compass,
  Calendar,
  ShieldCheck,
  Star,
  Users,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Camera,
  ChevronDown,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';

const MIGRATION_TIMELINE = [
  {
    season: 'Peak River Crossing Season',
    months: 'July – October',
    status: 'High Demand',
    badgeColor: 'bg-rose-500 text-white',
    description:
      'Over two million wildebeest, zebras, and gazelles brave the predator-infested Mara River. Dramatic crocodile ambushes and relentless big cat action on open savannas.',
    highlights: ['Mara River crossings', 'Cheetah & lion hunts', 'Hot air balloon safaris over huge herds'],
  },
  {
    season: 'Calving & Newborn Season',
    months: 'January – March',
    status: 'Excellent Big Cat Action',
    badgeColor: 'bg-emerald-600 text-white',
    description:
      'Predators stalk the plains as hundreds of thousands of calves and foals are born. Warm, clear African skies and exceptional photography conditions.',
    highlights: ['Predator chases', 'Emerald landscape clarity', 'Ideal bird watching migration arrivals'],
  },
  {
    season: 'Emerald Secret Season',
    months: 'April – June & November',
    status: 'Best Value / Low Crowds',
    badgeColor: 'bg-amber-500 text-white',
    description:
      'Uncrowded vehicle tracks, lush golden grasslands, dramatic stormy skies for landscape photography, and discounted luxury safari lodge rates.',
    highlights: ['Exclusive sightings without crowds', 'Savings of 25-40% on luxury lodges', 'Flourishing wildlife baby season'],
  },
];

const MARA_FAQS = [
  {
    q: 'What is the best month to see the Great Migration in Maasai Mara?',
    a: 'The peak months to witness the world-famous Mara River crossings are from mid-July through October. During this window, over 1.5 million wildebeest and zebras mass along the Mara and Talek rivers. However, Maasai Mara offers world-class resident big cats (lions, leopards, cheetahs) all 12 months of the year.',
  },
  {
    q: 'How much does a Maasai Mara safari package cost?',
    a: 'Maasai Mara safari prices depend on your travel style and accommodation tier. A 3-Day / 4-Day mid-range lodge safari with Smugsafaris starts from $750 to $1,400 per person, while an ultra-luxury tented camp package (such as Mara Serena or Governors) ranges from $1,800 to $3,200 per person. All packages include private 4x4 Safari Land Cruiser transport, professional naturalist guide, full board meals, and AMREF Flying Doctors emergency insurance.',
  },
  {
    q: 'Is 3 days enough for a Maasai Mara safari?',
    a: 'A 3-day / 2-night safari gives you 3 to 4 comprehensive game drives, which is enough to view the Big Five and major predator action. For the full migration spectacle, river crossing patience, and a hot air balloon excursion, a 4-day or 5-day itinerary is strongly recommended.',
  },
  {
    q: 'Do your Maasai Mara packages include private 4x4 Land Cruisers?',
    a: 'Yes, 100% of Smugsafaris tours operate exclusively in customized 4x4 Toyota Safari Land Cruisers equipped with pop-up observation roofs for 360-degree photography, VHF long-range radios, device charging sockets, and onboard cooler boxes. We never cram strangers into minivans.',
  },
  {
    q: 'Can a Maasai Mara safari depart from Eldoret or Nairobi?',
    a: 'Yes! While most international guests depart from Nairobi (either overland in our 4x4s or via a 45-minute scheduled flight from Wilson Airport), Smugsafaris also coordinates direct overland departures from Eldoret and western Kenya, as well as connections via Kisumu.',
  },
  {
    q: 'What should I pack for a Maasai Mara safari?',
    a: 'Pack lightweight neutral clothing (khaki, beige, olive), a warm fleece or windbreaker for early morning open-roof game drives, wide-brim hat, high-SPF sunscreen, binoculars (8x42 or 10x42), camera with telephoto lens (200-600mm recommended), and insect repellent with DEET.',
  },
];

export const MaasaiMaraPillarPage: React.FC = () => {
  const { openInquiry } = useSafari();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const maraTours = TOURS_DATA.filter((t) =>
    t.destinations.some((d) => d.toLowerCase().includes('mara'))
  );

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristDestination',
        name: 'Maasai Mara National Reserve',
        description: 'World-renowned wildlife sanctuary famous for the annual Great Wildebeest Migration, African Big Five, and high predator densities.',
        touristType: ['Wildlife Photography', 'Luxury Safari', 'Family Safari', 'Big Five Safari'],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -1.4931,
          longitude: 35.1441,
        },
        containedInPlace: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: MARA_FAQS.map((faq) => ({
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
            name: 'Maasai Mara Safari Packages',
            item: 'https://www.smugsafaris.co.ke/maasai-mara-safari-packages',
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-20">
      <SeoHead
        title="Maasai Mara Safari Packages & Great Migration Tours 2025/2026 | Smugsafaris"
        description="Book top-rated Maasai Mara safari packages with Smugsafaris. Witness the Great Wildebeest Migration, Big Five predator action, private 4x4 Land Cruisers with pop-up roof, luxury tented camps, and certified naturalist guides."
        canonicalPath="/maasai-mara-safari-packages"
        keywords="maasai mara safari packages, great wildebeest migration safari kenya, 3 days maasai mara safari price, maasai mara tour operator kenya, private 4x4 maasai mara tour, maasai mara river crossing safari"
        schema={pageSchema}
      />

      {/* Hero Banner */}
      <div className="relative bg-[#0A2610] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80"
            alt="Maasai Mara Safari and Great Migration in Kenya"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2610] via-[#0A2610]/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <Link to="/tours" className="hover:text-white transition-colors">Safaris</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Maasai Mara Packages</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Flame className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>World's #1 Wildlife Spectacle</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Maasai Mara Safari Packages & Great Migration Tours
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8">
              Experience the awe of millions of wildebeest, majestic lion prides, and sweeping golden savannas. Every Smugsafaris Maasai Mara safari includes private 4x4 Land Cruisers, certified KPSGA guides, luxury tented camps, and AMREF Flying Doctors rescue coverage.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openInquiry('Custom Maasai Mara Safari Package')}
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#F7941D] to-[#E8720C] hover:from-[#f99f34] hover:to-[#f07b15] rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Customize Your Mara Safari</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/254769920741?text=Hello%20Smugsafaris,%20I%20am%20inquiring%20about%20a%20Maasai%20Mara%20Safari%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#1E7A2E] hover:bg-[#166527] rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#FDB913]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Proof Badges */}
            <div className="mt-8 pt-6 border-t border-emerald-900/80 flex flex-wrap items-center gap-6 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7CC142]" />
                <span>TRA Licensed Tour Operator</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#FDB913] fill-[#FDB913]" />
                <span>4.9 / 5 Rating (650+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#FDB913]" />
                <span>100% Private 4x4 Land Cruisers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#1E7A2E]">2M+</span>
            <span className="text-xs text-stone-600 font-medium">Migrating Mammals Every Season</span>
          </div>
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#1E7A2E]">100%</span>
            <span className="text-xs text-stone-600 font-medium">Private 4x4 Pop-Up Roof Cruisers</span>
          </div>
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#1E7A2E]">12+ Yrs</span>
            <span className="text-xs text-stone-600 font-medium">Guide Bush Tracking Experience</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#F7941D]">24/7</span>
            <span className="text-xs text-stone-600 font-medium">Concierge & AMREF Medevac Cover</span>
          </div>
        </div>
      </div>

      {/* Great Migration Seasonal Calendar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            When To Visit
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
            Maasai Mara Migration Timing & Wildlife Seasons
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Plan your safari around the natural migration rhythm or take advantage of lower seasonal lodge rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MIGRATION_TIMELINE.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-extrabold text-stone-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1E7A2E]" />
                    {item.months}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.season}</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                  Season Highlights:
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Maasai Mara Packages */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
                Handcrafted Itineraries
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                Top Maasai Mara Safari Packages
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Every package is fully customizable for couples, families, and private photographer groups.
              </p>
            </div>
            <Link
              to="/tours"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1E7A2E] hover:text-[#166527]"
            >
              <span>View All Safari Circuits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maraTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={tour.heroImage}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B3813]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FDB913]" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 text-stone-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                      ${tour.priceUSD.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-bold uppercase text-[#F7941D] block mb-1">
                      {tour.style}
                    </span>
                    <h3 className="text-base font-extrabold text-stone-900 mb-2 leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mb-4">{tour.tagline}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tour.destinations.map((d, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between gap-3 mt-auto">
                  <Link
                    to={`/tours/${tour.id}`}
                    className="text-xs font-bold text-stone-700 hover:text-stone-900 transition-colors"
                  >
                    View Itinerary
                  </Link>
                  <button
                    onClick={() => openInquiry(tour.title)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#166527] rounded-xl transition-colors cursor-pointer"
                  >
                    Book This Safari
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Included in Smugsafaris Maasai Mara Safari */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#0B3813] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7CC142]">
              The Smugsafaris Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-4">
              Everything Included in Your Maasai Mara Expedition
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
              We eliminate hidden charges. From park conservation fees and customized 4x4 Land Cruisers to gourmet bush meals and medical evacuation insurance, everything is arranged upfront.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>100% Private 4x4 Land Cruiser with Pop-Up Roof</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Certified KPSGA Gold/Silver Naturalist Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>All Maasai Mara Reserve Entry & Conservation Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Full Board Accommodation at Handpicked Camps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>AMREF Flying Doctors 24/7 Medevac Insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Unlimited Filtered Drinking Water in Safari Cruiser</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => openInquiry('Custom Maasai Mara Expedition')}
                className="px-6 py-3 text-xs font-bold text-[#0B3813] bg-[#FDB913] hover:bg-amber-400 rounded-xl transition-all cursor-pointer"
              >
                Request a Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Maasai Mara Safari FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
            Maasai Mara Safari & Migration FAQs
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Expert answers from our veteran Kenyan safari directors.
          </p>
        </div>

        <div className="space-y-3">
          {MARA_FAQS.map((faq, index) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black">
            Ready to Witness the Greatest Wildlife Show on Earth?
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl mx-auto mt-2 mb-6">
            Contact our safari architects now. We will curate your day-by-day Maasai Mara itinerary and reserve your private 4x4 Land Cruiser.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openInquiry('Maasai Mara Safari Inquiry')}
              className="px-6 py-3.5 text-xs font-bold text-[#0B3813] bg-white hover:bg-stone-100 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Get Custom Itinerary & Quote
            </button>
            <a
              href="tel:+254769920741"
              className="px-6 py-3.5 text-xs font-bold text-white bg-[#0B3813] hover:bg-[#166527] rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +254 769 920 741</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
