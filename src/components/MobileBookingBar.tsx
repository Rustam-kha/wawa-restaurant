import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Calendar, Users } from 'lucide-react';

export const MobileBookingBar: React.FC = () => {
  const { currentPage, navigateTo, bookingGuests } = useBooking();

  // Hide if already on reservations or booking confirmation page
  if (currentPage === 'reservations' || currentPage === 'manage-booking') {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-t border-[#282c30] px-4 py-2.5 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-3 text-xs text-[#eae3d8]/80">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Today & Advance</span>
        </span>
        <span className="text-[#282c30]">|</span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>1 – 12+ Guests</span>
        </span>
      </div>
      <button
        onClick={() => navigateTo('reservations')}
        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all active:scale-[0.98] shadow-sm whitespace-nowrap"
      >
        Book Table
      </button>
    </div>
  );
};
