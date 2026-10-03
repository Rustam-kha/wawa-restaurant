import React from 'react';
import { useBooking } from '../context/BookingContext';
import { UtensilsCrossed, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <div className="min-h-[80vh] bg-[#0c0d0e] text-[#f4efe8] flex items-center justify-center pt-28 pb-20 px-4">
      <div className="max-w-md w-full bg-[#141618] border border-[#282c30] p-8 sm:p-12 rounded-2xl text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-[#0c0d0e] border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center mx-auto">
          <UtensilsCrossed className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="text-xs uppercase font-mono tracking-widest text-[#c5a059]">
            Error 404 · Page Not Found
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
            A Missing Course
          </h1>
          <p className="text-xs text-[#eae3d8]/70 leading-relaxed font-light">
            The page or dispatch you are looking for has been retired or moved. Allow us to guide you back to our dining room.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
          >
            Return to Home
          </button>
          <button
            onClick={() => navigateTo('reservations')}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#f4efe8] bg-[#0c0d0e] hover:bg-[#181b1e] border border-[#282c30] rounded-md transition-colors"
          >
            Book a Table
          </button>
        </div>
      </div>
    </div>
  );
};
