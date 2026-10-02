import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, MessageSquare, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenWhatsAppOrder: () => void;
  orderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenWhatsAppOrder,
  orderCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Experiences', href: '#offers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Notice for Portfolio Demo */}
      <aside aria-label="Portfolio Notice" className="bg-[#16161a] border-b border-[#26262e] text-[11px] text-[#a1a1aa] py-1.5 px-3 sm:px-4 text-center tracking-wider overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
          <span>Portfolio Showcase by <strong className="text-[#c5a059] font-medium">{RESTAURANT_INFO.studioCredit}</strong></span>
          <span className="hidden sm:inline text-[#c5a059]" aria-hidden="true">·</span>
          <span>Demo Line: <span className="text-[#f4eee2] font-mono tabular-nums">{RESTAURANT_INFO.phoneFormatted}</span></span>
        </div>
      </aside>

      {/* Top Bar Contract: 1 row, 3 zones */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0e0e11]/95 backdrop-blur-md shadow-lg border-b border-[#26262e]/80 py-3 sm:py-3.5'
            : 'bg-[#0e0e11]/85 backdrop-blur-sm border-b border-[#26262e]/40 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text element wordmark in display serif */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif tracking-wider font-semibold text-[#f4eee2] hover:text-[#c5a059] transition-colors shrink-0"
          >
            Royal Taste
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#d4cfc5]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick(link.href);
                }}
                className="hover:text-[#c5a059] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#c5a059]/60 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* WhatsApp Order Tray Button */}
            <button
              onClick={onOpenWhatsAppOrder}
              aria-label="Open WhatsApp Order Concierge"
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs font-medium text-[#f4eee2] bg-[#1a1a20] border border-[#33333d] hover:border-[#c5a059] rounded-lg transition-colors whitespace-nowrap min-h-[40px]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp Order</span>
              <span className="sm:hidden">Order</span>
              {orderCount > 0 && (
                <span className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-[#0e0e11] bg-[#c5a059] rounded-full tabular-nums">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Table Reservation Action */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold tracking-wide text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-lg transition-colors whitespace-nowrap min-h-[40px]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 text-[#d4cfc5] hover:text-[#f4eee2] hover:bg-[#1a1a20] rounded-lg xl:hidden transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 xl:hidden flex flex-col bg-[#0e0e11]/98 backdrop-blur-2xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Mobile Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#26262e] bg-[#121217]">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl font-serif font-semibold text-[#f4eee2]"
            >
              Royal Taste Restaurant
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#d4cfc5] hover:text-white rounded-lg hover:bg-[#1f1f28] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(link.href);
                  }}
                  className="text-base sm:text-lg font-serif text-[#f4eee2] hover:text-[#c5a059] transition-colors py-3 border-b border-[#1f1f26]/80 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#8a8780] font-sans">→</span>
                </a>
              ))}
            </nav>

            {/* Mobile CTAs & Concierge Hotline */}
            <div className="pt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsAppOrder();
                }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-xs font-semibold text-white bg-[#172c20] border border-[#25D366]/50 hover:bg-[#1f3a2b] rounded-xl transition-colors min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Order ({RESTAURANT_INFO.phoneFormatted})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl transition-colors min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-[#80808a] block">
                  {RESTAURANT_INFO.address}
                </span>
                <span className="text-[10px] text-[#c5a059] tracking-wider uppercase block mt-1">
                  Portfolio Demonstration · SAMAR WEB STUDIO
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
