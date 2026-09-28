import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { StatsBar } from '../components/StatsBar';
import { FeaturedTours } from '../components/FeaturedTours';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { DestinationsSection } from '../components/DestinationsSection';
import { SafariCostEstimator } from '../components/SafariCostEstimator';
import { TravelServicesSection } from '../components/TravelServicesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogSection } from '../components/BlogSection';
import { FAQSection } from '../components/FAQSection';
import { useSafari } from '../context/SafariContext';
import { Compass, Sparkles, ArrowRight, ShieldCheck, PhoneCall, Award, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openInquiry } = useSafari();

  const handleHeroSearch = (filters: { destination: string; style: string; duration: string }) => {
    const params = new URLSearchParams();
    if (filters.destination && filters.destination !== 'all') {
      params.set('destination', filters.destination);
    }
    if (filters.style && filters.style !== 'all') {
      params.set('style', filters.style);
    }
    if (filters.duration && filters.duration !== 'all') {
      params.set('duration', filters.duration);
    }
    navigate(`/tours?${params.toString()}`);
  };

  const handleSelectDestination = (destName: string) => {
    navigate(`/destinations?highlight=${encodeURIComponent(destName)}`);
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero with Safari Search */}
      <Hero onSearchFilter={handleHeroSearch} />

      {/* 2. Trust Credentials & Accreditations */}
      <StatsBar />

      {/* 3. Featured Safaris Preview */}
      <section className="relative">
        <FeaturedTours />
        <div className="bg-stone-50 pb-12 pt-2 text-center">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#1E7A2E] to-[#0F471A] hover:from-[#238B34] hover:to-[#166527] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-[#FDB913]" />
            <span>Explore All Safari Packages & Itineraries</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* 4. Why Choose Us Pillar Highlights */}
      <section className="relative">
        <WhyChooseUs />
        <div className="bg-stone-50 pb-12 text-center">
          <Link
            to="/why-us"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#0F5E1F] bg-emerald-100/70 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
          >
            <ShieldCheck className="w-4 h-4 text-[#1E7A2E]" />
            <span>Learn More About Our 6 Pillars & Custom 4x4 Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. Top East Africa Destinations */}
      <section className="relative">
        <DestinationsSection onSelectDestinationFilter={handleSelectDestination} />
        <div className="bg-[#FAF9F5] pb-12 text-center">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#1E7A2E] bg-white hover:bg-emerald-50 rounded-xl transition-all border border-emerald-200 shadow-sm"
          >
            <span>View All National Parks & Reserves Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. Interactive Safari Cost Estimator */}
      <SafariCostEstimator />

      {/* 7. Travel Services Highlights */}
      <section className="relative">
        <TravelServicesSection />
        <div className="bg-stone-50 pb-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#0F5E1F] bg-emerald-100/70 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
          >
            <span>Explore All 6 Bespoke Safari Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 8. Traveler Reviews & Testimonials */}
      <section className="relative">
        <TestimonialsSection />
        <div className="bg-stone-50 pb-12 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#1E7A2E] bg-white hover:bg-emerald-50 rounded-xl transition-all border border-emerald-200 shadow-sm"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Read All 650+ Verified Traveler Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 9. Safari Guides & Blog */}
      <section className="relative">
        <BlogSection />
        <div className="bg-[#FAF9F5] pb-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#0F5E1F] bg-emerald-100/70 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
          >
            <span>Browse All Safari Planning Articles & Tips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 10. Frequently Asked Questions Preview */}
      <FAQSection />

      {/* 11. Custom Safari Quote Banner */}
      <section className="py-16 bg-gradient-to-br from-[#0D3813] via-[#144F1F] to-[#0A270E] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-700/60">
            <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
            Bespoke African Adventures
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Witness Africa’s Greatest Wonders?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every traveler is unique. Talk with our native East African safari specialists to design your custom itinerary with private 4x4 Land Cruisers, certified guides, and handpicked luxury camps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openInquiry()}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold text-stone-900 bg-gradient-to-r from-[#FDB913] to-[#F7941D] hover:from-[#ffc42e] hover:to-[#fa9e2a] rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Request Free Custom Quote
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              Contact Eldoret Safari Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
