import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { RESTAURANT_INFO, LOCATIONS } from '../data/restaurantData';
import { Instagram, Facebook, Linkedin, ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useBooking();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address.', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Thank you for subscribing to WaWa Seasonal Dispatches.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#08090a] text-[#f4efe8] border-t border-[#282c30]/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Kicker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#282c30]/70">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif tracking-[0.2em] uppercase text-[#f4efe8]">
              {RESTAURANT_INFO.brandName}
            </h2>
            <p className="text-sm text-[#eae3d8]/75 leading-relaxed max-w-md">
              {RESTAURANT_INFO.tagline} International haute cuisine rooted in binchotan hearth fire, seasonal botanicals, and bespoke private salon dining.
            </p>
            <div className="text-xs text-[#c5a059] tracking-wider uppercase pt-1">
              {RESTAURANT_INFO.michelinAccolades}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#141618] p-6 sm:p-8 rounded-lg border border-[#282c30]">
            <div className="max-w-xl">
              <h3 className="text-xl font-serif text-[#f4efe8] tracking-wide mb-1">
                Stay in the Know
              </h3>
              <p className="text-xs text-[#eae3d8]/70 mb-4">
                Receive private invitations to seasonal tasting menus, cellar releases, and guest chef residencies.
              </p>
              {isSubscribed ? (
                <div className="py-2.5 px-4 bg-[#181b1e] border border-[#c5a059]/40 rounded-md text-xs text-[#c5a059]">
                  ✓ You are on the WaWa private dispatch list. Thank you.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <Mail className="w-4 h-4 text-[#eae3d8]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      aria-label="Email address for newsletter"
                      required
                      className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 pl-10 pr-4 text-xs text-[#f4efe8] placeholder-[#eae3d8]/40 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Column Navigation & Contact Hub */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#282c30]/70 text-sm">
          {/* Col 1: Experience */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Experience
            </h4>
            <ul className="space-y-2 text-xs text-[#eae3d8]/75">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#c5a059] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#c5a059] transition-colors">
                  Our Story & Team
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('menu')} className="hover:text-[#c5a059] transition-colors">
                  Seasonal Menus
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-[#c5a059] transition-colors">
                  Visual Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-[#c5a059] transition-colors">
                  Dispatches & Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Hospitality & Events */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Hospitality
            </h4>
            <ul className="space-y-2 text-xs text-[#eae3d8]/75">
              <li>
                <button onClick={() => navigateTo('reservations')} className="hover:text-[#c5a059] transition-colors">
                  Reserve a Table
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('manage-booking')} className="hover:text-[#c5a059] transition-colors">
                  Find / Manage Booking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('private-dining')} className="hover:text-[#c5a059] transition-colors">
                  Private Dining Suites
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('events')} className="hover:text-[#c5a059] transition-colors">
                  Events & Catering
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-[#c5a059] transition-colors">
                  All Services
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: International Branches */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Locations
            </h4>
            <ul className="space-y-2 text-xs text-[#eae3d8]/75">
              {LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <button
                    onClick={() => navigateTo('locations')}
                    className="hover:text-[#c5a059] transition-colors text-left"
                  >
                    {loc.name}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button onClick={() => navigateTo('faq')} className="hover:text-[#c5a059] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Central Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Concierge
            </h4>
            <div className="space-y-2 text-xs text-[#eae3d8]/75">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] mt-0.5 shrink-0" />
                <span className="font-mono">{RESTAURANT_INFO.centralReservationsPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] mt-0.5 shrink-0" />
                <span>{RESTAURANT_INFO.centralEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c5a059] mt-0.5 shrink-0" />
                <span>Mon – Sun · 12:00 PM – Late</span>
              </div>
              <div className="pt-3 flex items-center gap-3 text-[#eae3d8]/60">
                <a
                  href={RESTAURANT_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-1.5 hover:text-[#c5a059] bg-[#141618] rounded border border-[#282c30] transition-colors"
                  aria-label="WaWa Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href={RESTAURANT_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-1.5 hover:text-[#c5a059] bg-[#141618] rounded border border-[#282c30] transition-colors"
                  aria-label="WaWa Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={RESTAURANT_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-1.5 hover:text-[#c5a059] bg-[#141618] rounded border border-[#282c30] transition-colors"
                  aria-label="WaWa LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#eae3d8]/50 gap-4">
          <p>© 2026 WaWa. All Rights Reserved. Crafted for unforgettable culinary moments.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-[#f4efe8] transition-colors">
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-[#f4efe8] transition-colors">
              Terms & Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('faq')} className="hover:text-[#f4efe8] transition-colors">
              Guest Policies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
