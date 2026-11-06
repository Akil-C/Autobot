import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MessageCircle, 
  Car 
} from 'lucide-react';
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
  const [preferredVariant, setPreferredVariant] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'EMAIL' | 'PHONE' | 'WHATSAPP'>('PHONE');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedVehicle = VEHICLES_DATA.find((v) => v.id === vehicleId) || VEHICLES_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !consentGiven) return;

    setIsSubmitting(true);

    await EnquiryService.submitEnquiry({
      fullName,
      email,
      phone,
      city,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      preferredVariant: preferredVariant || selectedVehicle.variants[0].name,
      preferredContactMethod,
      message
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>VIP Concierge</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Autobot Vehicle Enquiry
          </h1>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            Submit a bespoke enquiry regarding vehicle availability, corporate allocation, customized paint requests, or trade-ins.
          </p>
        </div>

        {isSubmitted ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                Enquiry Transmitted Securely
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Thank you. An Autobot representative will contact you shortly.
              </h2>
              <p className="text-zinc-400 text-sm mt-3 max-w-md mx-auto">
                We have assigned your enquiry regarding the <strong className="text-amber-400">{selectedVehicle.name}</strong> to a senior client advisor at the {city} flagship studio.
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Link
                to="/vehicles"
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700"
              >
                Browse Fleet
              </Link>
              <Link
                to={`/configurator?model=${selectedVehicle.slug}`}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 shadow-glow"
              >
                Configure Vehicle
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Vehicle Selection */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Vehicle of Interest *
                </label>
                <select
                  value={vehicleId}
                  onChange={(e) => {
                    setVehicleId(e.target.value);
                    setPreferredVariant('');
                  }}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {VEHICLES_DATA.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.category} — Starting at ₹{(v.startingPrice / 100000).toFixed(1)} Lakh)
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Variant & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Preferred Variant (Optional)
                  </label>
                  <select
                    value={preferredVariant}
                    onChange={(e) => setPreferredVariant(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">Any / Advise Me</option>
                    {selectedVehicle.variants.map((v) => (
                      <option key={v.id} value={v.name}>{v.name} ({v.badge})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Your City / Region *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Chandigarh">Chandigarh</option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Singhania"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Corporate / Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Preferred Contact Channel
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'PHONE', label: 'Telephone', icon: Phone },
                    { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageCircle },
                    { id: 'EMAIL', label: 'Email', icon: Mail }
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = preferredContactMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPreferredContactMethod(method.id as 'PHONE' | 'WHATSAPP' | 'EMAIL')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-glow'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Detailed Enquiry or Requirement
                </label>
                <textarea
                  rows={4}
                  placeholder="Specify delivery timeline expectations, trade-in details, fleet purchases, or bespoke color customizations..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="w-4 h-4 rounded mt-0.5 bg-zinc-900 border-zinc-800 text-amber-400 focus:ring-amber-400"
                />
                <label htmlFor="consent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                  I authorize Autobot Automotive Private Ltd. to contact me regarding this enquiry via telephone, email, or encrypted messaging. I have read and agree to the <Link to="/privacy-policy" className="text-amber-400 underline">Privacy Policy</Link>.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !consentGiven}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest shadow-glow hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Submit Priority Enquiry'}</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
