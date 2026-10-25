import React, { useState, useEffect, useRef } from 'react';
import { REVIEWS_DATA, Review } from '../data/safariData';
import {
  Star,
  MessageSquarePlus,
  Check,
  X,
  ShieldCheck,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartXRef = useRef<number | null>(null);

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newTour, setNewTour] = useState('7-Day Classic Kenya Big Five Safari');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Continuous auto-advancing carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      country: newCountry || 'International Guest',
      countryCode: 'UN',
      date: 'Just now',
      rating: newRating,
      tourTaken: newTour,
      comment: newComment,
      avatarBg: 'bg-emerald-800',
    };

    setReviews([newRev, ...reviews]);
    setActiveIndex(0);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsReviewModalOpen(false);
      setNewAuthor('');
      setNewComment('');
      setNewCountry('');
    }, 2000);
  };

  // Indices for triad layout (Center card zoomed in, left and right cards framing it)
  const prevIndex = (activeIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (activeIndex + 1) % reviews.length;

  const visibleCards = [
    { review: reviews[prevIndex], role: 'prev', index: prevIndex },
    { review: reviews[activeIndex], role: 'active', index: activeIndex },
    { review: reviews[nextIndex], role: 'next', index: nextIndex },
  ];

  return (
    <section
      id="reviews"
      className="py-10 sm:py-14 bg-[#FAF9F5] border-b border-[#EAE2D2] relative overflow-hidden"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-amber-100/40 via-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact, Streamlined Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 sm:mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-[11px] font-bold text-[#0F5E1F] mb-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Verified Traveler Stories</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                Guest Reviews & Reflections
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600 max-w-xl">
                Real safari experiences shared by travelers who explored the African bush with Smugsafaris.
              </p>
            </div>

            {/* Right Controls: Rating score, Prev/Next arrows, and Leave a Review */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E7DEC8] shadow-2xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="ml-1 text-xs font-black text-neutral-900 tabular-nums">4.9 / 5.0</span>
              </div>

              {/* Prev / Next Slider Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#1E7A2E] hover:text-white text-neutral-700 border border-[#E5DAC6] flex items-center justify-center shadow-2xs transition-all cursor-pointer active:scale-95"
                  title="Previous review"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#1E7A2E] hover:text-white text-neutral-700 border border-[#E5DAC6] flex items-center justify-center shadow-2xs transition-all cursor-pointer active:scale-95"
                  title="Next review"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0F5E1F] bg-emerald-100/90 hover:bg-emerald-200/90 border border-emerald-300/60 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Leave a Review</span>
                <span className="sm:hidden">Review</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Center-Zoomed Carousel Track */}
        <div
          className="relative py-4"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-8">
            {visibleCards.map(({ review, role, index }) => {
              const isActive = role === 'active';

              return (
                <div
                  key={`${review.id}-${role}`}
                  onClick={() => !isActive && setActiveIndex(index)}
                  className={`transition-all duration-500 ease-out flex flex-col justify-between select-none ${
                    isActive
                      ? 'w-full max-w-[430px] lg:max-w-[480px] scale-100 sm:scale-105 lg:scale-110 z-20 opacity-100 bg-white rounded-[26px] p-6 sm:p-7 shadow-[0_20px_45px_rgba(15,94,31,0.14)] border-2 border-[#1E7A2E]/40 relative overflow-hidden cursor-default'
                      : 'hidden md:flex w-[290px] lg:w-[340px] shrink-0 scale-90 lg:scale-92 z-10 opacity-60 hover:opacity-90 hover:scale-95 bg-white/85 rounded-[22px] p-5 lg:p-6 shadow-xs border border-neutral-200/90 cursor-pointer'
                  }`}
                >
                  {/* Top Glowing Gradient Accent on Center Zoomed Card */}
                  {isActive && (
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1E7A2E] via-[#FDB913] to-[#0F5E1F]" />
                  )}

                  {/* Watermark Quote Icon */}
                  <Quote
                    className={`absolute top-4 right-4 pointer-events-none transition-opacity ${
                      isActive ? 'w-10 h-10 text-emerald-900/[0.06]' : 'w-8 h-8 text-neutral-400/[0.08]'
                    }`}
                  />

                  {/* Top Card Row: Rating Stars + Date */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className={`fill-amber-400 text-amber-400 ${
                              isActive ? 'w-4 h-4' : 'w-3.5 h-3.5'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs font-black text-neutral-900">5.0</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        {review.date}
                      </span>
                    </div>

                    {/* Review Quote Text */}
                    <p
                      className={`text-neutral-700 leading-relaxed font-normal italic ${
                        isActive
                          ? 'text-xs sm:text-[13px] my-3 line-clamp-4 sm:line-clamp-none'
                          : 'text-[11px] lg:text-xs my-2 line-clamp-4'
                      }`}
                    >
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Bottom Card Row: Author, Country, Verified Tag & Tour Badge */}
                  <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Stylized Avatar with initial */}
                      <div
                        className={`rounded-full flex items-center justify-center font-extrabold text-white shrink-0 shadow-2xs ${
                          isActive
                            ? 'w-9 h-9 text-xs bg-gradient-to-br from-[#1E7A2E] to-[#0F471A]'
                            : 'w-8 h-8 text-[11px] bg-neutral-400'
                        }`}
                      >
                        {review.author.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 truncate">
                          {review.author}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-500 truncate">
                          <MapPin className="w-2.5 h-2.5 text-neutral-400 shrink-0" />
                          <span className="truncate">{review.country}</span>
                          <span className="text-neutral-300">•</span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 shrink-0">
                            <ShieldCheck className="w-3 h-3 text-[#1E7A2E]" /> Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tour Pill Badge */}
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-[#0F5E1F] bg-[#EAF5EC] border border-[#CDE8D1]">
                      {review.tourTaken.split(' ')[0]} Tour
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? 'w-7 bg-[#1E7A2E]'
                    : 'w-2 bg-[#DED6C4] hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-neutral-900">Share Your Safari Experience</h3>
            <p className="text-xs text-neutral-500 mt-1 mb-5">
              Thank you for traveling with Smugsafaris. Your feedback inspires our guide team and future travelers.
            </p>

            {submittedMessage ? (
              <div className="py-8 text-center">
                <Check className="w-12 h-12 text-[#1E7A2E] mx-auto mb-2" />
                <h4 className="text-base font-bold text-neutral-900">Review Submitted!</h4>
                <p className="text-xs text-neutral-600 mt-1">
                  Asante sana! Your review has been added to our guest board.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. David & Jennifer Smith"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Home Country
                    </label>
                    <input
                      type="text"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      placeholder="e.g. United States"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Rating
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                    >
                      <option value="5">5 Stars (Exceptional)</option>
                      <option value="4">4 Stars (Great)</option>
                      <option value="3">3 Stars (Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Tour / Route
                  </label>
                  <input
                    type="text"
                    value={newTour}
                    onChange={(e) => setNewTour(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us about the game drives, wildlife sightings, your guide, and accommodations..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#0F5E1F] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Submit Guest Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
