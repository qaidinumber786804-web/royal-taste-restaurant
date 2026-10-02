import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const categories = ['All', 'Signature Plating', 'Interior & Ambiance', 'Pastry Arts', 'Culinary Craft'];

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Lock body scroll and listen for Escape key when lightbox is open
  useEffect(() => {
    if (selectedPhoto) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedPhoto(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-[#0e0e11] scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            Visual Gastronomy
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight mb-4">
            The Royal Taste Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            A visual ode to our master plating, majestic salon interiors, and the quiet devotion behind our culinary hearth. Tap any photograph to expand.
          </p>
        </div>

        {/* Filter Bar with Touch Swiping */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto touch-pan-x pb-3 mb-8 sm:mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors whitespace-nowrap min-h-[40px] shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#c5a059] text-[#0e0e11] font-semibold'
                  : 'text-[#a19e95] hover:text-[#f4eee2] hover:bg-[#181820]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#16161e] border border-[#23232c] hover:border-[#c5a059]/60 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-black/70"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover / Touch Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/50 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
                <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium mb-1">
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-semibold text-[#f4eee2] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#bfb9ae] line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-xs text-[#c5a059] font-medium">
                  <span>View Full Photo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Top-Right Expand Icon */}
              <div className="absolute top-3 right-3 p-2 bg-[#0e0e11]/80 backdrop-blur-sm rounded-lg text-[#f4eee2] opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
        >
          <div
            className="relative max-w-4xl w-full bg-[#131317] border border-[#2a2a36] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close lightbox"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 text-white bg-black/70 hover:bg-black rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#131317] border-t border-[#23232c]">
              <span className="text-xs uppercase tracking-wider text-[#c5a059] font-medium block mb-1">
                {selectedPhoto.category}
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#f4eee2] mb-1 sm:mb-2">
                {selectedPhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#bfb9ae] leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
