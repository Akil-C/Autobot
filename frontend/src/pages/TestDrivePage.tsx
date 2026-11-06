import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { VEHICLES_DATA, SHOWROOMS_DATA } from '../data/vehiclesData';
import { BookingService } from '../services/api';

export const TestDrivePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialModel = searchParams.get('model');
  const initialLocation = searchParams.get('location');

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicleId, setVehicleId] = useState(() => {
    const found = VEHICLES_DATA.find((v) => v.slug === initialModel || v.id === initialModel);
    return found ? found.id : VEHICLES_DATA[0].id;
  });

  // Calculate min date: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const [preferredDate, setPreferredDate] = useState(minDateString);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('11:00 AM - 12:30 PM');
  const [showroomLocation, setShowroomLocation] = useState(() => {
    return initialLocation || SHOWROOMS_DATA[0].name;
  });
  const [notes, setNotes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedVehicle = VEHICLES_DATA.find((v) => v.id === vehicleId) || VEHICLES_DATA[0];

  const timeSlots = [
    '10:00 AM - 11:30 AM',
    '11:30 AM - 01:00 PM',
    '02:00 PM - 03:30 PM',
    '03:30 PM - 05:00 PM',
    '05:00 PM - 06:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !preferredDate) return;

    setIsLoading(true);

    const booking = await BookingService.bookTestDrive({
      customerName,
      customerEmail,
      customerPhone,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      preferredDate,
      preferredTimeSlot,
      showroomLocation,
      notes
    });

    setBookingId(booking.id);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>VIP Track & Road Experience</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Book an Autobot Test Drive
          </h1>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Feel the raw instantaneous torque and dynamic road suspension in person with a certified Autobot technical specialist.
          </p>
        </div>

        {isSubmitted ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                Booking Reference: {bookingId}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Your Test Drive Reservation Is Confirmed
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
                Thank you, {customerName}. An Autobot concierge representative will contact you via phone within 2 hours to confirm vehicle preparation and track gate entry.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Vehicle:</span>
                <span className="text-white font-bold">{selectedVehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Date & Slot:</span>
                <span className="text-amber-400 font-bold">{preferredDate} ({preferredTimeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Showroom:</span>
                <span className="text-zinc-300 font-medium truncate max-w-[220px]">{showroomLocation}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Link
                to="/vehicles"
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700"
              >
                Browse Other Models
              </Link>
              <Link
                to={`/configurator?model=${selectedVehicle.slug}`}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 shadow-glow"
              >
                Configure This Model
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Vehicle Selection */}
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  <span>1. Select Desired Vehicle</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VEHICLES_DATA.map((v) => {
                    const isSelected = v.id === vehicleId;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setVehicleId(v.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 text-zinc-400'
                        }`}
                      >
                        <img
                          src={v.heroImage}
                          alt={v.name}
                          className="w-12 h-8 object-cover rounded bg-zinc-950 flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-white block truncate">{v.name}</span>
                          <span className="text-[10px] text-zinc-400 block truncate">{v.category}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Showroom Location & Schedule */}
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>2. Schedule Date, Time & Showroom Location</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Showroom Location *
                    </label>
                    <select
                      value={showroomLocation}
                      onChange={(e) => setShowroomLocation(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {SHOWROOMS_DATA.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.city} — {s.name.split('—')[1] || s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Date (Future Dates Only) *
                    </label>
                    <input
                      type="date"
                      required
                      min={minDateString}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Driver Details */}
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>3. Driver Profile & Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Special Requests or Highway Route Preference (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in testing Highway Co-Pilot ADAS and high-speed braking..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Requirement Notes */}
              <div className="flex items-start gap-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-400">
                <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Test Drive Prerequisites:</strong> Drivers must hold a valid, unrestricted motor vehicle driver's license for a minimum of 2 years and present it upon arrival at the showroom.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest shadow-glow hover:opacity-95 transition-opacity"
              >
                {isLoading ? 'Processing Reservation...' : 'Confirm Priority Test Drive'}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
