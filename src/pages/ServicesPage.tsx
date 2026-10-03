import React from 'react';
import { useBooking } from '../context/BookingContext';
import { SERVICES } from '../data/restaurantData';
import { Check, ArrowRight, Clock } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Hospitality Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            Culinary & Hospitality Services
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            From our nightly hearth service to confidential private boardroom banquets and off-site private residences worldwide.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`bg-[#141618] border border-[#282c30] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-auto min-h-[380px]">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent opacity-60" />
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.leadTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                    {service.longDesc}
                  </p>

                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-[#c5a059] font-mono">
                      Service Standards
                    </div>
                    <ul className="space-y-2 text-xs text-[#eae3d8]/75">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#282c30]">
                  <button
                    onClick={() => {
                      if (service.id === 'restaurant-dining') navigateTo('reservations');
                      else if (service.id === 'private-dining') navigateTo('private-dining');
                      else navigateTo('events');
                    }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors inline-flex items-center gap-2"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
