import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { PageId } from '../types';
import { Search, Menu as MenuIcon, X, CalendarCheck, UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { currentPage, navigateTo, reservations } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Menu', page: 'menu' },
    { label: 'Reservations', page: 'reservations' },
    { label: 'Private Dining', page: 'private-dining' },
    { label: 'Services', page: 'services' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Locations', page: 'locations' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageId) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0d0e]/95 backdrop-blur-md py-3.5 border-b border-[#282c30]/70 shadow-2xl'
            : 'bg-gradient-to-b from-[#0c0d0e]/90 via-[#0c0d0e]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ZONE 1: Top Bar Contract - Single text element brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left text-2xl sm:text-3xl font-serif tracking-[0.25em] uppercase text-[#f4efe8] hover:text-[#c5a059] transition-colors focus:outline-none"
            aria-label="WaWa Home"
          >
            WaWa
          </button>

          {/* ZONE 2: 4-8 clean text navigation links without pills */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-widest uppercase font-medium text-[#eae3d8]/80">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`transition-colors py-1 relative hover:text-[#f4efe8] ${
                    isActive ? 'text-[#c5a059] font-semibold' : 'text-[#f4efe8]/75'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a059] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#eae3d8]/80 hover:text-[#c5a059] hover:bg-[#181b1e] rounded-md transition-colors"
              aria-label="Search WaWa dishes, locations and dining rooms"
              title="Search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Manage Existing Reservations */}
            <button
              onClick={() => handleNavClick('manage-booking')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-[#eae3d8]/80 hover:text-[#f4efe8] border border-[#282c30] hover:border-[#c5a059]/60 rounded-md transition-colors whitespace-nowrap"
              title="View or modify an existing table reservation"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Find Booking</span>
              {reservations.length > 0 && (
                <span className="text-[10px] text-[#c5a059] font-mono font-semibold ml-0.5">({reservations.length})</span>
              )}
            </button>

            {/* Primary CTA: Book a Table */}
            <button
              onClick={() => handleNavClick('reservations')}
              className="px-4 sm:px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all duration-200 shadow-sm hover:shadow-[#c5a059]/20 whitespace-nowrap active:scale-[0.98]"
            >
              Book a Table
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#f4efe8] hover:text-[#c5a059] rounded-md transition-colors ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0c0d0e]/98 backdrop-blur-xl pt-24 px-6 pb-12 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#c5a059] font-mono pb-2 border-b border-[#282c30]">
              Navigation
            </div>
            <div className="grid grid-cols-1 gap-2 pt-2">
              {navLinks.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left py-2.5 text-lg font-serif tracking-wider transition-colors flex items-center justify-between ${
                    currentPage === item.page ? 'text-[#c5a059] font-medium' : 'text-[#f4efe8]/80 hover:text-[#f4efe8]'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentPage === item.page && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('manage-booking')}
                className="text-left py-2.5 text-base font-sans tracking-wide text-[#eae3d8]/80 hover:text-[#c5a059] flex items-center gap-2 pt-4 border-t border-[#282c30]"
              >
                <CalendarCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Find or Manage Existing Booking ({reservations.length})</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#282c30] space-y-4">
            <button
              onClick={() => handleNavClick('reservations')}
              className="w-full py-3.5 text-center text-sm font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] rounded-md shadow-md"
            >
              Reserve a Table
            </button>
            <div className="text-center text-xs text-[#eae3d8]/60 tracking-wider">
              Mayfair · Tribeca Manhattan · Ginza Tokyo
            </div>
          </div>
        </div>
      )}
    </>
  );
};
