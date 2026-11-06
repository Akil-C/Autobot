import React from 'react';
import { AlertTriangle, ShieldCheck, FileCheck, CheckCircle } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Statutory Disclosure</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Automotive Disclaimer & Disclosures
          </h1>
          <p className="text-zinc-400 text-xs mt-2">
            Official statutory statement regarding online estimates and vehicle specifications.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          
          {/* Highlight Banner */}
          <div className="p-6 rounded-2xl bg-amber-400/10 border-2 border-amber-400/30 text-amber-300 text-sm font-semibold leading-relaxed">
            "Vehicle specifications, prices, features, images and availability displayed on this website are for informational purposes and may vary by variant, location, taxes, dealer charges and applicable offers. Final pricing and availability will be confirmed by an authorized Autobot representative."
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              1. Non-Contractual Nature of Online Quotations
            </h2>
            <p>
              The Autobot digital configurator allows prospective clients to explore personalized bespoke paint finishes, handcrafted interior upholstery, aerodynamic wheel geometries, and optional technical packages.
            </p>
            <p className="text-zinc-400">
              The calculations, summaries, and generated PDF quotations represent financial estimates based on prevailing ex-showroom benchmarks. They do not constitute an offer to sell, a sales contract, an invoice, or an approval of financing credit. Final purchase prices may vary based on local regional registration fees, municipality charges, state luxury tax brackets, transit insurance, and applicable seasonal dealer promotions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              2. Technical Specifications & Performance Figures
            </h2>
            <p>
              Performance metrics (such as 0–100 km/h acceleration, maximum horsepower, peak torque, and top speeds) are certified under controlled track testing conditions in accordance with international testing protocols. Real-world electric range (WLTP) and acceleration will naturally vary depending on:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Ambient temperature and extreme weather conditions.</li>
              <li>Passenger and payload weight configurations.</li>
              <li>Driving demeanor, acceleration frequency, and selected driving modes.</li>
              <li>Tire pressure, wheel diameters, and auxiliary air-conditioning utilization.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              3. Visual Renders & Color Accuracy
            </h2>
            <p>
              Vehicle imagery, 3D renderings, and paint finishes rendered across the online studio are computer-generated representations intended to reflect physical finishes as closely as possible. Due to differences in monitor calibration, ambient lighting, and screen display technology, physical vehicle paint finishes and leather grain textures should be inspected in person at an Autobot Experience Studio prior to final order confirmation.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-800 pt-6">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              4. Direct Inquiries
            </h2>
            <p>
              For further clarification on vehicle availability, delivery timelines, or technical specifications, please contact an authorized Autobot concierge representative at <a href="mailto:concierge@autobot.example" className="text-amber-400 underline">concierge@autobot.example</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
