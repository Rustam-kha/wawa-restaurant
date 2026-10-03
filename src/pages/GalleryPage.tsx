import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Food' | 'Restaurant' | 'Interior' | 'Events' | 'Team'>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Food', 'Restaurant', 'Interior', 'Team'] as const;

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeFilter === 'All' ? true : item.category === activeFilter
  );

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const currentItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Visual Storytelling
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            The WaWa Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            A visual documentation of our kitchens, dining salons, binchotan embers, and memorable evenings.
          </p>

          {/* Filter Bar */}
          <div className="pt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeFilter === cat
                    ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold'
                    : 'bg-[#141618] border border-[#282c30] text-[#eae3d8]/70 hover:text-[#f4efe8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative bg-[#141618] border border-[#282c30] hover:border-[#c5a059]/60 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Hover overlay caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059] mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-serif text-[#f4efe8]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#eae3d8]/70 line-clamp-2 mt-1">
                  {item.caption}
                </p>
                <div className="mt-2 text-xs text-[#c5a059] flex items-center gap-1 font-mono">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#0c0d0e]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-[#eae3d8]/60 hover:text-[#f4efe8] rounded-full border border-[#282c30] transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-[#eae3d8]/60 hover:text-[#f4efe8] bg-[#141618] border border-[#282c30] rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-[#eae3d8]/60 hover:text-[#f4efe8] bg-[#141618] border border-[#282c30] rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#141618] border border-[#282c30] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="relative max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>
            <div className="p-6 sm:p-8 bg-[#141618] border-t border-[#282c30]">
              <div className="text-xs uppercase font-mono tracking-widest text-[#c5a059] mb-1">
                {currentItem.category} · {activeLightboxIndex! + 1} of {filteredItems.length}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#f4efe8]">
                {currentItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#eae3d8]/80 mt-2 font-light">
                {currentItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
