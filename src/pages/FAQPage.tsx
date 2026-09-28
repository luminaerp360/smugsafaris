import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FAQS_DATA } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Phone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { openInquiry } = useSafari();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['all', 'Booking & Payments', 'Health & Safety', 'Visas & Travel Logistics', 'Safari Life & Gear'];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">FAQ</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <HelpCircle className="w-3.5 h-3.5 text-[#FDB913]" />
              Got Questions? We Have Answers.
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Frequently Asked Safari Questions
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Find answers regarding bookings, visa requirements, AMREF Flying Doctors coverage, vaccinations, tipping etiquette, and our 4x4 safari vehicles.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2. Search Box */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any safari question (e.g. malaria, visa, deposit, vehicles)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] shadow-xs"
          />
        </div>

        {/* 3. Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1E7A2E] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* 4. Accordion List */}
        <div className="space-y-4 mb-14">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-6">
              <p className="text-sm text-stone-500 mb-3">No questions match your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold text-[#1E7A2E] hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#1E7A2E] uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-stone-900">
                        {item.question}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/40">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 5. Still Have Questions Box */}
        <div className="bg-gradient-to-r from-[#0F3516] to-[#0A260F] rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FDB913] mb-2 block">
            Direct Expert Support
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Have a Specific Question Not Listed Here?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md mx-auto mb-6">
            Our safari specialists in Eldoret are ready to assist you via WhatsApp or phone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20have%20a%20question%20regarding%20a%20safari%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-stone-900 bg-[#FDB913] hover:bg-[#ffc42e] rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-950" />
              <span>Ask on WhatsApp</span>
            </a>
            <button
              onClick={() => openInquiry()}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
            >
              Submit an Online Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
