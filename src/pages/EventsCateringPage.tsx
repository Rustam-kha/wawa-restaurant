import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { RestaurantImages } from '../assets/images';
import { Sparkles, Check, Calendar, Users, Mail, Phone, ArrowRight } from 'lucide-react';

export const EventsCateringPage: React.FC = () => {
  const { showToast } = useBooking();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Corporate Gala');
  const [guests, setGuests] = useState('50');
  const [eventDate, setEventDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eventTypes = [
    {
      title: 'Corporate Galas & Summits',
      desc: 'Seamless multi-course banquet dining, discrete boardroom service, and bespoke cocktail receptions for executive enterprises.',
      capacity: 'Up to 140 seated / 200 cocktail',
    },
    {
      title: 'Luxury Weddings & Engagements',
      desc: 'Enchanting romantic floral styling, champagne fountains, custom pastry wedding cakes, and customized multi-course culinary choreography.',
      capacity: 'Full buyouts & Glasshouse Pavilion',
    },
    {
      title: 'Private Estate & Yacht Catering',
      desc: 'Our executive culinary brigade, binchotan hearth stations, and sommelier team travel to your estate, residence, or superyacht.',
      capacity: 'Global destinations upon request',
    },
    {
      title: 'Product Launches & Brand drops',
      desc: 'High-concept edible installations, bespoke branded cocktail vapor elixirs, and dramatic culinary theatrics.',
      capacity: 'Tailored event staging',
    },
  ];

  const packages = [
    {
      name: 'The Grand Hearth Gala Package',
      price: 'From £165 / $210 per guest',
      items: [
        'Welcome Vintage Champagne & 4 Artisanal Canapés',
        '5-Course Hearth Tasting Menu with Miyazaki Wagyu',
        'Pre-dessert & Guanaja Single-Origin Chocolate sphere',
        'Handmade floral menu cards & bespoke table calligraphy',
        'Dedicated Event Captain & Brigade',
      ],
    },
    {
      name: 'The Cocktail & Canapé Salon Reception',
      price: 'From £95 / $125 per guest',
      items: [
        'Free-flowing artisanal botanical cocktails & premium spirits',
        '8 savoury canapés passed tableside by uniformed staff',
        'Live oyster & crudo bar with chef shucking on demand',
        'Artisanal charcuterie & cheese presentation trolley',
        '3 hours dedicated private lounge access',
      ],
    },
    {
      name: 'The Bespoke Private Residence Residency',
      price: 'Custom quotation upon consultation',
      items: [
        'Executive Chef and service team on-site at your venue',
        'Mobile binchotan white oak charcoal hearth equipment',
        'Full Riedel crystal stemware, Christofle cutlery & linen hire',
        'Cellar sommelier pairing service & rare vintage procurement',
        'Complete kitchen setup, breakdown, and immaculate restoration',
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !eventDate) {
      showToast('Please complete all required event planning fields.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Event planning brief submitted. Our Director will be in touch.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Memorable Celebrations
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            Events & Fine Catering
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            Exquisite culinary architecture and hospitality choreography for corporate summits, luxury weddings, and private residences worldwide.
          </p>
        </div>

        {/* Event Types Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {eventTypes.map((et, i) => (
            <div
              key={i}
              className="bg-[#141618] border border-[#282c30] p-8 rounded-xl space-y-3 hover:border-[#c5a059]/40 transition-colors"
            >
              <div className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
                {et.capacity}
              </div>
              <h3 className="text-xl font-serif text-[#f4efe8]">
                {et.title}
              </h3>
              <p className="text-xs text-[#eae3d8]/75 leading-relaxed font-light">
                {et.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Packages Section */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Curated Event Tiers
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
              Catering & Banquet Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, pIdx) => (
              <div
                key={pIdx}
                className="bg-[#141618] border border-[#282c30] p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#c5a059]/50 transition-colors"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-serif text-[#f4efe8]">
                    {pkg.name}
                  </h3>
                  <div className="text-sm font-mono text-[#c5a059] font-bold">
                    {pkg.price}
                  </div>
                  <ul className="space-y-2 text-xs text-[#eae3d8]/75 pt-3 border-t border-[#282c30]">
                    {pkg.items.map((item, itIdx) => (
                      <li key={itIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#282c30] mt-6">
                  <a
                    href="#event-form"
                    className="w-full block text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                  >
                    Select This Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div id="event-form" className="bg-[#141618] border border-[#282c30] p-8 sm:p-12 rounded-2xl max-w-3xl mx-auto shadow-2xl">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Inquire
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
              Plan Your Event
            </h2>
            <p className="text-xs text-[#eae3d8]/70">
              Submit your preliminary details below and our Events Director will connect with you directly.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 bg-[#0c0d0e] border border-[#c5a059]/40 rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-[#f4efe8]">Event Brief Received</h3>
              <p className="text-xs text-[#eae3d8]/80 max-w-md mx-auto">
                Thank you, {name}. Our Director of Special Events has received your inquiry for {eventDate} and will send a bespoke catalog to {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs border border-[#282c30] text-[#eae3d8]/70 hover:text-[#f4efe8] rounded"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.com"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0920"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                    Target Date *
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Corporate Gala">Corporate Gala / Dinner</option>
                    <option value="Luxury Wedding">Luxury Wedding / Rehearsal</option>
                    <option value="Product Launch">Product Launch Reception</option>
                    <option value="Private Estate Catering">Private Estate Catering</option>
                    <option value="Milestone Birthday">Milestone Birthday / Anniversary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                    Approximate Guest Count
                  </label>
                  <input
                    type="text"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="e.g. 50 – 80 Guests"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all shadow-md active:scale-[0.98]"
                >
                  Submit Event Consultation Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
