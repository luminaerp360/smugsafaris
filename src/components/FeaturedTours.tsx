import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TOURS_DATA, TourPackage } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  Clock,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Check,
  Search,
  SlidersHorizontal,
  Play,
  Pause,
} from 'lucide-react';

interface FeaturedToursProps {
  filterDestination?: string;
  filterStyle?: string;
  filterDuration?: string;
}

const TourCardMedia: React.FC<{
  tour: TourPackage;
  hasImgFailed: boolean;
  onImageError: () => void;
}> = ({ tour, hasImgFailed, onImageError }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#182F1D]">
      {tour.video ? (
        <video
          ref={videoRef}
          src={tour.video}
          poster={tour.heroImage}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : !hasImgFailed ? (
        <img
          src={tour.heroImage}
          alt={tour.title}
          referrerPolicy="no-referrer"
          onError={onImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#182F1D] to-[#2D5A34] text-white text-center">
          <Compass className="w-10 h-10 text-[#7CC142] mb-2" />
          <span className="text-sm font-bold">{tour.title}</span>
        </div>
      )}

      {/* Gradient Scrim for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

      {/* Best Seller badge top-left */}
      {tour.bestSeller && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#F7941D] to-[#E8720C] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
          Best Seller
        </div>
      )}

      {/* Video Play/Pause Control top-right */}
      {tour.video && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-transform active:scale-90 cursor-pointer"
            title={isPlaying ? 'Pause preview' : 'Play preview'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
        </div>
      )}

      {/* Overlay Duration & Style */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium z-10">
        <span className="flex items-center gap-1.5 drop-shadow-md">
          <Clock className="w-3.5 h-3.5 text-[#FDB913]" />
          <span>{tour.duration}</span>
        </span>
        <span className="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-semibold text-neutral-200">
          {tour.style}
        </span>
      </div>
    </div>
  );
};

export const FeaturedTours: React.FC<FeaturedToursProps> = ({
  filterDestination = 'all',
  filterStyle = 'all',
  filterDuration = 'all',
}) => {
  const { formatPrice, openTourDetail, openInquiry } = useSafari();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Safaris' },
    { id: 'Wildlife & Big Five', label: 'Big Five & Wildlife' },
    { id: 'Great Migration', label: 'Great Migration' },
    { id: 'Bush & Beach', label: 'Bush & Beach' },
    { id: 'Luxury Flying Safari', label: 'Flying Safaris' },
  ];

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Category filter
      if (selectedCategory !== 'all' && tour.style !== selectedCategory) {
        return false;
      }
      // Hero destination filter
      if (filterDestination !== 'all') {
        const matchesDest = tour.destinations.some((d) =>
          d.toLowerCase().includes(filterDestination.toLowerCase())
        );
        if (!matchesDest) return false;
      }
      // Hero style filter
      if (filterStyle !== 'all' && tour.style !== filterStyle) {
        return false;
      }
      // Hero duration filter
      if (filterDuration === 'short' && (tour.durationDays < 3 || tour.durationDays > 4)) {
        return false;
      }
      if (filterDuration === 'medium' && (tour.durationDays < 5 || tour.durationDays > 7)) {
        return false;
      }
      if (filterDuration === 'extended' && tour.durationDays < 8) {
        return false;
      }
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText =
          tour.title.toLowerCase().includes(q) ||
          tour.tagline.toLowerCase().includes(q) ||
          tour.destinations.some((d) => d.toLowerCase().includes(q));
        if (!matchesText) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, filterDestination, filterStyle, filterDuration, searchQuery, sortBy]);

  const handleImageError = (tourId: string) => {
    setFailedImages((prev) => ({ ...prev, [tourId]: true }));
  };

  return (
    <section id="tours" className="py-16 md:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              Handcrafted African Itineraries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
              Featured Safari Packages
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-2xl">
              Each package is 100% customizable to your exact dates, group size, and comfort preferences. Private 4x4 Land Cruiser with professional wildlife guide included.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E] cursor-pointer"
            >
              <option value="featured">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs (Segmented Control per Section 1.A of constitution) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/70 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#0F5E1F] shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Keyword Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Mara, Amboseli..."
              className="w-full bg-white border border-neutral-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-md mx-auto">
            <Compass className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-800">No safaris match your filter</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting your destination or style search, or contact our safari planners for a tailor-made route.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-white bg-[#1E7A2E] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTours.map((tour) => {
              const hasImgFailed = failedImages[tour.id];

              return (
                <div
                  key={tour.id}
                  className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E7A2E]/40 transition-all duration-300 flex flex-col"
                >
                  {/* Image/Video Media Container */}
                  <TourCardMedia
                    tour={tour}
                    hasImgFailed={hasImgFailed}
                    onImageError={() => handleImageError(tour.id)}
                  />

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata (Zero-pill discipline) */}
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-1.5">
                        <span>{tour.destinations.join(', ')}</span>
                        <span aria-hidden="true">·</span>
                        <span>Max {tour.maxGroupSize} Guests</span>
                      </div>

                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#1E7A2E] transition-colors line-clamp-2">
                        <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
                      </h3>

                      <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {tour.overview}
                      </p>

                      {/* Top Highlights List */}
                      <ul className="mt-3.5 space-y-1.5 border-t border-neutral-100 pt-3">
                        {tour.highlights.slice(0, 2).map((hl, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                            <Check className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price & Action Row */}
                    <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                          From per person
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-[#0F5E1F] tabular-nums">
                            {formatPrice(tour.priceUSD)}
                          </span>
                          {tour.originalPriceUSD && (
                            <span className="text-xs text-neutral-400 line-through tabular-nums">
                              {formatPrice(tour.originalPriceUSD)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/tours/${tour.id}`}
                          className="px-3 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors inline-block"
                        >
                          Itinerary
                        </Link>
                        <button
                          onClick={() => openInquiry(tour.id)}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#0F5E1F] rounded-lg transition-colors cursor-pointer shadow-sm"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Safari Tailor-Made Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#182F1D] to-[#254B2D] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#3A6B43]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FDB913] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Looking for Something Unique?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              We Tailor-Make Safaris to Your Exact Dreams
            </h3>
            <p className="mt-1 text-sm text-neutral-300 max-w-xl">
              Tell us your travel dates, wish-list animals, and budget. Our senior safari architects in Eldoret will craft a custom day-by-day proposal within 24 hours.
            </p>
          </div>

          <button
            onClick={() => openInquiry()}
            className="shrink-0 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#F7941D] to-[#E8720C] hover:from-[#f99f34] hover:to-[#f07b15] rounded-xl shadow-md transition-all duration-200 cursor-pointer transform active:scale-95"
          >
            Request Custom Safari Proposal
          </button>
        </div>
      </div>
    </section>
  );
};
