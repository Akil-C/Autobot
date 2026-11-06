import React from 'react';
import { Cookie, Check, Shield, AlertTriangle } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie Protocol</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Autobot Cookie Policy
          </h1>
          <p className="text-zinc-400 text-xs mt-2">
            Transparency regarding cookies, browser tokens, and telemetry analytics.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are compact text strings stored securely on your browser when visiting the Autobot website. They permit the platform to maintain your active vehicle configuration, preserve quotation drafts, and remember showroom location preferences without re-entering data on subsequent sessions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              2. Categories of Cookies Deployed
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Essential Cookies (Mandatory)</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Required for user authentication sessions, CSRF token security, vehicle configurator state persistence, and shopping basket calculation. Cannot be disabled without breaking core functionality.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Functional Cookies</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Store custom selections such as preferred showroom studio, chosen exterior paint finishes, and volume settings for interactive audio demonstrations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Telemetry & Performance Cookies</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Collect aggregated, non-identifying telemetry regarding 3D studio render framerates, page load latency, and interactive element responsiveness.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span>Marketing & Attribution Cookies</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Allow Autobot and authorized media partners to assess the efficacy of campaign sponsorships and priority invitation releases. Only activated with express user consent.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              3. Managing and Disabling Cookies
            </h2>
            <p>
              You maintain total control over your cookie configuration. Most modern browsers allow you to inspect, restrict, or purge stored cookies via your browser settings:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Chrome / Edge:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data.</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies.</li>
              <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-zinc-800 pt-6">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              4. Cookie Governance Contact
            </h2>
            <p>
              For inquiries regarding Autobot cookie governance, contact our digital operations team at <a href="mailto:privacy@autobot.example" className="text-amber-400 underline">privacy@autobot.example</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
