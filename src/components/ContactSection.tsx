import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Check, AlertCircle, Sparkles, User, HelpCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Dining Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [inquiryCode, setInquiryCode] = useState('');

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Please enter your full name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Please enter your email address';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (value.trim() && !/^[+0-9\s\-()]{7,20}$/.test(value.trim())) {
          return 'Please enter a valid phone number (or leave blank)';
        }
        return '';
      case 'message':
        if (!value.trim()) return 'Please enter your message or question';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof ContactFormData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
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
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, phone: true, message: true });

    return !Object.values(newErrors).some((err) => err !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      return;
    }

    const code = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setInquiryCode(code);
    setSubmittedData({ ...formData });
  };

  const handleSendToWhatsApp = () => {
    if (!submittedData) return;
    const msg = `👑 *ROYAL TASTE RESTAURANT - GUEST INQUIRY*\n\n` +
      `*Ref Code:* ${inquiryCode}\n` +
      `*Guest Name:* ${submittedData.fullName}\n` +
      `*Contact:* ${submittedData.email} | ${submittedData.phone || 'N/A'}\n` +
      `*Inquiry Subject:* ${submittedData.subject}\n` +
      `*Message:* ${submittedData.message}\n\n` +
      `_Demo Inquiry via SAMAR WEB STUDIO Portfolio Showcase_\n` +
      `_Demo Concierge Line: ${RESTAURANT_INFO.phoneFormatted}_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#0e0e11] border-t border-[#1f1f26] scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            Concierge & Inquiries
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight mb-4">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            Have a question about private salon bookings, tasting menus, dietary arrangements, or press inquiries? We are pleased to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-7 bg-[#131317] border border-[#23232c] rounded-2xl space-y-5">
              <h3 className="text-xl font-serif font-semibold text-[#f4eee2]">
                Direct Concierge Desk
              </h3>
              <p className="text-xs text-[#a19e95] leading-relaxed">
                Our guest relations team responds promptly to all inquiries and private dining requests.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneDemo}`}
                  className="flex items-center gap-3.5 p-3.5 bg-[#181820] hover:bg-[#20202c] border border-[#282836] rounded-xl transition-colors min-h-[48px]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#8a8780]">Telephone (Demo Placeholder)</span>
                    <span className="font-mono text-sm text-[#f4eee2] font-medium">{RESTAURANT_INFO.phoneFormatted}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Royal Taste Concierge, I would like to inquire about dining at your restaurant. [Demo Line: ${RESTAURANT_INFO.phoneFormatted}]`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366]/40 rounded-xl transition-colors min-h-[48px]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#25D366] font-medium">WhatsApp Direct Chat</span>
                    <span className="font-mono text-sm text-[#f4eee2] font-medium">{RESTAURANT_INFO.phoneFormatted}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="flex items-center gap-3.5 p-3.5 bg-[#181820] hover:bg-[#20202c] border border-[#282836] rounded-xl transition-colors min-h-[48px]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] text-[#8a8780]">Email Concierge</span>
                    <span className="text-xs text-[#f4eee2] truncate block">{RESTAURANT_INFO.email}</span>
                  </div>
                </a>
              </div>

              {/* Portfolio Demo Notice */}
              <div className="pt-4 border-t border-[#1f1f28] text-[11px] text-[#8a8780] leading-relaxed">
                <span>Created as a showcase project by </span>
                <strong className="text-[#c5a059] font-medium">{RESTAURANT_INFO.studioCredit}</strong>.
                <span> All submissions operate in client-side demonstration mode with WhatsApp integration.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#131317] border border-[#23232c] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              {submittedData ? (
                /* Success View */
                <div className="py-8 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-[#183321] border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#f4eee2] mb-1">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-xs text-[#c5a059] font-mono tabular-nums mb-6">
                    Inquiry Reference: {inquiryCode} (Demo Mode)
                  </p>

                  <div className="p-4 bg-[#181822] border border-[#262634] rounded-xl text-left text-xs space-y-2 mb-6 text-[#bfb9ae]">
                    <div><strong className="text-[#f4eee2]">Sender:</strong> {submittedData.fullName}</div>
                    <div><strong className="text-[#f4eee2]">Email:</strong> {submittedData.email}</div>
                    {submittedData.phone && <div><strong className="text-[#f4eee2]">Phone:</strong> {submittedData.phone}</div>}
                    <div><strong className="text-[#f4eee2]">Subject:</strong> {submittedData.subject}</div>
                    <div className="pt-1 text-[#f4eee2] italic">"{submittedData.message}"</div>
                  </div>

                  <p className="text-xs text-[#8a8780] max-w-md mx-auto mb-6">
                    Thank you for testing our contact system. You may also forward this inquiry directly to our demo WhatsApp line.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendToWhatsApp}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold text-white bg-[#172c20] hover:bg-[#1f3a2b] border border-[#25D366] rounded-xl transition-all min-h-[44px]"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>Send Inquiry to WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setSubmittedData(null)}
                      className="w-full sm:w-auto px-5 py-3 text-xs font-medium text-[#d4cfc5] hover:text-white bg-[#1a1a22] hover:bg-[#23232c] border border-[#2a2a38] rounded-xl transition-all min-h-[44px]"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1f1f28]">
                    <h3 className="text-lg font-serif font-semibold text-[#f4eee2]">
                      Send an Inquiry
                    </h3>
                    <span className="text-[11px] text-[#8a8780]">* Required fields</span>
                  </div>

                  {/* Any General Form Error Alert */}
                  {Object.values(errors).some((err) => err !== '') && (
                    <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Please correct the highlighted fields below before submitting.</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-fullname" className="block text-xs font-medium text-[#d4cfc5] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="e.g. Lord Julian Sterling"
                      className={`w-full px-3.5 py-2.5 bg-[#181822] border rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:outline-none transition-colors min-h-[44px] ${
                        errors.fullName && touched.fullName
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-[#2b2b3a] focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.fullName && touched.fullName && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-[#d4cfc5] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="guest@example.com"
                        className={`w-full px-3.5 py-2.5 bg-[#181822] border rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:outline-none transition-colors min-h-[44px] ${
                          errors.email && touched.email
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-[#2b2b3a] focus:border-[#c5a059]'
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
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-[#d4cfc5] mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-3.5 py-2.5 bg-[#181822] border rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:outline-none transition-colors min-h-[44px] ${
                          errors.phone && touched.phone
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-[#2b2b3a] focus:border-[#c5a059]'
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

                  {/* Inquiry Topic */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-[#d4cfc5] mb-1.5">
                      Subject / Inquiry Type
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#181822] border border-[#2b2b3a] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                    >
                      <option value="General Dining Inquiry">General Dining Inquiry</option>
                      <option value="Private Salon & VIP Events">Private Salon & VIP Events</option>
                      <option value="Chef's Table Experience">Chef's Table Experience</option>
                      <option value="Dietary & Allergen Consultation">Dietary & Allergen Consultation</option>
                      <option value="Press & Media Relations">Press & Media Relations</option>
                    </select>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-[#d4cfc5] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Please share details about your inquiry or special requirements..."
                      className={`w-full px-3.5 py-2.5 bg-[#181822] border rounded-lg text-xs text-[#f4eee2] placeholder-[#73737e] focus:outline-none transition-colors resize-none ${
                        errors.message && touched.message
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-[#2b2b3a] focus:border-[#c5a059]'
                      }`}
                    />
                    {errors.message && touched.message && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-[#8a8780]">
                      No login or credit card required. Demo portfolio submission.
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-semibold tracking-wider uppercase text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl shadow-lg transition-all min-h-[44px] whitespace-nowrap active:scale-98"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
