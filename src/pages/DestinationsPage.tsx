import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DESTINATIONS_DATA, Destination, TOURS_DATA } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Compass,
  CheckCircle2,
  Search,
  Video,
} from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { openInquiry } = useSafari();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const highlightParam = searchParams.get('highlight');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((dest) => {
      if (selectedCountry !== 'all' && dest.country.toLowerCase() !== selectedCountry.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          dest.name.toLowerCase().includes(q) ||
          dest.tagline.toLowerCase().includes(q) ||
          dest.description.toLowerCase().includes(q) ||
          dest.keyWildlife.some((w) => w.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCountry, searchQuery]);

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Destinations</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <MapPin className="w-3.5 h-3.5 text-[#FDB913]" />
              Kenya & Tanzania National Parks
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Explore East Africa’s Wildest Havens
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              From the endless savannahs of the Serengeti and Maasai Mara to the dramatic snow peaks of Mount Kilimanjaro and turquoise beaches of Zanzibar.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2. Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Country Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'Kenya', label: 'Kenya Parks' },
              { id: 'Tanzania', label: 'Tanzania Parks' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCountry(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCountry === tab.id
                    ? 'bg-[#1E7A2E] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parks or animals..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] focus:bg-white"
            />
          </div>
        </div>

        {/* 3. Destinations Cards */}
        <div className="space-y-10">
          {filteredDestinations.map((dest, index) => {
            const isHighlighted =
              highlightParam &&
              dest.name.toLowerCase().includes(highlightParam.toLowerCase());

            const relatedTours = TOURS_DATA.filter((t) =>
              t.destinations.some(
                (d) =>
                  d.toLowerCase().includes(dest.name.toLowerCase()) ||
                  dest.relatedTourIds.includes(t.id)
              )
            );

            return (
              <div
                key={dest.id}
                id={`dest-${dest.id}`}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md ${
                  isHighlighted ? 'ring-2 ring-[#1E7A2E] border-[#1E7A2E]' : 'border-stone-200/80'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Photo / Video Column */}
                  <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden bg-stone-900 group/media">
                    {dest.video ? (
                      <video
                        src={dest.video}
                        poster={dest.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/95 text-stone-900 shadow-md">
                        {dest.country}
                      </span>
                      {dest.video && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
                          <span className="w-2 h-2 rounded-full bg-[#FDB913] animate-pulse" />
                          <Video className="w-3.5 h-3.5 text-[#FDB913]" />
                          <span>4K Footage</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1E7A2E] uppercase tracking-wider mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{dest.country} Sanctuary</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-1">
                        {dest.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-stone-500 mb-3 italic">
                        "{dest.tagline}"
                      </p>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                        {dest.description}
                      </p>

                      {/* Best time to visit badge */}
                      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/70">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Best Time to Visit: {dest.bestTimeToVisit}</span>
                      </div>

                      {/* Key Wildlife Pills */}
                      <div className="mb-5">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                          Key Wildlife to Spot
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {dest.keyWildlife.map((animal, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-[#0F5E1F] border border-emerald-100"
                            >
                              🐾 {animal}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6 space-y-1 text-xs text-stone-600">
                        {dest.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions & Tour Links */}
                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        {relatedTours.length > 0 ? (
                          <span className="text-xs font-bold text-stone-700">
                            Featured in {relatedTours.length} Safari {relatedTours.length === 1 ? 'Package' : 'Packages'}
                          </span>
                        ) : (
                          <span className="text-xs text-stone-500">Custom safaris available</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openInquiry()}
                          className="px-4 py-2 text-xs font-bold text-[#0F5E1F] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
                        >
                          Custom Quote
                        </button>
                        <Link
                          to={`/tours?destination=${encodeURIComponent(dest.name)}`}
                          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5"
                        >
                          <span>View Safaris to {dest.name}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Custom Destination Planning Card */}
        <div className="mt-16 bg-gradient-to-br from-[#0F3516] to-[#0A260F] rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
              Tailor-Made Route Planning
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Combine Multiple National Parks into One Seamless Journey
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mb-6 leading-relaxed">
              Want to pair the Great Migration in Maasai Mara with the white sands of Zanzibar, or fly directly to Samburu's northern frontier? Our safari architects make it effortless.
            </p>
            <button
              onClick={() => openInquiry()}
              className="px-8 py-3.5 text-sm font-extrabold text-stone-900 bg-[#FDB913] hover:bg-[#ffc42e] rounded-xl shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Plan Your Multi-Park Safari
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
