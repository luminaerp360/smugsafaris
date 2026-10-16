import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSafari } from '../context/SafariContext';
import {
  ShieldCheck,
  Compass,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Camera,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Eye,
  Radio,
  Zap,
  Snowflake,
  LifeBuoy,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface FleetVehiclePhoto {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  tag: string;
  description: string;
  specs: string;
}

export const FLEET_PHOTOS: FleetVehiclePhoto[] = [
  {
    id: 'amboseli-kilimanjaro',
    title: 'Amboseli Waterhole & Mount Kilimanjaro',
    subtitle: 'Dual Spare Tire & Pop-Up Safari Cruiser',
    location: 'Amboseli National Park, Kenya',
    image: '/images/fleet/cruiser-amboseli-kilimanjaro.jpg',
    tag: 'Iconic Amboseli',
    description: 'Our custom Toyota Land Cruiser parked safely beside an Amboseli marsh as majestic elephant herds drink under Africa’s snow-crowned rooftop.',
    specs: 'Dual Rear Spares • 360° Pop-Up Roof • Heavy Duty Snorkel',
  },
  {
    id: 'maasai-mara-lion',
    title: 'Maasai Mara Sunrise Lion Encounter',
    subtitle: 'Golden Hour Big Cat Game Tracking',
    location: 'Maasai Mara National Reserve, Kenya',
    image: '/images/fleet/cruiser-maasai-mara-lion.jpg',
    tag: 'Maasai Mara',
    description: 'A black-maned lion strolls across the golden Mara plains while travelers capture unobstructed 360-degree close-up portraits from the elevated viewing roof.',
    specs: 'Window Guarantee • Whisper 4.5L Diesel • Telephoto Roof Mounts',
  },
  {
    id: 'nairobi-skyline',
    title: 'Nairobi National Park & City Skyline',
    subtitle: 'Where Urban Skyline Meets Wild Savannah',
    location: 'Nairobi National Park, Kenya',
    image: '/images/fleet/cruiser-nairobi-national-park.jpg',
    tag: 'Nairobi Wilderness',
    description: 'Cruising through the Athi-Kapiti plains with giraffes and zebras in the foreground and Nairobi’s shimmering city skyline framing the horizon.',
    specs: 'Extended Wheelbase • 7 Window Seats • High-Clearance Suspension',
  },
  {
    id: 'mara-sundowner',
    title: 'Mara Escarpment Luxury Bush Sundowner',
    subtitle: 'Chilled Refreshments & Golden Savannah Sunset',
    location: 'Mara North Conservancy, Kenya',
    image: '/images/fleet/cruiser-luxury-sundowner.jpg',
    tag: 'Luxury Experience',
    description: 'Our private guide pours chilled wine and prepares canapés atop an elevated panoramic ridge as the sun sets over the river bend.',
    specs: 'Onboard 12V Mini-Fridge • Sundowner Foldout Setup • Cooler Box',
  },
  {
    id: 'samburu-river',
    title: 'Samburu Ewaso River Crossing',
    subtitle: 'Northern Frontier Water Crossings & Giraffes',
    location: 'Samburu National Reserve, Kenya',
    image: '/images/fleet/cruiser-samburu-river.jpg',
    tag: 'Samburu Wild',
    description: 'Navigating shallow riverbeds in Samburu beneath doum palms while a reticulated giraffe gracefully drinks along the water edge.',
    specs: 'Water Snorkel Intake • Locking Differentials • Mud-Terrain Tires',
  },
  {
    id: 'cheetah-encounter',
    title: 'Cheetah Lookout on Savannah Termite Mound',
    subtitle: 'Respectful Predator Viewing & Pro Photography',
    location: 'Amboseli Ecosystem, Kenya',
    image: '/images/fleet/cruiser-cheetah-encounter.jpg',
    tag: 'Predator Spotlight',
    description: 'An alert cheetah perched atop a red termite mound while guests utilize built-in beanbag rests for shake-free telephoto wildlife imagery.',
    specs: 'Camera Inverter (220V/USB) • Beanbag Rests • Low-Decibel Idle',
  },
];

const FLEET_FEATURES = [
  {
    icon: Eye,
    title: '360° Pop-Up Canvas Roof',
    desc: 'Full-length elevated roof allows standing photography in all directions while shielding you from the midday equatorial sun.',
  },
  {
    icon: Compass,
    title: 'Guaranteed Private Window Seat',
    desc: 'Strict maximum of 6 to 7 guests per extended Land Cruiser. Every guest gets an unobstructed openable side window.',
  },
  {
    icon: Zap,
    title: 'Onboard 220V & USB Inverters',
    desc: 'Keep camera batteries, drones, and phones fully charged between game drives with multi-plug charging docks at every row.',
  },
  {
    icon: Snowflake,
    title: 'Onboard Electric Mini-Refrigerator',
    desc: 'Chilled bottled mineral water, soft drinks, and sparkling wine always on ice throughout long, dusty African game drives.',
  },
  {
    icon: Radio,
    title: 'Long-Range HF Two-Way Radio',
    desc: 'Instant real-time communication between our guides and park rangers to track active predator sightings and river crossings.',
  },
  {
    icon: LifeBuoy,
    title: 'Self-Sufficient Expedition Gear',
    desc: 'Dual spare wheels, heavy-duty snorkel, long-range twin fuel tanks, first-aid kit, and hydraulic jacks for complete bush safety.',
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
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <ScrollReveal direction="left" distance={45}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-[#0F5E1F] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E7A2E]" />
                  100% Owned & Operated
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Our Signature 4x4 Safari Land Cruiser Fleet
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                  We never subcontract your safari to budget minivans. Experience East Africa in custom-engineered, heavy-duty Toyota Land Cruisers built specifically for prime wildlife photography and all-terrain comfort.
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center gap-3">
                <Link
                  to="/gallery"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 transition-colors shadow-xs inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#1E7A2E]" />
                  <span>View Full Gallery</span>
                </Link>
                <button
                  onClick={() => openInquiry()}
                  className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
                  <span>Book Private Cruiser</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Main Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Main Hero Photo Card - Enters from LEFT */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="left" distance={45}>
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl bg-stone-900 border border-stone-200/80 group">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold text-white bg-black/60 backdrop-blur-md border border-white/20 shadow-xs">
                    {activePhoto.tag}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold text-amber-300 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40">
                      Smugsafaris Signature Fleet
                    </span>
                  </div>
                </div>

                {/* Bottom Caption & Specs */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activePhoto.location}</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-snug drop-shadow-sm">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2 max-w-2xl leading-relaxed">
                    {activePhoto.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/20 flex flex-wrap items-center justify-between text-[11px] text-amber-200/90 font-medium">
                    <span>{activePhoto.specs}</span>
                    <span className="text-stone-300">
                      {activeIndex + 1} of {FLEET_PHOTOS.length}
                    </span>
                  </div>
                </div>

                {/* Prev / Next Floating Navigation */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous fleet image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next fleet image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Navigation Strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mt-3">
                {FLEET_PHOTOS.map((photo, idx) => (
                  <button
                    key={photo.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeIndex === idx
                        ? 'border-[#1E7A2E] ring-2 ring-[#1E7A2E]/30 scale-[1.02]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate text-left px-1 drop-shadow-sm">
                      {photo.tag}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Side Info & Fleet Features - Enters from RIGHT */}
          <div className="lg:col-span-4 space-y-4">
            <ScrollReveal direction="right" distance={45}>
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#1E7A2E] block">
                  Safari Ready Specification
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-1 mb-2">
                  Toyota Land Cruiser 70 Series
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  East Africa’s indisputable safari workhorse. Modified specifically for long distances, rugged terrain, and the finest photographic sightlines.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Seating Capacity</span>
                    <span className="font-bold text-stone-800">Max 6-7 Guests (All Window)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Viewing Roof</span>
                    <span className="font-bold text-stone-800">360° Pop-Up Canvas Hatch</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Charging Sockets</span>
                    <span className="font-bold text-stone-800">USB & 220V Inverter Plugs</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Cold Refreshments</span>
                    <span className="font-bold text-stone-800">Onboard 12V Mini-Fridge</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Communications</span>
                    <span className="font-bold text-stone-800">HF Two-Way Radio Live Comms</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-stone-500">Fuel & Spares</span>
                    <span className="font-bold text-stone-800">Twin 90L Tanks & Dual Spares</span>
                  </div>
                </div>

                <button
                  onClick={() => openInquiry()}
                  className="w-full mt-5 py-3 rounded-xl text-xs font-bold text-stone-900 bg-gradient-to-r from-[#FDB913] to-[#F7941D] hover:from-[#ffc42e] hover:to-[#fa9e2a] transition-all shadow-sm text-center block cursor-pointer"
                >
                  Inquire for Private 4x4 Cruiser Safari
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 6 Feature Badges Grid - Alternating Left & Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FLEET_FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <ScrollReveal
                key={i}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={(i % 3) * 70}
                distance={40}
              >
                <div
                  className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 shadow-xs transition-all flex items-start gap-4 h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1E7A2E] border border-emerald-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 mb-1">{feat.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
