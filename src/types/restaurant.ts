export type DishCategory = 
  | 'all'
  | 'signatures'
  | 'starters'
  | 'mains'
  | 'grill'
  | 'desserts'
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: DishCategory;
  price: number;
  description: string;
  image: string;
  tags: string[]; // e.g. ["Chef's Signature", "Truffle Infused"]
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  prepTime?: string;
  calories?: string;
  pairing?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  description: string;
  includes: string[];
  validity: string;
  badge?: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
  dishRecommended: string;
  verifiedTasting: boolean;
}

export interface OrderItem {
  dish: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main-dining' | 'private-salon' | 'chefs-table' | 'terrace';
  occasion?: string;
  specialRequests?: string;
}
