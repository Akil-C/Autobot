import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, CheckCircle2, ArrowRight, Shield, Clock } from 'lucide-react';
import { SPECIAL_OFFERS_DATA, VEHICLES_DATA } from '../data/vehiclesData';
import { CurrencyFormatter } from '../services/api';

export const OffersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Exclusive Incentives</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Autobot Privilege Programs
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
            Take advantage of seasonal manufacturing subsidies, preferential corporate leasing, and trade-in appreciation bonuses.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {SPECIAL_OFFERS_DATA.map((offer) => {
            const applicableVehicles = VEHICLES_DATA.filter((v) => 
              offer.applicableModels.includes(v.id) || offer.applicableModels.includes(v.slug)
            );

            return (
              <div 
                key={offer.id} 
                className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-400/40 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-400 text-black shadow-glow">
                      {offer.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Valid until {offer.validUntil}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-black text-white mb-3">
                    {offer.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
                    {offer.subtitle}
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                      Direct Incentive Benefit
                    </span>
                    <span className="font-display text-2xl font-black text-amber-400">
                      {offer.discountAmount ? CurrencyFormatter.formatINR(offer.discountAmount) : `${offer.discountPercentage}% Subsidized`}
                    </span>
                  </div>

                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Eligible Portfolio Models:
                  </h4>

                  <div className="space-y-2 mb-6">
                    {applicableVehicles.map((v) => (
                      <div key={v.id} className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-800/60">
                        <span className="text-white font-medium">{v.name}</span>
                        <Link 
                          to={`/configurator?model=${v.slug}`}
                          className="text-[11px] text-amber-400 font-semibold hover:underline"
                        >
                          Configure →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-zinc-400 mb-6 italic leading-relaxed">
                    *{offer.terms}
                  </p>

                  <Link
                    to="/enquiry"
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors shadow-glow"
                  >
                    <span>Claim Privilege Terms</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trade-in Valuation Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Concierge Exchange
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
              Upgrade Your Existing Luxury Automobile
            </h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Our appraisal team provides guaranteed transparent valuations at your doorstep. Transition your current vehicle directly into an Autobot electric or hybrid reservation.
            </p>
            <Link
              to="/enquiry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 transition-colors"
            >
              <span>Request Valuation Inspection</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
