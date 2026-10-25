import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, ShieldCheck, ArrowRight, Car, Sparkles, Star } from 'lucide-react';
import { useSafari } from '../context/SafariContext';

export const EldoretFeatureSection: React.FC = () => {
  const { openInquiry } = useSafari();

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#122415] rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-xl border border-[#25462A]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Context & Headlines */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-[#FDB913]" />
                <span>Eldoret Headquarters & Safari Fleet Hub</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Top-Rated Tours and Travel Company in{' '}
                <span className="bg-gradient-to-r from-[#FDB913] via-[#F7941D] to-[#E8720C] bg-clip-text text-transparent">
                  Eldoret, Kenya
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                Headquartered right here in Eldoret, <strong>Smugsafaris</strong> provides authentic, personalized safari adventures across Kenya. We specialize in private 4x4 Land Cruiser safaris starting from Eldoret to Maasai Mara, Lake Nakuru, and Amboseli, as well as North Rift excursions (Kerio Valley, Rimoi Elephant Sanctuary, Lake Bogoria) and Eldoret International Airport (EDL) executive transfers.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/tours-and-travel-companies-in-eldoret"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Eldoret Tours & Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => openInquiry('Eldoret Direct Inquiry from Homepage')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FDB913]" />
                  <span>Request Eldoret Quote</span>
                </button>
              </div>
            </div>

            {/* Right Col: Feature Highlights */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#FDB913] mb-1.5">
                  <Car className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">4x4 Fleet in Eldoret</span>
                </div>
                <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                  Toyota Land Cruisers with pop-up roofs, power inverters & high-frequency radios based in Eldoret.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#FDB913] mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">TRA Licensed Operator</span>
                </div>
                <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                  Fully licensed and compliant safari tour operator under Tourism Regulatory Authority (TRA) for peace of mind.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#FDB913] mb-1.5">
                  <Compass className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">Direct Departures</span>
                </div>
                <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                  Pick-up from your home, hotel, or Eldoret Airport (EDL) straight to any national park in Kenya.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#FDB913] mb-1.5">
                  <Star className="w-4 h-4 text-[#FDB913] fill-[#FDB913]" />
                  <span className="text-xs font-bold text-white">North Rift Excursions</span>
                </div>
                <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                  Day trips and multi-day tours to Kerio Valley, Rimoi, Iten Viewpoint, Lake Bogoria, and Kakamega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
