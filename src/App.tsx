import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { SpecialOffers } from './components/SpecialOffers';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationHours } from './components/LocationHours';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { FloatingWhatsAppBtn } from './components/FloatingWhatsAppBtn';
import { MenuItem, OrderItem, SpecialOffer } from './types/restaurant';

export default function App() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedDishForDetail, setSelectedDishForDetail] = useState<MenuItem | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [prefilledReservationOccasion, setPrefilledReservationOccasion] = useState<string>('');

  // Cart / Tray Management
  const handleAddToTray = (dish: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems((prev) => prev.filter((item) => item.dish.id !== dishId));
    } else {
      setOrderItems((prev) =>
        prev.map((item) => (item.dish.id === dishId ? { ...item, quantity } : item))
      );
    }
  };

  const handleClearTray = () => {
    setOrderItems([]);
  };

  // Immediate 1-click WhatsApp order for a specific dish
  const handleQuickOrderDish = (dish: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev;
      }
      return [...prev, { dish, quantity: 1 }];
    });
    setIsWhatsAppModalOpen(true);
  };

  // Offer booking via WhatsApp
  const handleSelectOfferForWhatsApp = (offer: SpecialOffer) => {
    const virtualDish: MenuItem = {
      id: `offer-${offer.id}`,
      name: offer.title,
      category: 'signatures',
      price: offer.price,
      description: offer.description,
      image: offer.image,
      tags: ['Tasting Experience', 'Special Offer'],
    };

    setOrderItems((prev) => {
      const existing = prev.find((item) => item.dish.id === virtualDish.id);
      if (existing) return prev;
      return [...prev, { dish: virtualDish, quantity: 1 }];
    });
    setIsWhatsAppModalOpen(true);
  };

  // Direct table reservation trigger from navbar or hero
  const handleOpenReservation = () => {
    const reservationSection = document.getElementById('reservations');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill experience name in the reservation form
  const handleBookExperienceReservation = (offerTitle: string) => {
    setPrefilledReservationOccasion(offerTitle);
    const reservationSection = document.getElementById('reservations');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalOrderCount = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0e0e11] text-[#f4eee2] flex flex-col font-sans selection:bg-[#c5a059] selection:text-[#0e0e11] overflow-x-hidden w-full">
      {/* Navigation */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        onOpenWhatsAppOrder={() => setIsWhatsAppModalOpen(true)}
        orderCount={totalOrderCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero
          onOpenReservation={handleOpenReservation}
          onOpenWhatsAppOrder={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 2. About Us */}
        <About />

        {/* 3. Restaurant Menu with Category Filters */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDishForDetail(dish)}
          onQuickOrderDish={handleQuickOrderDish}
          onAddToTray={handleAddToTray}
          trayItemIds={orderItems.map((item) => item.dish.id)}
        />

        {/* 4. Special Offers & Tasting Experiences */}
        <SpecialOffers
          onSelectOfferForWhatsApp={handleSelectOfferForWhatsApp}
          onBookExperienceReservation={handleBookExperienceReservation}
        />

        {/* 5. Food Gallery with Lightbox */}
        <GallerySection />

        {/* 6. Customer Reviews (Marked as Demo Content) */}
        <ReviewsSection />

        {/* 7. Table Reservation Form (Validated) */}
        <ReservationSection prefilledOccasion={prefilledReservationOccasion} />

        {/* 8. Restaurant Location & Opening Hours */}
        <LocationHours />

        {/* 9. Contact Us & Concierge Inquiries (Validated) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={handleOpenReservation}
        onOpenWhatsAppOrder={() => setIsWhatsAppModalOpen(true)}
      />

      {/* Dish Detail Inspection Modal */}
      <DishDetailModal
        dish={selectedDishForDetail}
        onClose={() => setSelectedDishForDetail(null)}
        onQuickOrder={handleQuickOrderDish}
        onAddToTray={handleAddToTray}
      />

      {/* WhatsApp Order Modal / Drawer */}
      <WhatsAppOrderModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearTray={handleClearTray}
        onAddItem={handleAddToTray}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppBtn
        onClick={() => setIsWhatsAppModalOpen(true)}
        orderCount={totalOrderCount}
      />
    </div>
  );
}
