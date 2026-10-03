import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { LOCATIONS } from '../data/restaurantData';
import { RestaurantLocation } from '../types';
import { MapPin, Phone, Mail, Clock, Car, Train, Sparkles, ArrowRight, Compass } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  const { setSelectedLocationId, navigateTo, showToast } = useBooking();
  const [selectedMapLoc, setSelectedMapLoc] = useState<RestaurantLocation | null>(null);

  const handleBookLocation = (locId: string) => {
    setSelectedLocationId(locId);
    navigateTo('reservations');
  };

  const handleOpenDirections = (loc: RestaurantLocation) => {
    setSelectedMapLoc(loc);
    showToast(`Showing navigation details for ${loc.name}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Global Presences
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            International Locations
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            Each WaWa sanctuary is thoughtfully woven into its historic architectural neighborhood while honoring the same uncompromising hearth standards.
          </p>
        </div>

        {/* Location Cards */}
        <div className="space-y-16">
          {LOCATIONS.map((loc, idx) => (
            <div
              key={loc.id}
              className={`bg-[#141618] border border-[#282c30] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto min-h-[380px]">
                <img
                  src={loc.image}
                  alt={loc.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#0c0d0e]/85 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-[#c5a059] border border-[#282c30]">
                  {loc.city} · {loc.neighborhood}
                </div>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
                      Branch Destination
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8] mt-1">
                      {loc.name}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                    {loc.description}
                  </p>

                  {/* Address, Phone, Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-[#eae3d8]/80">
                        <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-semibold text-[#f4efe8]">Address</span>
                          <span className="font-mono text-[11px] text-[#eae3d8]/70">{loc.addressPlaceholder}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-[#eae3d8]/80">
                        <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-semibold text-[#f4efe8]">Telephone</span>
                          <span className="font-mono text-[11px] text-[#eae3d8]/70">{loc.phonePlaceholder}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-[#eae3d8]/80">
                        <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-semibold text-[#f4efe8]">Service Hours</span>
                          <span className="text-[11px] text-[#eae3d8]/70 block">{loc.hoursWeekday}</span>
                          <span className="text-[11px] text-[#eae3d8]/70 block">{loc.hoursWeekend}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parking & Metro */}
                  <div className="pt-2 border-t border-[#282c30] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#eae3d8]/70">
                    <div className="flex items-start gap-2">
                      <Car className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{loc.parkingInfo}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Train className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{loc.metroInfo}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#282c30] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleBookLocation(loc.id)}
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                    >
                      Book a Table Here
                    </button>
                    <button
                      onClick={() => handleOpenDirections(loc)}
                      className="px-4 py-2.5 text-xs font-medium border border-[#282c30] hover:border-[#c5a059] text-[#eae3d8] rounded-md transition-colors flex items-center gap-1.5"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-[#eae3d8]/50">
                    Dress: {loc.dressCode}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Directions / Map Preview Modal */}
        {selectedMapLoc && (
          <div
            onClick={() => setSelectedMapLoc(null)}
            className="fixed inset-0 z-50 bg-[#0c0d0e]/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141618] border border-[#282c30] max-w-lg w-full rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#282c30] pb-3">
                <h3 className="text-xl font-serif text-[#f4efe8]">
                  Directions to {selectedMapLoc.name}
                </h3>
                <button
                  onClick={() => setSelectedMapLoc(null)}
                  className="text-xs text-[#eae3d8]/50 hover:text-[#f4efe8]"
                >
                  ✕ Close
                </button>
              </div>

              {/* Schematic Map Representation */}
              <div className="w-full h-48 bg-[#0c0d0e] rounded-lg border border-[#282c30] relative overflow-hidden flex items-center justify-center p-4 text-center">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 border border-[#c5a059] text-[#c5a059] flex items-center justify-center mx-auto">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-serif text-[#f4efe8]">
                    {selectedMapLoc.neighborhood}
                  </div>
                  <div className="text-xs font-mono text-[#c5a059]">
                    {selectedMapLoc.addressPlaceholder}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#eae3d8]/80">
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f4efe8] block">Underground / Transit:</strong>
                    <span>{selectedMapLoc.metroInfo}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f4efe8] block">Valet & Parking:</strong>
                    <span>{selectedMapLoc.parkingInfo}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#282c30] flex justify-end">
                <button
                  onClick={() => {
                    setSelectedMapLoc(null);
                    handleBookLocation(selectedMapLoc.id);
                  }}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                >
                  Reserve Table at {selectedMapLoc.city}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
