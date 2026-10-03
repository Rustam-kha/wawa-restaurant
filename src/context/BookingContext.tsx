import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, Reservation, RestaurantLocation, SeatingPreference, OccasionType } from '../types';
import { LOCATIONS } from '../data/restaurantData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface BookingContextType {
  currentPage: PageId;
  navigateTo: (page: PageId, extra?: { reservationRef?: string; blogId?: string }) => void;
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  currentLocation: RestaurantLocation;
  
  // Reservation creation state
  bookingDate: string;
  setBookingDate: (date: string) => void;
  bookingGuests: number;
  setBookingGuests: (guests: number) => void;
  bookingSeating: SeatingPreference;
  setBookingSeating: (seating: SeatingPreference) => void;
  bookingTime: string;
  setBookingTime: (time: string) => void;
  guestName: string;
  setGuestName: (name: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  guestPhone: string;
  setGuestPhone: (phone: string) => void;
  guestOccasion: OccasionType;
  setGuestOccasion: (occ: OccasionType) => void;
  specialRequests: string;
  setSpecialRequests: (req: string) => void;

  // Availability lookup
  isCheckingAvailability: boolean;
  availableLunchSlots: { time: string; available: boolean; remainingTables?: number }[];
  availableDinnerSlots: { time: string; available: boolean; remainingTables?: number }[];
  checkAvailability: () => void;
  
  // Confirmed bookings stored in state / localStorage
  reservations: Reservation[];
  confirmedBooking: Reservation | null;
  submitReservation: () => Promise<Reservation>;
  cancelReservation: (reference: string) => boolean;
  rescheduleReservation: (reference: string, newDate: string, newTime: string) => boolean;
  findReservation: (reference: string) => Reservation | undefined;

  // Search modal state
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Active blog reader state
  activeBlogId: string | null;
  setActiveBlogId: (id: string | null) => void;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Generate formatted default date (tomorrow)
const getTomorrowString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('mayfair');
  const [bookingDate, setBookingDate] = useState<string>(getTomorrowString());
  const [bookingGuests, setBookingGuests] = useState<number>(2);
  const [bookingSeating, setBookingSeating] = useState<SeatingPreference>('indoor');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestOccasion, setGuestOccasion] = useState<OccasionType>('Casual');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [isCheckingAvailability, setIsCheckingAvailability] = useState<boolean>(false);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Stored reservations (initialized with a realistic example reservation for demo convenience)
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('wawa_reservations');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore fallback
    }
    return [
      {
        id: 'res-demo-1',
        reference: 'WAWA-892410',
        locationId: 'mayfair',
        locationName: 'WaWa Mayfair (Flagship)',
        date: getTomorrowString(),
        time: '7:30 PM',
        guests: 2,
        seatingPreference: 'indoor',
        guestName: 'Jonathan Sterling',
        guestEmail: 'j.sterling@example.com',
        guestPhone: '+44 7700 900821',
        occasion: 'Anniversary',
        specialRequests: 'Quiet corner table and champagne greeting requested.',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(reservations[0] || null);

  // Sync reservations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wawa_reservations', JSON.stringify(reservations));
    } catch {
      // Ignore
    }
  }, [reservations]);

  const currentLocation = LOCATIONS.find((loc) => loc.id === selectedLocationId) || LOCATIONS[0];

  // Dynamic time slots generation based on date and party size
  const [availableLunchSlots, setAvailableLunchSlots] = useState<{ time: string; available: boolean; remainingTables?: number }[]>([
    { time: '12:00 PM', available: true, remainingTables: 3 },
    { time: '12:30 PM', available: true, remainingTables: 4 },
    { time: '1:00 PM', available: true, remainingTables: 2 },
    { time: '1:30 PM', available: false, remainingTables: 0 },
    { time: '2:00 PM', available: true, remainingTables: 5 },
  ]);

  const [availableDinnerSlots, setAvailableDinnerSlots] = useState<{ time: string; available: boolean; remainingTables?: number }[]>([
    { time: '5:30 PM', available: true, remainingTables: 4 },
    { time: '6:00 PM', available: true, remainingTables: 3 },
    { time: '6:30 PM', available: true, remainingTables: 2 },
    { time: '7:00 PM', available: false, remainingTables: 0 },
    { time: '7:30 PM', available: true, remainingTables: 1 },
    { time: '8:00 PM', available: true, remainingTables: 2 },
    { time: '8:30 PM', available: true, remainingTables: 4 },
    { time: '9:00 PM', available: true, remainingTables: 6 },
  ]);

  const checkAvailability = () => {
    setIsCheckingAvailability(true);
    // Simulate real server booking engine calculation
    setTimeout(() => {
      // Seed deterministic variability based on guest count and day
      const dayNum = new Date(bookingDate).getDate() || 1;
      const isWeekend = new Date(bookingDate).getDay() === 0 || new Date(bookingDate).getDay() === 6;
      
      setAvailableLunchSlots([
        { time: '12:00 PM', available: true, remainingTables: (dayNum % 3) + 1 },
        { time: '12:30 PM', available: bookingGuests <= 6, remainingTables: 2 },
        { time: '1:00 PM', available: !isWeekend, remainingTables: isWeekend ? 0 : 3 },
        { time: '1:30 PM', available: true, remainingTables: 4 },
        { time: '2:00 PM', available: true, remainingTables: 5 },
      ]);

      setAvailableDinnerSlots([
        { time: '5:30 PM', available: true, remainingTables: 4 },
        { time: '6:00 PM', available: true, remainingTables: (dayNum % 2) + 2 },
        { time: '6:30 PM', available: true, remainingTables: 1 },
        { time: '7:00 PM', available: dayNum % 3 !== 0, remainingTables: dayNum % 3 !== 0 ? 2 : 0 },
        { time: '7:30 PM', available: dayNum % 2 === 0, remainingTables: dayNum % 2 === 0 ? 1 : 0 },
        { time: '8:00 PM', available: true, remainingTables: 3 },
        { time: '8:30 PM', available: true, remainingTables: 4 },
        { time: '9:00 PM', available: true, remainingTables: 5 },
      ]);

      setIsCheckingAvailability(false);
      showToast('Live table availability updated for your party', 'info');
    }, 450);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: PageId, extra?: { reservationRef?: string; blogId?: string }) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (extra?.blogId) {
      setActiveBlogId(extra.blogId);
    }
    if (extra?.reservationRef) {
      const match = reservations.find((r) => r.reference === extra.reservationRef);
      if (match) {
        setConfirmedBooking(match);
      }
    }
  };

  const submitReservation = async (): Promise<Reservation> => {
    // Generate unique 6-digit reference with WAWA prefix
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const newRef = `WAWA-${randomCode}`;
    
    const newRes: Reservation = {
      id: 'res-' + Date.now(),
      reference: newRef,
      locationId: currentLocation.id,
      locationName: currentLocation.name,
      date: bookingDate,
      time: bookingTime || '7:00 PM',
      guests: bookingGuests,
      seatingPreference: bookingSeating,
      guestName: guestName.trim() || 'Distinguished Guest',
      guestEmail: guestEmail.trim() || 'guest@wawa-restaurant.com',
      guestPhone: guestPhone.trim() || '+44 20 7946 0920',
      occasion: guestOccasion,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [newRes, ...prev]);
    setConfirmedBooking(newRes);
    showToast(`Table reserved successfully! Reference: ${newRef}`, 'success');
    return newRes;
  };

  const cancelReservation = (reference: string): boolean => {
    let found = false;
    setReservations((prev) =>
      prev.map((r) => {
        if (r.reference.toLowerCase() === reference.toLowerCase()) {
          found = true;
          return { ...r, status: 'cancelled' };
        }
        return r;
      })
    );
    if (found) {
      showToast(`Reservation ${reference} has been cancelled.`, 'warning');
      if (confirmedBooking?.reference.toLowerCase() === reference.toLowerCase()) {
        setConfirmedBooking((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
      }
    } else {
      showToast(`Reservation reference ${reference} not found.`, 'error');
    }
    return found;
  };

  const rescheduleReservation = (reference: string, newDate: string, newTime: string): boolean => {
    let found = false;
    setReservations((prev) =>
      prev.map((r) => {
        if (r.reference.toLowerCase() === reference.toLowerCase()) {
          found = true;
          return { ...r, date: newDate, time: newTime, status: 'rescheduled' };
        }
        return r;
      })
    );
    if (found) {
      showToast(`Reservation ${reference} rescheduled to ${newDate} at ${newTime}.`, 'success');
      if (confirmedBooking?.reference.toLowerCase() === reference.toLowerCase()) {
        setConfirmedBooking((prev) => (prev ? { ...prev, date: newDate, time: newTime, status: 'rescheduled' } : null));
      }
    }
    return found;
  };

  const findReservation = (reference: string): Reservation | undefined => {
    return reservations.find((r) => r.reference.toLowerCase().trim() === reference.toLowerCase().trim());
  };

  return (
    <BookingContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedLocationId,
        setSelectedLocationId,
        currentLocation,
        bookingDate,
        setBookingDate,
        bookingGuests,
        setBookingGuests,
        bookingSeating,
        setBookingSeating,
        bookingTime,
        setBookingTime,
        guestName,
        setGuestName,
        guestEmail,
        setGuestEmail,
        guestPhone,
        setGuestPhone,
        guestOccasion,
        setGuestOccasion,
        specialRequests,
        setSpecialRequests,
        isCheckingAvailability,
        availableLunchSlots,
        availableDinnerSlots,
        checkAvailability,
        reservations,
        confirmedBooking,
        submitReservation,
        cancelReservation,
        rescheduleReservation,
        findReservation,
        isSearchOpen,
        setIsSearchOpen,
        activeBlogId,
        setActiveBlogId,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
