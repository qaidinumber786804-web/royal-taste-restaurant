import React, { useState, useMemo } from 'react';
import { Search, MessageSquare, Plus, Check, Eye, Sparkles, X } from 'lucide-react';
import { MenuItem, DishCategory } from '../types/restaurant';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onQuickOrderDish: (dish: MenuItem) => void;
  onAddToTray: (dish: MenuItem) => void;
  trayItemIds: string[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onQuickOrderDish,
  onAddToTray,
  trayItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'gf'>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories: { id: DishCategory; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'signatures', label: "Chef's Signatures" },
    { id: 'starters', label: 'Starters & Caviar' },
    { id: 'mains', label: 'Royal Entrées' },
    { id: 'grill', label: 'Charcoal & Josper' },
    { id: 'desserts', label: 'Decadent Desserts' },
    { id: 'beverages', label: 'Artisanal Elixirs' },
  ];

  // Calculate count for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    MENU_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVegetarian) {
        return false;
      }
      if (dietaryFilter === 'gf' && !item.isGlutenFree) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTag = item.tags.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesTag;
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const handleAddWithFeedback = (dish: MenuItem) => {
    onAddToTray(dish);
    setAddedAnimationId(dish.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 sm:py-24 bg-[#0e0e11] scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            Haute Cuisine Collection
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight mb-4">
            The Royal Taste Menu
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            Curated with seasonal ingredients, rare truffles, and prime dry-aged cuts. Select any dish to order directly through our concierge WhatsApp or add to your order tray.
          </p>
        </div>

        {/* Search & Dietary Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-[#131317] border border-[#23232c] rounded-2xl">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8780]" />
            <input
              type="text"
              placeholder="Search dishes, Wagyu, truffles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-[#1a1a20] border border-[#2b2b36] rounded-xl text-xs text-[#f4eee2] placeholder-[#8a8780] focus:outline-none focus:border-[#c5a059] transition-colors min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a8780] hover:text-[#f4eee2] p-1"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dietary Filter Segmented Control */}
          <div className="flex items-center gap-1.5 self-stretch md:self-auto justify-start sm:justify-end overflow-x-auto touch-pan-x pb-1 sm:pb-0">
            <span className="text-xs text-[#8a8780] mr-1 hidden sm:inline">Dietary:</span>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
                dietaryFilter === 'all'
                  ? 'bg-[#c5a059] text-[#0e0e11] font-semibold'
                  : 'text-[#d4cfc5] hover:bg-[#1f1f26]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
                dietaryFilter === 'veg'
                  ? 'bg-[#c5a059] text-[#0e0e11] font-semibold'
                  : 'text-[#d4cfc5] hover:bg-[#1f1f26]'
              }`}
            >
              Vegetarian Only
            </button>
            <button
              onClick={() => setDietaryFilter('gf')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
                dietaryFilter === 'gf'
                  ? 'bg-[#c5a059] text-[#0e0e11] font-semibold'
                  : 'text-[#d4cfc5] hover:bg-[#1f1f26]'
              }`}
            >
              Gluten-Free Only
            </button>
          </div>
        </div>

        {/* Category Filter Tabs with Touch Swiping */}
        <div className="flex items-center gap-2 overflow-x-auto touch-pan-x pb-3 mb-8 sm:mb-10 scrollbar-none border-b border-[#23232c]">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#212128] text-[#c5a059] border border-[#c5a059]/50 shadow-md font-semibold'
                    : 'text-[#a19e95] hover:text-[#f4eee2] hover:bg-[#16161b]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono tabular-nums ${
                  isSelected ? 'bg-[#c5a059]/20 text-[#c5a059]' : 'bg-[#181820] text-[#73737e]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid: 3-column layout */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => {
              const isInTray = trayItemIds.includes(dish.id);
              const isJustAdded = addedAnimationId === dish.id;

              return (
                <article
                  key={dish.id}
                  className="group bg-[#131317] border border-[#23232c] hover:border-[#c5a059]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
                >
                  {/* Visual Presentation with Zero-Broken-Image Policy */}
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18181f]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />

                      {/* Fallback styling placeholder in DOM underneath */}
                      <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#1a1a24] to-[#121218]">
                        <Sparkles className="w-8 h-8 text-[#c5a059]/50 mb-2" />
                        <span className="text-xs text-[#a19e95]">{dish.name}</span>
                      </div>

                      {/* Quick View Button on Image */}
                      <button
                        onClick={() => onSelectDish(dish)}
                        aria-label={`View plating details for ${dish.name}`}
                        className="absolute bottom-3 right-3 p-2.5 bg-[#0e0e11]/85 hover:bg-[#0e0e11] text-[#f4eee2] hover:text-[#c5a059] rounded-lg backdrop-blur-sm transition-colors opacity-90 group-hover:opacity-100 min-h-[40px] min-w-[40px] flex items-center justify-center"
                        title="View Plating Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      {/* Zero-Pill Metadata Discipline */}
                      <div className="flex items-center flex-wrap gap-1.5 text-[11px] text-[#c5a059] tracking-wider uppercase mb-2">
                        {dish.tags.map((tag, idx) => (
                          <React.Fragment key={tag}>
                            <span>{tag}</span>
                            {idx < dish.tags.length - 1 && (
                              <span aria-hidden="true" className="text-[#8a8780]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Dish Name & Price */}
                      <div className="flex items-baseline justify-between gap-3 mb-2.5">
                        <h3 
                          onClick={() => onSelectDish(dish)}
                          className="text-lg font-serif font-semibold text-[#f4eee2] group-hover:text-[#c5a059] transition-colors cursor-pointer leading-snug"
                        >
                          {dish.name}
                        </h3>
                        <span className="text-base font-semibold text-[#fbf8f2] font-mono tabular-nums shrink-0">
                          ${dish.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#bfb9ae] leading-relaxed line-clamp-2 mb-4">
                        {dish.description}
                      </p>

                      {/* Sommelier Pairing */}
                      {dish.pairing && (
                        <div className="text-[11px] text-[#8a8780] border-t border-[#1f1f26] pt-3 truncate">
                          <span className="text-[#a19e95]">Pairing:</span> {dish.pairing}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 flex items-center gap-2 border-t border-[#1a1a20]">
                    {/* Primary Action: Order via WhatsApp */}
                    <button
                      onClick={() => onQuickOrderDish(dish)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 text-xs font-medium text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366]/40 hover:border-[#25D366] rounded-xl transition-all min-h-[44px] active:scale-98"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Order</span>
                    </button>

                    {/* Secondary Action: Add to Tray */}
                    <button
                      onClick={() => handleAddWithFeedback(dish)}
                      aria-label={`Add ${dish.name} to order tray`}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 ${
                        isJustAdded
                          ? 'bg-[#c5a059] text-[#0e0e11] border-[#c5a059]'
                          : isInTray
                          ? 'bg-[#22222b] text-[#c5a059] border-[#c5a059]/40'
                          : 'bg-[#1a1a20] text-[#d4cfc5] hover:text-[#f4eee2] hover:bg-[#252530] border-[#2b2b36]'
                      }`}
                      title={isInTray ? 'In Order Tray (Click to add more)' : 'Add to Order Tray'}
                    >
                      {isJustAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-[#141418] border border-[#23232c] rounded-2xl max-w-xl mx-auto">
            <p className="text-base text-[#f4eee2] font-serif mb-2">No culinary creations matched your search</p>
            <p className="text-xs text-[#8a8780] mb-6">Try refining your keyword or resetting your category and dietary filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
              }}
              className="px-5 py-2.5 text-xs font-medium text-[#0e0e11] bg-[#c5a059] rounded-xl hover:bg-[#d6bc75] transition-colors min-h-[44px]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* WhatsApp Notice under Menu */}
        <div className="mt-10 sm:mt-12 text-center text-xs text-[#8a8780]">
          <span>Demonstration Notice: Order directly through WhatsApp concierge at </span>
          <span className="text-[#c5a059] font-mono tabular-nums">{RESTAURANT_INFO.phoneFormatted}</span>
          <span> · All items prepared fresh to order.</span>
        </div>

      </div>
    </section>
  );
};
