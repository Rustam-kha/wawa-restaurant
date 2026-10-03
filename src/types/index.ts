export type PageId =
  | 'home'
  | 'about'
  | 'menu'
  | 'services'
  | 'reservations'
  | 'private-dining'
  | 'events'
  | 'gallery'
  | 'locations'
  | 'contact'
  | 'faq'
  | 'blog'
  | 'privacy'
  | 'terms'
  | 'manage-booking';

export type MenuCategory =
  | 'All'
  | 'Breakfast'
  | 'Starters'
  | 'Salads'
  | 'Soups'
  | 'Main Courses'
  | 'Signature Dishes'
  | 'Grills'
  | 'Desserts'
  | 'Drinks'
  | 'Coffee';

export type DietaryType = 'vegetarian' | 'vegan' | 'glutenFree' | 'spicy' | 'chefChoice';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  ingredients: string[];
  dietary: DietaryType[];
  image?: string;
  pairing?: string;
  calories?: number;
}

export type SeatingPreference = 'indoor' | 'outdoor' | 'private-dining' | 'chefs-counter';
export type OccasionType = 'Birthday' | 'Anniversary' | 'Business' | 'Date Night' | 'Celebration' | 'Casual' | 'Other';

export interface Reservation {
  id: string;
  reference: string;
  locationId: string;
  locationName: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: SeatingPreference;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  occasion: OccasionType;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled' | 'rescheduled';
  createdAt: string;
}

export interface RestaurantLocation {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  hoursWeekday: string;
  hoursWeekend: string;
  description: string;
  services: string[];
  parkingInfo: string;
  dressCode: string;
  metroInfo: string;
  image: string;
}

export interface PrivateDiningRoom {
  id: string;
  name: string;
  capacitySeated: number;
  capacityStanding: number;
  description: string;
  sqm: number;
  features: string[];
  recommendedFor: string[];
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  leadTime: string;
  image: string;
  ctaText: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Food' | 'Restaurant' | 'Interior' | 'Events' | 'Team';
  caption: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  roleOrLocation: string;
  rating: number;
  date: string;
  quote: string;
  avatarInitials: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Food & Recipes' | 'Restaurant News' | 'Events' | 'Chef Stories' | 'Dining Guide' | 'Seasonal Specials';
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
  image: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  validity: string;
  includes: string[];
  tag: string;
  priceNote?: string;
}
