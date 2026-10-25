import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useSafari } from '../context/SafariContext';
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
  Film,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  Star,
  Users,
  Globe,
  Mail,
  ArrowRight,
  Car,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { openInquiry } = useSafari();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const primaryNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Safaris', path: '/tours' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Gallery', path: '/gallery' },
  ];

  const aboutSubLinks = [
    { label: 'Maasai Mara Packages', path: '/maasai-mara-safari-packages', desc: 'Great Migration & Big Five predator tours', icon: Sparkles },
    { label: '4x4 Safari Land Cruiser Hire', path: '/4x4-safari-land-cruiser-hire-kenya', desc: 'Pop-up roof vehicles with driver-guide', icon: Car },
    { label: 'Tours & Travel in Kenya', path: '/tours-and-travel-companies-in-kenya', desc: 'Bespoke 4x4 safaris & national circuits', icon: Globe },
    { label: 'Eldoret Tours & Travel', path: '/tours-and-travel-companies-in-eldoret', desc: 'North Rift safaris & 4x4 car hire', icon: MapPin },
    { label: 'About Us', path: '/about', desc: 'Our story & Eldoret operations', icon: Users },
    { label: 'Why Choose Us', path: '/why-us', desc: '100% guarantee & 4x4 fleet', icon: ShieldCheck },
    { label: 'Safari Services', path: '/services', desc: 'Private charters, transfers, lodges', icon: CheckCircle2 },
    { label: 'Guest Reviews', path: '/reviews', desc: '4.9★ rating from 1,200+ guests', icon: Star, rating: '4.9★' },
    { label: 'Safari Journal', path: '/blog', desc: 'Migration & wildlife guides', icon: BookOpen },
    { label: 'Safari FAQs', path: '/faq', desc: 'Visas, seasons & packing tips', icon: HelpCircle },
  ];

  const mobileNavLinks = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Safaris & Itineraries', path: '/tours', icon: Sparkles },
    { label: 'Maasai Mara Packages', path: '/maasai-mara-safari-packages', icon: Sparkles },
    { label: '4x4 Safari Cruiser Hire', path: '/4x4-safari-land-cruiser-hire-kenya', icon: Car },
    { label: 'Tours & Travel in Kenya', path: '/tours-and-travel-companies-in-kenya', icon: Globe },
    { label: 'Eldoret Tours & Travel', path: '/tours-and-travel-companies-in-eldoret', icon: MapPin },
    { label: 'Destinations', path: '/destinations', icon: Globe },
    { label: 'Safari Gallery', path: '/gallery', icon: Film },
    { label: 'Why Choose Us & Fleet', path: '/why-us', icon: ShieldCheck },
    { label: 'Safari Services', path: '/services', icon: CheckCircle2 },
    { label: 'Guest Reviews', path: '/reviews', icon: Star },
    { label: 'About Us', path: '/about', icon: Users },
    { label: 'Safari Journal', path: '/blog', icon: BookOpen },
    { label: 'Contact Us', path: '/contact', icon: Phone },
  ];

  return (
    <>
      {/* Tier 1: Luxury Safari Top Utility Bar (Scrolls with page, hidden on mobile for clean viewport) */}
      <div className="hidden sm:block bg-[#0B3813] text-emerald-100/90 text-[11px] py-1.5 border-b border-emerald-900/60 relative z-30">
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
              <span className="text-emerald-700">|</span>
              <a
                href="tel:0769920741"
                className="hover:text-white transition-colors font-medium text-[11px]"
                title="Call Kenya Mobile"
              >
                0769 920 741
              </a>
            </div>

            <span className="hidden md:inline-block text-emerald-700">•</span>

            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-200/80">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>24/7 Bespoke Concierge</span>
            </span>
          </div>

          {/* Right: Credentials & WhatsApp Desk */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden lg:inline-flex items-center gap-1.5 text-emerald-200/90">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FDB913]" />
              <span className="font-semibold">Licensed Tour Operator</span>
            </div>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href="https://wa.me/254769920741?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-800/60 hover:bg-emerald-700/80 text-emerald-100 hover:text-white transition-colors font-semibold"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Sticky Navigation Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow duration-200 py-2 sm:py-2.5 ${
          isScrolled ? 'shadow-md' : 'shadow-xs'
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
                  size="sm"
                  className="h-8 sm:h-9 md:h-10 w-auto transform transition-transform duration-200 group-hover:scale-105"
                />
              </Link>

              {/* Center Navigation Links (Desktop) */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                {primaryNavLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `relative px-3 py-1.5 text-xs xl:text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer group ${
                        isActive
                          ? 'text-[#1E7A2E] font-bold'
                          : 'text-stone-700 hover:text-[#1E7A2E]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.label}</span>
                        {/* Active Underline indicator */}
                        <span
                          className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#1E7A2E] rounded-full transition-transform duration-200 origin-center ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}

                {/* About & Trust Dropdown Menu */}
                <div className="relative group">
                  <button
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs xl:text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                      ['/about', '/why-us', '/services', '/reviews', '/blog', '/faq'].some((p) =>
                        location.pathname.startsWith(p)
                      )
                        ? 'text-[#1E7A2E] font-bold'
                        : 'text-stone-700 hover:text-[#1E7A2E]'
                    }`}
                  >
                    <span>About</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1E7A2E] transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu Box */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/90 p-2 space-y-0.5">
                      {aboutSubLinks.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                              isSubActive
                                ? 'bg-emerald-50 text-[#1E7A2E]'
                                : 'text-stone-700 hover:text-[#1E7A2E] hover:bg-emerald-50/70'
                            }`}
                          >
                            <SubIcon
                              className={`w-4 h-4 shrink-0 ${
                                isSubActive ? 'text-[#1E7A2E]' : 'text-emerald-600/70'
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold leading-tight flex items-center justify-between">
                                <span>{sub.label}</span>
                                {sub.rating && (
                                  <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 ml-1">
                                    {sub.rating}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-stone-400 truncate mt-0.5">
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Contact Nav Link */}
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `relative px-3 py-1.5 text-xs xl:text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer group ${
                      isActive
                        ? 'text-[#1E7A2E] font-bold'
                        : 'text-stone-700 hover:text-[#1E7A2E]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>Contact</span>
                      <span
                        className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#1E7A2E] rounded-full transition-transform duration-200 origin-center ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </nav>

              {/* Desktop Right Action Controls Zone */}
              <div className="hidden lg:flex items-center gap-2.5">
                <a
                  href="https://wa.me/254769920741?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20request%20a%20custom%20safari%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1E7A2E] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/60"
                  aria-label="WhatsApp Us"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                  <span>WhatsApp</span>
                </a>



                {/* Primary Action Button: "Plan Safari" */}
                <button
                  onClick={() => openInquiry()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F5E1F] hover:from-[#238B34] hover:to-[#125520] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3 h-3 text-[#FDB913]" />
                  <span>Plan Safari</span>
                </button>
              </div>

              {/* Mobile & Tablet Controls (< lg) */}
              <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
                {/* WhatsApp Quick Chat Icon */}
                <a
                  href="https://wa.me/254769920741?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
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
        {/* Drawer Panel: Sleek, Calming Luxury Safari Architecture */}
        <div
          className={`absolute inset-y-0 right-0 w-full sm:w-[350px] max-w-[88vw] bg-[#0A150D] text-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out z-10 border-l border-white/10 overflow-hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header with Logo, Inline Currency, and Close */}
          <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#061008]">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="inline-block">
              <Logo variant="full" theme="dark" size="sm" className="h-8 w-auto" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/254769920741?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center border border-[#25D366]/30"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-stone-300 hover:text-white flex items-center justify-center border border-white/15 transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Understated Status Strip */}
          <div className="px-5 py-2 bg-emerald-950/20 border-b border-white/5 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-200/90 font-medium">Safari Desk Online</span>
            </div>
            <span className="text-stone-400 font-medium">Licensed Tour Operator</span>
          </div>

          {/* Clean Navigation Menu Items */}
          <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
            {mobileNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 text-[14px] ${
                    isActive
                      ? 'bg-emerald-900/40 text-emerald-200 font-semibold border-l-2 border-[#FDB913]'
                      : 'text-stone-300 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#FDB913]' : 'text-emerald-500/70'
                        }`}
                      />
                      <span>{link.label}</span>
                    </div>

                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-[#FDB913]' : 'text-stone-600'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Refined, Uncluttered Footer Actions */}
          <div className="p-4 border-t border-white/10 bg-[#061008] shrink-0 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiry();
              }}
              className="w-full py-3 px-4 text-xs sm:text-sm font-extrabold text-stone-900 bg-gradient-to-r from-[#FDB913] to-[#F7941D] hover:from-[#ffc42e] hover:to-[#fa9e2a] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-stone-900" />
              <span>Plan Your Bespoke Safari</span>
            </button>

            {/* Streamlined Direct Contact Options */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/254769920741?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-emerald-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+254741938127"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-stone-200 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#FDB913]" />
                <span>Call Desk</span>
              </a>
            </div>

            <p className="text-center text-[10px] text-stone-500 pt-0.5">
              Eldoret, Kenya • 24/7 Safari Concierge
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
