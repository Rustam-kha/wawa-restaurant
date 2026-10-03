import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { RESTAURANT_INFO, LOCATIONS } from '../data/restaurantData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useBooking();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Table Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please provide your name, email, and message.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received by our concierge.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4efe8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            Concierge & Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#f4efe8]">
            Connect With WaWa
          </h1>
          <p className="text-xs sm:text-sm text-[#eae3d8]/75 max-w-xl mx-auto font-light leading-relaxed">
            Our guest relations team is at your disposal for reservations, cellar inquiries, private events, and dietary consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#141618] border border-[#282c30] p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
              <h2 className="text-xl font-serif text-[#f4efe8]">
                Central Concierge
              </h2>

              <div className="space-y-4 text-xs text-[#eae3d8]/80">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[#f4efe8]">Telephone (Direct Reservations)</span>
                    <span className="font-mono text-[11px] text-[#eae3d8]/70">{RESTAURANT_INFO.centralReservationsPhone}</span>
                    <span className="text-[10px] text-[#eae3d8]/40 block">Phone line answered 10:00 AM – 11:00 PM daily</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[#f4efe8]">General & Guest Inquiries</span>
                    <span className="text-[11px] text-[#eae3d8]/70">{RESTAURANT_INFO.centralEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[#f4efe8]">Private Dining & Special Events</span>
                    <span className="text-[11px] text-[#eae3d8]/70">{RESTAURANT_INFO.conciergeEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[#f4efe8]">Weekly Service Hours</span>
                    <span className="text-[11px] text-[#eae3d8]/70 block">Monday – Friday: 12:00 PM – 2:30 PM | 5:30 PM – 11:30 PM</span>
                    <span className="text-[11px] text-[#eae3d8]/70 block">Saturday: 11:30 AM – 3:30 PM | 5:00 PM – 11:30 PM</span>
                    <span className="text-[11px] text-[#eae3d8]/70 block">Sunday: 12:00 PM – 10:00 PM (Continuous)</span>
                  </div>
                </div>
              </div>

              {/* Business Placeholder Notice as per Prompt Rule #35 */}
              <div className="p-3 bg-[#0c0d0e] border border-[#282c30] rounded-lg text-[11px] text-[#eae3d8]/60">
                <strong className="text-[#c5a059] block font-mono">Business Notice:</strong>
                All contact addresses, telephone numbers, and operating hours are currently marked as realistic placeholder data until final tenant registration is finalized.
              </div>
            </div>

            {/* Flagship Address Quick Card */}
            <div className="bg-[#141618] border border-[#282c30] p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059]">
                <MapPin className="w-4 h-4" />
                <span>Primary Flagship Address</span>
              </div>
              <p className="text-xs font-mono text-[#f4efe8]">
                {LOCATIONS[0].addressPlaceholder}
              </p>
              <p className="text-xs text-[#eae3d8]/60">
                Valet parking service available directly outside the main entrance.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#141618] border border-[#282c30] p-8 sm:p-10 rounded-2xl shadow-xl">
            <h2 className="text-xl font-serif text-[#f4efe8] mb-2">
              Send a Direct Message
            </h2>
            <p className="text-xs text-[#eae3d8]/70 mb-6">
              Fill out the form below and our front of house team will reply within 4 hours during active service.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-[#0c0d0e] border border-[#c5a059]/40 rounded-xl p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-[#f4efe8]">Message Transmitted</h3>
                <p className="text-xs text-[#eae3d8]/80 max-w-md mx-auto">
                  Thank you, {name}. Our guest relations director has received your note regarding “{subject}” and will reply to {email} promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs border border-[#282c30] text-[#eae3d8]/70 hover:text-[#f4efe8] rounded"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Sterling"
                      className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. eleanor@domain.com"
                      className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 20 7946 0920"
                      className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                      Inquiry Subject *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md py-2.5 px-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                    >
                      <option value="General Table Inquiry">General Table Inquiry</option>
                      <option value="Private Dining Booking">Private Dining & Vaults</option>
                      <option value="Dietary & Severe Allergies">Dietary & Severe Allergies</option>
                      <option value="Press & Media Collaboration">Press & Media Relations</option>
                      <option value="Cellar & Sommelier Inquiries">Cellar & Rare Wine Procurement</option>
                      <option value="Careers & Stage">Culinary & Hospitality Careers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c5a059] font-mono mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may our concierge assist your visit to WaWa?"
                    className="w-full bg-[#0c0d0e] border border-[#282c30] rounded-md p-3 text-xs text-[#f4efe8] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0c0d0e] bg-[#c5a059] hover:bg-[#dfc282] rounded-md transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
