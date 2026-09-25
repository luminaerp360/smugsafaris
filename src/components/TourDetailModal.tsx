import React, { useState } from 'react';
import { useSafari } from '../context/SafariContext';
import { X, Check, Clock, Users, MapPin, Calendar, Sparkles, ChevronDown, Compass, AlertCircle } from 'lucide-react';

export const TourDetailModal: React.FC = () => {
  const { selectedTour, closeTourDetail, formatPrice, openInquiry } = useSafari();
  const [activeDayAccordion, setActiveDayAccordion] = useState<number | null>(1);
  const [activePhoto, setActivePhoto] = useState<number>(0);

  if (!selectedTour) return null;

  const allPhotos = [selectedTour.heroImage, ...selectedTour.galleryImages];

  const handleBookNow = () => {
    closeTourDetail();
    openInquiry(selectedTour.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-neutral-200">
        {/* Sticky Close Button */}
        <button
          onClick={closeTourDetail}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Hero */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-neutral-900 overflow-hidden">
          <img
            src={allPhotos[activePhoto] || selectedTour.heroImage}
            alt={selectedTour.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Photo Switcher Dots */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
            {allPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activePhoto === i ? 'bg-[#FDB913] w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-4 left-4 sm:left-6 right-16 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FDB913]">
              {selectedTour.style} · {selectedTour.tier}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
              {selectedTour.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-200 font-medium line-clamp-1 mt-0.5">
              {selectedTour.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Duration</span>
              <span className="font-bold text-neutral-800">{selectedTour.duration}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Destinations</span>
              <span className="font-bold text-neutral-800 truncate block">
                {selectedTour.destinations.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Group Size</span>
              <span className="font-bold text-neutral-800">Max {selectedTour.maxGroupSize} Guests</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Best Season</span>
              <span className="font-bold text-[#1E7A2E]">{selectedTour.bestMonths.split('(')[0]}</span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-base font-bold text-neutral-900 mb-2">Safari Overview</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedTour.overview}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-base font-bold text-neutral-900 mb-3">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedTour.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <Check className="w-4 h-4 text-[#1E7A2E] shrink-0 mt-0.5" />
                  <span className="font-medium">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-neutral-900">Day-by-Day Itinerary</h3>
              <span className="text-xs text-neutral-400">Click to expand details</span>
            </div>

            <div className="space-y-2.5">
              {selectedTour.itinerary.map((day) => {
                const isOpen = activeDayAccordion === day.day;
                return (
                  <div
                    key={day.day}
                    className="border border-neutral-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveDayAccordion(isOpen ? null : day.day)}
                      className="w-full p-3.5 sm:p-4 text-left bg-white hover:bg-neutral-50 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0F5E1F] font-bold text-xs flex items-center justify-center shrink-0">
                          {day.day}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-neutral-900">
                          {day.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 transition-transform ${
                          isOpen ? 'rotate-180 text-[#1E7A2E]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 pt-1 bg-neutral-50/70 border-t border-neutral-100 text-xs text-neutral-600 leading-relaxed space-y-2">
                        <p>{day.description}</p>
                        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-neutral-500">
                          <span>Meals: <strong className="text-neutral-700">{day.meals}</strong></span>
                          <span>·</span>
                          <span>Stay: <strong className="text-neutral-700">{day.accommodation}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Included / Excluded Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] mb-2.5 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1E7A2E]" />
                What is Included
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {selectedTour.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A2E] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-neutral-400" />
                What is Excluded
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {selectedTour.excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Action Footer */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Starting from per person
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0F5E1F] tabular-nums">
                  {formatPrice(selectedTour.priceUSD)}
                </span>
                {selectedTour.originalPriceUSD && (
                  <span className="text-xs text-neutral-400 line-through tabular-nums">
                    {formatPrice(selectedTour.originalPriceUSD)}
                  </span>
                )}
                <span className="text-xs text-neutral-500">USD base / all park fees incl.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={closeTourDetail}
                className="flex-1 sm:flex-initial px-4 py-3 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleBookNow}
                className="flex-1 sm:flex-initial px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#F7941D] to-[#E8720C] hover:from-[#f99f34] hover:to-[#f07b15] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-100" />
                <span>Book This Safari</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
