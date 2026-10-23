import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSafari } from '../context/SafariContext';
import {
  ShieldCheck,
  Compass,
  Camera,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Eye,
  Zap,
  Snowflake,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface FleetVehiclePhoto {
  id: string;
  title: string;
  location: string;
  image: string;
  tag: string;
}

export const FLEET_PHOTOS: FleetVehiclePhoto[] = [
  {
    id: 'amboseli-kilimanjaro',
    title: 'Amboseli Waterhole & Mount Kilimanjaro',
    location: 'Amboseli National Park, Kenya',
    image: '/images/fleet/cruiser-amboseli-kilimanjaro.jpg',
    tag: 'Iconic Amboseli',
  },
  {
    id: 'maasai-mara-lion',
    title: 'Maasai Mara Sunrise Lion Encounter',
    location: 'Maasai Mara National Reserve, Kenya',
    image: '/images/fleet/cruiser-maasai-mara-lion.jpg',
    tag: 'Maasai Mara',
  },
  {
    id: 'nairobi-skyline',
    title: 'Nairobi National Park & City Skyline',
    location: 'Nairobi National Park, Kenya',
    image: '/images/fleet/cruiser-nairobi-national-park.jpg',
    tag: 'Nairobi Wild',
  },
  {
    id: 'mara-sundowner',
    title: 'Mara Escarpment Luxury Bush Sundowner',
    location: 'Mara North Conservancy, Kenya',
    image: '/images/fleet/cruiser-luxury-sundowner.jpg',
    tag: 'Sundowner',
  },
  {
    id: 'samburu-river',
    title: 'Samburu Ewaso River Crossing',
    location: 'Samburu National Reserve, Kenya',
    image: '/images/fleet/cruiser-samburu-river.jpg',
    tag: 'Samburu Wild',
  },
  {
    id: 'cheetah-encounter',
    title: 'Cheetah Lookout on Savannah Termite Mound',
    location: 'Amboseli Ecosystem, Kenya',
    image: '/images/fleet/cruiser-cheetah-encounter.jpg',
    tag: 'Predators',
  },
];

const FLEET_HIGHLIGHTS = [
  {
    icon: Compass,
    title: 'Guaranteed Window Seat',
    desc: 'Max 6–7 guests. Every traveler gets an unobstructed window seat and dedicated roof space.',
  },
  {
    icon: Eye,
    title: '360° Pop-Up Photo Roof',
    desc: 'Full-length canvas roof hatch opens for standing, eye-level 360° wildlife photography.',
  },
  {
    icon: Zap,
    title: 'USB & 220V Charging',
    desc: 'Multi-plug inverters keep camera batteries, phones, and gear fully charged on all game drives.',
  },
  {
    icon: Snowflake,
    title: 'Onboard Cooler Box',
    desc: 'Chilled drinking water and beverages kept refreshingly cold during warm savanna drives.',
  },
];

interface FleetSpotlightProps {
  showTitle?: boolean;
  className?: string;
}

export const FleetSpotlight: React.FC<FleetSpotlightProps> = ({
  showTitle = true,
  className = '',
}) => {
  const { openInquiry } = useSafari();
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhoto = FLEET_PHOTOS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + FLEET_PHOTOS.length) % FLEET_PHOTOS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % FLEET_PHOTOS.length);
  };

  return (
    <section className={`py-8 sm:py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <ScrollReveal direction="left" distance={30}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-stone-200 gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E7A2E] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 inline-flex items-center gap-1.5 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E7A2E]" />
                  100% Owned & Operated
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Our Signature 4x4 Safari Land Cruiser Fleet
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                  Heavy-duty Toyota Land Cruisers purpose-built for East African wilderness photography and all-terrain comfort.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  to="/gallery"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#1E7A2E]" />
                  <span>View Fleet Gallery</span>
                </Link>
                <button
                  onClick={() => openInquiry()}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Book Private Cruiser</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Compact, Highly Responsive 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left: Interactive Vehicle Photo Showcase */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <ScrollReveal direction="left" distance={30}>
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-md bg-stone-900 border border-stone-200 group">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Dark Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-black/60 backdrop-blur-md border border-white/20">
                    {activePhoto.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40">
                    Custom 4x4 Cruiser
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-300 mb-0.5 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{activePhoto.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold tracking-tight drop-shadow-sm">
                      {activePhoto.title}
                    </h3>
                    <span className="text-[11px] text-stone-300 font-mono shrink-0 ml-2">
                      {activeIndex + 1} / {FLEET_PHOTOS.length}
                    </span>
                  </div>
                </div>

                {/* Prev / Next Arrows */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous fleet photo"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next fleet photo"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Lightweight Responsive Thumbnail Strip */}
              <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
                {FLEET_PHOTOS.map((photo, idx) => (
                  <button
                    key={photo.id}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`View ${photo.title}`}
                    className={`relative w-16 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeIndex === idx
                        ? 'border-[#1E7A2E] ring-2 ring-[#1E7A2E]/30 scale-[1.03]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Key Fleet Highlights & Direct Booking */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal direction="right" distance={30} className="h-full">
              <div className="bg-[#FAF9F5] rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7A2E]">
                      Safari Specifications
                    </span>
                    <span className="text-[10px] font-bold text-stone-500">
                      Toyota 70 Series
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
                    Custom-Engineered Safari Cruiser
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Heavy-duty suspension, whisper-quiet idle, and customized panoramic roof specifically tailored for East African game reserves.
                  </p>

                  {/* 4 Clean Essential Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 mt-3.5">
                    {FLEET_HIGHLIGHTS.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-stone-200/60 shadow-2xs"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-[#1E7A2E] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                            <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => openInquiry()}
                  className="w-full mt-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] transition-all shadow-xs text-center block cursor-pointer"
                >
                  Inquire for Private 4x4 Cruiser
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
