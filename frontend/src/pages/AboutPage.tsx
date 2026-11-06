import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Globe, 
  Award, 
  Leaf, 
  Users, 
  ArrowRight 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Heritage of Innovation</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            Engineering the Next Epoch of Mobility
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Founded on the relentless pursuit of zero-emission performance, Autobot converges aerospace precision with master coachbuilding to create vehicles that inspire the soul.
          </p>
        </div>

        {/* Hero Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="md:col-span-2 aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80"
              alt="Autobot design center"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[16/9] md:aspect-auto rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
              alt="Autobot test track"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-panel p-8 rounded-3xl border border-zinc-800">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">Neural Architecture</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every Autobot vehicle is built around an integrated computing backbone running proprietary real-time neural operating kernels. ADAS, thermal battery management, and chassis dynamics evolve continuously via encrypted satellite OTA upgrades.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-zinc-800">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">Coachbuilt Luxury</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We uphold the time-honored traditions of bespoke European and Indian coachcraft. From sustainable open-pore walnut veneers to ethically sourced bio-leather trims, every seam is inspected by master artisans.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-zinc-800">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">Net Zero Circularity</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Our gigafactories operate entirely on closed-loop renewable hydroelectric and solar grids. We mandate 100% recycling of battery rare earths and utilize lightweight composite monocoques manufactured with low-carbon hydro aluminum.
            </p>
          </div>
        </div>

        {/* Leadership & Global Footprint */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Global Headquarters
            </span>
            <h3 className="font-display text-3xl font-black text-white">
              Bespoke Studios Across Continents
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              Engineering centers in Stuttgart, aerodynamic wind tunnels in Silverstone, and primary luxury experience studios across Mumbai, Delhi, Bengaluru, Hyderabad, and Chennai.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="font-display text-3xl font-black text-amber-400 block">15</span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Proprietary Models</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="font-display text-3xl font-black text-white block">350 kW</span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Fast Charge Rate</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="font-display text-3xl font-black text-amber-400 block">100%</span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Renewable Plants</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="font-display text-3xl font-black text-white block">24/7</span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">White-Glove Support</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow-glow"
          >
            <span>Explore the Autobot Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
