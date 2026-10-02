import React from 'react';
import { Sparkles, Check, MessageSquare, Calendar } from 'lucide-react';
import { SPECIAL_OFFERS, RESTAURANT_INFO } from '../data/restaurantData';
import { SpecialOffer } from '../types/restaurant';

interface SpecialOffersProps {
  onSelectOfferForWhatsApp: (offer: SpecialOffer) => void;
  onBookExperienceReservation: (offerTitle: string) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  onSelectOfferForWhatsApp,
  onBookExperienceReservation,
}) => {
  return (
    <section id="offers" className="py-20 sm:py-24 bg-[#0e0e11] border-t border-b border-[#1f1f26] scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            Curated Gastronomic Experiences
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight mb-4">
            Exclusive Dining Offers
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            Immerse yourself in our premier multi-course tasting journeys and celebratory packages. Designed for intimate anniversaries, business galas, and discerning food connoisseurs.
          </p>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <article
              key={offer.id}
              className="bg-[#131317] border border-[#262630] hover:border-[#c5a059]/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70 group"
            >
              <div>
                {/* Visual Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181822]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-[#131317]/40 to-transparent" />
                  
                  {/* Subtle Kicker on Image */}
                  {offer.badge && (
                    <div className="absolute top-4 left-4 text-[11px] tracking-wider uppercase font-semibold text-[#0e0e11] bg-[#c5a059] px-3 py-1 rounded shadow-md">
                      {offer.badge}
                    </div>
                  )}
                </div>

                {/* Offer Details */}
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-[#c5a059] uppercase tracking-wider mb-1">
                    {offer.subtitle}
                  </p>
                  <h3 className="text-xl font-serif font-semibold text-[#f4eee2] mb-3 leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#bfb9ae] leading-relaxed mb-6">
                    {offer.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#21212a]">
                    <span className="text-3xl font-serif font-bold text-[#c5a059] font-mono tabular-nums">
                      ${offer.price}
                    </span>
                    {offer.originalPrice && (
                      <span className="text-sm text-[#73737e] line-through font-mono tabular-nums">
                        ${offer.originalPrice}
                      </span>
                    )}
                    <span className="text-xs text-[#8a8780] ml-auto">per guest / package</span>
                  </div>

                  {/* Included Items Checklist */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs font-semibold text-[#f4eee2] uppercase tracking-wider mb-2">
                      Experience Inclusions:
                    </p>
                    {offer.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#bfb9ae]">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Validity Notice */}
                  <p className="text-[11px] text-[#8a8780] italic">
                    {offer.validity}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 sm:p-6 pt-0 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onSelectOfferForWhatsApp(offer)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs font-medium text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366]/40 hover:border-[#25D366] rounded-xl transition-all min-h-[44px] active:scale-98"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Claim via WhatsApp</span>
                </button>

                <button
                  onClick={() => onBookExperienceReservation(offer.title)}
                  className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl transition-all whitespace-nowrap min-h-[44px] active:scale-98"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
