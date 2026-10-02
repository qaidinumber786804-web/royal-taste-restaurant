import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MessageSquare, Phone, Mail, MapPin, Calendar, Heart } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenWhatsAppOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onOpenWhatsAppOrder }) => {
  return (
    <footer className="bg-[#09090c] border-t border-[#1c1c24] text-[#a19e95] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-[#1c1c24]">
          
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="text-2xl font-serif font-bold text-[#f4eee2] hover:text-[#c5a059] transition-colors block">
              Royal Taste Restaurant
            </a>
            <p className="text-xs text-[#a19e95] leading-relaxed max-w-sm">
              An epicurean sanctuary where century-old culinary craftsmanship merges with avant-garde culinary expression. Exquisite steaks, rare caviar, and bespoke service.
            </p>
            <div className="pt-2 text-[11px] text-[#73737e]">
              <span>Demo Contact Hotline: </span>
              <span className="font-mono text-[#c5a059] font-medium">{RESTAURANT_INFO.phoneFormatted}</span>
            </div>
          </div>

          {/* Quick Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f4eee2]">Navigation</h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Our Heritage</a></li>
              <li><a href="#menu" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Haute Menu</a></li>
              <li><a href="#offers" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Tasting Experiences</a></li>
              <li><a href="#gallery" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Food Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Guest Critiques</a></li>
              <li><a href="#reservations" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Reservations</a></li>
              <li><a href="#location" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Hours & Valet</a></li>
              <li><a href="#contact" className="hover:text-[#c5a059] transition-colors py-1 inline-block">Contact Us</a></li>
            </ul>
          </div>

          {/* Service Hours Summary (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f4eee2]">Dining Hours</h4>
            <div className="space-y-2.5 text-[11px]">
              <div>
                <span className="text-[#f4eee2] block font-medium">Tuesday – Thursday</span>
                <span>12:00 PM – 3:00 PM · 6:00 PM – 11:00 PM</span>
              </div>
              <div>
                <span className="text-[#f4eee2] block font-medium">Friday & Saturday</span>
                <span>12:00 PM – 3:30 PM · 5:30 PM – 11:45 PM</span>
              </div>
              <div>
                <span className="text-[#f4eee2] block font-medium">Sunday Imperial Brunch</span>
                <span>11:30 AM – 3:30 PM · 5:30 PM – 10:30 PM</span>
              </div>
              <div className="text-[#73737e] italic pt-1">
                <span>Monday: Closed for Culinary Development</span>
              </div>
            </div>
          </div>

          {/* Concierge & Ordering (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f4eee2]">Concierge Direct</h4>
            <p className="text-xs text-[#a19e95] leading-relaxed">
              For private dining rooms, corporate celebrations, or table reservations:
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={onOpenWhatsAppOrder}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366]/40 rounded-xl transition-colors text-left min-h-[44px]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span className="truncate">WhatsApp Order ({RESTAURANT_INFO.phoneFormatted})</span>
              </button>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl transition-colors text-left min-h-[44px]"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Book Table Online</span>
              </button>
            </div>
          </div>

        </div>

        {/* Studio Attribution & Portfolio Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#73737e]">
          <div>
            <span>© {new Date().getFullYear()} Royal Taste Restaurant. Fictional Showcase.</span>
          </div>

          <div className="flex items-center gap-1.5 text-center sm:text-right flex-wrap justify-center">
            <span>Portfolio demonstration project developed by</span>
            <strong className="text-[#c5a059] font-semibold">{RESTAURANT_INFO.studioCredit}</strong>
          </div>
        </div>

      </div>
    </footer>
  );
};
