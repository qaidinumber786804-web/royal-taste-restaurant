import React from 'react';
import { ArrowRight, MessageSquare, Calendar, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenWhatsAppOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenWhatsAppOrder }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0e0e11]">
      {/* Background Image with Measured Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/royal_hero_ambiance_1790978607259.jpg"
          alt="Royal Taste Restaurant luxury dining ambiance"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/85 to-[#0e0e11]/50 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28 text-center flex flex-col items-center">
        
        {/* Editorial Subtitle / Kicker */}
        <div className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] font-medium mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Gastronomy & Artisanal Fine Dining</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Display Headline with balanced wrapping */}
        <h1 
          className="text-3xl sm:text-5xl md:text-7xl font-serif font-semibold text-[#fbf8f2] tracking-tight leading-[1.15] sm:leading-[1.1] max-w-4xl text-balance mb-5 sm:mb-6"
        >
          Where Culinary Artistry Meets <span className="text-gold-gradient italic font-normal">Royal Splendor</span>
        </h1>

        {/* Descriptive Body Measure */}
        <p className="text-sm sm:text-lg md:text-xl text-[#d4cfc5] font-light max-w-2xl leading-relaxed mb-8 sm:mb-10 text-balance">
          An unforgettable sanctuary of modern luxury dining. We invite you to savor dry-aged A5 Wagyu, imperial caviar, and handcrafted pastry art in an atmosphere of refined intimacy.
        </p>

        {/* Call to Actions (Interactive buttons with clear handlers) */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-14">
          <a
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl shadow-lg hover:shadow-[#c5a059]/20 transition-all duration-200 min-h-[46px] active:scale-98"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-[#f4eee2] bg-[#1a1a20]/90 hover:bg-[#23232c] border border-[#383842] hover:border-[#c5a059] rounded-xl transition-all duration-200 min-h-[46px] active:scale-98"
          >
            <Calendar className="w-4 h-4 text-[#c5a059]" />
            <span>Book Table</span>
          </button>

          <button
            onClick={onOpenWhatsAppOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium text-[#f4eee2] bg-[#16291e] hover:bg-[#1d3527] border border-[#25D366]/50 hover:border-[#25D366] rounded-xl transition-all duration-200 min-h-[46px] active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Order</span>
          </button>
        </div>

        {/* Clean Unboxed Metadata Highlights (Zero-Pill Rule) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#a19e95] tracking-wide pt-6 border-t border-[#26262e]/70 w-full max-w-3xl">
          <span>Michelin-Caliber Plating</span>
          <span aria-hidden="true" className="text-[#c5a059]">·</span>
          <span>Artisanal Dry-Aged Cuts</span>
          <span aria-hidden="true" className="text-[#c5a059]">·</span>
          <span>Private Salon Available</span>
          <span aria-hidden="true" className="text-[#c5a059]">·</span>
          <span>Complimentary Valet</span>
          <span aria-hidden="true" className="text-[#c5a059]">·</span>
          <span className="text-[#c5a059] font-medium font-mono tabular-nums">Demo: {RESTAURANT_INFO.phoneFormatted}</span>
        </div>
      </div>
    </section>
  );
};
