import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { PRIVATE_DINING_ROOMS, RESTAURANT_INFO } from '../data/restaurantData';
import { Users, Maximize2, Shield, Check, Calendar, Mail, Phone, ArrowRight } from 'lucide-react';

export const PrivateDiningPage: React.FC = () => {
  const { showToast, navigateTo } = useBooking();
  const [selectedRoom, setSelectedRoom] = useState(PRIVATE_DINING_ROOMS[0].id);

  // Inquiry form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(12);
  const [eventType, setEventType] = useState('Corporate Dinner');
  const [preferredPackage, setPreferredPackage] = useState('7-Course Grand Cru Banquet');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !eventDate) {
      showToast('Please fill out all required inquiry fields.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Your private dining inquiry has been transmitted to our Events Director.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Exclusive Hospitality
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            Private Dining & Salons
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            Secluded sanctuaries designed for intimate milestones, confidential board gatherings, and bespoke culinary celebrations.
          </p>
        </div>

        {/* Private Dining Rooms Showcase */}
        <div className="space-y-16 mb-24">
          {PRIVATE_DINING_ROOMS.map((room, idx) => (
            <div
              key={room.id}
              className={`bg-[#141618] border border-[#282c30] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-auto min-h-[380px]">
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent opacity-60" />
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#c5a059]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>Up to {room.capacitySeated} Seated / {room.capacityStanding} Standing</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{room.sqm} m²</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
                    {room.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                    {room.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-[#c5a059] font-mono">
                      Curated Inclusions
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#eae3d8]/75">
                      {room.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#282c30] flex items-center justify-between">
                  <a
                    href="#inquiry-form"
                    onClick={() => setSelectedRoom(room.id)}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                  >
                    Request This Suite
                  </a>
                  <span className="text-xs text-[#eae3d8]/60">
                    Recommended for {room.recommendedFor[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Dining Inquiry Form Section */}
        <div id="inquiry-form" className="bg-[#141618] border border-[#282c30] rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto shadow-2xl">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Bespoke Proposal
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
              Request Private Dining
            </h2>
            <p className="text-xs text-[#eae3d8]/70">
              Our dedicated Private Dining Director will respond with customized menus and availability within 12 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 bg-[#0c0d0e] border border-[#c5a059]/40 rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-[#f4efe8]">
                Inquiry Received
              </h3>
              <p className="text-xs text-[#eae3d8]/80 max-w-md mx-auto leading-relaxed">
                Thank you, {name}. Our Private Events Concierge has received your request for {eventDate} ({guestsCount} guests) and will reach out to {email} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs border border-[#282c30] text-[#eae3d8]/70 hover:text-[#f4efe8] rounded"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lady Catherine Sterling"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. catherine@domain.com"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +44 20 7946 0920"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Anticipated Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min={6}
                    max={120}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Corporate Dinner">Corporate Board Dinner</option>
                    <option value="Anniversary">Anniversary Celebration</option>
                    <option value="Wedding Rehearsal">Wedding Rehearsal Banquet</option>
                    <option value="Product Launch">Product Launch Reception</option>
                    <option value="Milestone Birthday">Milestone Birthday</option>
                    <option value="Full Buyout">Full Restaurant Buyout</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                  Preferred Dining Package
                </label>
                <select
                  value={preferredPackage}
                  onChange={(e) => setPreferredPackage(e.target.value)}
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="7-Course Grand Cru Banquet">7-Course Grand Cru Hearth Banquet (£165/guest)</option>
                  <option value="5-Course Seasonal Salon Menu">5-Course Seasonal Salon Menu (£125/guest)</option>
                  <option value="Canapé & Champagne Cocktail Reception">Canapé & Champagne Cocktail Reception (£95/guest)</option>
                  <option value="Custom Bespoke Consultation">Custom Tailor-Made Culinary Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                  Special Requests, Dietary Restrictions or Audiovisual Needs
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your celebration, timing preferences, floral styling, or wine cellar requests..."
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md p-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all shadow-md active:scale-[0.98]"
              >
                Transmit Private Dining Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
