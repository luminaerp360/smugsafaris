import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/safariData';
import { BookOpen, Clock, Calendar, ArrowRight, X } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 md:py-24 bg-[#FAFAF8] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              Insider Safari Knowledge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
              Safari Planning Guides & Travel Tips
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-xl">
              Practical guides penned by our senior safari guides to help you prepare for an unforgettable African expedition.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {post.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-medium mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F7941D]" />
                      <span>{post.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishDate}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="text-base font-bold text-neutral-900 group-hover:text-[#1E7A2E] transition-colors cursor-pointer line-clamp-2"
                  >
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-medium truncate max-w-[160px]">
                  By {post.author.split(',')[0]}
                </span>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1E7A2E] hover:text-[#0F5E1F] cursor-pointer"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span className="font-bold text-[#1E7A2E] uppercase">{selectedPost.category}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
              <span>·</span>
              <span>{selectedPost.publishDate}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
              {selectedPost.title}
            </h2>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Written by <span className="font-semibold text-neutral-800">{selectedPost.author}</span>
            </p>

            <div className="rounded-xl overflow-hidden mb-6 aspect-[16/9]">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
              {selectedPost.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#0F5E1F] rounded-lg cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
