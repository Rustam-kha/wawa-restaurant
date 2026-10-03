import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import { MENU_ITEMS, LOCATIONS, SERVICES, PRIVATE_DINING_ROOMS, BLOG_POSTS, FAQS } from '../data/restaurantData';
import { Search, X, ArrowRight, Utensils, MapPin, Building, BookOpen, HelpCircle } from 'lucide-react';
import { PageId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { navigateTo } = useBooking();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedMenu = MENU_ITEMS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.ingredients.some((i) => i.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedLocations = LOCATIONS.filter(
      (l) => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
    );

    const matchedRooms = PRIVATE_DINING_ROOMS.filter(
      (r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );

    const matchedBlogs = BLOG_POSTS.filter(
      (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
    );

    const matchedFaqs = FAQS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      menu: matchedMenu,
      locations: matchedLocations,
      rooms: matchedRooms,
      blogs: matchedBlogs,
      faqs: matchedFaqs,
      total: matchedMenu.length + matchedLocations.length + matchedRooms.length + matchedBlogs.length + matchedFaqs.length,
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (page: PageId, extra?: { blogId?: string }) => {
    navigateTo(page, extra);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0c0d0e]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#141618] border border-[#282c30] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#282c30] bg-[#181b1e]">
          <Search className="w-5 h-5 text-[#c5a059] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes, private rooms, locations, stories, policies..."
            className="w-full bg-transparent text-sm text-[#f4efe8] placeholder-[#eae3d8]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#eae3d8]/40 hover:text-[#eae3d8] mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#eae3d8]/50 hover:text-[#f4efe8] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!query && (
            <div className="py-6 text-center">
              <p className="text-xs uppercase tracking-widest text-[#c5a059] font-mono mb-2">
                Quick Discover
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Scallop & Saffron', 'Wagyu Tenderloin', 'Mayfair Flagship', 'Sommelier Vault', 'Private Dining', 'Dress Code'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs px-3 py-1.5 bg-[#181b1e] hover:bg-[#282c30] text-[#eae3d8]/80 hover:text-[#f4efe8] rounded-md border border-[#282c30] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {query && results && results.total === 0 && (
            <div className="py-12 text-center text-sm text-[#eae3d8]/60">
              No results found for “{query}”. Try searching for dishes, wine, reservations, or locations.
            </div>
          )}

          {results && results.menu.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#c5a059] font-mono mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" />
                <span>Culinary Creations</span>
              </div>
              <div className="space-y-1.5">
                {results.menu.map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => handleSelect('menu')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#181b1e] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-serif text-[#f4efe8] group-hover:text-[#c5a059]">
                        {dish.name}
                      </div>
                      <div className="text-xs text-[#eae3d8]/60 line-clamp-1">
                        {dish.description}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#c5a059] tabular-nums shrink-0 ml-4">
                      £/{dish.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.rooms.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#c5a059] font-mono mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>Private Dining Suites</span>
              </div>
              <div className="space-y-1.5">
                {results.rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => handleSelect('private-dining')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#181b1e] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-serif text-[#f4efe8] group-hover:text-[#c5a059]">
                        {room.name}
                      </div>
                      <div className="text-xs text-[#eae3d8]/60">
                        Up to {room.capacitySeated} guests seated · {room.sqm}m²
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#eae3d8]/40 group-hover:text-[#c5a059] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.locations.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#c5a059] font-mono mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Locations</span>
              </div>
              <div className="space-y-1.5">
                {results.locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect('locations')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#181b1e] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-serif text-[#f4efe8] group-hover:text-[#c5a059]">
                        {loc.name}
                      </div>
                      <div className="text-xs text-[#eae3d8]/60">
                        {loc.city} · {loc.neighborhood}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#eae3d8]/40 group-hover:text-[#c5a059] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.blogs.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#c5a059] font-mono mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Dispatches & Stories</span>
              </div>
              <div className="space-y-1.5">
                {results.blogs.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect('blog', { blogId: b.id })}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#181b1e] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-serif text-[#f4efe8] group-hover:text-[#c5a059]">
                        {b.title}
                      </div>
                      <div className="text-xs text-[#eae3d8]/60">
                        {b.category} · {b.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#eae3d8]/40 group-hover:text-[#c5a059] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.faqs.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#c5a059] font-mono mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Guest FAQs</span>
              </div>
              <div className="space-y-1.5">
                {results.faqs.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelect('faq')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#181b1e] group transition-colors"
                  >
                    <div className="text-xs font-medium text-[#f4efe8] group-hover:text-[#c5a059]">
                      {f.question}
                    </div>
                    <div className="text-xs text-[#eae3d8]/60 line-clamp-1">
                      {f.answer}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#0c0d0e] border-t border-[#282c30] text-[11px] text-[#eae3d8]/50 flex items-center justify-between">
          <span>Press ESC or click outside to dismiss</span>
          <button
            onClick={() => handleSelect('reservations')}
            className="text-[#c5a059] hover:underline font-medium"
          >
            Direct Table Reservation →
          </button>
        </div>
      </div>
    </div>
  );
};
