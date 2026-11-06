import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Shield, 
  CheckCircle2, 
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="glass-panel rounded-2xl p-8 mb-16 border border-zinc-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Stay Ahead of Velocity
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Receive the Autobot Intelligence Briefing
              </h3>
              <p className="text-zinc-400 text-sm mt-2 max-w-xl">
                Exclusive previews of limited-production releases, technological breakthroughs, and invitations to private track days.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Welcome to the Autobot Circle. Your priority subscription is active.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your executive email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-0.5">
                <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center font-display font-black text-amber-400">
                  A
                </div>
              </div>
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                AUTOBOT
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Autobot represents the zenith of modern automotive architecture. Handcrafted electric powertrains, neural driving intelligence, and peerless luxury.
            </p>
            <div className="flex items-center gap-3 text-zinc-400 text-xs">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Concierge: 1800-890-AUTO</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-xs mt-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Global HQ: Mumbai & Stuttgart</span>
            </div>
          </div>

          {/* Col 1: Vehicles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Vehicles
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/vehicles/autobot-aero-x" className="hover:text-amber-400 transition-colors">Aero X (Electric Sedan)</Link></li>
              <li><Link to="/vehicles/autobot-phantom-gt" className="hover:text-amber-400 transition-colors">Phantom GT (V8 Twin-Turbo)</Link></li>
              <li><Link to="/vehicles/autobot-apex-suv" className="hover:text-amber-400 transition-colors">Apex SUV (Luxury Electric)</Link></li>
              <li><Link to="/vehicles/autobot-cybertrack" className="hover:text-amber-400 transition-colors">CyberTrack (Hyper-SUV)</Link></li>
              <li><Link to="/vehicles/autobot-velocity" className="hover:text-amber-400 transition-colors">Velocity (Hypercar)</Link></li>
              <li><Link to="/vehicles" className="text-amber-400 font-semibold hover:underline">Explore All 15 Models →</Link></li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/configurator" className="hover:text-amber-400 transition-colors">Vehicle Configurator</Link></li>
              <li><Link to="/test-drive" className="hover:text-amber-400 transition-colors">Book a Test Drive</Link></li>
              <li><Link to="/enquiry" className="hover:text-amber-400 transition-colors">VIP Dealer Enquiry</Link></li>
              <li><Link to="/compare" className="hover:text-amber-400 transition-colors">Compare Models</Link></li>
              <li><Link to="/offers" className="hover:text-amber-400 transition-colors">Privilege Financing</Link></li>
              <li><Link to="/faq" className="hover:text-amber-400 transition-colors">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Autobot</Link></li>
              <li><Link to="/showrooms" className="hover:text-amber-400 transition-colors">Showrooms & Studios</Link></li>
              <li><Link to="/technology" className="hover:text-amber-400 transition-colors">Autobot ADAS & AI</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Global Contact</Link></li>
              <li><Link to="/admin/login" className="hover:text-amber-400 transition-colors text-zinc-500">Employee Portal</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-amber-400 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-amber-400 transition-colors">Automotive Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="border-t border-zinc-900 pt-8 pb-6">
          <div className="flex items-start gap-3 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/40 mb-8">
            <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              <strong className="text-zinc-300">Important Automotive Notice:</strong> Vehicle specifications, prices, features, images and availability displayed on this website are for informational purposes and may vary by variant, location, taxes, dealer charges and applicable offers. Online price calculations and quotations represent estimates and do not constitute a binding purchase contract. Final pricing and delivery schedules will be formally confirmed by an authorized Autobot representative.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span>Autobot Automotive Private Ltd. &copy; 2026. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-zinc-400">
              <Link to="/privacy-policy" className="hover:text-zinc-300">Privacy</Link>
              <Link to="/terms" className="hover:text-zinc-300">Terms</Link>
              <Link to="/cookie-policy" className="hover:text-zinc-300">Cookies</Link>
              <Link to="/disclaimer" className="hover:text-zinc-300">Disclaimer</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
