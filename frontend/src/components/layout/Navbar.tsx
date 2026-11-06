import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'VEHICLES', path: '/vehicles' },
    { label: 'CONFIGURATOR', path: '/configurator' },
    { label: 'COMPARE', path: '/compare' },
    { label: 'SHOWROOMS', path: '/showrooms' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#090a0c]/90 backdrop-blur-md hairline-border-b">
      <div className="max-w-[1520px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
        
        {/* Brand Left: AUTOBOT. with blue signal period */}
        <Link to="/" className="flex items-center group focus:outline-none">
          <span className="font-display font-black text-xl tracking-tight text-white uppercase transition-colors">
            AUTOBOT<span className="text-[#0055ff]">.</span>
          </span>
        </Link>

        {/* Desktop Nav Right */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-[11px] uppercase tracking-technical font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-[#0055ff]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-4 w-px bg-white/10" />

          {/* Admin shortcut if logged in */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="font-mono text-[11px] text-zinc-400 hover:text-white uppercase tracking-technical"
            >
              [ADMIN]
            </Link>
          )}

          {/* User Profile */}
          {user ? (
            <button
              onClick={logout}
              className="font-mono text-[11px] text-zinc-400 hover:text-white uppercase tracking-technical"
              title="Logout"
            >
              {user.username} [LOGOUT]
            </button>
          ) : (
            <Link
              to="/auth"
              className="font-mono text-[11px] text-zinc-400 hover:text-white uppercase tracking-technical"
            >
              SIGN IN
            </Link>
          )}

          {/* Pill CTA: BOOK A TEST DRIVE */}
          <Link
            to="/test-drive"
            className="px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-technical font-semibold bg-white text-black hover:bg-[#0055ff] hover:text-white transition-all duration-200"
          >
            BOOK A TEST DRIVE
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/test-drive"
            className="px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-semibold bg-white text-black"
          >
            TEST DRIVE
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Fullscreen Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#090a0c] z-50 flex flex-col justify-between p-8 overflow-y-auto">
          <div className="space-y-6 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-meta text-zinc-500 block">
              // NAVIGATION DIRECTORY
            </span>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-baseline justify-between py-2 border-b border-white/5 group"
                >
                  <span className="font-display font-bold text-2xl text-white group-hover:text-[#0055ff] transition-colors">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-zinc-600">0{idx + 1}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <Link
              to="/test-drive"
              className="w-full py-4 rounded-full font-mono text-xs uppercase tracking-technical font-bold text-center block bg-[#0055ff] text-white"
            >
              BOOK A TEST DRIVE
            </Link>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-2">
              <span>AUTOBOT SYSTEMS</span>
              <Link to="/auth" className="text-zinc-300 hover:text-white">
                {user ? `SIGN OUT (${user.username})` : 'ACCOUNT ACCESS'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
