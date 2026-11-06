import React from 'react';
import { Link } from 'react-router-dom';
import { SPECIAL_OFFERS_DATA } from '../data/vehiclesData';
import { CurrencyFormatter } from '../services/api';

export const OffersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] py-16 px-6 lg:px-12">
      <div className="max-w-[1520px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
              // FINANCIAL PRIVILEGES
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
              AUTOBOT OFFERS<span className="text-[#0055ff]">.</span>
            </h1>
          </div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-technical">
            CORPORATE & RETAIL ALLOCATIONS
          </span>
        </div>

        {/* Minimal Offers List (Hairline Separators, No Cards) */}
        <div className="space-y-8">
          {SPECIAL_OFFERS_DATA.map((offer, idx) => (
            <div key={offer.id} className="p-8 bg-[#0f1014] hairline-border flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              
              <div className="max-w-2xl font-mono">
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className="px-2.5 py-0.5 font-bold uppercase tracking-meta bg-[#0055ff] text-white">
                    {offer.badge}
                  </span>
                  <span className="text-zinc-500 uppercase tracking-technical">
                    VALID THROUGH: {offer.validUntil}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  {offer.title}
                </h3>

                <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-4">
                  {offer.subtitle}
                </p>

                <p className="text-[11px] text-zinc-500 italic">
                  *{offer.terms}
                </p>
              </div>

              <div className="flex flex-col lg:items-end justify-between font-mono">
                <div className="mb-4 lg:text-right">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-meta block">ESTIMATED BENEFIT</span>
                  <span className="font-display font-black text-2xl text-[#0055ff]">
                    {offer.discountAmount ? CurrencyFormatter.formatINR(offer.discountAmount) : `${offer.discountPercentage}% REDUCTION`}
                  </span>
                </div>

                <Link
                  to="/enquiry"
                  className="px-6 py-3 rounded-full uppercase tracking-technical font-bold text-xs bg-white text-black hover:bg-[#0055ff] hover:text-white transition-colors"
                >
                  CLAIM PRIVILEGE &rarr;
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
