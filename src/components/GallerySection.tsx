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
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Two young males watching over their pride during early morning light in the Mara triangle.',
    },
    {
      id: 'g-2',
      title: 'Elephants beneath Kilimanjaro',
      category: 'Giants',
      location: 'Amboseli National Park, Kenya',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      caption: 'Matriarch leading her family across Amboseli salt pans with the snow-covered summit of Kilimanjaro.',
    },
    {
      id: 'g-3',
      title: 'Leopard Resting in Acacia',
      category: 'Predators',
      location: 'Serengeti, Tanzania',
      image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Solitary leopard surveying the savannah from an ancient umbrella acacia bough.',
    },
    {
      id: 'g-4',
      title: 'Golden Hour Bush Sundowner',
      category: 'CampLife',
      location: 'Mara Conservancies, Kenya',
      image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
      caption: 'Chilled drinks and campfire as the sun dips below the Great Rift Valley horizon.',
    },
    {
      id: 'g-5',
      title: 'Zanzibar Turquoise Coastline',
      category: 'Landscapes',
      location: 'Zanzibar, Tanzania',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      caption: 'Traditional wooden dhow sailboats moored off Nungwi beach at high tide.',
    },
    {
      id: 'g-6',
      title: 'Cheetah Coalition on Termite Mound',
      category: 'Predators',
      location: 'Maasai Mara, Kenya',
      image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
      caption: 'Cheetah brothers scanning the open plains for gazelle herds.',
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
