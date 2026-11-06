import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { VEHICLES_DATA, SHOWROOMS_DATA } from '../data/vehiclesData';
import { BookingService } from '../services/api';

export const TestDrivePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialModel = searchParams.get('model');
  const initialLocation = searchParams.get('location');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleId, setVehicleId] = useState(() => {
    const found = VEHICLES_DATA.find((v) => v.slug === initialModel || v.id === initialModel);
    return found ? found.id : VEHICLES_DATA[0].id;
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(minDate);
  const [time, setTime] = useState('11:00 AM - 12:30 PM');
  const [showroom, setShowroom] = useState(() => initialLocation || SHOWROOMS_DATA[0].name);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const selectedVehicle = VEHICLES_DATA.find((v) => v.id === vehicleId) || VEHICLES_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !consent) return;

    setIsSubmitting(true);
    const booking = await BookingService.bookTestDrive({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      preferredDate: date,
      preferredTimeSlot: time,
      showroomLocation: showroom,
      notes: message
    });

    setBookingRef(booking.id);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="pb-12 border-b border-white/10 mb-12">
          <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
            // TRACK & ROAD RESERVATION
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
            EXPERIENCE IT YOURSELF<span className="text-[#0055ff]">.</span>
          </h1>
          <p className="font-sans text-sm text-zinc-400 mt-2 max-w-xl">
            Book an exclusive technical driving session with an authorized Autobot product specialist.
          </p>
        </div>

        {bookingRef ? (
          <div className="p-10 bg-[#0f1014] hairline-border space-y-6 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#0055ff]">
              <span className="w-2 h-2 rounded-full bg-[#0055ff]" />
              <span className="font-bold uppercase tracking-meta">BOOKING IDENTIFIER // {bookingRef}</span>
            </div>

            <h2 className="font-display font-black text-3xl text-white uppercase">
              CONFIRMED WITH TECHNICAL DISPATCH
            </h2>

            <p className="font-sans text-sm text-zinc-300 leading-relaxed max-w-lg">
              Thank you, {name}. Your test-drive slot for the <strong className="text-white">{selectedVehicle.name}</strong> on {date} at {showroom} has been queued. Our concierge will contact you via phone prior to arrival.
            </p>

            <div className="pt-4 border-t border-white/10 flex gap-4">
              <Link
                to="/vehicles"
                className="px-6 py-3 rounded-full uppercase tracking-technical font-bold bg-[#0055ff] text-white"
              >
                RETURN TO CATALOGUE
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-[#0f1014] hairline-border space-y-8 font-mono text-xs">
            
            <div className="space-y-4">
              <span className="text-zinc-500 uppercase tracking-meta block">01 / SELECT VEHICLE MODEL</span>
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full px-4 py-3 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
              >
                {VEHICLES_DATA.map((v) => (
                  <option key={v.id} value={v.id}>{v.name} ({v.category} // {v.horsepower} HP)</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <span className="text-zinc-500 uppercase tracking-meta block">02 / DATE, TIME & LOCATION</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">SHOWROOM *</label>
                  <select
                    value={showroom}
                    onChange={(e) => setShowroom(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
                  >
                    {SHOWROOMS_DATA.map((s) => (
                      <option key={s.id} value={s.name}>{s.city} — {s.name.split('—')[1] || s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">DATE *</label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">TIME SLOT *</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
                  >
                    <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM</option>
                    <option value="11:30 AM - 01:00 PM">11:30 AM - 01:00 PM</option>
                    <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
                    <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-zinc-500 uppercase tracking-meta block">03 / DRIVER CREDENTIALS</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="FULL NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">PHONE *</label>
                  <input
                    type="tel"
                    required
                    placeholder="MOBILE PHONE"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">MESSAGE / REQUEST (OPTIONAL)</label>
                <textarea
                  rows={3}
                  placeholder="SPECIAL HIGHWAY ROUTE REQUEST OR TECHNICAL FOCUS..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#0055ff]"
              />
              <label htmlFor="consent" className="text-zinc-400 leading-relaxed cursor-pointer">
                I hold a valid driver's license and consent to receive booking communications from Autobot.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="w-full py-4 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6] transition-colors"
            >
              {isSubmitting ? 'DISPATCHING...' : 'BOOK TEST DRIVE'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
