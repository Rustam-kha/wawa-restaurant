import React, { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { FAQS } from '../data/restaurantData';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(FAQS[0].id);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQS;
    const q = searchQuery.toLowerCase();
    return FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Guest Protocol
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            Essential guidelines regarding reservations, cancellations, dietary accommodations, dress etiquette, and private salon celebrations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-[#eae3d8]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. dress code, cancellation, parking)..."
            className="w-full bg-[#141618] border border-[#282c30] rounded-xl py-3 pl-10 pr-4 text-xs text-[#f4efe8] placeholder-[#eae3d8]/40 focus:outline-none focus:border-[#c5a059]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#eae3d8]/40 hover:text-[#f4efe8]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-[#141618] rounded-xl border border-[#282c30] text-xs text-[#eae3d8]/70">
              No matching questions found. Please contact our concierge directly.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#141618] border border-[#282c30] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059] block mb-1">
                        {faq.category}
                      </span>
                      <h2 className="text-base sm:text-lg font-serif text-[#f4efe8]">
                        {faq.question}
                      </h2>
                    </div>
                    <div className="p-1 rounded bg-[#0c0d0e] border border-[#282c30] text-[#c5a059] shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs text-[#eae3d8]/80 leading-relaxed font-light border-t border-[#282c30]/50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 bg-[#141618] border border-[#282c30] p-8 rounded-2xl text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-[#c5a059] mx-auto" />
          <h3 className="text-xl font-serif text-[#f4efe8]">
            Have an Inquiry Not Covered Here?
          </h3>
          <p className="text-xs text-[#eae3d8]/70 max-w-md mx-auto">
            Our guest relations team is delighted to arrange bespoke table configurations, sommelier cellar consultations, or special floral requests.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
            >
              Contact Front of House
            </button>
            <button
              onClick={() => navigateTo('reservations')}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#f4efe8] bg-[#0c0d0e] hover:bg-[#181b1e] border border-[#282c30] rounded-md transition-colors"
            >
              Direct Table Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
