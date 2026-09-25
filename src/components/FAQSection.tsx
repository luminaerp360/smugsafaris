import React, { useState, useMemo } from 'react';
import { FAQS_DATA } from '../data/safariData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['all', 'Booking & Payments', 'Health & Safety', 'Visas & Travel Logistics', 'Safari Life & Gear'];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((item) => {
      if (selectedCat !== 'all' && item.category !== selectedCat) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedCat, search]);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
            Everything You Need to Know
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
            Frequently Asked Safari Questions
          </h2>
          <p className="mt-2 text-neutral-600 text-sm max-w-lg mx-auto">
            Practical answers on booking procedures, health requirements, tipping guidelines, and what to pack for the bush.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-neutral-100 rounded-xl w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCat === c
                    ? 'bg-white text-[#1E7A2E] shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {c === 'all' ? 'All Questions' : c.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-60">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
              No matching questions found. Contact our safari desk on WhatsApp (+254 700 123 456) for direct answers.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border border-neutral-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-4 sm:p-5 text-left bg-white hover:bg-neutral-50 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-neutral-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1E7A2E]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed bg-white border-t border-neutral-100 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
