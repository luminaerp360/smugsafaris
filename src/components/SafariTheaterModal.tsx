import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MapPin,
  Compass,
  Film,
  Sparkles,
  Info,
} from 'lucide-react';
import { GalleryVideoItem } from '../data/galleryMedia';
import { videoAudioEngine } from '../utils/safariSoundscape';
import { useSafari } from '../context/SafariContext';

interface SafariTheaterModalProps {
  item: GalleryVideoItem | null;
  items: GalleryVideoItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryVideoItem) => void;
}

export const SafariTheaterModal: React.FC<SafariTheaterModalProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  const { openInquiry } = useSafari();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);

  const currentIndex = item ? items.findIndex((v) => v.id === item.id) : -1;

  // Sync sound with current video
  useEffect(() => {
    if (!item) {
      videoAudioEngine.stop();
      return;
    }

    setIsPlaying(true);
    if (isAudioEnabled) {
      videoAudioEngine.play(item.soundType);
    }

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may need user gesture
      });
    }

    return () => {
      videoAudioEngine.stop();
    };
  }, [item]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        onNavigate(items[currentIndex + 1]);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(items[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items, onClose, onNavigate]);

  if (!item) return null;

  const handleVideoPlay = () => {
    setIsPlaying(true);
    if (isAudioEnabled) {
      videoAudioEngine.play(item.soundType);
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    videoAudioEngine.stop();
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleAudio = () => {
    if (isAudioEnabled) {
      videoAudioEngine.stop();
      setIsAudioEnabled(false);
    } else {
      videoAudioEngine.play(item.soundType);
      setIsAudioEnabled(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    videoAudioEngine.setVolume(val);
    if (val === 0) {
      setIsAudioEnabled(false);
    } else if (!isAudioEnabled) {
      setIsAudioEnabled(true);
      videoAudioEngine.play(item.soundType);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else {
      onNavigate(items[items.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    } else {
      onNavigate(items[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Top Bar Navigation */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 backdrop-blur-md flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#FDB913]" />
            Kenyan Safari Cinema
          </span>
          <span className="text-xs text-stone-400 hidden sm:inline">
            Video {currentIndex + 1} of {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="pointer-events-auto p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white transition-colors border border-stone-700 cursor-pointer"
          aria-label="Close Cinema"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={handlePrev}
        className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-emerald-600 text-white transition-all border border-stone-700 shadow-xl z-30 cursor-pointer hidden sm:flex items-center justify-center"
        aria-label="Previous video"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-emerald-600 text-white transition-all border border-stone-700 shadow-xl z-30 cursor-pointer hidden sm:flex items-center justify-center"
        aria-label="Next video"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Modal Card */}
      <div className="max-w-5xl w-full my-auto bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Native HTML5 Video Player with Authentic Sound */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            key={item.videoSrc}
            src={item.videoSrc}
            poster={item.poster}
            controls
            playsInline
            loop
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            className="w-full h-full object-cover"
          />

          {/* Sound Wave Indicator Bar overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 text-emerald-300 border border-emerald-600/50 text-[11px] font-bold backdrop-blur-md">
              <Volume2 className="w-3.5 h-3.5 text-[#FDB913]" />
              {isAudioEnabled && isPlaying ? 'Sound Active' : 'Sound Paused'}
            </span>
          </div>

          {/* Audio Toggle & Volume Controller */}
          <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-auto z-10">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                isAudioEnabled
                  ? 'bg-[#FDB913] text-stone-950'
                  : 'bg-black/70 text-stone-300 hover:text-white border border-stone-700'
              }`}
              title={isAudioEnabled ? 'Mute African Sound' : 'Unmute African Sound'}
              aria-label={isAudioEnabled ? 'Mute African Sound' : 'Unmute African Sound'}
            >
              {isAudioEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <div className="hidden sm:flex items-center gap-1.5 bg-black/70 px-2.5 py-1.5 rounded-xl border border-stone-700 backdrop-blur-md">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isAudioEnabled ? volume : 0}
                onChange={handleVolume}
                className="w-16 accent-[#FDB913] cursor-pointer h-1 rounded-lg bg-stone-700"
                aria-label="Sound volume"
              />
            </div>
          </div>
        </div>

        {/* Video Details & Sound Information */}
        <div className="p-6 sm:p-8 bg-stone-900 text-white flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{item.location}</span>
              <span className="text-stone-600">•</span>
              <span className="text-amber-400 font-semibold">{item.country}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              {item.title}
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              {item.caption}
            </p>

            {/* Sound in Video Callout */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-emerald-800/40 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-4 h-4 text-[#FDB913]" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Sound Captured In This Video
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white mb-1">
                {item.soundTitle}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {item.soundDescription}
              </p>
            </div>

            {/* Field Notes */}
            <div className="text-xs text-stone-400 border-l-2 border-emerald-500 pl-3 italic">
              <strong>Naturalist Field Note:</strong> {item.fieldNotes}
            </div>
          </div>

          {/* Right Sidebar: Wildlife & Booking CTA */}
          <div className="w-full md:w-80 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-800 pt-6 md:pt-0 md:pl-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#FDB913]" />
                Featured Wildlife Species
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {item.wildlife.map((animal, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-stone-800 text-xs font-semibold text-stone-200 border border-stone-700"
                  >
                    {animal}
                  </span>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 mb-6">
                <h5 className="text-xs font-bold text-white mb-1">
                  Experience {item.destinationTag}
                </h5>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  Hear the wildlife and see Kenya’s legendary landscapes with our expert safari guides in private 4x4 Land Cruisers.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  openInquiry();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FDB913] hover:bg-[#ffc634] text-stone-950 font-extrabold text-sm shadow-md transition-all cursor-pointer text-center"
              >
                Inquire For This Safari
              </button>

              <p className="text-[10px] text-center text-stone-400">
                Guaranteed window seats • High-frequency photographic roof hatches
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
