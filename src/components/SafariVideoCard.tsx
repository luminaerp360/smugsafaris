import React from 'react';
import {
  Play,
  Volume2,
  Maximize2,
  MapPin,
  Compass,
  Film,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { GalleryVideoItem } from '../data/galleryMedia';

interface SafariVideoCardProps {
  item: GalleryVideoItem;
  onOpenTheater: (item: GalleryVideoItem) => void;
}

export const SafariVideoCard: React.FC<SafariVideoCardProps> = ({
  item,
  onOpenTheater,
}) => {
  return (
    <div
      onClick={() => onOpenTheater(item)}
      className="group relative rounded-3xl overflow-hidden bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-800 flex flex-col cursor-pointer"
    >
      {/* Video Poster Thumbnail & Play Zone */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 backdrop-blur-md">
            <Compass className="w-3 h-3 text-emerald-400" />
            {item.destinationTag}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              {item.resolution}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-stone-300 backdrop-blur-md">
              {item.duration}
            </span>
          </div>
        </div>

        {/* Center Play Button with Sound Indicator */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-16 h-16 rounded-full bg-[#FDB913] text-stone-950 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ffc73b]">
            <Play className="w-7 h-7 fill-current ml-1" />
          </div>
        </div>

        {/* Bottom Audio Badge on Thumbnail */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/90 text-stone-200 border border-stone-700/80 text-[10px] font-bold backdrop-blur-md">
            <Volume2 className="w-3.5 h-3.5 text-[#FDB913]" />
            Audio Included
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md group-hover:bg-emerald-600 transition-colors">
            <Maximize2 className="w-3 h-3" />
            Watch Video
          </span>
        </div>
      </div>

      {/* Card Content & Sound Details */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-stone-900 text-white">
        <div>
          {/* Location with Icon */}
          <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          <h3 className="text-base font-extrabold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
            {item.title}
          </h3>

          <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-4">
            {item.caption}
          </p>
        </div>

        {/* Sound Experience Description Box */}
        <div className="pt-3 border-t border-stone-800">
          <div className="flex items-start gap-2 bg-stone-950/70 p-2.5 rounded-xl border border-stone-800 mb-3">
            <Volume2 className="w-3.5 h-3.5 text-[#FDB913] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDB913] block">
                Sound In Video
              </span>
              <p className="text-[11px] font-medium text-stone-300 truncate">
                {item.soundTitle}
              </p>
            </div>
          </div>

          {/* Wildlife Tags */}
          <div className="flex flex-wrap gap-1.5 items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {item.wildlife.slice(0, 2).map((w, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] text-stone-300 font-medium"
                >
                  {w}
                </span>
              ))}
            </div>

            <span className="text-[11px] font-bold text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Play with Sound &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
