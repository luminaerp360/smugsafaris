import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SafariProvider } from './context/SafariContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TourDetailModal } from './components/TourDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';

// Dedicated Pages
import { HomePage } from './pages/HomePage';
import { ToursPage } from './pages/ToursPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] flex flex-col font-sans antialiased">
      <ScrollToTop />

      {/* Global Sticky Top Navigation */}
      <Navbar />

      {/* Dynamic Page Route Outlet */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals for Quick Inquiries & Fast Details */}
      <TourDetailModal />
      <InquiryModal />

      {/* Floating Concierge & Back-To-Top Helpers */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SafariProvider>
        <AppLayout />
      </SafariProvider>
    </BrowserRouter>
  );
}
