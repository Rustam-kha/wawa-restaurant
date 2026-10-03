import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { LOCATIONS } from '../data/restaurantData';
import { SeatingPreference, OccasionType, Reservation } from '../types';
import {
  Calendar,
  Clock,
  Users,
  Utensils,
  CheckCircle2,
  AlertCircle,
  Download,
  CalendarCheck,
  Edit3,
  XCircle,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Shield,
  Info,
} from 'lucide-react';

export const ReservationsPage: React.FC = () => {
  const {
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
    submitReservation,
    confirmedBooking,
    cancelReservation,
    rescheduleReservation,
    findReservation,
    showToast,
    navigateTo,
  } = useBooking();

  // Booking step: 1 = Details & Time, 2 = Guest Info, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(confirmedBooking ? 3 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manage / Lookup existing booking tab
  const [lookupMode, setLookupMode] = useState(false);
  const [lookupReference, setLookupReference] = useState('');
  const [lookedUpBooking, setLookedUpBooking] = useState<Reservation | null>(null);

  // Reschedule modal inside manage
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState(bookingDate);
  const [rescheduleTime, setRescheduleTime] = useState('7:30 PM');

  // Handle slot selection
  const handleSelectTime = (slotTime: string) => {
    setBookingTime(slotTime);
  };

  const handleStep1Proceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingTime) {
      showToast('Please select an available seating time slot.', 'warning');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      showToast('Please enter your full name.', 'warning');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    if (!guestPhone.trim()) {
      showToast('Please enter a contact phone number.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReservation();
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      showToast('Unable to complete reservation. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar .ics file download generator
  const downloadCalendarFile = (booking: Reservation) => {
    const title = `WaWa Reservation (${booking.locationName})`;
    const description = `Table for ${booking.guests} guests at WaWa. Seating: ${booking.seatingPreference}. Reference: ${booking.reference}.`;
    const location = booking.locationName;
    
    // Format rudimentary .ics string
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WaWa Restaurant//Reservations//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${booking.reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar invite (.ics) downloaded.', 'success');
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupReference.trim()) return;
    const found = findReservation(lookupReference);
    if (found) {
      setLookedUpBooking(found);
      showToast(`Booking ${found.reference} found.`, 'success');
    } else {
      setLookedUpBooking(null);
      showToast(`No reservation found matching “${lookupReference}”. Please verify reference code.`, 'error');
    }
  };

  const handleCancelCurrent = (ref: string) => {
    if (window.confirm(`Are you sure you want to cancel reservation ${ref}?`)) {
      cancelReservation(ref);
      if (lookedUpBooking?.reference === ref) {
        setLookedUpBooking((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
      }
    }
  };

  const handleSaveReschedule = (ref: string) => {
    rescheduleReservation(ref, rescheduleDate, rescheduleTime);
    setIsRescheduling(false);
    if (lookedUpBooking?.reference === ref) {
      setLookedUpBooking((prev) => (prev ? { ...prev, date: rescheduleDate, time: rescheduleTime, status: 'rescheduled' } : null));
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Online Table Reservations
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            Reserve Your Experience
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light">
            Bookings are open 30 days in advance. For parties exceeding 12 guests or private dining suites, please use our private dining inquiry form.
          </p>

          {/* Toggle between New Reservation and Find Existing */}
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setLookupMode(false);
                setStep(1);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                !lookupMode
                  ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold'
                  : 'bg-[#141618] text-[#eae3d8]/80 hover:text-[#f4efe8] border border-[#282c30]'
              }`}
            >
              New Reservation
            </button>
            <button
              onClick={() => setLookupMode(true)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                lookupMode
                  ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold'
                  : 'bg-[#141618] text-[#eae3d8]/80 hover:text-[#f4efe8] border border-[#282c30]'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Find / Manage Booking</span>
            </button>
          </div>
        </div>

        {/* LOOKUP / MANAGE MODE */}
        {lookupMode && (
          <div className="bg-[#141618] border border-[#282c30] p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
            <div className="max-w-md mx-auto text-center space-y-3">
              <h2 className="text-xl font-serif text-[#f4efe8]">
                Find an Existing Reservation
              </h2>
              <p className="text-xs text-[#eae3d8]/70">
                Enter your 6-digit booking reference code (e.g. <span className="font-mono text-[#c5a059]">WAWA-892410</span>)
              </p>
              <form onSubmit={handleLookup} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={lookupReference}
                  onChange={(e) => setLookupReference(e.target.value.toUpperCase())}
                  placeholder="WAWA-XXXXXX"
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md px-3 py-2 text-xs font-mono uppercase text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md shrink-0 transition-colors"
                >
                  Lookup
                </button>
              </form>
            </div>

            {/* Display looked up booking */}
            {lookedUpBooking && (
              <div className="mt-8 border-t border-[#282c30] pt-6 max-w-xl mx-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-[#c5a059] font-bold">
                    Ref: {lookedUpBooking.reference}
                  </div>
                  <div
                    className={`text-xs px-2.5 py-0.5 rounded uppercase font-mono ${
                      lookedUpBooking.status === 'confirmed'
                        ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800'
                        : lookedUpBooking.status === 'rescheduled'
                        ? 'bg-blue-950/70 text-blue-400 border border-blue-800'
                        : 'bg-rose-950/70 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {lookedUpBooking.status}
                  </div>
                </div>

                <div className="bg-[#0c0d0e] p-4 rounded-lg border border-[#282c30] grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#eae3d8]/50 block">Guest Name</span>
                    <span className="font-medium text-[#f4efe8]">{lookedUpBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[#eae3d8]/50 block">Location</span>
                    <span className="font-medium text-[#f4efe8]">{lookedUpBooking.locationName}</span>
                  </div>
                  <div>
                    <span className="text-[#eae3d8]/50 block">Date & Time</span>
                    <span className="font-medium text-[#f4efe8]">{lookedUpBooking.date} at {lookedUpBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-[#eae3d8]/50 block">Party Size</span>
                    <span className="font-medium text-[#f4efe8]">{lookedUpBooking.guests} Guests ({lookedUpBooking.seatingPreference})</span>
                  </div>
                </div>

                {isRescheduling ? (
                  <div className="p-4 bg-[#0c0d0e] border border-[#c5a059]/40 rounded-lg space-y-3">
                    <div className="text-xs font-semibold text-[#c5a059]">Reschedule Date & Time:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="bg-[#141618] border border-[#282c30] text-xs p-2 rounded text-[#f4efe8]"
                      />
                      <select
                        value={rescheduleTime}
                        onChange={(e) => setRescheduleTime(e.target.value)}
                        className="bg-[#141618] border border-[#282c30] text-xs p-2 rounded text-[#f4efe8]"
                      >
                        {['12:30 PM', '1:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        onClick={() => setIsRescheduling(false)}
                        className="px-3 py-1.5 text-xs text-[#eae3d8]/70 hover:text-[#f4efe8]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveReschedule(lookedUpBooking.reference)}
                        className="px-3 py-1.5 text-xs bg-[#c5a059] text-[#0c0d0e] rounded font-semibold"
                      >
                        Confirm New Time
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => downloadCalendarFile(lookedUpBooking)}
                      className="px-3 py-2 text-xs bg-[#181b1e] hover:bg-[#282c30] text-[#f4efe8] rounded border border-[#282c30] flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Add to Calendar</span>
                    </button>
                    {lookedUpBooking.status !== 'cancelled' && (
                      <>
                        <button
                          onClick={() => setIsRescheduling(true)}
                          className="px-3 py-2 text-xs bg-[#181b1e] hover:bg-[#282c30] text-[#f4efe8] rounded border border-[#282c30] flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>Modify Reservation</span>
                        </button>
                        <button
                          onClick={() => handleCancelCurrent(lookedUpBooking.reference)}
                          className="px-3 py-2 text-xs bg-[#181b1e] hover:bg-rose-950/40 text-rose-300 rounded border border-rose-900/40 flex items-center gap-1.5 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel Reservation</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 1: PARTY, LOCATION, DATE & AVAILABILITY */}
        {!lookupMode && step === 1 && (
          <div className="bg-[#141618] border border-[#282c30] p-6 sm:p-10 rounded-2xl shadow-xl space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-2">
                  Location
                </label>
                <select
                  value={selectedLocationId}
                  onChange={(e) => {
                    setSelectedLocationId(e.target.value);
                    checkAvailability();
                  }}
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-2">
                  Dining Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => {
                    setBookingDate(e.target.value);
                    checkAvailability();
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-2">
                  Guests
                </label>
                <select
                  value={bookingGuests}
                  onChange={(e) => {
                    setBookingGuests(Number(e.target.value));
                    checkAvailability();
                  }}
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-2">
                  Seating Area
                </label>
                <select
                  value={bookingSeating}
                  onChange={(e) => setBookingSeating(e.target.value as SeatingPreference)}
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="indoor">Indoor Dining Room</option>
                  <option value="outdoor">Glass Courtyard / Terrace</option>
                  <option value="chefs-counter">Chef's Hearth Counter</option>
                  <option value="private-dining">Private Dining Salon</option>
                </select>
              </div>
            </div>

            {/* Check Live Availability Button */}
            <div className="flex items-center justify-between pt-2 border-t border-[#282c30]">
              <div className="text-xs text-[#eae3d8]/60 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Showing real-time table availability for {bookingGuests} guests at {currentLocation.city}</span>
              </div>
              <button
                type="button"
                onClick={checkAvailability}
                disabled={isCheckingAvailability}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#eae3d8] bg-[#181b1e] hover:bg-[#282c30] border border-[#282c30] rounded-md transition-colors flex items-center gap-2"
              >
                {isCheckingAvailability ? (
                  <span className="animate-pulse">Checking Table Grid...</span>
                ) : (
                  <span>Refresh Availability</span>
                )}
              </button>
            </div>

            {/* 10. AVAILABILITY EXPERIENCE: Real-time Time Slots */}
            <div className="space-y-6 pt-2">
              {/* Dinner Service */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-serif text-[#f4efe8] flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#c5a059]" />
                    <span>Evening Dinner Service</span>
                  </h3>
                  <span className="text-[11px] font-mono text-[#eae3d8]/50">5:30 PM – 11:30 PM</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableDinnerSlots.map((slot) => {
                    const isSelected = bookingTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => handleSelectTime(slot.time)}
                        className={`p-3 rounded-lg border text-xs font-mono transition-all flex flex-col items-center justify-center relative ${
                          !slot.available
                            ? 'bg-[#0c0d0e]/40 border-[#282c30]/40 text-[#eae3d8]/30 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#c5a059] border-[#c5a059] text-[#0c0d0e] font-bold shadow-md'
                            : 'bg-[#0c0d0e] border-[#282c30] hover:border-[#c5a059]/60 text-[#f4efe8]'
                        }`}
                      >
                        <span className="text-sm">{slot.time}</span>
                        {slot.available ? (
                          <span
                            className={`text-[10px] mt-0.5 ${
                              isSelected ? 'text-[#0c0d0e]' : 'text-[#c5a059]'
                            }`}
                          >
                            {slot.remainingTables && slot.remainingTables <= 2
                              ? `Only ${slot.remainingTables} left`
                              : 'Available'}
                          </span>
                        ) : (
                          <span className="text-[10px] mt-0.5 text-rose-500/80">Fully Booked</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lunch Service */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-serif text-[#f4efe8] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#c5a059]" />
                    <span>Afternoon Lunch & Brunch</span>
                  </h3>
                  <span className="text-[11px] font-mono text-[#eae3d8]/50">12:00 PM – 2:30 PM</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {availableLunchSlots.map((slot) => {
                    const isSelected = bookingTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => handleSelectTime(slot.time)}
                        className={`p-3 rounded-lg border text-xs font-mono transition-all flex flex-col items-center justify-center relative ${
                          !slot.available
                            ? 'bg-[#0c0d0e]/40 border-[#282c30]/40 text-[#eae3d8]/30 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#c5a059] border-[#c5a059] text-[#0c0d0e] font-bold shadow-md'
                            : 'bg-[#0c0d0e] border-[#282c30] hover:border-[#c5a059]/60 text-[#f4efe8]'
                        }`}
                      >
                        <span className="text-sm">{slot.time}</span>
                        {slot.available ? (
                          <span
                            className={`text-[10px] mt-0.5 ${
                              isSelected ? 'text-[#0c0d0e]' : 'text-[#c5a059]'
                            }`}
                          >
                            {slot.remainingTables && slot.remainingTables <= 2
                              ? `Only ${slot.remainingTables} left`
                              : 'Available'}
                          </span>
                        ) : (
                          <span className="text-[10px] mt-0.5 text-rose-500/80">Fully Booked</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unavailable Warning & Alternative Recommendation */}
              <div className="bg-[#0c0d0e] p-4 rounded-lg border border-[#282c30] flex items-start gap-3 text-xs text-[#eae3d8]/75">
                <Shield className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <p className="leading-relaxed">
                    Tables are held for 15 minutes before being released. A debit or credit card holds your reservation. No cancellation fees apply when notified 24 hours prior.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1 CTA */}
            <div className="pt-6 border-t border-[#282c30] flex items-center justify-between">
              <div className="text-xs text-[#eae3d8]/60">
                Selected: <span className="font-semibold text-[#f4efe8]">{bookingDate}</span> at{' '}
                <span className="font-mono text-[#c5a059] font-bold">
                  {bookingTime || 'Please select a time'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleStep1Proceed}
                disabled={!bookingTime}
                className="px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all flex items-center gap-2"
              >
                <span>Continue to Guest Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: GUEST DETAILS & REQUESTS */}
        {!lookupMode && step === 2 && (
          <div className="bg-[#141618] border border-[#282c30] p-6 sm:p-10 rounded-2xl shadow-xl space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#282c30]">
              <div>
                <h2 className="text-xl font-serif text-[#f4efe8]">Guest Information</h2>
                <p className="text-xs text-[#eae3d8]/70">
                  {currentLocation.name} · {bookingDate} at {bookingTime} · {bookingGuests} Guests
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[#c5a059] hover:underline"
              >
                Change Time or Date
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Jonathan Vance"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Email Address (for confirmation) *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="e.g. j.vance@example.com"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Phone Number (SMS updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="e.g. +44 7700 900821"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Occasion
                  </label>
                  <select
                    value={guestOccasion}
                    onChange={(e) => setGuestOccasion(e.target.value as OccasionType)}
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Casual">Casual Dining</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Business">Business Dinner</option>
                    <option value="Celebration">Milestone Celebration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Dietary / Special Requests */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                  Dietary Preferences, Severe Allergies or Table Notes
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Please state any allergies (e.g. shellfish, celiac gluten-free, nuts), highchair needs, or seating preferences..."
                  className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md p-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 text-xs text-[#eae3d8]/70">
                <input
                  type="checkbox"
                  required
                  id="agree-terms"
                  className="mt-1 accent-[#c5a059]"
                />
                <label htmlFor="agree-terms">
                  I agree to the WaWa reservation guidelines and 24-hour cancellation policy.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#282c30] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#eae3d8]/70 hover:text-[#f4efe8]"
                >
                  ← Back to Seating Times
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all shadow-md active:scale-[0.98]"
                >
                  {isSubmitting ? 'Confirming with Table Grid...' : 'Confirm Table Reservation'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: CONFIRMATION SCREEN */}
        {!lookupMode && step === 3 && confirmedBooking && (
          <div className="bg-[#141618] border border-[#c5a059]/40 p-6 sm:p-10 rounded-2xl shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3 pb-6 border-b border-[#282c30]">
              <div className="w-12 h-12 bg-emerald-950/80 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#f4efe8]">
                Reservation Confirmed
              </h2>
              <p className="text-xs text-[#eae3d8]/70 max-w-md mx-auto">
                We have registered your table at WaWa. A confirmation email and calendar invitation have been prepared for your arrival.
              </p>
              <div className="inline-block px-4 py-1.5 bg-[#0c0d0e] border border-[#c5a059] rounded-md font-mono text-sm tracking-wider text-[#c5a059] font-bold">
                Booking Reference: {confirmedBooking.reference}
              </div>
            </div>

            {/* Booking Details Card */}
            <div className="bg-[#0c0d0e] p-6 rounded-xl border border-[#282c30] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <span className="text-[#eae3d8]/50 block uppercase font-mono text-[10px]">Restaurant Location</span>
                  <span className="font-semibold text-sm text-[#f4efe8]">{confirmedBooking.locationName}</span>
                </div>
                <div>
                  <span className="text-[#eae3d8]/50 block uppercase font-mono text-[10px]">Date & Time</span>
                  <span className="font-semibold text-sm text-[#f4efe8]">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </span>
                </div>
                <div>
                  <span className="text-[#eae3d8]/50 block uppercase font-mono text-[10px]">Party Size & Seating</span>
                  <span className="font-semibold text-sm text-[#f4efe8]">
                    {confirmedBooking.guests} Guests · {confirmedBooking.seatingPreference}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[#eae3d8]/50 block uppercase font-mono text-[10px]">Guest Name</span>
                  <span className="font-semibold text-sm text-[#f4efe8]">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-[#eae3d8]/50 block uppercase font-mono text-[10px]">Contact Details</span>
                  <span className="text-[#f4efe8] block">{confirmedBooking.guestEmail}</span>
                  <span className="text-[#f4efe8] block font-mono">{confirmedBooking.guestPhone}</span>
                </div>
                {confirmedBooking.specialRequests && (
                  <div>
                    <span className="text-[#eae3d8]/50 block uppercase font-mono text-[10px]">Special Requests</span>
                    <span className="text-[#eae3d8]/90 italic">{confirmedBooking.specialRequests}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#282c30]">
              <button
                type="button"
                onClick={() => downloadCalendarFile(confirmedBooking)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setLookupReference(confirmedBooking.reference);
                    setLookedUpBooking(confirmedBooking);
                    setLookupMode(true);
                  }}
                  className="px-4 py-2 text-xs border border-[#282c30] hover:border-[#c5a059] text-[#eae3d8]/80 hover:text-[#f4efe8] rounded-md transition-colors"
                >
                  Modify / Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setBookingTime('');
                  }}
                  className="px-4 py-2 text-xs text-[#eae3d8]/60 hover:text-[#f4efe8] underline"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
