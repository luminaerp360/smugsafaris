import React, { useState } from 'react';
import { Logo } from './Logo';
import { useSafari } from '../context/SafariContext';
import { MessageCircle, Mail, Phone, MapPin, Check, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { scrollToSection, openInquiry } = useSafari();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    setTimeout(() => {
      setNewsletterSent(false);
      setNewsletterEmail('');
    }, 3500);
  };

  return (
    <footer className="bg-[#0F2213] text-white border-t border-[#1C3A22]">
      {/* Upper Newsletter & Callout Bar */}
      <div className="border-b border-[#1C3A22] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7CC142]">
                Safari Dispatch & Travel Advice
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                Join Our East Africa Wildlife Circle
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Seasonal Great Migration updates, wildlife photography tips, and exclusive safari package offers.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {newsletterSent ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-4 py-2.5 rounded-xl border border-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>Welcome aboard! You will receive our next migration bulletin.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex items-center gap-2 max-w-md w-full">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#7CC142] w-full sm:w-64"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#F7941D] to-[#E8720C] hover:from-[#f99f34] hover:to-[#f07b15] rounded-xl whitespace-nowrap cursor-pointer transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Wordmark on Dark Background */}
          <div className="lg:col-span-2">
            <div className="inline-block mb-3">
              <Logo variant="horizontal" theme="dark" />
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mt-2">
              Premier African safari tour operator based in Nairobi, Kenya. We specialize in private, tailor-made wildlife adventures across Maasai Mara, Amboseli, Serengeti, and beyond.
            </p>

            {/* Certifications & Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] text-neutral-300">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                KATO Bonded #482
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                KPSGA Naturalists
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                AMREF Medevac
              </span>
            </div>
          </div>

          {/* Col 2: Top Tours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDB913] mb-4">
              Top Safaris
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => scrollToSection('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  7-Day Classic Kenya Big Five
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  4-Day Maasai Mara Migration
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  6-Day Amboseli & Tsavo
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  8-Day Kenya & Tanzania Odyssey
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  10-Day Bush & Beach: Mara + Zanzibar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDB913] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {['Home', 'Destinations', 'Why Us', 'Services', 'About', 'Reviews', 'FAQ', 'Contact'].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => scrollToSection(sec.toLowerCase().replace(' ', '-'))}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {sec}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDB913] mb-4">
              Contact Desk
            </h4>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7CC142] shrink-0 mt-0.5" />
                <span>Muthangari Drive, Westlands, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#7CC142] shrink-0" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#7CC142] shrink-0" />
                <span>info@smugsafaris.com</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => openInquiry()}
                  className="w-full py-2 px-3 text-xs font-bold text-center text-white bg-[#1E7A2E] hover:bg-[#238b34] rounded-lg transition-colors cursor-pointer"
                >
                  Request a Free Quote
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="mt-12 pt-8 border-t border-[#1C3A22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Smugsafaris Tours & Travel. All rights reserved.</p>
          <p className="italic font-medium text-neutral-300">
            Explore • Discover • Experience
          </p>
        </div>
      </div>
    </footer>
  );
};
