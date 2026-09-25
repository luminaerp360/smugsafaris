import React, { useState, useEffect } from 'react';
import { useSafari } from '../context/SafariContext';
import { TOURS_DATA } from '../data/safariData';
import { X, Check, MessageCircle, Sparkles, ShieldCheck, Calendar, Users, Mail, Phone, User, Send } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { isInquiryOpen, closeInquiry, inquiryTourId } = useSafari();

  const [selectedTour, setSelectedTour] = useState<string>('custom');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [tier, setTier] = useState('Mid-Range Comfort');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  useEffect(() => {
    if (inquiryTourId) {
      setSelectedTour(inquiryTourId);
    } else {
      setSelectedTour('custom');
    }
    setIsSubmitted(false);
  }, [inquiryTourId, isInquiryOpen]);

  if (!isInquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `SMUG-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generatedRef);
    setIsSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const tourTitle =
      selectedTour === 'custom'
        ? 'Custom Tailor-Made Safari'
        : TOURS_DATA.find((t) => t.id === selectedTour)?.title || 'Safari Inquiry';

    const text = `Hello Smugsafaris! My name is ${fullName || 'Guest'}. Ref: ${refCode}. I would like to inquire about: ${tourTitle}, arriving around ${travelDate || 'flexible dates'} for ${adults} adults and ${children} children. Tier: ${tier}.`;
    return `https://wa.me/254700123456?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-neutral-200">
        <button
          onClick={closeInquiry}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 cursor-pointer"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-6 sm:p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1E7A2E] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
              Inquiry Received Successfully
            </span>
            <h3 className="text-2xl font-extrabold text-neutral-900 mt-1">
              Safari Proposal in Progress!
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
              Asante sana, <strong>{fullName}</strong>. Our senior safari director in Nairobi is preparing your customized day-by-day itinerary and quote.
            </p>

            <div className="mt-5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 inline-block text-xs">
              <span className="text-neutral-500">Your Booking Reference:</span>
              <span className="font-mono font-bold text-[#0F5E1F] ml-2 text-sm">{refCode}</span>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Now on WhatsApp</span>
              </a>

              <button
                onClick={closeInquiry}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
                Tailor-Made Safari Planning
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
                Plan Your African Safari
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Tell us your travel vision. We reply with a detailed itinerary and quote within 24 hours. No obligation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tour Package Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Selected Safari Tour / Route
                </label>
                <select
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E] cursor-pointer"
                >
                  <option value="custom">★ Custom Tailor-Made Itinerary (Design from scratch)</option>
                  {TOURS_DATA.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Counts and Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#1E7A2E]" />
                    Target Travel Date
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#1E7A2E]" />
                    Adults (12+)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#1E7A2E]" />
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  >
                    {[0, 1, 2, 3, 4, '5+'].map((n) => (
                      <option key={n} value={n}>
                        {n} Child{n !== 1 ? 'ren' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Accommodation Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Accommodation Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Budget Camping', 'Mid-Range Comfort', 'Luxury Tented Camp'].map((tierOption) => (
                    <button
                      key={tierOption}
                      type="button"
                      onClick={() => setTier(tierOption)}
                      className={`p-2 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        tier === tierOption
                          ? 'bg-[#1E7A2E] text-white border-[#1E7A2E]'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      <span className="block">{tierOption.split(' ')[0]}</span>
                      <span className="text-[10px] font-normal opacity-80 block">
                        {tierOption.split(' ').slice(1).join(' ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#1E7A2E]" />
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#1E7A2E]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#1E7A2E]" />
                  Phone Number / WhatsApp (with country code)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000 or +44 7000 000000"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                />
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Special Interests / Notes
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Honeymoon, Big cats focus, hot air balloon, dietary restrictions..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                />
              </div>

              {/* Trust markers */}
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#1E7A2E] shrink-0" />
                <span>Your information is strictly private. AMREF Medevac automatically included.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F5E1F] hover:from-[#238b34] hover:to-[#136b23] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom Safari Proposal</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
