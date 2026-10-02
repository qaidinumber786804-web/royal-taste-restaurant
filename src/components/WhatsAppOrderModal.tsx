import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Trash2, Plus, Minus, Send, Copy, Check, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { OrderItem, MenuItem } from '../types/restaurant';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/restaurantData';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onClearTray: () => void;
  onAddItem: (dish: MenuItem) => void;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onClearTray,
  onAddItem,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'vip-delivery'>('dine-in');
  const [guestName, setGuestName] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSimulatedSubmitted, setIsSimulatedSubmitted] = useState(false);
  const [showAddMenuDropdown, setShowAddMenuDropdown] = useState(false);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculation
  const subtotal = orderItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  // Generated WhatsApp message
  const buildWhatsAppMessage = () => {
    let msg = `👑 *ROYAL TASTE RESTAURANT - ORDER INQUIRY*\n`;
    msg += `📍 *Service Type:* ${orderType.toUpperCase()}\n`;
    if (guestName.trim()) msg += `👤 *Guest Name:* ${guestName.trim()}\n`;
    if (tableOrAddress.trim()) {
      msg += orderType === 'dine-in' ? `🏷️ *Table / Salon:* ${tableOrAddress.trim()}\n` : `📫 *Delivery / Pick-up:* ${tableOrAddress.trim()}\n`;
    }
    msg += `\n*SELECTED DISHES:*\n`;

    if (orderItems.length === 0) {
      msg += `(General dining inquiry / bespoke chef request)\n`;
    } else {
      orderItems.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.dish.name} x${item.quantity} — $${item.dish.price * item.quantity}\n`;
      });
    }

    msg += `\n*Subtotal:* $${subtotal}\n`;
    msg += `*Service & Presentation:* $${serviceFee}\n`;
    msg += `*Total Estimated:* $${total}\n`;

    if (specialNotes.trim()) {
      msg += `\n*Chef Preparation Notes:* ${specialNotes.trim()}\n`;
    }

    msg += `\n_Demo Order via SAMAR WEB STUDIO Showcase_\n`;
    msg += `_Demo Concierge Line: ${RESTAURANT_INFO.phoneFormatted}_`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleCopyMessage = () => {
    const message = buildWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSubmit = () => {
    setIsSimulatedSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-order-title"
    >
      <div 
        className="bg-[#14141a] border border-[#2b2b38] rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#242430] flex items-center justify-between bg-[#16161f] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1d3527] border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 id="whatsapp-order-title" className="text-base sm:text-lg font-serif font-bold text-[#f4eee2]">
                WhatsApp Direct Concierge
              </h2>
              <p className="text-[11px] sm:text-xs text-[#c5a059] font-mono tabular-nums">
                Demo Placeholder: {RESTAURANT_INFO.phoneFormatted}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-[#8a8780] hover:text-white rounded-lg hover:bg-[#20202c] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {isSimulatedSubmitted ? (
            /* Simulation Receipt */
            <div className="py-6 sm:py-8 text-center flex flex-col items-center animate-in zoom-in-95">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#183321] border border-[#25D366] text-[#25D366] flex items-center justify-center mb-4">
                <Check className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f4eee2] mb-1">
                Demo Order Dispatched!
              </h3>
              <p className="text-xs text-[#a19e95] max-w-sm mb-5">
                Your order was successfully compiled into the WhatsApp concierge format. In live deployment, this opens your WhatsApp app with the order pre-filled.
              </p>

              <div className="w-full max-w-md p-4 bg-[#1b1b24] border border-[#2b2b3a] rounded-xl text-left font-mono text-[11px] sm:text-xs text-[#bfb9ae] whitespace-pre-line mb-6 overflow-x-auto break-words">
                {buildWhatsAppMessage()}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366] rounded-xl min-h-[44px]"
                >
                  <Send className="w-4 h-4 text-[#25D366]" />
                  <span>Open in WhatsApp Web / App</span>
                </button>
                <button
                  onClick={() => {
                    setIsSimulatedSubmitted(false);
                    onClearTray();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 text-xs text-[#d4cfc5] hover:text-white bg-[#1e1e28] rounded-xl min-h-[44px]"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Demo Notice Banner */}
              <div className="p-3 bg-[#1c1c26] border border-[#2e2e3e] rounded-xl text-[11px] sm:text-xs text-[#a19e95] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>
                  <strong>Portfolio Demo:</strong> Orders encode into standard WhatsApp click-to-chat links with zero payment gateways required. No actual charges will be made.
                </span>
              </div>

              {/* Order Tray Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#f4eee2] flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
                    <span>Your Order Tray ({orderItems.length} items)</span>
                  </h3>

                  {orderItems.length > 0 && (
                    <button
                      onClick={onClearTray}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 p-1 min-h-[36px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {orderItems.length === 0 ? (
                  <div className="p-5 sm:p-6 bg-[#181820] border border-dashed border-[#2b2b3a] rounded-xl text-center">
                    <p className="text-xs text-[#a19e95] mb-3">Your order tray is currently empty.</p>
                    <button
                      onClick={() => setShowAddMenuDropdown(!showAddMenuDropdown)}
                      className="px-4 py-2 text-xs font-medium text-[#0e0e11] bg-[#c5a059] rounded-lg hover:bg-[#d6bc75] transition-colors min-h-[40px]"
                    >
                      + Quick Add Signature Dish
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                    {orderItems.map((item) => (
                      <div
                        key={item.dish.id}
                        className="p-3 bg-[#181822] border border-[#262634] rounded-xl flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-10 h-10 rounded-lg object-cover bg-[#222] shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-medium text-[#f4eee2] truncate">{item.dish.name}</h4>
                            <span className="text-[#c5a059] font-mono tabular-nums">${item.dish.price} each</span>
                          </div>
                        </div>

                        {/* Quantity Controls with Android Friendly Targets */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center gap-1 bg-[#101015] border border-[#2b2b38] rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:text-white text-[#a19e95] active:scale-90"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-mono tabular-nums text-[#f4eee2] font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:text-white text-[#a19e95] active:scale-90"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-semibold text-[#f4eee2] font-mono tabular-nums w-12 text-right">
                            ${item.dish.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Add Dropdown */}
                {showAddMenuDropdown && (
                  <div className="mt-3 p-3 bg-[#1b1b24] border border-[#2e2e3c] rounded-xl space-y-2">
                    <p className="text-[11px] font-semibold text-[#c5a059] uppercase">Add to Tray:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {MENU_ITEMS.slice(0, 4).map((d) => (
                        <button
                          key={d.id}
                          onClick={() => {
                            onAddItem(d);
                            setShowAddMenuDropdown(false);
                          }}
                          className="flex items-center justify-between p-2.5 text-left bg-[#14141c] hover:bg-[#222230] rounded-lg text-xs text-[#d4cfc5] transition-colors min-h-[44px]"
                        >
                          <span className="truncate mr-2">{d.name}</span>
                          <span className="text-[#c5a059] font-mono font-medium">${d.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Service Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#d4cfc5] uppercase tracking-wider mb-2">
                  Dining / Service Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2.5 px-2 text-xs font-medium rounded-lg border transition-all min-h-[44px] ${
                      orderType === 'dine-in'
                        ? 'bg-[#c5a059] text-[#0e0e11] border-[#c5a059] font-semibold shadow-sm'
                        : 'bg-[#181820] text-[#a19e95] border-[#2b2b3a] hover:text-[#f4eee2]'
                    }`}
                  >
                    Dine-In Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2.5 px-2 text-xs font-medium rounded-lg border transition-all min-h-[44px] ${
                      orderType === 'takeaway'
                        ? 'bg-[#c5a059] text-[#0e0e11] border-[#c5a059] font-semibold shadow-sm'
                        : 'bg-[#181820] text-[#a19e95] border-[#2b2b3a] hover:text-[#f4eee2]'
                    }`}
                  >
                    Curbside Pick-up
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('vip-delivery')}
                    className={`py-2.5 px-2 text-xs font-medium rounded-lg border transition-all min-h-[44px] ${
                      orderType === 'vip-delivery'
                        ? 'bg-[#c5a059] text-[#0e0e11] border-[#c5a059] font-semibold shadow-sm'
                        : 'bg-[#181820] text-[#a19e95] border-[#2b2b3a] hover:text-[#f4eee2]'
                    }`}
                  >
                    VIP Delivery
                  </button>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="order-guestname" className="block text-xs font-medium text-[#bfb9ae] mb-1">Guest Name (Optional)</label>
                  <input
                    id="order-guestname"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Alexander Vance"
                    className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2b2b3a] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="order-address" className="block text-xs font-medium text-[#bfb9ae] mb-1">
                    {orderType === 'dine-in' ? 'Table No. / Suite' : 'Delivery Address'}
                  </label>
                  <input
                    id="order-address"
                    type="text"
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    placeholder={orderType === 'dine-in' ? 'e.g. Table 12 or Salon 2' : 'e.g. 740 Park Ave, Suite 14B'}
                    className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2b2b3a] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label htmlFor="order-notes" className="block text-xs font-medium text-[#bfb9ae] mb-1">
                  Preparation Notes / Spice / Allergies
                </label>
                <input
                  id="order-notes"
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Medium-rare Wagyu, sauce on the side, celebratory candle..."
                  className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2b2b3a] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 bg-[#181822] border border-[#242430] rounded-xl space-y-1.5 text-xs text-[#bfb9ae]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums text-[#f4eee2]">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artisanal Service & Presentation:</span>
                  <span className="font-mono tabular-nums text-[#f4eee2]">${serviceFee}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#f4eee2] pt-2 border-t border-[#262634]">
                  <span>Total Estimated:</span>
                  <span className="font-mono tabular-nums text-[#c5a059] text-base">${total}</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer Actions */}
        {!isSimulatedSubmitted && (
          <div className="p-4 sm:p-5 border-t border-[#242430] bg-[#16161f] flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 justify-between shrink-0">
            <button
              onClick={handleCopyMessage}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-[#d4cfc5] hover:text-white bg-[#1f1f2a] border border-[#2e2e3e] rounded-xl transition-colors min-h-[44px]"
            >
              {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Order Text Copied' : 'Copy Message Text'}</span>
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleSimulateSubmit}
                className="w-full sm:w-auto py-2.5 px-4 text-xs font-medium text-[#f4eee2] bg-[#22222e] hover:bg-[#2b2b3a] rounded-xl transition-colors whitespace-nowrap min-h-[44px]"
              >
                Simulate Confirmation
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 text-xs font-semibold text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366] rounded-xl transition-all shadow-lg whitespace-nowrap min-h-[44px] active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
