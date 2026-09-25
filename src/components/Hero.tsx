import React, { useState } from 'react';
import { useSafari } from '../context/SafariContext';
import { ShieldCheck, Compass, Calendar, Award, ArrowRight, MapPin, Sparkles, Star, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface HeroProps {
  onSearchFilter: (filters: { destination: string; style: string; duration: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchFilter }) => {
  const { openInquiry, scrollToSection, formatPrice } = useSafari();
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFilter({
      destination: selectedDestination,
      style: selectedStyle,
      duration: selectedDuration,
    });
    scrollToSection('tours');
  };

  return (
    <section
      id="home"
      className="relative isolate bg-[#122415] overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#25462A]"
    >
      {/* Background Layer 1: Solid Dark Forest Green */}
      <div className="absolute inset-0 bg-[#122415] pointer-events-none" />

      {/* Background Layer 2: Safari Landscape Scenery Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80")',
        }}
      />

      {/* Background Layer 3: Warm Sunset Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2213]/95 via-[#18351D]/80 to-[#E8720C]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#122415] via-transparent to-transparent pointer-events-none" />

      {/* Foreground Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#7CC142] animate-pulse" />
              <span>Explore • Discover • Experience</span>
              <span className="text-white/40">|</span>
              <span className="text-[#FDB913] font-bold">East Africa Wildlife Safaris</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance drop-shadow-md">
              Where the Wild Calls Your Name.
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg text-neutral-200 font-normal leading-relaxed text-balance max-w-2xl">
              Experience the untamed splendor of Kenya and East Africa. Witness the Great Migration in Maasai Mara, gaze upon Mount Kilimanjaro in Amboseli, and track the Big Five in custom 4x4 Land Cruisers with certified native guides.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openInquiry()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#F7941D] to-[#E8720C] hover:from-[#f99f34] hover:to-[#f07b15] rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Plan Your Safari</span>
              </button>

              <button
                onClick={() => scrollToSection('tours')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/25 transition-all duration-200 cursor-pointer"
              >
                <span>View Tour Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7CC142] shrink-0" />
                <span>KATO Bonded #482</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>KPSGA Silver Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#7CC142] shrink-0" />
                <span>Private 4x4 Cruisers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span>Flying Doctors Evac</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Safari Showcase Card with Brand Emblem */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 sm:p-7 shadow-2xl overflow-hidden">
              {/* Top Card Bar with Emblem */}
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <Logo variant="icon" theme="dark" className="w-12 h-12" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider block">
                      Direct Tour Operator
                    </span>
                    <h3 className="text-base font-extrabold text-white leading-none mt-0.5">
                      Smugsafaris Expeditions
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-400/20 border border-amber-400/40 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>

              {/* Feature Highlights of the Trip */}
              <div className="my-5 space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-inner border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
                    alt="Maasai Mara Big Cats Safari"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase text-[#FDB913] tracking-wide">
                      Trending Itinerary
                    </span>
                    <h4 className="text-sm font-bold">7-Day Classic Kenya Big Five</h4>
                    <p className="text-[11px] text-neutral-300">
                      Maasai Mara · Lake Nakuru · Amboseli & Kilimanjaro
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7CC142] shrink-0" />
                    <span className="text-neutral-200">100% Private 4x4</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7CC142] shrink-0" />
                    <span className="text-neutral-200">All Park Fees Incl.</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-medium text-neutral-400 block uppercase tracking-wider">
                    From per person
                  </span>
                  <span className="text-2xl font-extrabold text-[#FDB913] tabular-nums">
                    {formatPrice(1850)}
                  </span>
                </div>

                <button
                  onClick={() => openInquiry('classic-kenya-big-five')}
                  className="px-4 py-2.5 rounded-xl bg-[#1E7A2E] hover:bg-[#238b34] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  Quick Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Safari Finder / Search Filter Widget */}
        <div className="mt-12 bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 sm:p-5 text-neutral-800">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] mb-3 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#F7941D]" />
            <span>Quick Safari Finder — Find Your Perfect East Africa Tour</span>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1E7A2E]" />
                Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">All East Africa Destinations</option>
                <option value="Maasai Mara">Maasai Mara (Kenya)</option>
                <option value="Amboseli">Amboseli & Kilimanjaro</option>
                <option value="Serengeti">Serengeti & Ngorongoro</option>
                <option value="Samburu">Samburu Northern Frontier</option>
                <option value="Zanzibar">Zanzibar Island</option>
              </select>
            </div>

            {/* Safari Style */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#1E7A2E]" />
                Safari Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">All Tour Styles</option>
                <option value="Wildlife & Big Five">Big Five Wildlife Safari</option>
                <option value="Great Migration">Great Migration Spectacle</option>
                <option value="Bush & Beach">Bush & Beach (Mara + Beach)</option>
                <option value="Luxury Flying Safari">Luxury Flying Safari</option>
              </select>
            </div>

            {/* Duration */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1E7A2E]" />
                Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short Getaway (3 - 4 Days)</option>
                <option value="medium">Classic Safari (5 - 7 Days)</option>
                <option value="extended">Grand Expedition (8+ Days)</option>
              </select>
            </div>

            {/* Submit Filter Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-[38px] inline-flex items-center justify-center gap-2 bg-[#1E7A2E] hover:bg-[#0F5E1F] text-white font-bold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <span>Find Safaris</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
