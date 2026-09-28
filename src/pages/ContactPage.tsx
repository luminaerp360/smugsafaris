import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    destination: 'Maasai Mara',
    travelStyle: 'Wildlife & Big Five',
    adults: 2,
    children: 0,
    travelDates: '',
    tier: 'Mid-Range Comfort',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <span className="text-white font-medium">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <Phone className="w-3.5 h-3.5 text-[#FDB913]" />
              Eldoret Operations Headquarters
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Let’s Plan Your African Safari Adventure
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Reach our native East African safari designers. We provide free detailed itineraries, lodge recommendations, and transparent price quotes within 2 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (5 cols): Contact Information & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider">
                  Safari Concierge
                </span>
                <h2 className="text-xl font-extrabold text-stone-900 mt-1">
                  Get in Touch with Our Team
                </h2>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Whether you are planning months in advance or seeking a last-minute migration safari departure, we are here to assist.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                {/* Physical Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F5E1F] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Headquarters Address</h4>
                    <p className="text-stone-600 text-xs mt-0.5">
                      Eldoret, Uasin Gishu County, Kenya
                    </p>
                    <span className="text-[11px] text-stone-400">P.O. Box 30100 Eldoret, Kenya</span>
                  </div>
                </div>

                {/* Direct Phone Lines */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F5E1F] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Direct Telephone Desk</h4>
                    <div className="space-y-1 mt-1">
                      <a
                        href="tel:+12569477516"
                        className="text-[#1E7A2E] font-bold block hover:underline"
                      >
                        +1 (256) 947-7516 <span className="text-xs font-normal text-stone-500">(USA & International)</span>
                      </a>
                      <a
                        href="tel:+254741938127"
                        className="text-[#1E7A2E] font-bold block hover:underline"
                      >
                        +254 741 938127 <span className="text-xs font-normal text-stone-500">(Kenya & East Africa)</span>
                      </a>
                      <a
                        href="tel:0769920741"
                        className="text-[#1E7A2E] font-bold block hover:underline"
                      >
                        0769 920 741 <span className="text-xs font-normal text-stone-500">(Kenya Mobile)</span>
                      </a>
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-1">Direct bookings & 24/7 client concierge</span>
                  </div>
                </div>

                {/* WhatsApp Chat */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F5E1F] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Instant WhatsApp Desk</h4>
                    <a
                      href="https://wa.me/254741938127"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E7A2E] font-bold block hover:underline mt-0.5"
                    >
                      +254 741 938127
                    </a>
                    <span className="text-[11px] text-stone-400">Average response time: &lt; 15 mins</span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F5E1F] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Official Safari Email</h4>
                    <a
                      href="mailto:info@smugsafaris.co.ke"
                      className="text-[#1E7A2E] font-bold block hover:underline mt-0.5"
                    >
                      info@smugsafaris.co.ke
                    </a>
                    <span className="text-[11px] text-stone-400">Quotes & corporate bookings</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F5E1F] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Office Working Hours</h4>
                    <p className="text-stone-600 text-xs mt-0.5">
                      Monday – Saturday: 08:00 AM – 18:00 PM (EAT)
                    </p>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      *24/7 Live Emergency Line active for all in-transit guests
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Badge Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 border border-emerald-900 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#FDB913]" />
                <span>Bonded & Registered Operator</span>
              </div>
              <p className="text-emerald-100/80 leading-relaxed text-[11px]">
                Smugsafaris is registered under Kenya Tourism Regulatory Authority (TRA) and bonded with KATO Scheme #482. All passenger bookings automatically covered with AMREF Flying Doctors medevac.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols): Full Interactive Safari Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/80 shadow-xs">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1E7A2E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900">
                    Safari Inquiry Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-stone-900">{formData.fullName}</span>. One of our lead safari specialists has received your details and is preparing a customized itinerary and quote. We will respond within 2 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 text-xs font-bold text-[#1E7A2E] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider block">
                      Custom Route & Price Quote
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-0.5">
                      Tailor Your Safari Experience
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Fill out this quick form and our specialists will assemble a customized day-by-day itinerary with pricing.
                    </p>
                  </div>

                  {/* Traveler Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                      />
                    </div>
                  </div>

                  {/* Phone & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +1 555 123 4567"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United Kingdom"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                      />
                    </div>
                  </div>

                  {/* Destination & Style */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Destination Interest
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
                      >
                        <option value="Maasai Mara">Maasai Mara National Reserve</option>
                        <option value="Serengeti & Ngorongoro">Serengeti & Ngorongoro (Tanzania)</option>
                        <option value="Amboseli & Kilimanjaro">Amboseli (Kilimanjaro Views)</option>
                        <option value="Kenya & Tanzania Combined">Kenya & Tanzania Combined</option>
                        <option value="Bush & Beach: Mara + Zanzibar">Bush & Beach: Mara + Zanzibar</option>
                        <option value="Samburu Northern Frontier">Samburu Northern Frontier</option>
                        <option value="Custom Multi-Park Route">Custom Multi-Park Route</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Safari Style
                      </label>
                      <select
                        value={formData.travelStyle}
                        onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
                      >
                        <option value="Wildlife & Big Five">Wildlife & Big Five Safari</option>
                        <option value="Great Migration">Great Migration River Crossings</option>
                        <option value="Bush & Beach">Bush & Beach Combination</option>
                        <option value="Luxury Flying Safari">Luxury Flying Safari</option>
                        <option value="Honeymoon & Romantic">Honeymoon & Romantic Escape</option>
                        <option value="Family Holiday">Family Holiday with Kids</option>
                      </select>
                    </div>
                  </div>

                  {/* Group Size & Accommodation Tier */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Adult Travelers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Children (under 12)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Accommodation Tier
                      </label>
                      <select
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E] cursor-pointer"
                      >
                        <option value="Mid-Range Comfort">Mid-Range Comfort Lodge</option>
                        <option value="Luxury Tented Camp">Luxury Tented Camp</option>
                        <option value="Budget Camping">Budget Adventure Camping</option>
                      </select>
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Estimated Travel Dates or Preferred Month
                    </label>
                    <input
                      type="text"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      placeholder="e.g. August 2026, or flexible 7 days in September"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                    />
                  </div>

                  {/* Notes / Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Special Wishes, Dietary Needs or Must-See Wildlife
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. We would love to see tree-climbing lions and do a hot air balloon flight..."
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7A2E]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-sm font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] via-[#166527] to-[#0F471A] hover:from-[#238B34] hover:via-[#1E7A2E] hover:to-[#125520] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#FDB913]" />
                    <span>Send Safari Inquiry & Request Quote</span>
                  </button>

                  <p className="text-[11px] text-stone-400 text-center">
                    🔒 Zero spam guarantee. Your contact details remain strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
