import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, TOURS_DATA } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ChevronRight,
  Share2,
  Sparkles,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openInquiry, formatPrice } = useSafari();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center p-6 text-center">
        <Compass className="w-16 h-16 text-stone-300 mb-4 animate-spin-slow" />
        <h1 className="text-2xl font-extrabold text-stone-900 mb-2">Article Not Found</h1>
        <p className="text-sm text-stone-600 max-w-md mb-6">
          The safari guide article you are looking for may have been updated or moved.
        </p>
        <Link
          to="/blog"
          className="px-6 py-3 text-sm font-bold text-white bg-[#1E7A2E] hover:bg-[#166527] rounded-xl transition-all shadow-md"
        >
          Return to Safari Guides
        </Link>
      </div>
    );
  }

  const featuredTours = TOURS_DATA.slice(0, 2);

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            <Link to="/blog" className="hover:text-stone-900 transition-colors">Safari Guides</Link>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="text-[#1E7A2E] font-bold truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#1E7A2E] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </Link>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#0F5E1F] inline-block mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 mb-3 tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pb-6 border-b border-stone-200">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-[#1E7A2E]" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Hero Photo */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] mb-8 shadow-sm bg-stone-900">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Paragraphs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs mb-12 space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed">
          <p className="font-semibold text-stone-900 text-base sm:text-lg italic border-l-4 border-[#1E7A2E] pl-4">
            "{post.summary}"
          </p>

          {post.content.map((paragraph, index) => (
            <p key={index} className="text-stone-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-100 flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-[#1E7A2E] text-white font-extrabold flex items-center justify-center shrink-0 text-base">
            JK
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">{post.author}</h4>
            <p className="text-xs text-stone-600 mt-0.5">
              Lead Naturalist & Guide Trainer at Smugsafaris Tours & Travel. Certified KPSGA Naturalist with 16 years leading expeditions across Maasai Mara and Serengeti.
            </p>
          </div>
        </div>

        {/* Recommended Safaris */}
        <div className="border-t border-stone-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-extrabold text-stone-900">
              Featured Safaris Related to This Guide
            </h3>
            <Link to="/tours" className="text-xs font-bold text-[#1E7A2E] hover:underline">
              View All Safaris →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredTours.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs p-4 flex gap-4 items-center"
              >
                <img
                  src={t.heroImage}
                  alt={t.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#1E7A2E] block mb-0.5">
                    {t.duration}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 truncate mb-1">
                    {t.title}
                  </h4>
                  <span className="text-xs font-bold text-stone-900 block mb-2">
                    From {formatPrice(t.priceUSD)}
                  </span>
                  <Link
                    to={`/tours/${t.id}`}
                    className="text-xs font-bold text-[#1E7A2E] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
