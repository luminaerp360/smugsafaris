import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useSafari, Currency } from '../context/SafariContext';
import { Phone, MessageCircle, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currency, setCurrency, openInquiry, scrollToSection } = useSafari();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tours', href: 'tours' },
    { label: 'Destinations', href: 'destinations' },
    { label: 'Why Us', href: 'why-us' },
    { label: 'Services', href: 'services' },
    { label: 'About', href: 'about' },
    { label: 'Reviews', href: 'reviews' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E5DD] py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-neutral-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single element brand wordmark */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E7A2E] rounded-md"
              aria-label="Smugsafaris Tours and Travel Homepage"
            >
              <Logo variant="horizontal" theme="light" />
            </a>

            {/* Zone 2: 4-7 clean single-line nav links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-semibold text-neutral-700 hover:text-[#1E7A2E] transition-colors py-1 cursor-pointer whitespace-nowrap relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1E7A2E] transition-all duration-200 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Zone 3: 1-2 primary actions & compact currency */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Currency Selector */}
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="appearance-none bg-neutral-100/80 hover:bg-neutral-200/70 text-xs font-semibold text-neutral-800 rounded-lg pl-2.5 pr-6 py-2 border border-neutral-200/80 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E] cursor-pointer transition-colors"
                  aria-label="Select Currency"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="KES">KES (KSh)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/254700123456?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20inquire%20about%20a%20safari%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0F5E1F] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/60"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>+254 700 123 456</span>
              </a>

              {/* Primary Action Button */}
              <button
                onClick={() => openInquiry()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F5E1F] hover:from-[#238b34] hover:to-[#126b23] rounded-lg shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap cursor-pointer transform active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
                <span>Plan Your Safari</span>
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => openInquiry()}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#1E7A2E] rounded-md"
              >
                Inquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <Logo variant="horizontal" theme="light" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-base font-semibold text-neutral-800 hover:text-[#1E7A2E] py-2 px-3 rounded-lg hover:bg-emerald-50/60 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-neutral-100">
                <label className="text-xs font-medium text-neutral-500 block mb-2">Select Currency</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['USD', 'EUR', 'GBP', 'KES'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`py-1.5 px-3 text-xs font-semibold rounded-md border text-center transition-colors ${
                        currency === c
                          ? 'border-[#1E7A2E] bg-emerald-50 text-[#0F5E1F]'
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <a
                href="https://wa.me/254700123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-emerald-800 bg-emerald-100/70 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp Safari Desk</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiry();
                }}
                className="w-full py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F5E1F] rounded-lg shadow-sm"
              >
                Plan Your Safari Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
