import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { REVIEWS_DATA } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  Star,
  Award,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MessageCircle,
  ThumbsUp,
  Quote,
  CheckCircle2,
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { openInquiry } = useSafari();
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews = REVIEWS_DATA.filter((r) => {
    if (filterRating !== 'all' && r.rating !== filterRating) return false;
    return true;
  });

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Reviews & Ratings</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <Star className="w-3.5 h-3.5 text-[#FDB913] fill-[#FDB913]" />
              4.9 / 5.0 Verified Rating
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Unfiltered Stories from the Savannah
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Read real feedback from wildlife photographers, honeymooners, and families from over 40 countries who explored Kenya and Tanzania with Smugsafaris.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 2. Rating Score Overview Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Overall Score */}
            <div className="lg:col-span-4 text-center lg:border-r border-stone-100 lg:pr-8">
              <div className="text-5xl sm:text-6xl font-black text-stone-900 mb-2">4.9</div>
              <div className="flex items-center justify-center gap-1 text-[#FDB913] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FDB913]" />
                ))}
              </div>
              <p className="text-xs text-stone-500 font-semibold">
                Based on 650+ verified guest reviews across TripAdvisor, SafariBookings, and direct post-safari feedback.
              </p>
            </div>

            {/* Sub-Ratings */}
            <div className="lg:col-span-8 space-y-3">
              {[
                { label: 'Guide Knowledge & Wildlife Tracking', score: '5.0 / 5.0', percent: '100%' },
                { label: '4x4 Vehicle Comfort & Pop-Up Roof', score: '4.9 / 5.0', percent: '98%' },
                { label: 'Lodge & Luxury Camp Selections', score: '4.9 / 5.0', percent: '97%' },
                { label: 'Pre-Trip Concierge & Communication', score: '5.0 / 5.0', percent: '100%' },
                { label: 'Overall Safari Value for Money', score: '4.8 / 5.0', percent: '96%' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">{item.label}</span>
                    <span className="font-black text-[#1E7A2E]">{item.score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1E7A2E] to-[#7CC142]"
                      style={{ width: item.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Review Cards Grid */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Verified Guest Testimonials
            </h2>
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredReviews.length} reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#FDB913]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FDB913]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400 font-medium">{rev.date}</span>
                  </div>

                  {/* Tour Taken Badge */}
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-[#0F5E1F] text-[11px] font-bold mb-3 border border-emerald-100">
                    Safari: {rev.tourTaken}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white flex items-center justify-center font-bold text-xs`}
                    >
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{rev.author}</h4>
                      <p className="text-[11px] text-stone-400">{rev.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Guest</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Book Your Experience Banner */}
        <div className="bg-gradient-to-r from-[#0F3516] to-[#0A260F] rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FDB913] mb-2 block">
            Start Your Own Story
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to Experience the Magic for Yourself?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md mx-auto mb-6">
            Join thousands of travelers who entrusted their African safari to Smugsafaris.
          </p>
          <button
            onClick={() => openInquiry()}
            className="px-8 py-3.5 text-sm font-extrabold text-stone-900 bg-[#FDB913] hover:bg-[#ffc42e] rounded-xl shadow-md transition-all cursor-pointer"
          >
            Inquire for Your Safari
          </button>
        </div>
      </div>
    </div>
  );
};
