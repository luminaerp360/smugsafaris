import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { useSafari } from '../context/SafariContext';
import {
  Camera,
  ChevronRight,
  Sparkles,
  X,
  ChevronLeft,
  MapPin,
  Compass,
  Film,
  Volume2,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import {
  KENYAN_GALLERY_VIDEOS,
  KENYAN_GALLERY_PHOTOS,
  GalleryVideoItem,
  GalleryPhotoItem,
} from '../data/galleryMedia';
import { SafariVideoCard } from '../components/SafariVideoCard';
import { SafariTheaterModal } from '../components/SafariTheaterModal';

export const GalleryPage: React.FC = () => {
  const { openInquiry } = useSafari();

  // Active view filters
  const [activeTab, setActiveTab] = useState<'videos' | 'photos' | 'all'>('videos');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');

  // Modals state
  const [theaterVideo, setTheaterVideo] = useState<GalleryVideoItem | null>(null);
  const [photoLightboxIndex, setPhotoLightboxIndex] = useState<number | null>(null);

  // Filtered lists
  const filteredVideos = KENYAN_GALLERY_VIDEOS.filter((v) => {
    if (selectedDestination === 'all' || selectedDestination === 'Safari Fleet') return true;
    return v.destinationTag === selectedDestination;
  });

  const filteredPhotos = KENYAN_GALLERY_PHOTOS.filter((p) => {
    if (selectedDestination === 'all') return true;
    if (selectedDestination === 'Safari Fleet') return p.destinationTag === 'Safari Fleet' || p.isFleet;
    return p.destinationTag === selectedDestination;
  });

  const destinations = [
    { id: 'all', label: 'All Kenya Circuits' },
    { id: 'Safari Fleet', label: 'Custom 4x4 Fleet' },
    { id: 'Maasai Mara', label: 'Maasai Mara' },
    { id: 'Amboseli', label: 'Amboseli & Kilimanjaro' },
    { id: 'Samburu', label: 'Samburu & North' },
    { id: 'Tsavo', label: 'Tsavo Wilderness' },
    { id: 'Rift Valley', label: 'Great Rift Valley' },
    { id: 'Coast & Culture', label: 'Swahili Coast & Maasai' },
  ];

  const handleOpenPhoto = (idx: number) => {
    setPhotoLightboxIndex(idx);
  };

  const handleClosePhoto = () => {
    setPhotoLightboxIndex(null);
  };

  const handleNextPhoto = () => {
    if (photoLightboxIndex === null) return;
    setPhotoLightboxIndex((photoLightboxIndex + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (photoLightboxIndex === null) return;
    setPhotoLightboxIndex(
      (photoLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-20">
      <SeoHead
        title="Kenya Safari Wildlife Videos & 4x4 Land Cruiser Photos | Smugsafaris"
        description="Experience the African wild in 4K video and high-resolution photography: lion roars, Great Migration river crossings, Amboseli elephants, and custom 4x4 Land Cruisers."
        canonicalPath="/gallery"
        keywords="Kenya safari videos, wildlife photography Kenya, Maasai Mara lion videos, Amboseli elephant pictures, Safari Land Cruiser fleet photos, African safari cinema"
      />
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Safari Video & Photo Gallery</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/90 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700/60">
                <Film className="w-3.5 h-3.5 text-[#FDB913]" />
                Kenya Safari Cinema
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-700/60">
                <Volume2 className="w-3.5 h-3.5 text-[#FDB913]" />
                Videos with Real Audio
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Kenya Wildlife & Culture
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              African Wildlife Videos with Authentic Sound
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
              Immerse yourself in authentic footage captured across Kenya. Watch 4K wildlife videos 
              featuring real sounds of the wild: territorial lion roars across the Maasai Mara plains, 
              the roar of the Mara River crossing, low-frequency elephant rumbles in Amboseli, 
              and traditional Maasai warrior chants.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2. Media Type Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'videos'
                  ? 'bg-[#1E7A2E] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Film className="w-4 h-4 text-[#FDB913]" />
              <span>Kenyan Videos with Sound</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/20 text-white font-bold">
                {KENYAN_GALLERY_VIDEOS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'photos'
                  ? 'bg-[#1E7A2E] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Photography</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-200 text-stone-700 font-bold">
                {KENYAN_GALLERY_PHOTOS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              <span>All Media</span>
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Showing{' '}
            <strong className="text-stone-900">
              {activeTab === 'videos'
                ? filteredVideos.length
                : activeTab === 'photos'
                ? filteredPhotos.length
                : filteredVideos.length + filteredPhotos.length}
            </strong>{' '}
            items
          </div>
        </div>

        {/* 3. Destination Filter Pills */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-10">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestination(dest.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedDestination === dest.id
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <MapPin className="w-3 h-3 text-emerald-500" />
              <span>{dest.label}</span>
            </button>
          ))}
        </div>

        {/* 4. CONTENT: VIDEOS SECTION */}
        {(activeTab === 'videos' || activeTab === 'all') && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                  <Film className="w-4 h-4 text-[#FDB913]" />
                  Kenya Safari Videos • Authentic Audio
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Featured Kenyan Safari Videos
                </h2>
              </div>
              <span className="text-xs text-stone-500 hidden sm:inline">
                Click any video to play with full sound
              </span>
            </div>

            {filteredVideos.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200">
                <p className="text-stone-600 text-sm">
                  No videos found for this circuit filter.
                </p>
                <button
                  onClick={() => setSelectedDestination('all')}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  View All Kenyan Videos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <SafariVideoCard
                    key={video.id}
                    item={video}
                    onOpenTheater={(item) => setTheaterVideo(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. CONTENT: PHOTOS SECTION */}
        {(activeTab === 'photos' || activeTab === 'all') && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  Photographic Collection
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Kenyan Wildlife Photography
                </h2>
              </div>
              <span className="text-xs text-stone-500 hidden sm:inline">
                Click any photo to expand into high resolution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenPhoto(idx)}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-xl bg-black/60 text-white backdrop-blur-md flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDB913] block mb-1">
                      {photo.destinationTag}
                    </span>
                    <h3 className="text-sm font-extrabold mb-1 drop-shadow-xs">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-stone-300">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Photographic Safari Equipment CTA */}
        <div className="bg-gradient-to-r from-[#0F3516] via-[#0D2D13] to-[#0A260F] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-700/60">
              <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
              Tailored For Wildlife Filmmakers & Travelers
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
              Ready to Experience Kenya's Wildlife Sights & Sounds?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-8">
              All Smug Safaris 4x4 Land Cruisers include guaranteed window seats, camera power inverters, 
              custom pop-up roofs for 360-degree observation, and certified naturalist guides 
              who know exactly where to position you for optimal light, action, and sound.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openInquiry()}
                className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold text-stone-900 bg-[#FDB913] hover:bg-[#ffc42e] rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Inquire for a Safari Tour
              </button>
              <Link
                to="/tours"
                className="w-full sm:w-auto px-6 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20 text-center"
              >
                Explore Kenyan Itineraries
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Full Cinema Theater Modal */}
      {theaterVideo && (
        <SafariTheaterModal
          item={theaterVideo}
          items={filteredVideos}
          onClose={() => setTheaterVideo(null)}
          onNavigate={(newItem) => setTheaterVideo(newItem)}
        />
      )}

      {/* 8. Photo Lightbox Modal */}
      {photoLightboxIndex !== null && filteredPhotos[photoLightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={handleClosePhoto}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredPhotos[photoLightboxIndex].image}
              alt={filteredPhotos[photoLightboxIndex].title}
              className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-2xl mb-4"
            />
            <div className="text-center text-white max-w-xl">
              <h3 className="text-lg font-bold mb-1">
                {filteredPhotos[photoLightboxIndex].title}
              </h3>
              <p className="text-xs text-stone-400 mb-2">
                {filteredPhotos[photoLightboxIndex].location}
              </p>
              <p className="text-xs text-stone-300 leading-relaxed mb-2">
                {filteredPhotos[photoLightboxIndex].caption}
              </p>
              {filteredPhotos[photoLightboxIndex].cameraSettings && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-[11px] text-[#FDB913] font-mono">
                  <Camera className="w-3.5 h-3.5" />
                  {filteredPhotos[photoLightboxIndex].cameraSettings}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
