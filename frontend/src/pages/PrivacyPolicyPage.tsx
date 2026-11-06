import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance & Data Protection</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Autobot Privacy Policy
          </h1>
          <p className="text-zinc-400 text-xs mt-2">
            Last Updated: January 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
            Important Notice: Vehicle quotations generated via the Autobot online platform are non-binding estimates and do not represent formal purchase agreements or binding credit contracts.
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              1. Introduction and Scope
            </h2>
            <p>
              Autobot Automotive Private Ltd. ("Autobot", "we", "us", or "our") is dedicated to protecting your privacy and treating all personal information with the utmost confidentiality. This Privacy Policy details the types of personal data we collect through our showroom platform, vehicle configurator, test-drive booking service, and customer enquiry systems, and outlines your statutory rights concerning that data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>Contact & Identity Data:</strong> Full legal name, email address, contact telephone number, residential city, and driver's license details for verified test drives.</li>
              <li><strong>Vehicle Configuration Data:</strong> Specific models, trim variants, paint shades, interior textiles, and accessories saved or generated as quotations.</li>
              <li><strong>Enquiry & Communication Records:</strong> Transcripts of communications, appointment notes, showroom location preferences, and customer service requests.</li>
              <li><strong>Technical & Telemetry Data:</strong> IP addresses, browser types, session cookies, and navigation pathways across the digital configurator.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              3. Purpose and Legal Basis for Processing
            </h2>
            <p>
              We process personal information exclusively for lawful business objectives, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Generating itemized vehicle quotation estimates and PDF documentation.</li>
              <li>Scheduling, confirming, and executing authorized test drives at selected experience centers.</li>
              <li>Responding to dealer inquiries and delivering personalized concierge ownership advice.</li>
              <li>Preventing malicious payloads, automated spam submissions, and unauthorized system access.</li>
              <li>Complying with applicable statutory automotive safety regulations and audit protocols.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              4. Data Retention and Security
            </h2>
            <p>
              All personal records are encrypted in transit via Transport Layer Security (TLS 1.3) and encrypted at rest using industry-standard AES-256 protocols. We retain test-drive and quotation records for up to 36 months following your last active interaction, after which records are anonymized or permanently deleted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              5. Customer Rights & Account Deletion
            </h2>
            <p>
              Subject to applicable jurisdictional data protection regulations, you possess the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Request full disclosure of all personal records held in our registry.</li>
              <li>Demand rectification of inaccurate contact or ownership records.</li>
              <li>Request permanent deletion of your profile and historical configurations.</li>
              <li>Revoke marketing or electronic communication consent at any time.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-zinc-800 pt-6">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              6. Privacy Contact and Inquiries
            </h2>
            <p>
              To exercise any statutory privacy rights, report security concerns, or submit questions regarding data handling, please direct formal communications to our designated privacy officer:
            </p>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
              <p><strong>Autobot Data Privacy Office</strong></p>
              <p>Autobot Automotive Private Ltd.</p>
              <p>Email: <a href="mailto:privacy@autobot.example" className="text-amber-400 underline">privacy@autobot.example</a></p>
              <p>Telephone: 1800-890-AUTO (Ext. 402)</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
