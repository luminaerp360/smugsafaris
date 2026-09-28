import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TOURS_DATA, TourPackage } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  Clock,
  MapPin,
  Users,
  Compass,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  Phone,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  Share2,
  Heart,
  ChevronDown,
  ChevronUp,
  Utensils,
  Bed,
  Video,
  Play,
  Camera,
} from 'lucide-react';

export const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formatPrice, openInquiry } = useSafari();

  const tour = TOURS_DATA.find((t) => t.id === id);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });
  const [copiedLink, setCopiedLink] = useState(false);

  if (!tour) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center p-6 text-center">
        <Compass className="w-16 h-16 text-stone-300 mb-4 animate-spin-slow" />
        <h1 className="text-2xl font-extrabold text-stone-900 mb-2">Safari Itinerary Not Found</h1>
        <p className="text-sm text-stone-600 max-w-md mb-6">
          The safari tour package you are looking for may have moved or been updated.
        </p>
        <Link
          to="/tours"
          className="px-6 py-3 text-sm font-bold text-white bg-[#1E7A2E] hover:bg-[#166527] rounded-xl transition-all shadow-md"
        >
          Browse All Safari Packages
        </Link>
      </div>
    );
  }

  const currentDisplayImage = activeImage || tour.heroImage;

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: tour.tagline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const relatedTours = TOURS_DATA.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            <Link to="/tours" className="hover:text-stone-900 transition-colors">Safaris</Link>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="text-[#1E7A2E] font-bold truncate max-w-xs">{tour.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors text-xs flex items-center gap-1.5"
              title="Share Tour"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back Link */}
        <Link
          to="/tours"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#1E7A2E] mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Safaris</span>
        </Link>

        {/* 2. Title & Badges Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tour.bestSeller && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#FDB913] text-stone-950 shadow-xs">
                Best Seller
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#0F5E1F]">
              {tour.style}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-200 text-stone-700">
              {tour.tier}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              ID: {tour.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 mb-2 tracking-tight">
            {tour.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-4xl leading-relaxed">
            {tour.tagline}
          </p>
        </div>

        {/* 3. Photo & Video Gallery Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-8">
          {/* Main Large Media */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden aspect-[16/9] bg-stone-900 relative shadow-sm">
            {showVideo && tour.video ? (
              <video
                src={tour.video}
                poster={tour.heroImage}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={currentDisplayImage}
                alt={tour.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            )}

            {/* Video / Photo Switcher Button */}
            {tour.video && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                {showVideo ? (
                  <>
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Photos</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#FDB913] fill-[#FDB913]" />
                    <span>Watch Video</span>
                  </>
                )}
              </button>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs pointer-events-none">
              <span className="bg-stone-950/70 backdrop-blur-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FDB913]" />
                {tour.destinations.join(' • ')}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-3">
            {tour.video && (
              <button
                onClick={() => setShowVideo(true)}
                className={`rounded-xl overflow-hidden aspect-[16/10] lg:aspect-[16/9] border-2 transition-all cursor-pointer flex flex-col items-center justify-center bg-stone-900 text-white p-2 text-center relative group ${
                  showVideo ? 'border-[#1E7A2E] ring-2 ring-[#1E7A2E]/40' : 'border-stone-700 hover:border-white/50 opacity-90 hover:opacity-100'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#1E7A2E] text-white flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span className="text-[10px] font-bold">Watch Video</span>
              </button>
            )}
            {[tour.heroImage, ...(tour.galleryImages || [])].slice(0, tour.video ? 3 : 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setShowVideo(false);
                  setActiveImage(img);
                }}
                className={`rounded-xl overflow-hidden aspect-[16/10] lg:aspect-[16/9] border-2 transition-all cursor-pointer ${
                  !showVideo && currentDisplayImage === img ? 'border-[#1E7A2E] ring-2 ring-[#1E7A2E]/40' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 4. Quick Specs Bar */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1E7A2E] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 font-semibold block uppercase">Duration</span>
              <span className="text-xs sm:text-sm font-extrabold text-stone-900">{tour.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 font-semibold block uppercase">Group Size</span>
              <span className="text-xs sm:text-sm font-extrabold text-stone-900">Max {tour.maxGroupSize} Guests</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 font-semibold block uppercase">Best Months</span>
              <span className="text-xs sm:text-sm font-extrabold text-stone-900 truncate block">
                {tour.bestMonths}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 font-semibold block uppercase">Physical Rating</span>
              <span className="text-xs sm:text-sm font-extrabold text-stone-900">{tour.physicalRating}</span>
            </div>
          </div>
        </div>

        {/* 5. Main Content Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols): Details, Highlights, Itinerary, Inclusions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs">
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 mb-3">
                Safari Expedition Overview
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {tour.overview}
              </p>

              {/* Highlights */}
              <div className="mt-6 pt-6 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FDB913]" />
                  <span>Key Expedition Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <CheckCircle2 className="w-4 h-4 text-[#1E7A2E] shrink-0 mt-0.5" />
                      <span className="font-medium leading-tight">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comprehensive Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider">
                    Detailed Schedule
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
                    Day-by-Day Itinerary ({tour.itinerary.length} Days)
                  </h2>
                </div>
                <button
                  onClick={() => {
                    const allOpen = Object.keys(expandedDays).length === tour.itinerary.length;
                    if (allOpen) {
                      setExpandedDays({});
                    } else {
                      const all: Record<number, boolean> = {};
                      tour.itinerary.forEach((d) => (all[d.day] = true));
                      setExpandedDays(all);
                    }
                  }}
                  className="text-xs font-bold text-[#1E7A2E] hover:underline cursor-pointer"
                >
                  {Object.keys(expandedDays).length === tour.itinerary.length ? 'Collapse All' : 'Expand All'}
                </button>
              </div>

              <div className="space-y-3.5">
                {tour.itinerary.map((dayItem) => {
                  const isOpen = expandedDays[dayItem.day];
                  return (
                    <div
                      key={dayItem.day}
                      className="border border-stone-200/80 rounded-xl overflow-hidden transition-all bg-stone-50/50"
                    >
                      <button
                        onClick={() => toggleDay(dayItem.day)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-[#1E7A2E] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            D{dayItem.day}
                          </span>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                              {dayItem.title}
                            </span>
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 border-t border-stone-100 text-xs text-stone-600 space-y-3 bg-white">
                          <p className="leading-relaxed text-stone-700">{dayItem.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-[11px] pt-2 border-t border-stone-100">
                            {dayItem.meals && (
                              <div className="flex items-center gap-1.5 text-stone-600">
                                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                                <span className="font-semibold">Meals:</span>
                                <span>{dayItem.meals}</span>
                              </div>
                            )}
                            {dayItem.accommodation && (
                              <div className="flex items-center gap-1.5 text-stone-600">
                                <Bed className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="font-semibold">Lodging:</span>
                                <span>{dayItem.accommodation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Included & Excluded */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F5E1F] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E7A2E]" />
                  <span>What's Included</span>
                </h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A2E] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-stone-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-stone-400" />
                  <span>What's Excluded</span>
                </h3>
                <ul className="space-y-2 text-xs text-stone-500">
                  {tour.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Sticky Booking & Pricing Widget */}
          <div className="lg:col-span-1 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-600/30 shadow-lg">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Expedition Starting Price
              </span>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-stone-900">
                  {formatPrice(tour.priceUSD)}
                </span>
                <span className="text-xs text-stone-500 font-semibold">/ person</span>
                {tour.originalPriceUSD && (
                  <span className="text-xs text-stone-400 line-through ml-auto">
                    {formatPrice(tour.originalPriceUSD)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mb-5">
                *Based on double occupancy. Custom dates & private departures available year-round.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => openInquiry(tour.id)}
                  className="w-full py-3.5 px-4 text-sm font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FDB913]" />
                  <span>Inquire / Book This Tour</span>
                </button>

                <a
                  href={`https://wa.me/254741938127?text=${encodeURIComponent(
                    `Hello Smugsafaris! I am interested in booking the "${tour.title}" (${tour.duration}). Could you share availability and custom pricing?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-bold text-[#0F5E1F] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>WhatsApp Safari Specialist</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+12569477516"
                    className="py-2.5 px-2 text-[11px] font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/70 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#FDB913]" />
                    <span>US: +1 (256)</span>
                  </a>
                  <a
                    href="tel:+254741938127"
                    className="py-2.5 px-2 text-[11px] font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/70 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>KE: +254 741</span>
                  </a>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="mt-5 pt-5 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>AMREF Flying Doctors coverage included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>KATO Bonded Tour Operator #482</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Customized 4x4 Land Cruiser guaranteed</span>
                </div>
              </div>
            </div>

            {/* Need Tailor-made box */}
            <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-900">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#FDB913] mb-1">
                Want to Modify This Route?
              </h4>
              <p className="text-xs text-emerald-100/90 leading-relaxed mb-3">
                Add extra days in Maasai Mara, upgrade to a luxury camp, or add Zanzibar beach extension.
              </p>
              <button
                onClick={() => openInquiry(tour.id)}
                className="text-xs font-bold text-white underline hover:text-[#FDB913] cursor-pointer"
              >
                Request Custom Tailor-Made Variant →
              </button>
            </div>
          </div>
        </div>

        {/* 6. Other Recommended Safaris */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider">
                Explore More Options
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                Other Popular African Safaris
              </h2>
            </div>
            <Link
              to="/tours"
              className="text-xs font-bold text-[#1E7A2E] hover:underline"
            >
              View All Safaris →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((rt) => (
              <div
                key={rt.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img
                    src={rt.heroImage}
                    alt={rt.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-stone-800 backdrop-blur-xs">
                    {rt.duration}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900 line-clamp-1 mb-1">
                      {rt.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                      {rt.tagline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="text-xs font-extrabold text-stone-900">
                      {formatPrice(rt.priceUSD)}
                    </span>
                    <Link
                      to={`/tours/${rt.id}`}
                      className="text-xs font-bold text-[#1E7A2E] hover:underline"
                    >
                      View Itinerary →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
