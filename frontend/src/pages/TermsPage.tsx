import React from 'react';
import { FileText, Shield, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Terms & Conditions of Service
          </h1>
          <p className="text-zinc-400 text-xs mt-2">
            Governing the use of Autobot online services, vehicle configurators, quotations, and showrooms.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing any feature of the Autobot digital platform (including the online configurator, quotation generator, test-drive booking module, and user account portals), you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              2. Vehicle Specifications and Pricing Disclaimers
            </h2>
            <p>
              All prices, equipment levels, battery capacities, top speeds, acceleration metrics, range calculations, and exterior finishes displayed across this platform are provided for informational and illustrative purposes only.
            </p>
            <p className="text-zinc-400">
              Online quotations generated through the configurator represent non-contractual price estimates. Ex-showroom values, registration fees, state luxury road taxes, insurance premiums, and green cess tariffs are finalized only upon official confirmation with an authorized Autobot dealer representative.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              3. Test Drive Eligibility and Protocol
            </h2>
            <p>
              Submission of a test-drive reservation does not guarantee slot availability. Autobot reserves the right to verify driving credentials, require execution of a standard indemnity waiver, and reject test-drive bookings if valid legal licensure is not presented prior to departure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              4. Intellectual Property Rights
            </h2>
            <p>
              All trademarks, vehicle model names (including Autobot Aero X, Phantom GT, Apex SUV, CyberTrack, Velocity, Solstice, and Hyperion), visual iconography, 3D renderings, and software scripts are the exclusive intellectual property of Autobot Automotive Private Ltd. Unauthorized scraping, reproduction, reverse engineering, or commercial redistribution is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall Autobot, its officers, directors, or authorized dealer partners be liable for any indirect, incidental, or consequential damages resulting from technical downtime, network latency, or reliance on preliminary online price estimations.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-800 pt-6">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              6. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable commercial laws. Inquiries regarding legal terms may be sent to <a href="mailto:legal@autobot.example" className="text-amber-400 underline">legal@autobot.example</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
