import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { BLOG_POSTS } from '../data/restaurantData';
import { BlogPost } from '../types';
import { Clock, ArrowRight, ArrowLeft, Calendar, Share2, BookOpen } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { activeBlogId, setActiveBlogId, showToast, navigateTo } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Chef Stories',
    'Dining Guide',
    'Seasonal Specials',
    'Food & Recipes',
    'Restaurant News',
  ];

  const activeArticle: BlogPost | undefined = BLOG_POSTS.find((b) => b.id === activeBlogId);

  const filteredPosts = BLOG_POSTS.filter((post) =>
    selectedCategory === 'All' ? true : post.category === selectedCategory
  );

  const handleShare = (article: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Link to “${article.title}” copied to clipboard.`, 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SINGLE ARTICLE READER VIEW */}
        {activeArticle ? (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            <button
              onClick={() => setActiveBlogId(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfc282] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dispatches</span>
            </button>

            <div className="space-y-4">
              <div className="text-xs uppercase font-mono tracking-widest text-[#c5a059]">
                {activeArticle.category} · {activeArticle.readTime}
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8] leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex items-center justify-between py-4 border-t border-b border-[#282c30] text-xs text-[#eae3d8]/60">
                <div className="flex items-center gap-4">
                  <span className="text-[#f4efe8] font-medium">{activeArticle.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.date}</span>
                </div>
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="hover:text-[#c5a059] flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#282c30]">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="space-y-6 text-sm sm:text-base text-[#eae3d8]/85 leading-relaxed font-light">
              <p className="text-base sm:text-lg font-serif italic text-[#c5a059] border-l-2 border-[#c5a059] pl-4 py-1">
                “{activeArticle.excerpt}”
              </p>
              {activeArticle.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* CTA to experience the restaurant */}
            <div className="mt-12 p-8 bg-[#141618] border border-[#282c30] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-serif text-[#f4efe8]">
                  Experience the Flavors in Person
                </h2>
                <p className="text-xs text-[#eae3d8]/70 mt-1">
                  Taste our seasonal creations and binchotan hearth dishes at WaWa.
                </p>
              </div>
              <button
                onClick={() => navigateTo('reservations')}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors shrink-0"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        ) : (
          /* ALL DISPATCHES / BLOG GRID */
          <>
            <div className="text-center mb-12 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                Culinary Journal
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
                Dispatches from the Hearth
              </h1>
              <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
                Reflections on terroir, binchotan fire, sommelier cellar pairings, and seasonal botanical harvests.
              </p>

              {/* Filter Tabs */}
              <div className="pt-6 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold'
                        : 'bg-[#141618] border border-[#282c30] text-[#eae3d8]/70 hover:text-[#f4efe8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#141618] border border-[#282c30] hover:border-[#c5a059]/40 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#0c0d0e]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase font-mono text-[#c5a059] border border-[#282c30]">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="text-[11px] text-[#eae3d8]/50 flex items-center gap-2 font-mono">
                        <span>{post.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-lg font-serif text-[#f4efe8] group-hover:text-[#c5a059] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs text-[#eae3d8]/70 leading-relaxed line-clamp-3 font-light">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#282c30]/40 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[#eae3d8]/50">By {post.author}</span>
                    <button
                      onClick={() => setActiveBlogId(post.id)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#dfc282] transition-colors inline-flex items-center gap-1.5 pt-3"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
