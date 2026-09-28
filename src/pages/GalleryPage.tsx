import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSafari } from '../context/SafariContext';
import {
  Camera,
  ChevronRight,
  Sparkles,
  X,
  ChevronLeft,
  MapPin,
  Compass,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'Wildlife' | 'Migration' | 'Camps' | 'Landscapes';
  image: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Lion Pride at Sunrise',
    location: 'Maasai Mara National Reserve, Kenya',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    caption: 'A magnificent male lion and lioness scanning the golden plains during dawn game drive.',
  },
  {
    id: 'g-2',
    title: 'Great Migration River Crossing',
    location: 'Mara River, Kenya / Tanzania Border',
    category: 'Migration',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hundreds of thousands of wildebeest and zebras braving the crocodile-laden waters of the Mara River.',
  },
  {
    id: 'g-3',
    title: 'Elephant Herd with Mt. Kilimanjaro',
    location: 'Amboseli National Park, Kenya',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
    caption: 'A matriarch elephant leads her family across the dusty Amboseli plains below the snow peak of Kilimanjaro.',
  },
  {
    id: 'g-4',
    title: 'Luxury Tented Camp Sunset',
    location: 'Central Serengeti, Tanzania',
    category: 'Camps',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    caption: 'Vintage safari canvas suite overlooking the vast golden savannah with private sundowner deck.',
  },
  {
    id: 'g-5',
    title: 'Northern Reticulated Giraffe',
    location: 'Samburu National Reserve, Kenya',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    caption: 'A towering reticulated giraffe browsing on thorny acacia branches beside the Ewaso Nyiro River.',
  },
  {
    id: 'g-6',
    title: 'Turquoise Waters & Traditional Dhow',
    location: 'Zanzibar Archipelago, Tanzania',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Handcrafted wooden dhow sailing against the crystalline turquoise waters of the Indian Ocean.',
  },
  {
    id: 'g-7',
    title: 'Cheetah on Termite Mound',
    location: 'Maasai Mara, Kenya',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Solitary cheetah scanning the horizon for Thomson gazelles from an elevated termite lookout.',
  },
  {
    id: 'g-8',
    title: 'Ngorongoro Caldera Crater Floor',
    location: 'Ngorongoro Conservation Area, Tanzania',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    caption: 'Vast volcanic crater bowl harboring over 25,000 large mammals and alkaline flamingo lakes.',
  },
  {
    id: 'g-9',
    title: 'Hot Air Balloon at Golden Dawn',
    location: 'Maasai Mara Triangle, Kenya',
    category: 'Camps',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Drifting silently above grazing zebra herds at sunrise followed by champagne breakfast.',
  },
];

export const GalleryPage: React.FC = () => {
  const { openInquiry } = useSafari();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Photo Gallery</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <Camera className="w-3.5 h-3.5 text-[#FDB913]" />
              Captured by Our Naturalists & Travelers
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Witness the Raw Splendor of Africa
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Explore authentic moments photographed during our private safaris across Kenya and Tanzania. Click any photo to expand into high resolution.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2. Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'Wildlife', label: 'Wildlife & Big Five' },
            { id: 'Migration', label: 'Great Migration' },
            { id: 'Camps', label: 'Luxury Tents & Camps' },
            { id: 'Landscapes', label: 'Landscapes & Oceans' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1E7A2E] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDB913] block mb-1">
                  {item.category}
                </span>
                <h3 className="text-sm font-extrabold mb-1 drop-shadow-xs">{item.title}</h3>
                <div className="flex items-center gap-1 text-[11px] text-stone-300">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. CTA Banner */}
        <div className="bg-gradient-to-r from-[#0F3516] to-[#0A260F] rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to Capture Your Own Safari Masterpieces?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md mx-auto mb-6">
            All our 4x4 Land Cruisers include guaranteed window seats, camera power inverters, and pop-up observation roofs designed for photographers.
          </p>
          <button
            onClick={() => openInquiry()}
            className="px-8 py-3.5 text-sm font-extrabold text-stone-900 bg-[#FDB913] hover:bg-[#ffc42e] rounded-xl shadow-md transition-all cursor-pointer"
          >
            Inquire for a Photographic Safari
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-2xl mb-4"
            />
            <div className="text-center text-white max-w-xl">
              <h3 className="text-lg font-bold mb-1">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-xs text-stone-400 mb-2">{filteredItems[lightboxIndex].location}</p>
              <p className="text-xs text-stone-300 leading-relaxed">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
