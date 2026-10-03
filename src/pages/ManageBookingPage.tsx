import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Reservation } from '../types';
import {
  CalendarCheck,
  Search,
  Download,
  Edit3,
  XCircle,
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const ManageBookingPage: React.FC = () => {
  const {
    reservations,
    findReservation,
    cancelReservation,
    rescheduleReservation,
    showToast,
    navigateTo,
  } = useBooking();

  const [inputRef, setInputRef] = useState('');
  const [activeReservation, setActiveReservation] = useState<Reservation | null>(
    reservations[0] || null
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(activeReservation?.date || '');
  const [newTime, setNewTime] = useState(activeReservation?.time || '7:00 PM');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.trim()) return;
    const found = findReservation(inputRef);
    if (found) {
      setActiveReservation(found);
      setNewDate(found.date);
      setNewTime(found.time);
      showToast(`Reservation ${found.reference} loaded.`, 'success');
    } else {
      showToast(`No booking matching “${inputRef}” was found.`, 'error');
    }
  };

  const handleDownloadCalendar = (res: Reservation) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WaWa Restaurant//Reservations//EN',
      'BEGIN:VEVENT',
      `SUMMARY:WaWa Table Reservation (${res.reference})`,
      `DESCRIPTION:Table for ${res.guests} at ${res.locationName}. Seating: ${res.seatingPreference}.`,
      `LOCATION:${res.locationName}`,
      `STATUS:${res.status.toUpperCase()}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${res.reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar invite downloaded.', 'success');
  };

  const handleCancel = (reference: string) => {
    if (window.confirm(`Are you sure you want to cancel booking ${reference}?`)) {
      cancelReservation(reference);
      if (activeReservation?.reference === reference) {
        setActiveReservation((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
      }
    }
  };

  const handleSaveReschedule = (reference: string) => {
    if (!newDate || !newTime) {
      showToast('Please select a valid date and time.', 'warning');
      return;
    }
    rescheduleReservation(reference, newDate, newTime);
    setIsEditing(false);
    if (activeReservation?.reference === reference) {
      setActiveReservation((prev) => (prev ? { ...prev, date: newDate, time: newTime, status: 'rescheduled' } : null));
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Reservation Management
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            Manage Your Table
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            Review your upcoming dining itinerary, update seating times, download calendar appointments, or cancel existing table reservations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#141618] border border-[#282c30] p-6 rounded-2xl shadow-xl max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-[#eae3d8]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value.toUpperCase())}
                placeholder="Enter Booking Reference (e.g. WAWA-892410)"
                className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 pl-9 pr-3 text-xs font-mono uppercase text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors shrink-0"
            >
              Lookup
            </button>
          </form>
        </div>

        {/* Active Reservation Display */}
        {activeReservation ? (
          <div className="bg-[#141618] border border-[#282c30] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#282c30] gap-4">
              <div>
                <div className="text-xs text-[#eae3d8]/50 uppercase font-mono">
                  Booking Reference
                </div>
                <div className="text-2xl font-mono text-[#c5a059] font-bold">
                  {activeReservation.reference}
                </div>
              </div>
              <div
                className={`text-xs px-3 py-1 rounded-md uppercase font-mono self-start sm:self-auto ${
                  activeReservation.status === 'confirmed'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : activeReservation.status === 'rescheduled'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                Status: {activeReservation.status}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#0c0d0e] p-6 rounded-xl border border-[#282c30] text-xs">
              <div className="space-y-1">
                <span className="text-[#eae3d8]/50 uppercase font-mono text-[10px] block">
                  Location
                </span>
                <span className="font-serif text-sm text-[#f4efe8] block">
                  {activeReservation.locationName}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#eae3d8]/50 uppercase font-mono text-[10px] block">
                  Date & Time
                </span>
                <span className="font-serif text-sm text-[#f4efe8] block">
                  {activeReservation.date} at {activeReservation.time}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#eae3d8]/50 uppercase font-mono text-[10px] block">
                  Party & Seating
                </span>
                <span className="font-serif text-sm text-[#f4efe8] block">
                  {activeReservation.guests} Guests ({activeReservation.seatingPreference})
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#eae3d8]/50 uppercase font-mono text-[10px] block">
                  Guest Name
                </span>
                <span className="font-medium text-[#f4efe8] block">
                  {activeReservation.guestName}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#eae3d8]/50 uppercase font-mono text-[10px] block">
                  Occasion
                </span>
                <span className="font-medium text-[#f4efe8] block">
                  {activeReservation.occasion}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#eae3d8]/50 uppercase font-mono text-[10px] block">
                  Contact
                </span>
                <span className="text-[#eae3d8] block">{activeReservation.guestEmail}</span>
                <span className="text-[#eae3d8]/70 block font-mono">{activeReservation.guestPhone}</span>
              </div>
            </div>

            {activeReservation.specialRequests && (
              <div className="p-4 bg-[#0c0d0e] border border-[#282c30] rounded-xl text-xs">
                <span className="text-[#c5a059] font-mono text-[10px] uppercase block mb-1">
                  Special Requests & Notes:
                </span>
                <p className="text-[#eae3d8]/80 italic">
                  “{activeReservation.specialRequests}”
                </p>
              </div>
            )}

            {/* Rescheduling Form Panel */}
            {isEditing ? (
              <div className="p-6 bg-[#0c0d0e] border border-[#c5a059] rounded-xl space-y-4">
                <h3 className="text-sm font-serif text-[#f4efe8]">
                  Select New Date & Seating Time
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#eae3d8]/60 mb-1">New Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-[#141618] border border-[#282c30] p-2.5 rounded text-[#f4efe8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eae3d8]/60 mb-1">New Time Slot</label>
                    <select
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full bg-[#141618] border border-[#282c30] p-2.5 rounded text-[#f4efe8]"
                    >
                      {['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map(
                        (t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs text-[#eae3d8]/60 hover:text-[#f4efe8]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveReschedule(activeReservation.reference)}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </div>
            ) : (
              /* Action Toolbar */
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#282c30]">
                <button
                  onClick={() => handleDownloadCalendar(activeReservation)}
                  className="px-4 py-2 text-xs bg-[#0c0d0e] hover:bg-[#181b1e] border border-[#282c30] hover:border-[#c5a059] text-[#f4efe8] rounded-md transition-colors flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Download .ics Invite</span>
                </button>

                {activeReservation.status !== 'cancelled' && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-xs bg-[#0c0d0e] hover:bg-[#181b1e] border border-[#282c30] hover:border-[#c5a059] text-[#f4efe8] rounded-md transition-colors flex items-center gap-2"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Reschedule Booking</span>
                    </button>
                    <button
                      onClick={() => handleCancel(activeReservation.reference)}
                      className="px-4 py-2 text-xs bg-[#0c0d0e] hover:bg-rose-950/40 text-rose-300 border border-rose-900/40 rounded-md transition-colors flex items-center gap-2"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Cancel Table</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#141618] border border-[#282c30] rounded-2xl p-12 text-center space-y-4">
            <Calendar className="w-10 h-10 text-[#c5a059] mx-auto" />
            <h3 className="text-xl font-serif text-[#f4efe8]">
              No Active Reservation Selected
            </h3>
            <p className="text-xs text-[#eae3d8]/60 max-w-sm mx-auto">
              Please enter your 6-digit reference code above, or initiate a new booking below.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('reservations')}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-colors"
              >
                Create New Table Reservation
              </button>
            </div>
          </div>
        )}

        {/* Existing stored reservations list (if multiple) */}
        {reservations.length > 1 && (
          <div className="bg-[#141618] border border-[#282c30] p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-serif text-[#f4efe8]">
              Your Device's Stored Bookings ({reservations.length})
            </h3>
            <div className="space-y-2">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  onClick={() => {
                    setActiveReservation(res);
                    setNewDate(res.date);
                    setNewTime(res.time);
                    setIsEditing(false);
                  }}
                  className={`p-3.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                    activeReservation?.reference === res.reference
                      ? 'bg-[#0c0d0e] border-[#c5a059]'
                      : 'bg-[#181b1e] border-[#282c30] hover:border-[#c5a059]/40'
                  }`}
                >
                  <div>
                    <span className="font-mono text-xs text-[#c5a059] font-bold block">
                      {res.reference}
                    </span>
                    <span className="text-xs text-[#f4efe8]">
                      {res.locationName} · {res.date} at {res.time} ({res.guests} Guests)
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                      res.status === 'confirmed'
                        ? 'text-emerald-400 bg-emerald-950'
                        : res.status === 'rescheduled'
                        ? 'text-blue-400 bg-blue-950'
                        : 'text-rose-400 bg-rose-950'
                    }`}
                  >
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
