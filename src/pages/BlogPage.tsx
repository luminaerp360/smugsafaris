import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../data/safariData';
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
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
            <span className="text-white font-medium">Safari Guides & Blog</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <BookOpen className="w-3.5 h-3.5 text-[#FDB913]" />
              Field Insights & Expert Advice
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              East Africa Safari Travel Guides
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Written by our lead naturalist guides and tour directors. Get insider packing advice, Great Migration calendar timing, and country comparison guides.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2. Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Articles' },
            { id: 'Travel Tips', label: 'Packing & Travel Tips' },
            { id: 'Migration Guide', label: 'Migration Timing' },
            { id: 'Planning', label: 'Trip Planning & Comparisons' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1E7A2E] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-stone-900 shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-stone-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-extrabold text-stone-900 hover:text-[#1E7A2E] transition-colors line-clamp-2 mb-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-stone-500 truncate max-w-[150px]">
                  By {post.author.split(',')[0]}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#1E7A2E] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
