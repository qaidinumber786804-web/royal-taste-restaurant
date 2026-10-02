import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, MessageSquarePlus, X, Check, Award, AlertCircle } from 'lucide-react';
import { Review } from '../types/restaurant';
import { DEMO_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(DEMO_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll and handle Escape key for review modal
  useEffect(() => {
    if (modalOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setModalOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [modalOpen]);

  // New review form state
  const [formData, setFormData] = useState({
    author: '',
    role: '',
    rating: 5,
    dishRecommended: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.comment.trim()) {
      setErrorMessage('Please fill in both your name and review impression.');
      return;
    }
    setErrorMessage('');

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: formData.author.trim(),
      role: formData.role.trim() || 'Guest Connoisseur',
      date: 'Just Now',
      rating: formData.rating,
      comment: formData.comment.trim(),
      dishRecommended: formData.dishRecommended.trim() || 'A5 Wagyu Tenderloin Rossini',
      verifiedTasting: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        author: '',
        role: '',
        rating: 5,
        dishRecommended: '',
        comment: '',
      });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#0e0e11] border-t border-b border-[#1f1f26] scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Explicit Demo Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1a24] border border-[#333342] text-xs text-[#c5a059] rounded-lg uppercase tracking-wider mb-4 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>Demonstration Testimonials · Fictional Portfolio Data</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-[#fbf8f2] tracking-tight mb-4">
            Guest Accolades & Critiques
          </h2>
          <p className="text-sm sm:text-base text-[#bfb9ae] leading-relaxed">
            Reflecting our dedication to gastronomic perfection. All reviews below are fictional showcase examples crafted specifically for this portfolio project.
          </p>
        </div>

        {/* Top Summary Bar & Add Review CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-[#141419] border border-[#23232c] rounded-2xl mb-10 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 sm:w-5 h-4 sm:h-5 fill-[#c5a059] text-[#c5a059]" />
              ))}
            </div>
            <div>
              <span className="text-sm sm:text-base font-semibold text-[#f4eee2] font-mono tabular-nums">4.96 / 5.0</span>
              <span className="text-xs text-[#8a8780] ml-2">Overall Score (Demo)</span>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl transition-colors whitespace-nowrap min-h-[44px]"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Demo Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="p-5 sm:p-6 bg-[#131317] border border-[#23232c] rounded-2xl flex flex-col justify-between hover:border-[#c5a059]/40 transition-colors"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-[#c5a059] text-[#c5a059]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#73737e]">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#d4cfc5] leading-relaxed italic mb-5 sm:mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info & Recommended Dish */}
              <div className="pt-4 border-t border-[#1f1f26] flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#f4eee2] flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verifiedTasting && (
                      <span title="Verified Tasting Guest" className="inline-flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-[#8a8780]">{rev.role}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="block text-[10px] text-[#73737e] uppercase tracking-wider">Recommended:</span>
                  <span className="text-xs text-[#c5a059] font-medium">{rev.dishRecommended}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Write Demo Review Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Write a Demo Review"
        >
          <div className="bg-[#15151c] border border-[#2b2b38] rounded-2xl max-w-lg w-full p-5 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8a8780] hover:text-white rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f4eee2] mb-1">
              Share Your Dining Impression
            </h3>
            <p className="text-xs text-[#8a8780] mb-5">
              This review will be added locally to the showcase list for demonstration purposes.
            </p>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#183321] border border-[#25D366] flex items-center justify-center mb-3 text-[#25D366]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif text-[#f4eee2] mb-1">Review Added to Demo Showcase!</h4>
                <p className="text-xs text-[#bfb9ae]">Thank you for testing our interactive feedback system.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl flex items-center gap-2 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="rev-author" className="block text-xs font-medium text-[#bfb9ae] mb-1">Your Full Name *</label>
                  <input
                    id="rev-author"
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Lord Julian Sterling"
                    className="w-full px-3.5 py-2.5 bg-[#1b1b24] border border-[#2e2e3c] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="rev-role" className="block text-xs font-medium text-[#bfb9ae] mb-1">Dining Title / Role</label>
                    <input
                      id="rev-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Wine Collector"
                      className="w-full px-3.5 py-2.5 bg-[#1b1b24] border border-[#2e2e3c] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="rev-rating" className="block text-xs font-medium text-[#bfb9ae] mb-1">Star Rating</label>
                    <select
                      id="rev-rating"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-[#1b1b24] border border-[#2e2e3c] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="rev-dish" className="block text-xs font-medium text-[#bfb9ae] mb-1">Favorite Dish</label>
                  <input
                    id="rev-dish"
                    type="text"
                    value={formData.dishRecommended}
                    onChange={(e) => setFormData({ ...formData, dishRecommended: e.target.value })}
                    placeholder="e.g. A5 Wagyu Tenderloin Rossini"
                    className="w-full px-3.5 py-2.5 bg-[#1b1b24] border border-[#2e2e3c] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="rev-comment" className="block text-xs font-medium text-[#bfb9ae] mb-1">Your Dining Review *</label>
                  <textarea
                    id="rev-comment"
                    required
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Describe your culinary impression, flavors, and atmosphere..."
                    className="w-full px-3.5 py-2.5 bg-[#1b1b24] border border-[#2e2e3c] rounded-lg text-xs text-[#f4eee2] focus:border-[#c5a059] outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 text-xs text-[#bfb9ae] hover:text-white rounded-lg min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-[#0e0e11] bg-[#c5a059] hover:bg-[#d6bc75] rounded-xl transition-colors min-h-[44px]"
                  >
                    Publish Demo Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
