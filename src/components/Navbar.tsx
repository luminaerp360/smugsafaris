import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useSafari, Currency } from '../context/SafariContext';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Compass,
  MapPin,
  Camera,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  Star,
  Users,
  Globe,
  Mail,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currency, setCurrency, openInquiry } = useSafari();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Tours & Safaris', path: '/tours', badge: 'Popular' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Why Us', path: '/why-us' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Reviews', path: '/reviews', rating: '4.9★' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const mobileNavLinks = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Tours & Safaris', path: '/tours', icon: Sparkles, badge: 'Popular' },
    { label: 'Destinations', path: '/destinations', icon: Globe },
    { label: 'Why Choose Us', path: '/why-us', icon: ShieldCheck },
    { label: 'Safari Services', path: '/services', icon: CheckCircle2 },
    { label: 'Photo Gallery', path: '/gallery', icon: Camera },
    { label: 'Guest Reviews', path: '/reviews', icon: Star, rating: '4.9★' },
    { label: 'Safari Journal', path: '/blog', icon: BookOpen },
    { label: 'About Us', path: '/about', icon: Users },
    { label: 'Safari FAQs', path: '/faq', icon: HelpCircle },
    { label: 'Contact Us', path: '/contact', icon: Phone },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40">
        {/* Tier 1: Luxury Safari Pre-Header / Top Utility Bar */}
        <div
          className={`bg-[#0B3813] text-emerald-100/90 text-[11px] sm:text-xs transition-all duration-300 border-b border-emerald-900/60 ${
            isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'py-1.5 sm:py-2 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left: Direct Support & Live Status */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="inline-flex items-center gap-1.5 text-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-semibold tracking-wide hidden xs:inline">Safari Desk Online</span>
              </div>

              {/* Multi-region Phone Hotline */}
              <div className="inline-flex items-center gap-2 text-xs">
                <Phone className="w-3 h-3 text-[#FDB913] shrink-0" />
                <a
                  href="tel:+12569477516"
                  className="hover:text-white transition-colors font-medium text-[11px]"
                  title="Call US Desk"
                >
                  +1 (256) 947-7516
                </a>
                <span className="text-emerald-700">|</span>
                <a
                  href="tel:+254741938127"
                  className="hover:text-white transition-colors font-medium text-[11px]"
                  title="Call Kenya Desk"
                >
                  +254 741 938127
                </a>
              </div>

              <span className="hidden md:inline-block text-emerald-700">•</span>

              <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-200/80">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>24/7 Bespoke Concierge</span>
              </span>
            </div>

            {/* Right: Credentials & Compact Currency Selector */}
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden lg:inline-flex items-center gap-1.5 text-emerald-200/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FDB913]" />
                <span className="font-semibold">KATO Bonded #482</span>
              </div>

              {/* Currency Selector Pill */}
              <div className="relative inline-flex items-center">
                <span className="text-[10px] text-emerald-300/80 mr-1.5 hidden sm:inline uppercase font-bold">
                  Currency:
                </span>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="appearance-none bg-emerald-950/80 hover:bg-emerald-900/90 text-white text-[11px] font-bold rounded-md pl-2 pr-5 py-0.5 border border-emerald-700/60 focus:outline-none focus:ring-1 focus:ring-[#FDB913] cursor-pointer transition-colors"
                    aria-label="Select Currency"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="KES">KES (KSh)</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-emerald-300 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Direct WhatsApp Quick Chat */}
              <a
                href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-800/60 hover:bg-emerald-700/80 text-emerald-100 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
                <span className="font-semibold">WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Sticky Navigation Header */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200/90 py-2 sm:py-2.5'
              : 'bg-white/95 backdrop-blur-sm border-b border-stone-200/60 py-3 sm:py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              {/* Brand Logo Zone - Official, Pristine, Complete Uncut Logo */}
              <Link
                to="/"
                className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E7A2E] rounded-xl shrink-0 flex items-center"
                aria-label="Smugsafaris Tours & Travel Homepage"
              >
                <Logo
                  variant="full"
                  theme="light"
                  size="md"
                  className="h-11 sm:h-13 md:h-14 w-auto transform transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              {/* Center Navigation Links (Desktop) */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer group ${
                        isActive
                          ? 'text-[#1E7A2E] bg-emerald-50/90 font-bold shadow-xs'
                          : 'text-stone-700 hover:text-[#1E7A2E] hover:bg-emerald-50/60'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.label}</span>

                        {/* Popular / Rating Mini Badges */}
                        {link.badge && (
                          <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-[#0F5E1F] uppercase tracking-wider">
                            {link.badge}
                          </span>
                        )}
                        {link.rating && (
                          <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100/80 text-amber-800">
                            {link.rating}
                          </span>
                        )}

                        {/* Active Underline indicator */}
                        <span
                          className={`absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#1E7A2E] rounded-full transition-transform duration-200 origin-center ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Desktop Right Action Controls Zone */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Compact Currency in Scrolled mode if top bar hidden */}
                {isScrolled && (
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as Currency)}
                      className="appearance-none bg-stone-100 hover:bg-stone-200/80 text-[11px] font-bold text-stone-800 rounded-lg pl-2 pr-5 py-1.5 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E] cursor-pointer transition-colors"
                      aria-label="Select Currency"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="KES">KES (KSh)</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-stone-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                )}

                {/* WhatsApp Safari Expert Direct Link */}
                <a
                  href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0F5E1F] bg-emerald-50 hover:bg-emerald-100/90 rounded-xl transition-all duration-200 border border-emerald-200/80 shadow-xs hover:shadow"
                  title="Direct WhatsApp Safari Expert"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Chat with Expert</span>
                </a>

                {/* Primary Action Button: "Plan Your Safari" */}
                <button
                  onClick={() => openInquiry()}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[13px] font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] via-[#166527] to-[#0F471A] hover:from-[#238B34] hover:via-[#1E7A2E] hover:to-[#125520] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FDB913] animate-pulse" />
                  <span>Plan Your Safari</span>
                </button>
              </div>

              {/* Mobile & Tablet Controls (< lg) */}
              <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
                {/* WhatsApp Quick Chat Icon */}
                <a
                  href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 transition-all shadow-xs active:scale-95"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4.5 h-4.5 text-[#25D366] fill-[#25D366]" />
                </a>

                {/* Quick Inquire CTA */}
                <button
                  onClick={() => openInquiry()}
                  className="px-3 sm:px-3.5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F5E1F] hover:from-[#238B34] hover:to-[#125520] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Inquire
                </button>

                {/* Premium Hamburger Toggle Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    mobileMenuOpen
                      ? 'bg-[#1E7A2E] text-white border-[#1E7A2E] shadow-emerald-700/20'
                      : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-800 hover:text-[#1E7A2E]'
                  }`}
                  aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileMenuOpen}
                >
                  <div className="w-4.5 h-3.5 flex flex-col justify-between items-center pointer-events-none">
                    <span
                      className={`h-0.5 w-full rounded-full transition-all duration-300 transform origin-center ${
                        mobileMenuOpen
                          ? 'rotate-45 translate-y-1.5 bg-white'
                          : 'bg-current'
                      }`}
                    />
                    <span
                      className={`h-0.5 w-full rounded-full transition-all duration-200 ${
                        mobileMenuOpen ? 'opacity-0 scale-x-0' : 'bg-current opacity-100'
                      }`}
                    />
                    <span
                      className={`h-0.5 w-full rounded-full transition-all duration-300 transform origin-center ${
                        mobileMenuOpen
                          ? '-rotate-45 -translate-y-1.5 bg-white'
                          : 'bg-current'
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Luxury Safari Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-modal="true"
        role="dialog"
      >
        {/* Backdrop with rich blur */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer Panel: Sleek, Unified Dark Luxury Safari Architecture */}
        <div
          className={`absolute inset-y-0 right-0 w-full sm:w-[360px] max-w-[90vw] bg-[#0A160D] text-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out z-10 border-l border-white/10 overflow-hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#071309]">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="inline-block">
              <Logo variant="full" theme="dark" size="sm" className="h-9 w-auto" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-stone-300 hover:text-white flex items-center justify-center border border-white/15 transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Sub-bar: Eldoret Operations & Status */}
          <div className="px-5 py-2 bg-emerald-950/40 border-b border-white/5 flex items-center justify-between text-[11px] text-stone-300">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-medium text-emerald-200">Eldoret Desk Online</span>
            </div>
            <span className="text-[#FDB913] font-semibold">KATO #482</span>
          </div>

          {/* Clean Navigation Menu Items */}
          <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
            {mobileNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-900/60 to-emerald-950/40 text-white font-bold border-l-3 border-[#FDB913]'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#FDB913]' : 'text-emerald-500/80'
                        }`}
                      />
                      <span>{link.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E7A2E] text-white uppercase tracking-wider">
                          {link.badge}
                        </span>
                      )}
                      {link.rating && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-[#FDB913] border border-amber-500/30">
                          {link.rating}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isActive ? 'text-[#FDB913]' : 'text-stone-600'
                        }`}
                      />
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Minimalist Segmented Currency Switcher */}
          <div className="px-5 py-3 border-t border-white/10 bg-[#071309] shrink-0 flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
              Currency
            </span>
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              {(['USD', 'EUR', 'GBP', 'KES'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    currency === c
                      ? 'bg-[#1E7A2E] text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/10 bg-[#050E07] shrink-0 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiry();
              }}
              className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1E7A2E] via-[#166527] to-[#0F471A] hover:from-[#238B34] hover:to-[#125520] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#FDB913]" />
              <span>Plan Your Bespoke Safari</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 rounded-xl transition-colors border border-emerald-800/60"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+254741938127"
                className="flex items-center justify-center gap-1.5 py-2 px-2 text-[11px] font-bold text-stone-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>+254 741 938127</span>
              </a>
            </div>

            <a
              href="tel:+12569477516"
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] font-bold text-stone-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 mt-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>US Hotline: +1 (256) 947-7516</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
