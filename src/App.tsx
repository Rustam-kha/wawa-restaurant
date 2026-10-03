/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { MobileBookingBar } from './components/MobileBookingBar';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { ServicesPage } from './pages/ServicesPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { PrivateDiningPage } from './pages/PrivateDiningPage';
import { EventsCateringPage } from './pages/EventsCateringPage';
import { GalleryPage } from './pages/GalleryPage';
import { LocationsPage } from './pages/LocationsPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ManageBookingPage } from './pages/ManageBookingPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPage, isSearchOpen, setIsSearchOpen } = useBooking();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'menu':
        return <MenuPage />;
      case 'services':
        return <ServicesPage />;
      case 'reservations':
        return <ReservationsPage />;
      case 'private-dining':
        return <PrivateDiningPage />;
      case 'events':
        return <EventsCateringPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'locations':
        return <LocationsPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'blog':
        return <BlogPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'manage-booking':
        return <ManageBookingPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0d0e] text-[#f4efe8] selection:bg-[#c5a059] selection:text-[#0c0d0e]">
      {/* Premium Sticky Navigation */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Dynamic Viewport */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Global Search Lightbox */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Sticky Booking Shortcut */}
      <MobileBookingBar />

      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Global Comprehensive Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
