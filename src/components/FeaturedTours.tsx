import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSafari } from '../context/SafariContext';
import {
  ArrowUpRight,
  Compass,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FeaturedToursProps {
  filterDestination?: string;
  filterStyle?: string;
  filterDuration?: string;
}

interface KenyaTripCard {
  id: string;
  tourId: string;
  name: string;
  region: string;
  description: string;
  image: string;
  badge?: string;
}

const KENYA_TRIPS_SHOWCASE: KenyaTripCard[] = [
  {
    id: 'maasai-mara',
    tourId: 'maasai-mara-great-migration',
    name: 'Maasai Mara',
    region: 'Southwestern Kenya',
    description: 'World-renowned wildebeest migration, dramatic Mara River crossings, and boundless golden savannah skies filled with Africa’s greatest predators.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=75',
    badge: 'World Wonder',
  },
  {
    id: 'mount-kenya',
    tourId: 'classic-kenya-big-five',
    name: 'Mount Kenya',
    region: 'Central Highlands',
    description: 'Crisp highland air, lush green bamboo forests, and dramatic jagged alpine peaks offer a refreshing and peaceful wilderness retreat away from the city.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=75',
    badge: 'Highland Peak',
  },
  {
    id: 'amboseli-kilimanjaro',
    tourId: 'amboseli-tsavo-kilimanjaro',
    name: 'Amboseli',
    region: 'Southern Kenya',
    description: 'Iconic free-ranging giant elephant herds grazing peacefully against the towering snow-capped summit of Mount Kilimanjaro in Amboseli’s emerald swamps.',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=600&q=75',
    badge: 'Kilimanjaro View',
  },
  {
    id: 'samburu',
    tourId: 'luxury-flying-safari-mara-samburu',
    name: 'Samburu',
    region: 'Northern Frontier',
    description: 'Dramatic semi-arid landscapes and a rich local heritage serve as the backdrop for encountering unique wildlife in the rugged north, including Grevy’s zebras.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=75',
    badge: 'Special Five',
  },
  {
    id: 'watamu-malindi',
    tourId: 'bush-and-beach-mara-zanzibar',
    name: 'Watamu Malindi',
    region: 'Kenyan Coast',
    description: 'Ancient Swahili ruins, vibrant marine parks, and sun-drenched white sands shape the ultimate North Coast tropical beach and reef holiday.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=75',
    badge: 'Beach & Reef',
  },
  {
    id: 'nakuru',
    tourId: 'classic-kenya-big-five',
    name: 'Nakuru',
    region: 'Great Rift Valley',
    description: 'A renowned black and white rhino sanctuary, diverse birdlife, and stunning Great Rift Valley scenery offer a remarkable setting for a weekend safari.',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=75',
    badge: 'Rhino Sanctuary',
  },
  {
    id: 'tsavo',
    tourId: 'amboseli-tsavo-kilimanjaro',
    name: 'Tsavo',
    region: 'Southeastern Kenya',
    description: 'Legendary red-dusted elephants, vast savannah expanses, volcanic lava flows, and the crystal-clear underwater hippo pools of Mzima Springs.',
    image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=600&q=75',
    badge: 'Red Elephants',
  },
  {
    id: 'kerio-valley',
    tourId: 'classic-kenya-big-five',
    name: 'Kerio Valley',
    region: 'North Rift Escarpment',
    description: 'Breathtaking Great Rift Valley viewpoints, Torok waterfall hiking trails, and wild elephant tracking in the untouched Rimoi Game Reserve.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=75',
    badge: 'North Rift',
  },
];

export const FeaturedTours: React.FC<FeaturedToursProps> = () => {
  const navigate = useNavigate();
  const { openInquiry } = useSafari();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Proactively preload all showcase images in parallel into browser cache
    KENYA_TRIPS_SHOWCASE.forEach((trip) => {
      const img = new Image();
      img.src = trip.image;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [trip.id]: true }));
      };
    });
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Duplicate the array to ensure perfectly continuous, infinite, jitter-free scrolling
  const marqueeItems = [...KENYA_TRIPS_SHOWCASE, ...KENYA_TRIPS_SHOWCASE];

  return (
    <section
      id="tours"
      className="relative py-16 md:py-24 bg-[#FAF5EB] overflow-hidden border-b border-[#EADFCB]"
    >
      {/* Decorative Savanna Background Illustrations & Contours */}
      <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
        {/* Soft Sun Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-200/50 via-amber-100/20 to-transparent rounded-full blur-3xl" />

        {/* Savannah Hills & Acacia Tree Landscape SVG Outline */}
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover text-[#E3D3BE]"
        >
          <path
            d="M-50,420 Q180,310 380,390 T800,340 T1200,390 T1500,330 L1500,600 L-50,600 Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M-50,490 Q220,430 520,480 T1050,440 T1500,470 L1500,600 L-50,600 Z"
            fill="currentColor"
            opacity="0.25"
          />
          <g opacity="0.25" transform="translate(60, 260) scale(0.65)">
            <path
              d="M120,240 C110,180 90,130 115,80 C125,50 145,30 180,20 C140,22 100,35 70,55 C40,40 10,45 -10,65 C-30,45 -60,45 -80,60 C-110,50 -140,65 -150,90 C-120,95 -90,95 -70,110 C-90,125 -100,150 -90,175 C-60,165 -30,160 -10,170 C10,160 40,160 60,175 C70,195 85,220 90,240 Z"
              fill="currentColor"
            />
            <path
              d="M100,240 Q105,180 110,140 Q115,100 130,80 M105,140 Q90,110 70,95 M110,120 Q125,95 150,85"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
          <g opacity="0.2" transform="translate(1320, 290) scale(0.55)">
            <path
              d="M120,240 C110,180 90,130 115,80 C125,50 145,30 180,20 C140,22 100,35 70,55 C40,40 10,45 -10,65 C-30,45 -60,45 -80,60 C-110,50 -140,65 -150,90 C-120,95 -90,95 -70,110 C-90,125 -100,150 -90,175 C-60,165 -30,160 -10,170 C10,160 40,160 60,175 C70,195 85,220 90,240 Z"
              fill="currentColor"
            />
            <path
              d="M100,240 Q105,180 110,140 Q115,100 130,80 M105,140 Q90,110 70,95"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Left/Right Nav Arrows */}
        <ScrollReveal direction="up" distance={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E5D7C2] text-xs font-bold text-[#0F5E1F] shadow-sm mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F7941D]" />
                <span>Handcrafted Kenya Safaris</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
                Top Destinations & Trips in Kenya
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                Swipe or let the safari cards glide. Click any destination to explore tailor-made private 4x4 itineraries.
              </p>
            </div>

            {/* Manual Navigation Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#0F5E1F] hover:text-white text-neutral-700 border border-[#E5D7C2] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
                title="Scroll previous"
                aria-label="Previous destination"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#0F5E1F] hover:text-white text-neutral-700 border border-[#E5D7C2] flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
                title="Scroll next"
                aria-label="Next destination"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Single Moving Row Carousel (Infinite Marquee + Manual Scroll Container) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Subtle Soft Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF5EB] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF5EB] to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none scroll-smooth"
        >
          {/* Continuous Moving Row */}
          <div className="animate-marquee-infinite flex gap-6 sm:gap-8 px-4 sm:px-8">
            {marqueeItems.map((trip, idx) => (
              <div
                key={`${trip.id}-${idx}`}
                onClick={() => navigate(`/tours/${trip.tourId}`)}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-t-[145px] rounded-b-[38px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(15,94,31,0.16)] hover:-translate-y-2.5 transition-all duration-300 border border-[#EFE5D6] overflow-hidden flex flex-col items-center text-center group cursor-pointer"
              >
                {/* 1. Arched Dome Top Image Container */}
                <div className="w-full h-56 sm:h-64 overflow-hidden relative rounded-t-[145px] bg-[#EBE4D5]">
                  {/* Warm Safari Skeleton Shimmer while downloading */}
                  {!loadedImages[trip.id] && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E6DCB8] via-[#F4EEDC] to-[#E2D6C0] animate-pulse flex items-center justify-center">
                      <Compass className="w-7 h-7 text-[#A89880]/40 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  )}

                  <img
                    src={trip.image}
                    alt={`${trip.name} - Kenya Trip`}
                    className={`w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ${
                      loadedImages[trip.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onLoad={() => setLoadedImages((prev) => ({ ...prev, [trip.id]: true }))}
                  />

                  {/* Subtle Top Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  {trip.badge && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full border border-white/25 shadow-md">
                      {trip.badge}
                    </div>
                  )}

                  {/* Realistic Torn Paper Bottom Edge (Exact Bonfire Style) */}
                  <svg
                    viewBox="0 0 500 45"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 w-full h-8 text-white fill-current pointer-events-none z-10"
                  >
                    <path d="M0,45 L0,18 C15,26 28,14 45,22 C62,29 74,16 90,23 C108,30 119,15 136,19 C153,24 164,12 181,21 C198,30 209,16 226,19 C243,23 254,11 271,18 C288,24 299,15 316,24 C333,33 344,14 361,18 C378,22 389,14 406,23 C423,32 434,13 451,19 C468,26 484,16 500,21 L500,45 Z" />
                  </svg>
                </div>

                {/* 2. Card Content Body (No Prices) */}
                <div className="p-5 pt-3 pb-7 flex-1 flex flex-col items-center justify-between w-full">
                  <div className="space-y-2">
                    {/* Destination Title (Bold Forest Green) */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F5E1F] group-hover:text-[#1E7A2E] transition-colors tracking-tight">
                      {trip.name}
                    </h3>

                    {/* Description (Clean, Readable Typography) */}
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed max-w-[260px] mx-auto line-clamp-3">
                      {trip.description}
                    </p>
                  </div>

                  {/* 3. Orange Circular Action Button (Exact Bonfire Style) */}
                  <div className="mt-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openInquiry(trip.tourId);
                      }}
                      className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F7941D] to-[#FF9E2C] hover:from-[#f07b15] hover:to-[#f99f34] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      title={`Book ${trip.name} Safari`}
                      aria-label={`Inquire about ${trip.name}`}
                    >
                      <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-10 text-center">
        <Link
          to="/tours"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Compass className="w-4 h-4 text-[#FDB913]" />
          <span>Explore All Safari Packages & Itineraries</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </section>
  );
};
