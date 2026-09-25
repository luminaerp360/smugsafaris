import React, { useState } from 'react';
import { SafariProvider } from './context/SafariContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { FeaturedTours } from './components/FeaturedTours';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DestinationsSection } from './components/DestinationsSection';
import { SafariCostEstimator } from './components/SafariCostEstimator';
import { TravelServicesSection } from './components/TravelServicesSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TourDetailModal } from './components/TourDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';

function MainContent() {
  const [heroSearchFilters, setHeroSearchFilters] = useState<{
    destination: string;
    style: string;
    duration: string;
  }>({
    destination: 'all',
    style: 'all',
    duration: 'all',
  });

  const handleHeroSearch = (filters: { destination: string; style: string; duration: string }) => {
    setHeroSearchFilters(filters);
  };

  const handleSelectDestinationFromSection = (destName: string) => {
    setHeroSearchFilters((prev) => ({
      ...prev,
      destination: destName,
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onSearchFilter={handleHeroSearch} />

        {/* Credentials / Stats Bar */}
        <StatsBar />

        {/* Tours Listing & Details */}
        <FeaturedTours
          filterDestination={heroSearchFilters.destination}
          filterStyle={heroSearchFilters.style}
          filterDuration={heroSearchFilters.duration}
        />

        {/* 6 Key Pillars / Why Choose Us */}
        <WhyChooseUs />

        {/* Top East Africa Destinations */}
        <DestinationsSection onSelectDestinationFilter={handleSelectDestinationFromSection} />

        {/* Interactive Safari Cost Estimator */}
        <SafariCostEstimator />

        {/* Travel Services */}
        <TravelServicesSection />

        {/* Company Story & Safari Fleet */}
        <AboutSection />

        {/* Photo Gallery with Lightbox */}
        <GallerySection />

        {/* Traveler Reviews & Ratings */}
        <TestimonialsSection />

        {/* Safari Guides & Travel Tips Blog */}
        <BlogSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Contact Us & Direct Inquiry */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Modals */}
      <TourDetailModal />
      <InquiryModal />

      {/* Floating Elements */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <SafariProvider>
      <MainContent />
    </SafariProvider>
  );
}
