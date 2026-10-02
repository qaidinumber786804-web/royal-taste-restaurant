import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Car, Compass, Copy, Check, ChevronDown, MessageSquare, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO, OPENING_HOURS, FAQS } from '../data/restaurantData';

export const LocationHours: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const copyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-20 sm:py-24 bg-[#0e0e11] border-t border-[#1f1f26] scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            Visiting Royal Taste
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight mb-4">
            Location & Service Hours
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            Conveniently situated in the historic Metropolitan District. We invite you to experience our afternoon luncheon and grand dinner services.
          </p>
        </div>

        {/* 2-Column Grid: Hours & Interactive Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14 sm:mb-16">
          
          {/* Left Column: Hours & Policies (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Opening Hours Card */}
            <div className="p-6 sm:p-8 bg-[#131317] border border-[#23232c] rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#1b1b24] border border-[#2d2d3a] rounded-xl text-[#c5a059]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#f4eee2]">Service Schedule</h3>
                  <p className="text-xs text-[#8a8780]">Reservations strongly recommended for dinner seatings</p>
                </div>
              </div>

              <div className="divide-y divide-[#1f1f28]">
                {OPENING_HOURS.map((slot) => (
                  <div key={slot.days} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-medium text-[#f4eee2] sm:w-36">{slot.days}</span>
                    <div className="flex flex-col sm:text-right">
                      <span className="text-[#bfb9ae]">Lunch: {slot.lunch}</span>
                      <span className="text-[#c5a059]">Dinner: {slot.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Etiquette & Valet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#131317] border border-[#23232c] rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-[#c5a059]">
                  <Compass className="w-4 h-4" />
                  <h4 className="text-xs font-semibold text-[#f4eee2] uppercase tracking-wider">Dress Code</h4>
                </div>
                <p className="text-xs text-[#bfb9ae] leading-relaxed">
                  {RESTAURANT_INFO.dressCode}. Smart casual welcomed for luncheon service.
                </p>
              </div>

              <div className="p-5 bg-[#131317] border border-[#23232c] rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-[#c5a059]">
                  <Car className="w-4 h-4" />
                  <h4 className="text-xs font-semibold text-[#f4eee2] uppercase tracking-wider">Valet Service</h4>
                </div>
                <p className="text-xs text-[#bfb9ae] leading-relaxed">
                  {RESTAURANT_INFO.valet}.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Location & Styled Map Canvas (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Styled Map Blueprint Card */}
            <div className="bg-[#131317] border border-[#23232c] rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Map Canvas Graphic */}
              <div className="relative aspect-[16/9] w-full bg-[#181822] flex items-center justify-center overflow-hidden">
                {/* Stylized Architectural Blueprint Graphic */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(#c5a059 1px, transparent 1px), radial-gradient(#ffffff 1px, #181822 1px)',
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 20px 20px',
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-transparent to-transparent" />

                {/* Map Pin Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 animate-ping absolute inset-0" />
                    <div className="w-12 h-12 rounded-full bg-[#c5a059] flex items-center justify-center text-[#0e0e11] shadow-xl">
                      <MapPin className="w-6 h-6 fill-[#0e0e11]" />
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-1 bg-[#0e0e11]/90 border border-[#c5a059]/40 rounded-md backdrop-blur-sm">
                    <span className="text-xs font-serif font-semibold text-[#f4eee2]">Royal Taste Restaurant</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 text-[10px] text-[#73737e] uppercase tracking-wider font-mono">
                  40.7614° N, 73.9776° W · Metropolis Suite 100
                </div>
              </div>

              {/* Location Address Details */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#f4eee2] mb-1">
                      Grand Heritage Address
                    </h3>
                    <p className="text-xs text-[#bfb9ae] leading-relaxed">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>

                  <button
                    onClick={copyAddress}
                    aria-label="Copy restaurant address"
                    className="p-3 bg-[#1b1b24] hover:bg-[#252532] border border-[#2d2d3a] rounded-xl text-[#d4cfc5] hover:text-[#c5a059] transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Copy Address to Clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1f1f28] text-xs">
                  <a
                    href={`tel:${RESTAURANT_INFO.phoneDemo}`}
                    className="flex items-center gap-2.5 p-3 bg-[#17171e] hover:bg-[#1f1f28] rounded-xl text-[#d4cfc5] transition-colors min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <div>
                      <span className="block text-[10px] text-[#8a8780]">Direct Concierge</span>
                      <span className="font-mono tabular-nums text-[#f4eee2]">{RESTAURANT_INFO.phoneFormatted}</span>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Royal Taste Concierge, I would like to inquire about directions and reservations. [Demo Line: ${RESTAURANT_INFO.phoneFormatted}]`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366]/40 rounded-xl text-white transition-colors min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                    <div>
                      <span className="block text-[10px] text-[#25D366]">WhatsApp Support</span>
                      <span className="font-mono tabular-nums text-white">{RESTAURANT_INFO.phoneFormatted}</span>
                    </div>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Guest FAQ Section */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-[#1f1f26]">
          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-center text-[#f4eee2] mb-6 sm:mb-8">
            Frequently Inquired Details
          </h3>
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#131317] border border-[#23232c] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-[#f4eee2] hover:text-[#c5a059] transition-colors min-h-[48px]"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#c5a059] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-[#bfb9ae] leading-relaxed border-t border-[#1f1f28] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
