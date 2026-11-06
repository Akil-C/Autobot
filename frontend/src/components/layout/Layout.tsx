import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [cookieConsent, setCookieConsent] = useState<boolean>(() => {
    return localStorage.getItem('autobot_cookie_consent') === 'true';
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const acceptCookies = () => {
    localStorage.setItem('autobot_cookie_consent', 'true');
    setCookieConsent(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <Navbar />

      <main className="flex-grow pt-[72px]">
        <Outlet />
      </main>

      <Footer />

      {/* Cookie Consent Banner */}
      {!cookieConsent && (
        <aside
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 glass-panel p-5 rounded-2xl border border-zinc-700/60 shadow-2xl animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white mb-1">
                Autobot Intelligence & Cookie Preferences
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                We utilize encrypted session cookies and technical telemetry to deliver personalized vehicle configuration, preserve quotation integrity, and optimize luxury performance.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={acceptCookies}
                  className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition-colors shadow-glow"
                >
                  Accept Essential & Telemetry
                </button>
                <a
                  href="/cookie-policy"
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Preferences
                </a>
              </div>
            </div>
            <button
              onClick={() => setCookieConsent(true)}
              className="text-zinc-500 hover:text-zinc-300"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
