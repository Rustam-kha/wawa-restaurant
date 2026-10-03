import React from 'react';
import { useBooking } from '../context/BookingContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Shield, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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
            Guest Trust & Data Security
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#f4efe8]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#eae3d8]/60 font-mono">
            Last Updated: January 2026 · Effective across all WaWa international locations
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light bg-[#141618] border border-[#282c30] p-8 rounded-2xl">
          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">1. Information We Collect</h2>
            <p>
              When you reserve a table at WaWa, subscribe to our dispatches, or inquire about private dining, we collect personal information including your full name, email address, telephone number, dietary requirements, and specific celebration details.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">2. How We Utilize Your Data</h2>
            <p>
              Your information is exclusively utilized to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Facilitate, confirm, and manage table reservations and private salon bookings.</li>
              <li>Accommodate life-critical allergies and dietary preferences in our kitchens.</li>
              <li>Provide SMS or email updates regarding booking status and arrival instructions.</li>
              <li>Deliver our periodic culinary newsletters (only with your explicit opt-in).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">3. Payment Processing & Cashless Policy</h2>
            <p>
              WaWa operates cashless venues globally. Payment transactions and credit card holds are processed through PCI-DSS Level 1 compliant secure gateways. We never store complete credit card account numbers on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">4. Third-Party Sharing</h2>
            <p>
              We do not sell, rent, or lease guest information to commercial third parties. Data is only accessible to authorized restaurant staff, sommelier teams, and verified reservation infrastructure providers bound by strict confidentiality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif text-[#f4efe8]">5. Your Rights & Data Inquiries</h2>
            <p>
              You maintain the right to review, update, or request the deletion of your personal records at any time by contacting our Data Protection Officer at {RESTAURANT_INFO.centralEmail}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
