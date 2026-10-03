import React from 'react';
import { useBooking } from '../context/BookingContext';
import { RestaurantImages } from '../assets/images';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ShieldCheck, HeartHandshake, Sparkles, Globe2, Compass, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useBooking();

  const values = [
    {
      title: 'Uncompromising Quality',
      desc: 'We cultivate intimate relationships with multi-generational fishermen, biodynamic vineyards, and organic farmsteads, choosing exceptional provenance over convenience.',
      icon: <Award className="w-5 h-5 text-[#c5a059]" />,
    },
    {
      title: 'Intuitive Hospitality',
      desc: 'True service is unseen yet ever-present. We anticipate our guests’ unspoken needs with warmth, discretion, and sincere human care.',
      icon: <HeartHandshake className="w-5 h-5 text-[#c5a059]" />,
    },
    {
      title: 'Restrained Creativity',
      desc: 'We reject pointless novelty. Every technique, smoke note, and floral infusion exists solely to elevate the inherent brilliance of the ingredient.',
      icon: <Sparkles className="w-5 h-5 text-[#c5a059]" />,
    },
    {
      title: 'Community & Culture',
      desc: 'Our dining rooms are civic living rooms where lifelong friendships are ignited, partnerships sealed, and family milestones celebrated.',
      icon: <Globe2 className="w-5 h-5 text-[#c5a059]" />,
    },
    {
      title: 'Ecological Stewardship',
      desc: 'Zero-waste root-to-stem culinary discipline, hyper-seasonal sourcing, and strict carbon-offset programs at every branch.',
      icon: <Compass className="w-5 h-5 text-[#c5a059]" />,
    },
  ];

  const team = [
    {
      name: 'Chef Laurent Moreau',
      role: 'Executive Chef & Culinary Director',
      bio: 'Trained under French and Japanese masters in Paris and Kyoto, Laurent brings over 20 years of hearth fire mastery and botanical elegance to WaWa.',
      image: RestaurantImages.chefCraft,
    },
    {
      name: 'Camille Dupuis',
      role: 'Head of Global Cellars & Master Sommelier',
      bio: 'Curating over 2,400 rare vintages across London, Tribeca, and Ginza, Camille champions natural biodynamic vignerons alongside timeless Grand Crus.',
      image: RestaurantImages.cocktailBar,
    },
    {
      name: 'Julian Sterling',
      role: 'Director of Hospitality & Guest Experience',
      bio: 'With a background in premier European palace hotels, Julian orchestrates seamless, discreet, and deeply personal service across all dining rooms.',
      image: RestaurantImages.interiorLounge,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Heritage & Craft
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            The Spirit of WaWa
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            Founded on the conviction that dining should be an unhurried, soul-nourishing sanctuary in a hurried world.
          </p>
        </div>

        {/* Section 1: Our Story */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
                Chapter 01 · Origin & Vision
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#f4efe8]">
                From an Open Hearth to an International Standard
              </h2>
              <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                WaWa was born in {RESTAURANT_INFO.foundedYear} from a single, elemental obsession: the magical interplay between primitive charcoal hearth smoke, pristine cold-water seafood, and intimate architectural hospitality.
              </p>
              <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                What began as a quiet dining salon in Mayfair has flourished into a globally celebrated family of restaurants with branches in Manhattan Tribeca and Tokyo Ginza. Despite our international growth, every kitchen remains bound to the same core principle: reverence for the craftsman and respect for the guest.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('reservations')}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                >
                  Reserve Your Table
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[#282c30] shadow-2xl">
                <img
                  src={RestaurantImages.heroDining}
                  alt="WaWa flagship dining room"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Philosophy & Kitchen */}
        <section className="mb-24 py-16 bg-[#141618] border border-[#282c30] rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden border border-[#282c30]">
                <img
                  src={RestaurantImages.signatureDish}
                  alt="Culinary plating at WaWa"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
                Chapter 02 · The Kitchen Discipline
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#f4efe8]">
                Purity, Embers & Botanical Harmony
              </h2>
              <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                Our kitchen brigade operates with the serene precision of an artisan workshop. We banish synthetic additives, commercial flavor enhancers, and heavy culinary masks.
              </p>
              <p className="text-xs sm:text-sm text-[#eae3d8]/80 leading-relaxed font-light">
                Instead, we harness the intense far-infrared heat of Kishu Binchotan charcoal to sear textures instantly, complemented by slow-fermented dashi, garden herb reductions, and cold-pressed citrus oils. The result is food that feels both deeply comforting and intensely vibrant.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Leadership Team */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              The Craftsmen
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
              Hospitality & Culinary Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-[#141618] border border-[#282c30] rounded-xl overflow-hidden group hover:border-[#c5a059]/40 transition-colors"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-serif text-[#f4efe8]">
                    {member.name}
                  </h3>
                  <div className="text-xs text-[#c5a059] font-mono">
                    {member.role}
                  </div>
                  <p className="text-xs text-[#eae3d8]/70 leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Our Values */}
        <section className="border-t border-[#282c30] pt-16">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              Guiding Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
              Our Guiding Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#141618] border border-[#282c30] p-6 rounded-xl space-y-3 hover:border-[#c5a059]/40 transition-colors"
              >
                <div className="p-2.5 bg-[#0c0d0e] rounded-lg inline-block border border-[#282c30]">
                  {val.icon}
                </div>
                <h3 className="text-base font-serif text-[#f4efe8]">
                  {val.title}
                </h3>
                <p className="text-xs text-[#eae3d8]/70 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
