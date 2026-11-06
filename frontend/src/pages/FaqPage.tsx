import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Car, 
  ArrowRight 
} from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    {
      category: 'Vehicle Ordering & Delivery',
      icon: Car,
      items: [
        {
          q: 'How does the Autobot online configuration and order process work?',
          a: 'You can configure your model with specific exterior paint, interior leathers, wheel packages, and optional tech suites. Once you submit a formal quotation, a dedicated personal client advisor verifies manufacturing slot availability, confirms local taxes and registration fees, and issues an official purchase agreement.'
        },
        {
          q: 'Are online quotations legally binding contracts?',
          a: 'Online quotations provide detailed financial estimates based on prevailing ex-showroom pricing, indicative GST, and standard accessories. A legally binding sale contract is executed only upon personal agreement with an authorized Autobot dealership representative and formal booking deposit.'
        },
        {
          q: 'What is the standard delivery timeline for bespoke configurations?',
          a: 'Standard inventory vehicles are delivered within 7 to 14 business days. Hand-crafted bespoke atelier builds (such as personalized interior stitching or custom matte finishes) typically require 6 to 10 weeks depending on specification.'
        }
      ]
    },
    {
      category: 'EV Charging & Battery Health',
      icon: Zap,
      items: [
        {
          q: 'How fast can an Autobot electric vehicle recharge at home vs on highways?',
          a: 'With our complimentary 22kW bidirectional Home Wallbox, a full 0-100% replenishment takes approximately 4.5 hours overnight. On high-speed 350kW DC FlashCharge stations along national expressways, our 800V architecture adds up to 400 km of range in just 15 minutes.'
        },
        {
          q: 'What is the warranty coverage on Autobot lithium battery packs?',
          a: 'Every Autobot electric vehicle includes an 8-Year / 160,000 km battery warranty guaranteeing minimum 80% state-of-health retention, accompanied by complimentary roadside recovery in case of unexpected battery depletion.'
        }
      ]
    },
    {
      category: 'Financing, Leases & Trade-Ins',
      icon: CreditCard,
      items: [
        {
          q: 'Does Autobot offer corporate leasing and subsidized APR financing?',
          a: 'Yes. Autobot Financial Services provides customized corporate tax-optimized operating leases, bespoke structured bullet-payment loans, and preferential financing rates starting at 3.99% APR with guaranteed 50% buy-back value after 36 months.'
        },
        {
          q: 'Can I trade in my current luxury vehicle?',
          a: 'Yes. Our concierge inspection team will conduct an on-site multi-point valuation of your existing luxury vehicle at your residence and apply the valuation directly as credit toward your Autobot reservation.'
        }
      ]
    },
    {
      category: 'Service & Warranty',
      icon: ShieldCheck,
      items: [
        {
          q: 'Where do I service my Autobot vehicle?',
          a: 'All maintenance can be scheduled at any of our flagship experience studios. Additionally, over 80% of routine diagnostic updates are delivered over-the-air, and routine inspections can be conducted via our Mobile Valet Service at your home or office.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Everything you need to know regarding vehicle reservation, electric charging infrastructure, financing terms, and warranty coverage.
          </p>
        </div>

        {/* Categories & Accordions */}
        <div className="space-y-12 mb-16">
          {categories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <div key={catIdx} className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
                  <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {cat.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.items.map((item, itemIdx) => {
                    const uniqueId = catIdx * 10 + itemIdx;
                    const isOpen = openIndex === uniqueId;

                    return (
                      <div
                        key={itemIdx}
                        className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : uniqueId)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                        >
                          <span className="text-sm font-bold text-white leading-snug">
                            {item.q}
                          </span>
                          <div className="p-1 rounded-full bg-zinc-800 text-zinc-400 flex-shrink-0">
                            {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/40">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 text-center">
          <h3 className="font-display text-xl font-bold text-white mb-2">
            Have a Specific Architectural or Engineering Question?
          </h3>
          <p className="text-xs text-zinc-400 mb-6 max-w-md mx-auto">
            Our technical support specialists and master customizers are available for one-on-one consultations.
          </p>
          <Link
            to="/enquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow-glow"
          >
            <span>Submit a Question to Concierge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
