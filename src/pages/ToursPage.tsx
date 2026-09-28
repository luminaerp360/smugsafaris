import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TOURS_DATA, TourPackage } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import { SafariCostEstimator } from '../components/SafariCostEstimator';
import {
  Compass,
  Clock,
  MapPin,
  Users,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Filter,
  X,
} from 'lucide-react';

export const ToursPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice, openInquiry } = useSafari();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Sync from URL search params on mount
  useEffect(() => {
    const dest = searchParams.get('destination');
    const style = searchParams.get('style');
    const duration = searchParams.get('duration');
    if (dest) setSelectedDestination(dest);
    if (style) setSelectedStyle(style);
    if (duration) setSelectedDuration(duration);
  }, [searchParams]);

  const allDestinations = useMemo(() => {
    const set = new Set<string>();
    TOURS_DATA.forEach((t) => t.destinations.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, []);

  const styles = [
    'Wildlife & Big Five',
    'Great Migration',
    'Bush & Beach',
    'Luxury Flying Safari',
    'Family & Group',
    'Honeymoon',
  ];

  const tiers = ['Mid-Range Comfort', 'Luxury Tented Camp', 'Budget Camping'];

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Destination filter
      if (selectedDestination !== 'all') {
        const matchesDest = tour.destinations.some((d) =>
          d.toLowerCase().includes(selectedDestination.toLowerCase())
        );
        if (!matchesDest) return false;
      }

      // Style filter
      if (selectedStyle !== 'all' && tour.style !== selectedStyle) {
        return false;
      }

      // Duration filter
      if (selectedDuration === 'short' && (tour.durationDays < 3 || tour.durationDays > 4)) {
        return false;
      }
      if (selectedDuration === 'medium' && (tour.durationDays < 5 || tour.durationDays > 7)) {
        return false;
      }
      if (selectedDuration === 'extended' && tour.durationDays < 8) {
        return false;
      }

      // Tier filter
      if (selectedTier !== 'all' && tour.tier !== selectedTier) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText =
          tour.title.toLowerCase().includes(q) ||
          tour.tagline.toLowerCase().includes(q) ||
          tour.destinations.some((d) => d.toLowerCase().includes(q)) ||
          tour.style.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedDestination, selectedStyle, selectedDuration, selectedTier, searchQuery, sortBy]);

  const handleImageError = (tourId: string) => {
    setFailedImages((prev) => ({ ...prev, [tourId]: true }));
  };

  const clearAllFilters = () => {
    setSelectedDestination('all');
    setSelectedStyle('all');
    setSelectedDuration('all');
    setSelectedTier('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedDestination !== 'all' ||
    selectedStyle !== 'all' ||
    selectedDuration !== 'all' ||
    selectedTier !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Tours & Safaris</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <Compass className="w-3.5 h-3.5 text-[#FDB913]" />
              Authentic East Africa Expeditions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Explore Our Handcrafted African Safaris
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Every safari package is 100% customizable, conducted in private 4x4 Land Cruisers with pop-up roofs, accompanied by certified naturalist guides, and backed by AMREF Flying Doctors rescue coverage.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Filter & Tours Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by park, animal, or tour name..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Destination Dropdown */}
            <div>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">All Destinations</option>
                {allDestinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style Dropdown */}
            <div>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">All Safari Styles</option>
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Dropdown */}
            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="short">3 - 4 Days (Short Getaway)</option>
                <option value="medium">5 - 7 Days (Classic Safari)</option>
                <option value="extended">8+ Days (Epic Grand Tour)</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter & Results Info */}
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-600">
              <span className="font-bold text-stone-800">
                {filteredTours.length} {filteredTours.length === 1 ? 'Safari Found' : 'Safaris Found'}
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 text-[#1E7A2E] hover:underline font-semibold ml-2 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200/80 rounded-lg text-xs font-semibold text-stone-700 border-none focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration (Days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/80 p-8 shadow-xs">
            <Compass className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 mb-1">No safari itineraries match your criteria</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mb-5">
              Try loosening your filters or contact our team to craft a 100% tailor-made private safari matching your exact wish list.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#166527] rounded-xl transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTours.map((tour) => {
              const imgUrl = failedImages[tour.id]
                ? 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'
                : tour.heroImage;

              return (
                <div
                  key={tour.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image/Video Container with Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    {tour.video ? (
                      <video
                        src={tour.video}
                        poster={imgUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={imgUrl}
                        alt={tour.title}
                        loading="lazy"
                        onError={() => handleImageError(tour.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {tour.bestSeller && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FDB913] text-stone-900 shadow-sm">
                          Best Seller
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-stone-800 backdrop-blur-xs shadow-sm">
                        {tour.style}
                      </span>
                    </div>

                    {/* Bottom Specs on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium z-10">
                      <span className="inline-flex items-center gap-1 bg-stone-900/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-[#FDB913]" />
                        {tour.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-stone-900/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <Users className="w-3 h-3 text-emerald-400" />
                        Max {tour.maxGroupSize}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Destinations List */}
                      <div className="flex items-center gap-1 text-[11px] text-[#1E7A2E] font-bold mb-1.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{tour.destinations.join(' • ')}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-extrabold text-stone-900 group-hover:text-[#1E7A2E] transition-colors line-clamp-1 mb-1.5">
                        <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
                      </h3>

                      {/* Tagline / Overview */}
                      <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                        {tour.tagline}
                      </p>

                      {/* Highlights Bullet List */}
                      <div className="space-y-1 mb-4 text-[11px] text-stone-600">
                        {tour.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#1E7A2E] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">
                          From (Per Person)
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-stone-900">
                            {formatPrice(tour.priceUSD)}
                          </span>
                          {tour.originalPriceUSD && (
                            <span className="text-[11px] text-stone-400 line-through">
                              {formatPrice(tour.originalPriceUSD)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openInquiry(tour.id)}
                          className="px-3 py-2 text-xs font-bold text-[#0F5E1F] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
                        >
                          Inquire
                        </button>
                        <Link
                          to={`/tours/${tour.id}`}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-xl shadow-xs hover:shadow transition-all inline-flex items-center gap-1"
                        >
                          <span>Itinerary</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Interactive Safari Cost Estimator */}
      <div className="border-t border-stone-200">
        <SafariCostEstimator />
      </div>
    </div>
  );
};
