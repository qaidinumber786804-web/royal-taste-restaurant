import React, { useState } from 'react';
import { Calendar, Users, Clock, Mail, Phone, User, MessageSquare, Check, Sparkles, AlertCircle, Compass } from 'lucide-react';
import { ReservationFormData } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSectionProps {
  prefilledOccasion?: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ prefilledOccasion }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: todayStr,
    time: '19:30',
    guests: 2,
    seatingArea: 'main-dining',
    occasion: prefilledOccasion || '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedData, setSubmittedData] = useState<ReservationFormData | null>(null);
  const [confirmationCode, setConfirmationCode] = useState('');

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!String(value).trim()) return 'Please enter your full name';
        if (String(value).trim().length < 2) return 'Full name must be at least 2 characters';
        return '';
      case 'email':
        if (!String(value).trim()) return 'Please enter your email address';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!String(value).trim()) return 'Contact phone number is required';
        if (!/^[+0-9\s\-()]{7,20}$/.test(String(value).trim())) return 'Please enter a valid phone number (at least 7 digits)';
        return '';
      case 'date': {
        if (!value) return 'Please select a reservation date';
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) return 'Reservation date cannot be in the past';
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 90);
        if (selected > maxDate) return 'Reservations are open up to 90 days in advance';
        return '';
      }
      case 'guests':
        if (!value || Number(value) < 1) return 'Please specify at least 1 guest';
        if (Number(value) > 16) return 'For parties exceeding 16 guests, please contact our private dining concierge';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof ReservationFormData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof ReservationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      date: validateField('date', formData.date),
      guests: validateField('guests', formData.guests),
    };

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, phone: true, date: true, guests: true });

    return !Object.values(newErrors).some((err) => err !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      return;
    }

    const code = `RT-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
    setSubmittedData({ ...formData });
  };

  const handleSendToWhatsApp = () => {
    if (!submittedData) return;
    const msg = `👑 *ROYAL TASTE RESTAURANT - RESERVATION REQUEST*\n\n` +
      `*Booking Ref:* ${confirmationCode}\n` +
      `*Guest Name:* ${submittedData.fullName}\n` +
      `*Date:* ${submittedData.date} at ${submittedData.time}\n` +
      `*Party Size:* ${submittedData.guests} Guests\n` +
      `*Seating Area:* ${submittedData.seatingArea.replace('-', ' ').toUpperCase()}\n` +
      (submittedData.occasion ? `*Occasion:* ${submittedData.occasion}\n` : '') +
      (submittedData.specialRequests ? `*Special Notes:* ${submittedData.specialRequests}\n` : '') +
      `*Contact:* ${submittedData.phone} | ${submittedData.email}\n\n` +
      `_Demo Reservation via SAMAR WEB STUDIO Portfolio Showcase_\n` +
      `_Concierge Demo Line: ${RESTAURANT_INFO.phoneFormatted}_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="reservations" className="py-20 sm:py-24 bg-[#0e0e11] scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            Bespoke Table Inquiries
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight mb-4">
            Reserve Your Experience
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            Please share your desired date and dining preferences. For instant verification, you can also forward your booking to our demo WhatsApp concierge.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#141419] border border-[#262632] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {submittedData ? (
            /* Confirmation View */
            <div className="text-center py-6 sm:py-8 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#183321] border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4eee2] mb-2">
                Reservation Request Recorded
              </h3>
              <p className="text-xs text-[#a19e95] mb-6">
                Booking Reference: <span className="font-mono text-[#c5a059] font-bold text-sm">{confirmationCode}</span> (Demo Showcase)
              </p>

              {/* Summary Details */}
              <div className="max-w-md mx-auto p-5 bg-[#1b1b24] border border-[#2a2a38] rounded-xl text-left text-xs space-y-2.5 mb-8 text-[#bfb9ae]">
                <div className="flex justify-between border-b border-[#262634] pb-2">
                  <span className="text-[#8a8780]">Guest Name:</span>
                  <span className="font-medium text-[#f4eee2]">{submittedData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#262634] pb-2">
                  <span className="text-[#8a8780]">Date & Time:</span>
                  <span className="font-medium text-[#f4eee2]">{submittedData.date} at {submittedData.time}</span>
                </div>
                <div className="flex justify-between border-b border-[#262634] pb-2">
                  <span className="text-[#8a8780]">Party Size & Salon:</span>
                  <span className="font-medium text-[#f4eee2]">
                    {submittedData.guests} Guests · {submittedData.seatingArea.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#262634] pb-2">
                  <span className="text-[#8a8780]">Contact Details:</span>
                  <span className="font-medium text-[#f4eee2]">{submittedData.phone}</span>
                </div>
                {submittedData.occasion && (
                  <div className="flex justify-between border-b border-[#262634] pb-2">
                    <span className="text-[#8a8780]">Occasion:</span>
                    <span className="font-medium text-[#c5a059]">{submittedData.occasion}</span>
                  </div>
                )}
                {submittedData.specialRequests && (
                  <div className="pt-1">
                    <span className="text-[#8a8780] block mb-0.5">Special Dietary / Seating Notes:</span>
                    <span className="text-[#d4cfc5] italic">"{submittedData.specialRequests}"</span>
                  </div>
                )}
              </div>

              {/* Notice */}
              <p className="text-xs text-[#8a8780] max-w-md mx-auto mb-6">
                This is a demonstration booking simulation for portfolio showcase. You may test the live WhatsApp message forwarding below.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366]/50 rounded-xl transition-all min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Send Confirmation via WhatsApp</span>
                </button>

                <button
                  onClick={() => setSubmittedData(null)}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-medium text-[#d4cfc5] hover:text-white bg-[#1a1a22] hover:bg-[#23232c] border border-[#2a2a38] rounded-xl transition-all min-h-[44px]"
                >
                  Make Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Form Validation Top Alert */}
              {Object.values(errors).some((err) => err !== '') && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Please review and complete the required fields highlighted in red below.</span>
                </div>
              )}

              {/* Row 1: Name, Email, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="res-fullname" className="block text-xs font-medium text-[#d4cfc5] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="res-fullname"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Countess Genevieve"
                    className={`w-full px-3.5 py-2.5 bg-[#1b1b22] border rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:outline-none transition-colors min-h-[44px] ${
                      errors.fullName && touched.fullName
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-[#2d2d3a] focus:border-[#c5a059]'
                    }`}
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-email" className="block text-xs font-medium text-[#d4cfc5] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="guest@example.com"
                    className={`w-full px-3.5 py-2.5 bg-[#1b1b22] border rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:outline-none transition-colors min-h-[44px] ${
                      errors.email && touched.email
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-[#2d2d3a] focus:border-[#c5a059]'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-phone" className="block text-xs font-medium text-[#d4cfc5] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-3.5 py-2.5 bg-[#1b1b22] border rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:outline-none transition-colors min-h-[44px] ${
                      errors.phone && touched.phone
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-[#2d2d3a] focus:border-[#c5a059]'
                    }`}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Date, Time, Guests, Seating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label htmlFor="res-date" className="block text-xs font-medium text-[#d4cfc5] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    required
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    onBlur={() => handleBlur('date')}
                    className={`w-full px-3.5 py-2.5 bg-[#1b1b22] border rounded-lg text-xs text-[#f4eee2] focus:outline-none min-h-[44px] ${
                      errors.date && touched.date
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-[#2d2d3a] focus:border-[#c5a059]'
                    }`}
                  />
                  {errors.date && touched.date && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.date}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-time" className="block text-xs font-medium text-[#d4cfc5] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    id="res-time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1b1b22] border border-[#2d2d3a] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                  >
                    <option value="12:00">12:00 PM (Luncheon)</option>
                    <option value="12:30">12:30 PM (Luncheon)</option>
                    <option value="13:30">1:30 PM (Luncheon)</option>
                    <option value="18:00">6:00 PM (Early Dinner)</option>
                    <option value="18:30">6:30 PM (Dinner)</option>
                    <option value="19:00">7:00 PM (Grand Dinner)</option>
                    <option value="19:30">7:30 PM (Grand Dinner)</option>
                    <option value="20:00">8:00 PM (Dinner)</option>
                    <option value="20:30">8:30 PM (Dinner)</option>
                    <option value="21:15">9:15 PM (Late Supper)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="res-guests" className="block text-xs font-medium text-[#d4cfc5] mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Guests (1-16) *</span>
                  </label>
                  <input
                    id="res-guests"
                    type="number"
                    min={1}
                    max={16}
                    required
                    value={formData.guests}
                    onChange={(e) => handleChange('guests', Number(e.target.value))}
                    onBlur={() => handleBlur('guests')}
                    className={`w-full px-3.5 py-2.5 bg-[#1b1b22] border rounded-lg text-xs text-[#f4eee2] focus:outline-none min-h-[44px] ${
                      errors.guests && touched.guests
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-[#2d2d3a] focus:border-[#c5a059]'
                    }`}
                  />
                  {errors.guests && touched.guests && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.guests}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-seating" className="block text-xs font-medium text-[#d4cfc5] mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Seating Salon</span>
                  </label>
                  <select
                    id="res-seating"
                    value={formData.seatingArea}
                    onChange={(e) => handleChange('seatingArea', e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#1b1b22] border border-[#2d2d3a] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                  >
                    <option value="main-dining">Main Dining Salon</option>
                    <option value="chefs-table">Executive Chef's Counter</option>
                    <option value="private-salon">Imperial Private Salon</option>
                    <option value="terrace">Veranda Glasshouse</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Occasion & Special Requests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="res-occasion" className="block text-xs font-medium text-[#d4cfc5] mb-1.5">
                    Occasion / Experience (Optional)
                  </label>
                  <input
                    id="res-occasion"
                    type="text"
                    value={formData.occasion}
                    onChange={(e) => handleChange('occasion', e.target.value)}
                    placeholder="Anniversary, Birthday, Business Dinner, Tasting Menu..."
                    className="w-full px-3.5 py-2.5 bg-[#1b1b22] border border-[#2d2d3a] rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:border-[#c5a059] outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="res-special" className="block text-xs font-medium text-[#d4cfc5] mb-1.5">
                    Dietary Notes & Allergies (Optional)
                  </label>
                  <input
                    id="res-special"
                    type="text"
                    value={formData.specialRequests}
                    onChange={(e) => handleChange('specialRequests', e.target.value)}
                    placeholder="Shellfish allergy, gluten-sensitive, quiet corner..."
                    className="w-full px-3.5 py-2.5 bg-[#1b1b22] border border-[#2d2d3a] rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:border-[#c5a059] outline-none min-h-[44px]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#23232e]">
                <div className="text-[11px] text-[#8a8780] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>No payment or deposit required. Demonstration reservation flow.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl shadow-lg transition-all min-h-[44px] whitespace-nowrap active:scale-98"
                >
                  Request Table Reservation
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
