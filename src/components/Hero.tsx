import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSafari } from '../context/SafariContext';
import {
  ShieldCheck,
  Compass,
  Calendar,
  Award,
  ArrowRight,
  MapPin,
  Sparkles,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { Logo } from './Logo';

interface HeroProps {
  onSearchFilter: (filters: { destination: string; style: string; duration: string }) => void;
}

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  priceUSD: number;
  image: string;
  video: string;
  tags: [string, string];
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'classic-kenya-big-five',
    title: '7-Day Classic Kenya Big Five',
    subtitle: 'Maasai Mara · Lake Nakuru · Amboseli & Kilimanjaro',
    badge: 'Trending Itinerary',
    priceUSD: 1850,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    video: '/videos/lion-pride.mp4',
    tags: ['100% Private 4x4', 'All Park Fees Incl.'],
  },
  {
    id: 'maasai-mara-great-migration',
    title: '4-Day Maasai Mara Migration',
    subtitle: 'Mara River Crossings · Big Cats · Sunrise Game Drives',
    badge: 'World Wonder',
    priceUSD: 1250,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    video: '/videos/safari-landscape.mp4',
    tags: ['River Crossing Track', 'Pop-Up 4x4 Cruiser'],
  },
  {
    id: 'amboseli-tsavo-kilimanjaro',
    title: '6-Day Amboseli & Tsavo Giants',
    subtitle: 'Massive Elephant Herds beneath Mt. Kilimanjaro Snows',
    badge: 'Kilimanjaro Views',
    priceUSD: 1590,
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80',
    video: '/videos/elephant-herd.mp4',
    tags: ['Mt. Kilimanjaro Views', 'Red Elephants of Tsavo'],
  },
  {
    id: 'bush-and-beach-mara-zanzibar',
    title: '10-Day Bush & Beach: Mara & Zanzibar',
    subtitle: 'Big Five Safari to Powder-White Zanzibar Sand Beaches',
    badge: 'Honeymoon & Luxury',
    priceUSD: 2890,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    video: '/videos/cheetah-wild.mp4',
    tags: ['Savannah + Coast', 'Domestic Flight Incl.'],
  },
  {
    id: 'kenya-tanzania-serengeti-odyssey',
    title: '8-Day Serengeti & Ngorongoro Odyssey',
    subtitle: 'Endless Serengeti Plains & 600m Volcanic Crater Floor',
    badge: 'Epic Grand Safari',
    priceUSD: 2490,
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
    video: '/videos/safari-hero-bg.mp4',
    tags: ['Kenya & Tanzania', 'Ngorongoro Crater Floor'],
  },
  {
    id: 'luxury-flying-safari-mara-samburu',
    title: '5-Day Luxury Bush Flying Safari',
    subtitle: 'Samburu Special Five & Ultra-Luxury Mara Tented Camps',
    badge: 'Bush Flights',
    priceUSD: 2450,
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    video: '/videos/giraffe-savanna.mp4',
    tags: ['Domestic Bush Flights', 'No Dusty Road Transfers'],
  },
];

export const Hero: React.FC<HeroProps> = ({ onSearchFilter }) => {
  const { openInquiry, scrollToSection, formatPrice } = useSafari();
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  // Carousel State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Synchronize video playback with current slide
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentSlideIndex) {
        if (!isPaused) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        }
      } else {
        vid.pause();
      }
    });
  }, [currentSlideIndex, isPaused]);

  // Auto-advance carousel every 5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused((prev) => {
      const next = !prev;
      const currentVid = videoRefs.current[currentSlideIndex];
      if (currentVid) {
        if (next) currentVid.pause();
        else currentVid.play().catch(() => {});
      }
      return next;
    });
  };

  const currentSlide = CAROUSEL_SLIDES[currentSlideIndex];

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
      className="relative isolate bg-[#122415] overflow-hidden pt-4 sm:pt-8 md:pt-12 pb-8 sm:pb-12 md:pb-16 border-b border-[#25462A]"
    >
      {/* Background Layer 1: Solid Dark Forest Green */}
      <div className="absolute inset-0 bg-[#122415] pointer-events-none" />

      {/* Background Layer 2: Safari Video Scenery */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover opacity-25 mix-blend-luminosity filter saturate-150 transform scale-105"
        >
          <source src="/videos/safari-hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background Layer 3: Warm Sunset Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2213]/95 via-[#18351D]/80 to-[#E8720C]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#122415] via-transparent to-transparent pointer-events-none" />

      {/* Foreground Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>Tailor-Made Kenya & Tanzania Private Safaris</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Explore Africa’s Wild Soul in{' '}
              <span className="bg-gradient-to-r from-[#FDB913] via-[#F7941D] to-[#E8720C] bg-clip-text text-transparent">
                Private Luxury 4x4
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xs sm:text-base md:text-lg text-emerald-100/90 max-w-2xl leading-relaxed font-normal">
              Experience the Great Migration in Maasai Mara, giant bull elephants under Kilimanjaro’s snows, and pure luxury tented camps with native East African naturalist guides.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={() => openInquiry()}
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] text-white text-xs sm:text-sm font-extrabold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0"
              >
                <span>Plan Your Safari</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <Link
                to="/tours"
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
              >
                Browse All Itineraries
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-2.5 sm:pt-4 border-t border-white/15 flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-[10px] sm:text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7CC142]" />
                <span>KATO Bonded #482</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDB913]" />
                <span>KPSGA Naturalists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7CC142]" />
                <span>AMREF Flying Doctors</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Safari Showcase Card with Moving Video Carousel */}
          <div className="lg:col-span-5">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-3.5 sm:p-6 shadow-2xl overflow-hidden group"
            >
              {/* Top Card Bar with Clean Emblem */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/15">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Logo variant="icon" theme="dark" className="w-9 h-9 sm:w-11 sm:h-11" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-300 tracking-wider block">
                      Direct Tour Operator
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white leading-none mt-0.5">
                      Smugsafaris Expeditions
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-400/20 border border-amber-400/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold text-amber-300">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>

              {/* Dynamic Carousel Visual Window */}
              <div className="my-3 sm:my-5 space-y-2 sm:space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-inner border border-white/10 bg-stone-900 group/image">
                  {/* Sliding/Fading Videos */}
                  {CAROUSEL_SLIDES.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                        idx === currentSlideIndex
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 pointer-events-none z-0'
                      }`}
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[idx] = el;
                        }}
                        src={slide.video}
                        poster={slide.image}
                        autoPlay={idx === 0}
                        muted
                        loop
                        playsInline
                        preload={idx === 0 ? 'auto' : 'metadata'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-10" />

                  {/* Top-Right Controls: Play/Pause and Counter */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                    <button
                      onClick={togglePause}
                      aria-label={isPaused ? 'Resume video' : 'Pause video'}
                      className="bg-black/60 hover:bg-black/80 backdrop-blur-xs w-6 h-6 rounded-full flex items-center justify-center text-white/90 border border-white/20 transition-colors cursor-pointer"
                    >
                      {isPaused ? <Play className="w-3 h-3 fill-white" /> : <Pause className="w-3 h-3 fill-white" />}
                    </button>
                    <div className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-white/90 border border-white/20">
                      {currentSlideIndex + 1} / {CAROUSEL_SLIDES.length}
                    </div>
                  </div>

                  {/* Manual Prev / Next Floating Arrows */}
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Safari Slide"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 transition-all opacity-80 group-hover/image:opacity-100 hover:scale-105 cursor-pointer z-20"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next Safari Slide"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xs text-white flex items-center justify-center border border-white/20 transition-all opacity-80 group-hover/image:opacity-100 hover:scale-105 cursor-pointer z-20"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white z-20">
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#FDB913] tracking-wide block mb-0.5">
                      {currentSlide.badge}
                    </span>
                    <Link
                      to={`/tours/${currentSlide.id}`}
                      className="text-xs sm:text-sm font-extrabold block hover:text-emerald-300 transition-colors line-clamp-1"
                    >
                      {currentSlide.title}
                    </Link>
                    <p className="text-[10px] sm:text-[11px] text-neutral-300 line-clamp-1">
                      {currentSlide.subtitle}
                    </p>
                  </div>
                </div>

                {/* Carousel Pagination Dots */}
                <div className="flex items-center justify-center gap-1.5 pt-0.5">
                  {CAROUSEL_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlideIndex
                          ? 'w-5 sm:w-6 bg-[#FDB913]'
                          : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                {/* Specs Tags matching active slide */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                  <div className="bg-white/5 border border-white/10 p-1.5 sm:p-2.5 rounded-xl flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7CC142] shrink-0" />
                    <span className="text-neutral-200 truncate">{currentSlide.tags[0]}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-1.5 sm:p-2.5 rounded-xl flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7CC142] shrink-0" />
                    <span className="text-neutral-200 truncate">{currentSlide.tags[1]}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Row (Dynamically synced to slide) */}
              <div className="pt-2.5 sm:pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-medium text-neutral-400 block uppercase tracking-wider">
                    From per person
                  </span>
                  <span className="text-lg sm:text-2xl font-extrabold text-[#FDB913] tabular-nums">
                    {formatPrice(currentSlide.priceUSD)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Link
                    to={`/tours/${currentSlide.id}`}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-bold transition-colors"
                  >
                    Itinerary
                  </Link>

                  <button
                    onClick={() => openInquiry(currentSlide.id)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-[#1E7A2E] hover:bg-[#238b34] text-white text-[11px] sm:text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Safari Finder / Search Filter Widget (Compact 2x2 on mobile, 4-col on desktop) */}
        <div className="mt-5 sm:mt-8 lg:mt-10 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 sm:p-5 text-neutral-800">
          <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1E7A2E] mb-2 sm:mb-3 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7941D]" />
            <span>Quick Safari Finder — Find Your East Africa Tour</span>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {/* Destination */}
            <div className="flex flex-col">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-0.5 sm:mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#1E7A2E]" />
                Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">All Destinations</option>
                <option value="Maasai Mara">Maasai Mara</option>
                <option value="Amboseli">Amboseli</option>
                <option value="Serengeti">Serengeti</option>
                <option value="Samburu">Samburu</option>
                <option value="Zanzibar">Zanzibar</option>
              </select>
            </div>

            {/* Safari Style */}
            <div className="flex flex-col">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-0.5 sm:mb-1 flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#1E7A2E]" />
                Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">All Styles</option>
                <option value="Wildlife & Big Five">Big Five Wildlife</option>
                <option value="Great Migration">Great Migration</option>
                <option value="Bush & Beach">Bush & Beach</option>
                <option value="Luxury Flying Safari">Flying Safari</option>
              </select>
            </div>

            {/* Duration */}
            <div className="flex flex-col">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-0.5 sm:mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#1E7A2E]" />
                Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
              >
                <option value="all">Any Days</option>
                <option value="short">3 - 4 Days</option>
                <option value="medium">5 - 7 Days</option>
                <option value="extended">8+ Days</option>
              </select>
            </div>

            {/* Submit Filter Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-[32px] sm:h-[38px] inline-flex items-center justify-center gap-1.5 bg-[#1E7A2E] hover:bg-[#0F5E1F] text-white font-bold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <span>Find Safaris</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
