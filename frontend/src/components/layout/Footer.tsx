import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const links = [
    { label: 'VEHICLES', path: '/vehicles' },
    { label: 'CONFIGURATOR', path: '/configurator' },
    { label: 'COMPARE', path: '/compare' },
    { label: 'SHOWROOMS', path: '/showrooms' },
    { label: 'TEST DRIVE', path: '/test-drive' },
    { label: 'CONTACT', path: '/contact' },
    { label: 'PRIVACY', path: '/privacy-policy' },
    { label: 'TERMS', path: '/terms' },
    { label: 'COOKIES', path: '/cookie-policy' },
  ];

  return (
    <footer className="bg-[#090a0c] hairline-border-t relative overflow-hidden text-zinc-400 pt-16 pb-0">
      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pb-12 border-b border-white/5">
          <div>
            <h2 className="font-display font-black text-2xl tracking-tight text-white uppercase">
              AUTOBOT<span className="text-[#0055ff]">.</span>
            </h2>
            <p className="font-mono text-xs text-zinc-400 tracking-technical uppercase mt-1">
              ENGINEERED FOR WHAT'S NEXT.
            </p>
          </div>

          <div className="font-mono text-[11px] text-zinc-400 tracking-technical uppercase">
            AUTOMOTIVE DIVISION / 2026 ARCHITECTURE
          </div>
        </div>

        {/* Links Row */}
        <div className="py-10 flex flex-wrap gap-x-8 gap-y-4 items-center justify-between border-b border-white/5">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-mono text-xs uppercase tracking-technical text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="font-mono text-[11px] text-zinc-400 tracking-technical">
            CONCIERGE: 1800-890-AUTO
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <p className="max-w-3xl leading-relaxed">
            *Vehicle specifications, pricing estimates, performance telemetry and finishes shown are for informational demonstration. Official on-road contracts executed exclusively via authorized Autobot technical studios.
          </p>
          <span className="whitespace-nowrap">
            &copy; 2026 AUTOBOT AUTOMOTIVE.
          </span>
        </div>

      </div>

      {/* Huge Cropped Wordmark at Bottom Mirroring Hero */}
      <div className="w-full overflow-hidden select-none pointer-events-none opacity-[0.04] leading-none text-center">
        <span className="font-display font-black text-[18vw] text-white tracking-poster block -mb-[5vw]">
          AUTOBOT
        </span>
      </div>
    </footer>
  );
};
