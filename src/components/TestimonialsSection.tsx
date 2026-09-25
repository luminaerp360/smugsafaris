import React, { useState } from 'react';
import { REVIEWS_DATA, Review } from '../data/safariData';
import { Star, MessageSquarePlus, Check, X, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newTour, setNewTour] = useState('7-Day Classic Kenya Big Five Safari');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

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
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsReviewModalOpen(false);
      setNewAuthor('');
      setNewComment('');
      setNewCountry('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAFAF8] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              Verified Traveler Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
              Guest Reviews & Reflections
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-xl">
              Real safari experiences shared by travelers who explored the African bush with Smugsafaris.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-sm font-extrabold text-neutral-900 tabular-nums">4.9 / 5.0</span>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0F5E1F] bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{rev.author}</h4>
                  <span className="text-[11px] text-neutral-500 block">{rev.country}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-[#1E7A2E] bg-emerald-50 px-2 py-0.5 rounded">
                    {rev.tourTaken.split(' ')[0]} Tour
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700"
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
