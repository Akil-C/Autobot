import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { EnquiryService } from '../services/api';

export const EnquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialModel = searchParams.get('model');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [vehicleId, setVehicleId] = useState(() => {
    const found = VEHICLES_DATA.find((v) => v.slug === initialModel || v.id === initialModel);
    return found ? found.id : VEHICLES_DATA[0].id;
  });
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState<'PHONE' | 'WHATSAPP' | 'EMAIL'>('PHONE');
  const [consent, setConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedVehicle = VEHICLES_DATA.find((v) => v.id === vehicleId) || VEHICLES_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !consent) return;

    setIsSubmitting(true);
    await EnquiryService.submitEnquiry({
      fullName,
      email,
      phone,
      city,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      preferredContactMethod: contactMethod,
      message
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] py-16 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="pb-12 border-b border-white/10 mb-12">
          <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
            // DIRECT CLIENT RELATIONS
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
            TALK TO AUTOBOT<span className="text-[#0055ff]">.</span>
          </h1>
          <p className="font-sans text-sm text-zinc-400 mt-2 max-w-lg">
            Submit a direct technical enquiry regarding custom coachbuilding allocations, private delivery, or fleet acquisitions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-10 bg-[#0f1014] hairline-border space-y-6 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#0055ff]">
              <span className="w-2 h-2 rounded-full bg-[#0055ff]" />
              <span className="font-bold uppercase tracking-meta">TRANSMISSION CONFIRMED</span>
            </div>

            <h2 className="font-display font-black text-3xl text-white uppercase">
              ENQUIRY QUEUED TO REGIONAL ADVISOR
            </h2>

            <p className="font-sans text-sm text-zinc-300 leading-relaxed max-w-lg">
              Thank you, {fullName}. Your dossier concerning the <strong className="text-white">{selectedVehicle.name}</strong> has been assigned to the {city} executive studio. You will receive contact shortly via your preferred channel ({contactMethod}).
            </p>

            <div className="pt-4 border-t border-white/10">
              <Link
                to="/vehicles"
                className="px-6 py-3 rounded-full uppercase tracking-technical font-bold bg-[#0055ff] text-white"
              >
                RETURN TO CATALOGUE
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-[#0f1014] hairline-border space-y-6 font-mono text-xs">
            
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-meta block mb-1.5">
                VEHICLE OF INTEREST *
              </label>
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full px-4 py-3 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
              >
                {VEHICLES_DATA.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.category} // Starting at ₹{(v.startingPrice / 100000).toFixed(1)} Lakh)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-meta block mb-1.5">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="LEGAL FULL NAME"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-meta block mb-1.5">
                  CITY / REGION *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-meta block mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="CORPORATE / PERSONAL EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-meta block mb-1.5">
                  MOBILE PHONE *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="CONTACT NUMBER"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-meta block mb-2">
                PREFERRED CONTACT CHANNEL
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['PHONE', 'WHATSAPP', 'EMAIL'] as const).map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setContactMethod(method)}
                    className={`py-2 px-4 uppercase tracking-technical text-center transition-colors ${
                      contactMethod === method
                        ? 'bg-[#0055ff] text-white font-bold'
                        : 'text-zinc-400 hover:text-white hairline-border'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-meta block mb-1.5">
                ENQUIRY DETAILS
              </label>
              <textarea
                rows={4}
                placeholder="PLEASE OUTLINE YOUR TECHNICAL REQUIREMENTS OR DELIVERY TIMELINE..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="consentEnquiry"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#0055ff]"
              />
              <label htmlFor="consentEnquiry" className="text-zinc-400 leading-relaxed cursor-pointer">
                I authorize Autobot Automotive to review this inquiry and reach out via encrypted communication channels.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="w-full py-4 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6] transition-colors"
            >
              {isSubmitting ? 'TRANSMITTING...' : 'SEND ENQUIRY'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
