import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Headphones, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';
import { SHOWROOMS_DATA } from '../data/vehiclesData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Private Client Sales');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 Concierge</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Connect With Autobot
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
            Whether inquiring about international delivery, fleet allocations, or personalized coachbuilding, our global concierge is standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left: Contact Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-5">
              <h3 className="font-display text-lg font-bold text-white pb-2 border-b border-zinc-800">
                Direct Communication Lines
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Toll-Free Concierge</span>
                    <strong className="text-white text-sm font-display">1800-890-AUTO (2886)</strong>
                    <span className="text-[10px] text-zinc-500 block">24 Hours / 7 Days a Week</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Executive Inquiries</span>
                    <strong className="text-white text-sm font-display">concierge@autobot.example</strong>
                    <span className="text-[10px] text-zinc-500 block">Encrypted PGPs Supported</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Emergency Roadside Assistance</span>
                    <strong className="text-white text-sm font-display">1800-999-HELP</strong>
                    <span className="text-[10px] text-zinc-500 block">GPS Telemetry Dispatch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Showrooms List */}
            <div className="glass-panel p-6 rounded-3xl border border-zinc-800">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-2 border-b border-zinc-800">
                Flagship Experience Studios
              </h3>
              <div className="space-y-3 text-xs">
                {SHOWROOMS_DATA.slice(0, 3).map((s) => (
                  <div key={s.id} className="pb-2 border-b border-zinc-900">
                    <span className="font-bold text-white block">{s.city} Atelier</span>
                    <span className="text-zinc-400 text-[11px] block">{s.address}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl">
              
              {sent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Message Dispatched</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Thank you, {name}. Your inquiry has been routed to the {department} division. Expect an executive response within four business hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-white"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Direct Executive Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Department
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Private Client Sales">Private Client Sales</option>
                        <option value="Corporate Fleet & Diplomatic">Corporate Fleet & Diplomatic</option>
                        <option value="Media & Press Relations">Media & Press Relations</option>
                        <option value="Customer Care & Warranty">Customer Care & Warranty</option>
                        <option value="Investor Relations">Investor Relations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please outline the nature of your query..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
