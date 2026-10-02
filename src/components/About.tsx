import React from 'react';
import { Award, Utensils, HeartHandshake, ShieldCheck, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#0e0e11] border-b border-[#1f1f26] scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            Our Heritage & Philosophy
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight text-balance mb-5 sm:mb-6">
            A Regal Gastronomic Legacy Built on Uncompromising Passion
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            Founded with the belief that true luxury lies in restraint, precision, and heartfelt hospitality. Every plate served at Royal Taste Restaurant is an edible homage to ancestral techniques and modern culinary innovation.
          </p>
        </div>

        {/* 2-Column Split: Narrative + Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="border-l-2 border-[#c5a059] pl-5 sm:pl-6">
              <h3 className="text-xl sm:text-2xl font-serif text-[#f4eee2] font-semibold mb-2">
                Executive Chef Alexandre Moreau
              </h3>
              <p className="text-xs text-[#c5a059] tracking-wider uppercase mb-3 sm:mb-4">
                Master of Culinary Arts · 22 Years International Haute Cuisine
              </p>
              <p className="text-xs sm:text-sm text-[#bfb9ae] leading-relaxed">
                "We do not merely assemble ingredients; we coax out their soul. From our 45-day Himalayan dry-aging vaults to the fragrant saffron harvested from third-generation family estates, every single element must tell an unforgettable story on your palate."
              </p>
            </div>

            {/* Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-2">
              <div className="p-4 sm:p-5 bg-[#141418] border border-[#23232c] rounded-xl">
                <Flame className="w-5 h-5 text-[#c5a059] mb-2.5" />
                <h4 className="text-xs sm:text-sm font-semibold text-[#f4eee2] mb-1">Artisanal Hearth</h4>
                <p className="text-[11px] sm:text-xs text-[#a19e95] leading-relaxed">
                  Binchotan charcoal searing preserves deep natural juices and clean smokiness.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-[#141418] border border-[#23232c] rounded-xl">
                <Award className="w-5 h-5 text-[#c5a059] mb-2.5" />
                <h4 className="text-xs sm:text-sm font-semibold text-[#f4eee2] mb-1">Noble Provenance</h4>
                <p className="text-[11px] sm:text-xs text-[#a19e95] leading-relaxed">
                  Direct sourcing from verified heritage farms and sustainable fisheries.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-[#141418] border border-[#23232c] rounded-xl">
                <HeartHandshake className="w-5 h-5 text-[#c5a059] mb-2.5" />
                <h4 className="text-xs sm:text-sm font-semibold text-[#f4eee2] mb-1">Royal Service</h4>
                <p className="text-[11px] sm:text-xs text-[#a19e95] leading-relaxed">
                  Bespoke tableside finishes and intuitive white-glove guest attention.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery Composition */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-xl overflow-hidden border border-[#26262e] aspect-[4/5] bg-[#141418]">
                <img
                  src="/src/assets/images/royal_wagyu_steak_1790978622794.jpg"
                  alt="A5 Wagyu dish presentation"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-3 sm:p-4 bg-[#141418] border border-[#26262e] rounded-xl text-center">
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#c5a059] tabular-nums">45 Days</span>
                <span className="text-[11px] sm:text-xs text-[#a19e95]">Dry-Aging Chamber Process</span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-8">
              <div className="p-3 sm:p-4 bg-[#141418] border border-[#26262e] rounded-xl text-center">
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#f4eee2] tabular-nums">100% Organic</span>
                <span className="text-[11px] sm:text-xs text-[#a19e95]">Hand-Selected Produce</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#26262e] aspect-[4/5] bg-[#141418]">
                <img
                  src="/src/assets/images/royal_lobster_starter_1790978635422.jpg"
                  alt="Butter-Poached Lobster starter dish"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Adjacency */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-8 px-4 sm:px-6 bg-[#121216] border border-[#23232c] rounded-2xl">
          <div className="text-center border-r border-[#23232c] pr-2 sm:pr-4">
            <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#c5a059] tabular-nums">15+</span>
            <span className="text-[11px] sm:text-sm text-[#bfb9ae] mt-1 block">Years Heritage</span>
          </div>
          <div className="text-center md:border-r border-[#23232c] pr-2 sm:pr-4">
            <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#f4eee2] tabular-nums">28</span>
            <span className="text-[11px] sm:text-sm text-[#bfb9ae] mt-1 block">Signature Recipes</span>
          </div>
          <div className="text-center border-r border-[#23232c] pr-2 sm:pr-4 pt-3 sm:pt-0">
            <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#c5a059] tabular-nums">1,200+</span>
            <span className="text-[11px] sm:text-sm text-[#bfb9ae] mt-1 block">Cellar Grand Crus</span>
          </div>
          <div className="text-center pt-3 sm:pt-0">
            <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#f4eee2] tabular-nums">4.9 / 5</span>
            <span className="text-[11px] sm:text-sm text-[#bfb9ae] mt-1 block">Diner Satisfaction</span>
          </div>
        </div>

      </div>
    </section>
  );
};
