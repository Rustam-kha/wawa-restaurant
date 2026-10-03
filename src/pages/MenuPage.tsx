import React, { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuCategory, DietaryType, MenuItem } from '../types';
import { Search, Sparkles, Filter, Wine, Flame, Leaf, Utensils, Check } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { navigateTo } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryType[]>([]);

  const categories: MenuCategory[] = [
    'All',
    'Signature Dishes',
    'Starters',
    'Main Courses',
    'Grills',
    'Salads',
    'Soups',
    'Breakfast',
    'Desserts',
    'Drinks',
    'Coffee',
  ];

  const dietaryFilters: { id: DietaryType; label: string; icon: string }[] = [
    { id: 'chefChoice', label: "Chef's Choice", icon: '★' },
    { id: 'glutenFree', label: 'Gluten-Free', icon: 'GF' },
    { id: 'vegetarian', label: 'Vegetarian', icon: 'V' },
    { id: 'vegan', label: 'Vegan', icon: 'VG' },
    { id: 'spicy', label: 'Spicy', icon: '🌶' },
  ];

  const toggleDietary = (type: DietaryType) => {
    setSelectedDietary((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      // Dietary filter match (all active must be satisfied)
      if (selectedDietary.length > 0) {
        const satisfies = selectedDietary.every((d) => item.dietary.includes(d));
        if (!satisfies) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedDietary]);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Seasonal Gastronomy
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            The WaWa Culinary Repertory
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-2xl mx-auto font-light leading-relaxed">
            Every dish is an intentional study in texture, smoke, and hyper-seasonal purity. Ingredients are sourced exclusively from independent regenerative growers and small-batch coastal fisheries.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#141618] border border-[#282c30] p-4 sm:p-6 rounded-xl mb-12 space-y-4 shadow-lg">
          {/* Search bar & Active dietary toggles */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#eae3d8]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, dishes..."
                className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2 pl-9 pr-3 text-xs text-[#f4efe8] placeholder-[#eae3d8]/40 focus:outline-none focus:border-[#c5a059]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#eae3d8]/40 hover:text-[#eae3d8]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-[11px] uppercase tracking-wider text-[#eae3d8]/50 font-mono hidden md:inline">
                Filter:
              </span>
              {dietaryFilters.map((df) => {
                const isActive = selectedDietary.includes(df.id);
                return (
                  <button
                    key={df.id}
                    onClick={() => toggleDietary(df.id)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#c5a059] border-[#c5a059] text-[#0c0d0e] font-semibold'
                        : 'bg-[#0c0d0e] border-[#282c30] text-[#eae3d8]/70 hover:text-[#f4efe8]'
                    }`}
                  >
                    <span>{df.icon}</span>
                    <span>{df.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-2 border-t border-[#282c30] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#f4efe8] text-[#0c0d0e] font-semibold shadow-sm'
                      : 'text-[#eae3d8]/70 hover:text-[#f4efe8] hover:bg-[#181b1e]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Current Scope */}
        <div className="flex items-center justify-between text-xs text-[#eae3d8]/60 mb-6 px-1">
          <span>
            Showing <strong className="text-[#f4efe8] font-mono">{filteredItems.length}</strong> creations in{' '}
            <strong className="text-[#c5a059]">{selectedCategory}</strong>
          </span>
          <button
            onClick={() => navigateTo('reservations')}
            className="text-xs text-[#c5a059] hover:underline"
          >
            Reserve Table to Taste →
          </button>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#141618] border border-[#282c30] rounded-xl">
            <p className="text-sm text-[#eae3d8]/70 mb-4">
              No dishes found matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedDietary([]);
              }}
              className="px-4 py-2 text-xs bg-[#c5a059] text-[#0c0d0e] rounded-md font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#141618] border border-[#282c30] hover:border-[#c5a059]/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex gap-4 items-start">
                    {item.image && (
                      <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden border border-[#282c30] bg-[#0c0d0e]">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-grow space-y-1.5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-serif text-[#f4efe8] group-hover:text-[#c5a059] transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-base font-mono text-[#c5a059] font-bold tabular-nums shrink-0">
                          £{item.price}
                        </span>
                      </div>

                      <p className="text-xs text-[#eae3d8]/70 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Ingredients breakdown */}
                  <div className="mt-4 pt-3 border-t border-[#282c30]/50 text-[11px] text-[#eae3d8]/55 flex flex-wrap gap-x-2 gap-y-1">
                    <span className="text-[#c5a059]/80 font-mono">Components:</span>
                    {item.ingredients.map((ing, idx) => (
                      <span key={idx}>
                        {ing}
                        {idx < item.ingredients.length - 1 && ' ·'}
                      </span>
                    ))}
                  </div>

                  {/* Sommelier Pairing */}
                  {item.pairing && (
                    <div className="mt-2 text-[11px] text-[#c5a059]/90 italic flex items-center gap-1.5">
                      <Wine className="w-3.5 h-3.5 shrink-0" />
                      <span>Pairing: {item.pairing}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Dietary & Category */}
                <div className="mt-4 pt-3 border-t border-[#282c30]/50 flex items-center justify-between text-[11px] text-[#eae3d8]/60">
                  <div className="flex items-center gap-2">
                    <span className="text-[#eae3d8]/40 font-mono">{item.category}</span>
                    {item.dietary.map((d) => (
                      <span
                        key={d}
                        className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
                          d === 'chefChoice'
                            ? 'bg-[#c5a059]/20 text-[#c5a059]'
                            : d === 'vegetarian'
                            ? 'bg-emerald-950 text-emerald-400'
                            : 'bg-[#282c30] text-[#eae3d8]/70'
                        }`}
                      >
                        {d === 'chefChoice' ? 'Chef Pick' : d}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigateTo('reservations')}
                    className="text-[11px] text-[#c5a059] hover:underline font-medium"
                  >
                    Reserve Table →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tasting Menu Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#141618] via-[#1a1c1f] to-[#141618] border border-[#c5a059]/40 p-8 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="inline-block text-[11px] uppercase tracking-widest text-[#c5a059] font-mono">
            Chef’s Carte Blanche
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
            The 7-Course Grand Hearth Tasting Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto leading-relaxed">
            Curated daily according to morning market arrivals. Includes amuse-bouche, 3 hearth seafood courses, A5 Miyazaki Wagyu, artisanal cheese trolley, and pre-dessert.
          </p>
          <div className="text-sm font-mono text-[#c5a059] font-bold">
            £145 / $185 per person · Wine Flight £95 / $120
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('reservations')}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all shadow-md"
            >
              Book Tasting Menu Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
