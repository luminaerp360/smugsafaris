import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_STATS, TEAM_MEMBERS } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  Compass,
  Award,
  ShieldCheck,
  Heart,
  Users,
  MapPin,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openInquiry } = useSafari();

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <Compass className="w-3.5 h-3.5 text-[#FDB913]" />
              Our Story & Heritage
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Passionate Guardians of the African Wilderness
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Founded and operated in Eldoret, Kenya, Smugsafaris was born out of deep reverence for East Africa’s wildlife, diverse ecosystems, and rich tribal cultures.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 2. Story Section with Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider block">
              Native Roots, Global Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
              Crafting Unforgettable African Memories for Over a Decade
            </h2>
            <p>
              Smugsafaris Tours & Travel is a premier safari specialist based in Eldoret, Kenya. What began as a passionate team of indigenous naturalist guides with two 4x4 Land Cruisers has grown into one of East Africa’s most trusted boutique safari operators.
            </p>
            <p>
              Unlike mass-market tour aggregators that subcontract your safari to unknown third parties, Smugsafaris owns and maintains our customized 4x4 Land Cruiser fleet and employs full-time, certified naturalists. From your very first inquiry to the moment you board your flight home, you are looked after by our devoted team.
            </p>
            <p>
              We believe a true safari is not just about ticking animals off a list; it is about feeling the dawn chill on the savannah, hearing lion roars vibrate through your tent canvas at night, and learning the timeless tracking wisdom of our local guides.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"
                alt="Smugsafaris in the Maasai Mara"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-stone-100 hidden sm:block max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F5E1F] flex items-center justify-center font-black text-sm">
                  12+
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Years Guiding Safaris</h4>
                  <p className="text-[11px] text-stone-500">Over 4,850+ delighted travelers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Company Stats Grid */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs mb-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {COMPANY_STATS.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#1E7A2E] block">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-stone-800 block">
                  {stat.label}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Leadership & Expert Guides */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider">
              The People Behind Your Safari
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              Meet Our Expert Guides & Operations Team
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Our guides are native naturalists with deep tracking instincts and encyclopedic knowledge of East African fauna and flora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-xs">
                    {member.experience}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-stone-900 mb-0.5">
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold text-[#1E7A2E] block mb-3">
                      {member.role}
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Sustainability & Community Commitment */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FDB913] mb-2 block">
              Conservation & Community Pledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Protecting What We Love for Generations to Come
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
              Tourism must enrich the wilderness and its local human custodians. Smugsafaris actively practices low-impact eco-tourism, partners with solar-powered conservancy lodges, and directs a portion of every booking directly toward local primary school education and water access in Maasai Mara and Samburu borderlands.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Zero single-use plastic bottles in our 4x4 fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Fair wages and ethical labor standards for guides</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Strict non-harassment rules around big cat hunting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Direct community conservancy landowner royalties</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Quick CTA */}
        <div className="text-center">
          <button
            onClick={() => openInquiry()}
            className="px-8 py-3.5 text-sm font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FDB913]" />
            <span>Start Planning Your Safari with Our Team</span>
          </button>
        </div>
      </div>
    </div>
  );
};
