import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  Compass,
  Plane,
  Hotel,
  Building2,
  Car,
  Users,
  Camera,
  Heart,
  MapPin,
  ShieldCheck,
  Sunrise,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Clock,
  Bed,
  Star,
  Coffee,
  Check,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Plane,
  Hotel,
  Building2,
  Car,
  Users,
  Camera,
  Heart,
  MapPin,
  ShieldCheck,
  Sunrise,
};

export const ServicesPage: React.FC = () => {
  const { openInquiry } = useSafari();

  const hotelCategories = [
    {
      title: 'City Business & Transit Hotels',
      subtitle: 'Nairobi & Eldoret Luxury Stays',
      description: 'Ideal for arrival layovers, international departures, and business travel near JKIA, Wilson Airport, and Eldoret Airport.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      examples: 'Hemingways Karen, Nairobi Serena, Radisson Blu, Sarova Stanley, Boma Inn Eldoret',
      tag: 'City & Transit',
    },
    {
      title: 'Wilderness Lodges & Tented Camps',
      subtitle: 'Maasai Mara, Amboseli & Serengeti',
      description: 'Handpicked safari sanctuaries with direct wildlife waterhole views, private plunge pools, and authentic eco-luxury.',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      examples: 'Angama Mara, Governors’ Camp, Ol Tukai Amboseli, Mara Serena, Four Seasons Serengeti',
      tag: 'Bush & Wildlife',
    },
    {
      title: 'Tropical Coastal Beach Resorts',
      subtitle: 'Diani Beach, Watamu & Zanzibar',
      description: 'Powder-white sand beachfront resorts, private ocean villas, and barefoot luxury hideaways on the Swahili Coast.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      examples: 'The Sands at Nomad Diani, Hemingways Watamu, Zuri Zanzibar, Swahili Beach Resort',
      tag: 'Beach & Island',
    },
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Services</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
              End-to-End Travel Excellence
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Comprehensive Safari & Travel Services
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              From hotel & resort bookings, private 4x4 Land Cruisers, and airport VIP transfers to scenic bush flights, corporate retreats, and hot air balloons, we orchestrate every detail.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 2. Spotlight: Hotel & Luxury Accommodation Booking Desk */}
        <div className="mb-16 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1E7A2E] uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4 text-[#F7941D]" />
              <span>Direct Accommodation Partnerships</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Hotel, Lodge & Resort Reservation Desk
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Skip the booking engine markups. As a licensed Kenyan tour operator, Smugsafaris maintains direct contracted rates with leading luxury hotels, heritage safari lodges, and oceanfront resorts across Kenya, Tanzania, and Zanzibar.
            </p>
          </div>

          {/* 3 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {hotelCategories.map((cat, idx) => (
              <div key={idx} className="bg-stone-50 rounded-2xl border border-stone-200/70 overflow-hidden flex flex-col justify-between group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs border border-white/20">
                    {cat.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-sm font-extrabold leading-snug">{cat.title}</h3>
                    <span className="text-[11px] text-amber-300 font-semibold">{cat.subtitle}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <div className="pt-3 border-t border-stone-200/60 text-[11px] text-stone-500 font-medium">
                    <span className="font-bold text-stone-700 block mb-0.5">Featured Partners:</span>
                    <span className="line-clamp-2">{cat.examples}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hotel Booking Perks Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-stone-50 to-amber-50 rounded-2xl p-5 border border-emerald-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-stone-800">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Check className="w-4 h-4 text-[#1E7A2E]" />
                Best Rate Guarantee
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Check className="w-4 h-4 text-[#1E7A2E]" />
                Free Room Upgrades
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Check className="w-4 h-4 text-[#1E7A2E]" />
                Complimentary Transfers
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Check className="w-4 h-4 text-[#1E7A2E]" />
                Corporate & Group Terms
              </span>
            </div>

            <button
              onClick={() => openInquiry()}
              className="shrink-0 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <Bed className="w-4 h-4" />
              <span>Book a Hotel or Lodge</span>
            </button>
          </div>
        </div>

        {/* 3. Full Services Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-2">
            All Safari & Travel Services
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mb-8">
            Tailor any service individually or combine them with a customized private safari itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {SERVICES_DATA.map((srv) => {
            const Icon = ICON_MAP[srv.iconName] || Compass;

            return (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1E7A2E] border border-emerald-200/70 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-extrabold text-stone-900 mb-1">
                    {srv.title}
                  </h3>
                  <span className="text-xs font-bold text-[#1E7A2E] block mb-3">
                    {srv.tagline}
                  </span>

                  <p className="text-xs text-stone-600 leading-relaxed mb-5">
                    {srv.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {srv.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => openInquiry()}
                    className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-stone-400 font-semibold">
                    Customizable
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. 24/7 Concierge Guarantee Box */}
        <div className="bg-gradient-to-br from-[#0F3516] to-[#0A260F] rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5 text-[#FDB913]" />
              Dedicated 24/7 Operations Desk
            </div>
            <h3 className="text-2xl font-extrabold mb-2">
              Need Hotel Bookings, Airport VIP Transfers, or Urgent Logistics?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Whether you need last-minute 5-star hotel suites in Nairobi, private air charters from Wilson, or meet-and-greet protocol at JKIA and Eldoret Airport, our safari desk responds promptly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/254741938127"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-stone-900 bg-[#FDB913] hover:bg-[#ffc42e] rounded-xl text-center shadow-md transition-all"
            >
              WhatsApp Concierge
            </a>
            <button
              onClick={() => openInquiry()}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-center transition-all cursor-pointer"
            >
              Request Custom Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
