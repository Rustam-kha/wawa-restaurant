import React from 'react';
import { useBooking } from '../context/BookingContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfc282] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
            Guest Protocol & Reservations
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe8]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#eae3d8]/60 font-mono">
            Governing table bookings, private dining contracts, and cancellation protocols
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light bg-[#141618] border border-[#282c30] p-8 rounded-2xl">
          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">1. Table Holding & Grace Period</h2>
            <p>
              Your reserved table will be held for exactly 15 minutes past your scheduled reservation time. If your party is delayed, please notify our concierge immediately. Unclaimed tables beyond 15 minutes will be released to waiting guests.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">2. Cancellation Policy & No-Show Fees</h2>
            <p>
              For standard table bookings (up to 5 guests), cancellations or party adjustments must be submitted at least 24 hours prior to service. For parties of 6 or more, a 48-hour notice is required. Late cancellations and no-shows are subject to a fee of £50 / $50 per guest charged to the guarantee card on file.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">3. Dress Code & Etiquette</h2>
            <p>
              WaWa enforces an elegant smart casual dress code across all dining rooms. We kindly request that gentlemen refrain from athletic apparel, sleeveless tops, flip-flops, and baseball caps during evening services. We reserve the right to refuse service to patrons not adhering to minimum decorum.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">4. Allergies & Dietary Accommodations</h2>
            <p>
              While our kitchen takes rigorous precautions to prevent cross-contamination, dishes are prepared in an open environment where shellfish, gluten, dairy, and tree nuts are handled. Guests with life-threatening allergies are required to declare their requirements upon booking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">5. Private Dining Room Contracts</h2>
            <p>
              Private dining reservations are subject to signed event agreements and minimum spend requirements as quoted in your written booking confirmation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
