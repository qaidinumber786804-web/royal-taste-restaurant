import React, { useEffect } from 'react';
import { X, MessageSquare, Plus, Clock, Flame, Wine, Sparkles } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onQuickOrder: (dish: MenuItem) => void;
  onAddToTray: (dish: MenuItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onQuickOrder,
  onAddToTray,
}) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (dish) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
    >
      <div 
        className="bg-[#141419] border border-[#2b2b36] rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
      >
        {/* Close Button with Touch Area */}
        <button
          onClick={onClose}
          aria-label="Close details modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 text-[#d4cfc5] hover:text-white bg-[#0e0e11]/80 hover:bg-[#0e0e11] rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Modal Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1a1a24]">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-[#141419]/30 to-transparent" />
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-8">
            {/* Zero-Pill Metadata */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs text-[#c5a059] tracking-wider uppercase mb-2">
              {dish.tags.map((t, i) => (
                <React.Fragment key={t}>
                  <span>{t}</span>
                  {i < dish.tags.length - 1 && <span aria-hidden="true" className="text-[#8a8780]">·</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-baseline justify-between gap-4 mb-3 sm:mb-4">
              <h2 id="dish-detail-title" className="text-xl sm:text-3xl font-serif font-bold text-[#f4eee2]">
                {dish.name}
              </h2>
              <span className="text-xl sm:text-2xl font-semibold font-mono text-[#c5a059] tabular-nums shrink-0">
                ${dish.price}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#bfb9ae] leading-relaxed mb-6">
              {dish.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#1a1a20] border border-[#262630] rounded-xl mb-6 text-xs text-[#bfb9ae]">
              {dish.prepTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c5a059]" />
                  <div>
                    <span className="block text-[#8a8780] text-[10px]">Prep Time</span>
                    <span className="font-medium text-[#f4eee2] font-mono tabular-nums">{dish.prepTime}</span>
                  </div>
                </div>
              )}
              {dish.calories && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#c5a059]" />
                  <div>
                    <span className="block text-[#8a8780] text-[10px]">Energy</span>
                    <span className="font-medium text-[#f4eee2] font-mono tabular-nums">{dish.calories}</span>
                  </div>
                </div>
              )}
              {dish.pairing && (
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Wine className="w-4 h-4 text-[#c5a059]" />
                  <div className="truncate">
                    <span className="block text-[#8a8780] text-[10px]">Sommelier Pairing</span>
                    <span className="font-medium text-[#f4eee2] truncate block" title={dish.pairing}>{dish.pairing}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onQuickOrder(dish);
                }}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366]/40 rounded-xl transition-all min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Order via WhatsApp ({RESTAURANT_INFO.phoneFormatted})</span>
              </button>

              <button
                onClick={() => {
                  onAddToTray(dish);
                  onClose();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl transition-all whitespace-nowrap min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Order Tray</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
