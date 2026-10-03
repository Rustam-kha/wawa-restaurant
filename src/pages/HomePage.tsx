import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { RestaurantImages } from '../assets/images';
import {
  RESTAURANT_INFO,
  MENU_ITEMS,
  SERVICES,
  SPECIAL_OFFERS,
  TESTIMONIALS,
} from '../data/restaurantData';
import {
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Flame,
  Wine,
  Utensils,
  Award,
  ShieldCheck,
  Instagram,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    bookingDate,
    setBookingDate,
    bookingGuests,
    setBookingGuests,
    bookingTime,
    setBookingTime,
  } = useBooking();

  const [activeMenuCat, setActiveMenuCat] = useState<'All' | 'Signature Dishes' | 'Starters' | 'Main Courses' | 'Desserts'>('Signature Dishes');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const featuredDishes = MENU_ITEMS.filter((item) =>
    activeMenuCat === 'All' ? true : item.category === activeMenuCat
  ).slice(0, 4);

  const handleNextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('reservations');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8]">
      {/* 4. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={RestaurantImages.heroDining}
            alt="WaWa Luxury Dining Room Ambience"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Strict 60-30-10 & contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/60 to-[#0c0d0e]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,13,14,0.6)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#c5a059]/40 bg-[#0c0d0e]/70 backdrop-blur-md text-xs uppercase tracking-widest text-[#c5a059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{RESTAURANT_INFO.descriptor}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-wide text-[#f4efe8] leading-[1.1] mb-6 max-w-4xl mx-auto [text-wrap:balance]">
            Experience <span className="italic font-serif text-[#c5a059]">WaWa</span>
          </h1>

          <p className="text-base sm:text-xl font-sans text-[#eae3d8]/90 max-w-2xl mx-auto leading-relaxed mb-10 font-light [text-wrap:balance]">
            “{RESTAURANT_INFO.tagline}”
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => navigateTo('reservations')}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all shadow-lg hover:shadow-[#c5a059]/30 active:scale-[0.98]"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => navigateTo('menu')}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#f4efe8] bg-[#141618]/90 hover:bg-[#181b1e] border border-[#282c30] hover:border-[#c5a059]/60 rounded-md transition-all backdrop-blur-sm"
            >
              Explore Our Menu
            </button>
          </div>

          {/* Quick Booking Strip Widget */}
          <div className="max-w-4xl mx-auto bg-[#141618]/95 backdrop-blur-md border border-[#282c30] p-4 sm:p-5 rounded-xl shadow-2xl">
            <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 items-center">
              {/* Date */}
              <div className="text-left">
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="text-left">
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                  Guests
                </label>
                <select
                  value={bookingGuests}
                  onChange={(e) => setBookingGuests(Number(e.target.value))}
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                  <option value={15}>15+ (Private Event)</option>
                </select>
              </div>

              {/* Preferred Service */}
              <div className="text-left">
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1">
                  Seating
                </label>
                <select
                  value={bookingTime || '7:00 PM'}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="12:30 PM">Lunch (12:30 PM)</option>
                  <option value="1:30 PM">Lunch (1:30 PM)</option>
                  <option value="6:00 PM">Dinner (6:00 PM)</option>
                  <option value="7:00 PM">Dinner (7:00 PM)</option>
                  <option value="8:00 PM">Dinner (8:00 PM)</option>
                  <option value="9:00 PM">Dinner (9:00 PM)</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="sm:self-end">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Find Tables</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 5. RESTAURANT INTRODUCTION */}
      <section className="py-24 border-t border-[#282c30]/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-lg overflow-hidden border border-[#282c30] shadow-2xl">
                <img
                  src={RestaurantImages.chefCraft}
                  alt="Executive Chef preparing tasting course at WaWa"
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-transparent to-transparent opacity-60" />
              </div>
              {/* Accolade floating card */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#141618] border border-[#282c30] p-4 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#0c0d0e] text-[#c5a059]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-serif text-[#f4efe8]">Michelin Recommended</div>
                    <div className="text-[11px] text-[#eae3d8]/60">World's 50 Best Discovery 2026</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Text Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                The Philosophy
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif text-[#f4efe8] leading-tight">
                More Than a Meal
              </h2>

              <p className="text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                At WaWa, culinary artistry begins long before embers are kindled. We perceive hospitality as an unhurried, multisensory sanctuary—where the crisp snap of fresh morning botanicals meets the primeval warmth of Japanese Kishu binchotan white oak charcoal.
              </p>

              <p className="text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                Each plate is an intentional dialogue between regenerative family farmers, artisanal coastal divers, and our master culinary brigade. In our dining rooms across London, New York, and Tokyo, we strip away culinary pretension to celebrate pure ingredient honesty and genuine human care.
              </p>

              <div className="pt-4 flex items-center gap-6">
                <button
                  onClick={() => navigateTo('about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfc282] transition-colors group"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[#282c30]">·</span>
                <button
                  onClick={() => navigateTo('locations')}
                  className="text-xs text-[#eae3d8]/70 hover:text-[#f4efe8] transition-colors"
                >
                  View Flagship Locations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE EXPERIENCES: The WaWa Experience */}
      <section className="py-24 bg-[#101214] border-t border-b border-[#282c30]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
              Curated Hospitality
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#f4efe8]">
              The WaWa Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#eae3d8]/75">
              From candlelit intimate hearth dinners to bespoke private salon galas and off-site culinary residencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="group bg-[#141618] border border-[#282c30] hover:border-[#c5a059]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-serif text-[#f4efe8] group-hover:text-[#c5a059] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#eae3d8]/70 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#282c30]/40 mt-4">
                  <button
                    onClick={() => {
                      if (service.id === 'restaurant-dining') navigateTo('reservations');
                      else if (service.id === 'private-dining') navigateTo('private-dining');
                      else navigateTo('events');
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfc282] transition-colors inline-flex items-center gap-1.5 pt-3"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SIGNATURE DISH EDITORIAL SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141618] border border-[#282c30] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
            {/* Dish Photo */}
            <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-auto min-h-[420px]">
              <img
                src={RestaurantImages.signatureDish}
                alt="Seared Diver Scallop with Saffron Emulsion"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#141618] hidden lg:block" />
              <div className="absolute top-4 left-4 bg-[#0c0d0e]/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-[#c5a059] border border-[#282c30]">
                Chef’s Marquee Presentation
              </div>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#c5a059] font-mono mb-2">
                    Signature Creation
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
                    Diver Scallop & Saffron Emulsion
                  </h3>
                  <div className="text-lg font-mono text-[#c5a059] mt-2">
                    £36 / $48
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                  Hand-harvested off the rugged western coast of Scotland by third-generation divers, seared for precisely 45 seconds over incandescent Kishu binchotan embers. Paired with an emulsion of wild saffron threads, charred sweet leek oil, and micro ocean succulents.
                </p>

                <div className="border-t border-b border-[#282c30] py-4 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-[#c5a059] font-mono">
                    Artisanal Elements
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#eae3d8]/70">
                    <span>Scottish Diver Scallops</span>
                    <span>·</span>
                    <span>Persian Saffron</span>
                    <span>·</span>
                    <span>Charred Leek Oil</span>
                    <span>·</span>
                    <span>Sea Fennel</span>
                  </div>
                </div>

                <div className="text-xs text-[#eae3d8]/70 italic">
                  Recommended Sommelier Pairing: Domaine Leflaive Puligny-Montrachet 2020
                </div>
              </div>

              <div className="pt-8 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('reservations')}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                >
                  Reserve Table for This Dish
                </button>
                <button
                  onClick={() => navigateTo('menu')}
                  className="text-xs text-[#eae3d8]/75 hover:text-[#f4efe8] transition-colors underline"
                >
                  Browse Full Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FEATURED MENU PREVIEW */}
      <section className="py-24 bg-[#101214] border-t border-[#282c30]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                Culinary Highlights
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#f4efe8] mt-1">
                A Taste of WaWa
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1 bg-[#141618] border border-[#282c30] rounded-lg">
              {(['Signature Dishes', 'Starters', 'Main Courses', 'Desserts', 'All'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveMenuCat(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      activeMenuCat === cat
                        ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold'
                        : 'text-[#eae3d8]/70 hover:text-[#f4efe8]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#141618] border border-[#282c30] p-6 rounded-xl flex flex-col sm:flex-row gap-6 items-start hover:border-[#c5a059]/40 transition-colors"
              >
                {dish.image && (
                  <div className="w-full sm:w-36 h-36 shrink-0 rounded-lg overflow-hidden border border-[#282c30]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-serif text-[#f4efe8]">
                      {dish.name}
                    </h3>
                    <span className="text-sm font-mono text-[#c5a059] tabular-nums font-semibold shrink-0">
                      £{dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#eae3d8]/70 leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-[#eae3d8]/50">
                    <span>{dish.category}</span>
                    {dish.dietary.includes('glutenFree') && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#c5a059]">Gluten-Free</span>
                      </>
                    )}
                    {dish.dietary.includes('vegetarian') && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400">Vegetarian</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('menu')}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider text-[#f4efe8] bg-[#141618] hover:bg-[#181b1e] border border-[#282c30] hover:border-[#c5a059] rounded-md transition-all inline-flex items-center gap-2"
            >
              <span>View Full Interactive Menu (10 Categories)</span>
              <ArrowRight className="w-4 h-4 text-[#c5a059]" />
            </button>
          </div>
        </div>
      </section>

      {/* 19. SPECIAL OFFERS */}
      <section className="py-24 border-t border-[#282c30]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
              Seasonal Celebrations
            </span>
            <h2 className="text-3xl font-serif text-[#f4efe8]">
              Exclusive Experiences & Offers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPECIAL_OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#141618] border border-[#282c30] p-6 rounded-xl flex flex-col justify-between hover:border-[#c5a059]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="inline-block text-[10px] uppercase font-mono tracking-widest text-[#c5a059] bg-[#0c0d0e] px-2.5 py-1 rounded border border-[#282c30]">
                    {offer.tag}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#f4efe8]">
                      {offer.title}
                    </h3>
                    <div className="text-xs text-[#c5a059] font-medium mt-1">
                      {offer.subtitle}
                    </div>
                  </div>
                  <p className="text-xs text-[#eae3d8]/70 leading-relaxed">
                    {offer.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#eae3d8]/80 pt-2 border-t border-[#282c30]">
                    {offer.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  {offer.priceNote && (
                    <div className="text-xs font-mono text-[#c5a059] pt-1">
                      {offer.priceNote}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[#282c30] mt-6">
                  <button
                    onClick={() => navigateTo('reservations')}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                  >
                    Reserve This Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18. TESTIMONIALS: Loved by Our Guests */}
      <section className="py-24 bg-[#101214] border-t border-b border-[#282c30]/50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono mb-4">
            Guest Testimonials
          </div>
          <h2 className="text-3xl font-serif text-[#f4efe8] mb-12">
            Loved by Our Guests
          </h2>

          <div className="bg-[#141618] border border-[#282c30] p-8 sm:p-12 rounded-2xl relative shadow-xl">
            <div className="flex justify-center gap-1 mb-6 text-[#c5a059]">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
              ))}
            </div>

            <blockquote className="text-base sm:text-xl font-serif text-[#f4efe8] leading-relaxed italic mb-8 max-w-2xl mx-auto [text-wrap:balance]">
              “{currentTestimonial.quote}”
            </blockquote>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-[#f4efe8]">
                {currentTestimonial.author}
              </div>
              <div className="text-xs text-[#eae3d8]/60 font-light">
                {currentTestimonial.roleOrLocation} · {currentTestimonial.date}
              </div>
            </div>

            {/* Testimonial Nav Arrows */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={handlePrevTestimonial}
                className="p-2 rounded-full border border-[#282c30] hover:border-[#c5a059] text-[#eae3d8]/60 hover:text-[#f4efe8] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#eae3d8]/50">
                {testimonialIdx + 1} / {TESTIMONIALS.length}
              </span>
              <button
                onClick={handleNextTestimonial}
                className="p-2 rounded-full border border-[#282c30] hover:border-[#c5a059] text-[#eae3d8]/60 hover:text-[#f4efe8] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 20. INSTAGRAM / SOCIAL SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                Social Visuals
              </span>
              <h2 className="text-3xl font-serif text-[#f4efe8] mt-1">
                Follow the WaWa Experience
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfc282] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@WaWaRestaurant (Official Placeholder)</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: RestaurantImages.heroDining, caption: 'Evening service lights' },
              { img: RestaurantImages.signatureDish, caption: 'Diver scallop pass' },
              { img: RestaurantImages.cocktailBar, caption: 'The Obsidian Smoke' },
              { img: RestaurantImages.chefCraft, caption: 'Open hearth finishing' },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-lg overflow-hidden border border-[#282c30] bg-[#141618]"
              >
                <img
                  src={item.img}
                  alt={item.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0c0d0e]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <div className="text-xs font-serif text-[#f4efe8]">
                    {item.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
