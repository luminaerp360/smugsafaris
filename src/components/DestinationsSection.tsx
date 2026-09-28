import React, { useState, useRef } from 'react';
import { DESTINATIONS_DATA, Destination } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Eye,
  Check,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

interface DestinationsSectionProps {
  onSelectDestinationFilter: (destName: string) => void;
}

const DestinationCardMedia: React.FC<{ dest: Destination }> = ({ dest }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
      {dest.video ? (
        <video
          ref={videoRef}
          src={dest.video}
          poster={dest.image}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : (
        <img
          src={dest.image}
          alt={dest.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

      {/* Country Badge top-left */}
      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/20 z-10">
        <MapPin className="w-3 h-3 text-[#FDB913]" />
        <span>{dest.country}</span>
      </div>

      {/* Video Indicator Badge */}
      {dest.video && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FDB913] animate-pulse" />
            <Video className="w-3 h-3 text-[#FDB913]" />
            <span>4K Video</span>
          </div>
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-transform active:scale-90 cursor-pointer"
            title={isPlaying ? 'Pause preview' : 'Play preview'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-transform active:scale-90 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>
        </div>
      )}

      {/* Bottom Title & Tagline */}
      <div className="absolute bottom-3 left-3 right-3 text-white z-10">
        <h3 className="text-lg font-bold leading-tight drop-shadow-sm">
          {dest.name}
        </h3>
        <p className="text-xs text-neutral-200 font-medium line-clamp-1 mt-0.5">
          {dest.tagline}
        </p>
      </div>
    </div>
  );
};

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestinationFilter,
}) => {
  const { scrollToSection } = useSafari();
  const [selectedDestModal, setSelectedDestModal] = useState<Destination | null>(null);

  const handleExploreTours = (destName: string) => {
    onSelectDestinationFilter(destName);
    scrollToSection('tours');
    if (selectedDestModal) {
      setSelectedDestModal(null);
    }
  };

  return (
    <section id="destinations" className="py-16 md:py-24 bg-[#F5F4EE] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              East Africa's Crown Jewels
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
              Iconic Safari Destinations
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              From the thundering crossings of the Mara River to the snow-crested grandeur of Kilimanjaro, explore the diverse wildlife sanctuaries we call home.
            </p>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATIONS_DATA.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <DestinationCardMedia dest={dest} />

                <div className="p-5">
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-neutral-100 space-y-2">
                    <div className="flex items-start gap-2 text-xs text-neutral-700">
                      <Calendar className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{dest.bestTimeToVisit}</span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-neutral-700">
                      <Compass className="w-3.5 h-3.5 text-[#F7941D] shrink-0 mt-0.5" />
                      <span className="line-clamp-1 text-neutral-600">
                        {dest.keyWildlife.slice(0, 4).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedDestModal(dest)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors py-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Read Guide</span>
                </button>

                <button
                  onClick={() => handleExploreTours(dest.name.split(' ')[0])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1E7A2E] hover:text-[#0F5E1F] py-1 cursor-pointer group/btn"
                >
                  <span>View Tours</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      {selectedDestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedDestModal(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-black">
              {selectedDestModal.video ? (
                <video
                  src={selectedDestModal.video}
                  poster={selectedDestModal.image}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedDestModal.image}
                  alt={selectedDestModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FDB913]">
                  {selectedDestModal.country}
                </span>
                <h3 className="text-2xl font-extrabold">{selectedDestModal.name}</h3>
                <p className="text-xs text-neutral-200 mt-1">{selectedDestModal.tagline}</p>
              </div>
            </div>

            <div className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p>{selectedDestModal.description}</p>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] mb-1">
                  Best Time to Visit
                </h4>
                <p className="text-xs text-neutral-600">{selectedDestModal.bestTimeToVisit}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Iconic Highlights & Wildlife
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDestModal.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedDestModal(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleExploreTours(selectedDestModal.name.split(' ')[0])}
                className="px-5 py-2 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#0F5E1F] rounded-lg cursor-pointer shadow-sm"
              >
                View Packages for {selectedDestModal.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
