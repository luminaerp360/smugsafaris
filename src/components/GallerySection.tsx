import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Predators' | 'Giants' | 'Landscapes' | 'CampLife';
  location: string;
  image: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Lion Pride at Sunrise',
      category: 'Predators',
      location: 'Maasai Mara, Kenya',
      image: '/images/fleet/cruiser-maasai-mara-lion.jpg',
      caption: 'Unobstructed morning game drive beside a majestic black-maned lion in the Mara.',
    },
    {
      id: 'g-2',
      title: 'Elephants beneath Kilimanjaro',
      category: 'Giants',
      location: 'Amboseli National Park, Kenya',
      image: '/images/fleet/cruiser-amboseli-kilimanjaro.jpg',
      caption: 'Elephant herd drinking at Amboseli freshwater marsh with Mount Kilimanjaro in the backdrop.',
    },
    {
      id: 'g-3',
      title: 'Samburu River Crossing & Giraffes',
      category: 'Landscapes',
      location: 'Samburu National Reserve, Kenya',
      image: '/images/fleet/cruiser-samburu-river.jpg',
      caption: 'Crossing the shallow rocky waters of Ewaso Nyiro as a reticulated giraffe drinks under doum palms.',
    },
    {
      id: 'g-4',
      title: 'Golden Hour Bush Sundowner',
      category: 'CampLife',
      location: 'Mara Conservancies, Kenya',
      image: '/images/fleet/cruiser-luxury-sundowner.jpg',
      caption: 'Private safari sundowners with our guide pouring chilled drinks over the glowing Mara escarpment.',
    },
    {
      id: 'g-5',
      title: 'Nairobi National Park & Skyline',
      category: 'Landscapes',
      location: 'Nairobi National Park, Kenya',
      image: '/images/fleet/cruiser-nairobi-national-park.jpg',
      caption: 'Pop-up roof game viewing with giraffes and zebras set against Nairobi city skyline.',
    },
    {
      id: 'g-6',
      title: 'Cheetah Lookout on Termite Mound',
      category: 'Predators',
      location: 'Amboseli Ecosystem, Kenya',
      image: '/images/fleet/cruiser-cheetah-encounter.jpg',
      caption: 'Alert cheetah perched on a red termite mound while safari photographers capture close-up portraits.',
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              Through the Safari Lens
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
              Moments from the Wild
            </h2>
            <p className="mt-2 text-neutral-600 text-sm max-w-xl">
              Authentic captures taken on game drives by our guests and professional guide team across Kenya and Tanzania.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 md:mt-0 flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'Predators', label: 'Predators & Big Cats' },
              { id: 'Giants', label: 'Elephants & Giants' },
              { id: 'Landscapes', label: 'Landscapes' },
              { id: 'CampLife', label: 'Camp Life' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-[#1E7A2E] shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-[11px] text-[#FDB913] font-semibold mb-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-base font-bold drop-shadow-sm">{item.title}</h3>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5 opacity-90">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10 cursor-pointer"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] mx-auto rounded-xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-white text-center max-w-lg mx-auto">
              <span className="text-xs font-bold uppercase text-[#FDB913] tracking-wider">
                {filteredItems[lightboxIndex].location}
              </span>
              <h4 className="text-lg font-bold">{filteredItems[lightboxIndex].title}</h4>
              <p className="text-xs text-neutral-300 mt-1">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
