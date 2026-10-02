import React from 'react';
import { MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FloatingWhatsAppBtnProps {
  onClick: () => void;
  orderCount: number;
}

export const FloatingWhatsAppBtn: React.FC<FloatingWhatsAppBtnProps> = ({ onClick, orderCount }) => {
  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
      {/* Tooltip / Hint on desktop */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-[#14141a]/95 border border-[#2e2e3e] rounded-full text-xs text-[#d4cfc5] shadow-xl backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span className="font-medium">WhatsApp Concierge</span>
        <span className="text-[#a19e95]">· {RESTAURANT_INFO.phoneFormatted}</span>
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        aria-label={`Open WhatsApp Concierge Ordering${orderCount > 0 ? ` (${orderCount} items in tray)` : ''}`}
        className="relative group p-3.5 sm:p-4 bg-[#14261b] hover:bg-[#1a3324] border-2 border-[#25D366] rounded-full shadow-2xl text-white hover:scale-105 active:scale-95 transition-all duration-200 min-h-[48px] min-w-[48px] flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6 text-[#25D366]" />

        {/* Badge counter if dishes exist in order tray */}
        {orderCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#c5a059] text-[#0e0e11] font-bold text-[11px] rounded-full font-mono tabular-nums shadow-md">
            {orderCount}
          </span>
        )}
      </button>
    </aside>
  );
};
