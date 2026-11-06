import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sliders, 
  ShieldCheck, 
  Compass, 
  Tag, 
  Cpu, 
  Info, 
  MapPin, 
  PhoneCall, 
  User as UserIcon,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Vehicles', path: '/vehicles', icon: Sliders },
    { label: 'Compare', path: '/compare', icon: Compass },
    { label: 'Offers', path: '/offers', icon: Tag },
    { label: 'Technology', path: '/technology', icon: Cpu },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Showrooms', path: '/showrooms', icon: MapPin },
    { label: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/60 shadow-2xl py-3.5' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <span className="font-display font-black text-xl text-amber-400 tracking-wider">A</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-widest text-white group-hover:text-amber-400 transition-colors">
                AUTOBOT
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 -mt-1 font-semibold">
                Intelligence In Motion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full pl-3 pr-1 py-1">
                <span className="text-xs font-medium text-zinc-200 truncate max-w-[100px]">
                  {user.fullName}
                </span>
                <button
                  onClick={logout}
                  title="Logout"
                  className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition-colors"
                title="Sign in / Register"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}

            <Link
              to="/test-drive"
              className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:shadow-glow transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Book Test Drive
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/test-drive"
              className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-black md:hidden"
            >
              Drive
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 shadow-2xl p-6 transition-all duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                      : 'text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-400" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </Link>
              );
            })}

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}

              {user ? (
                <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                  <span className="text-sm font-semibold text-zinc-200">{user.fullName} ({user.role})</span>
                  <button
                    onClick={logout}
                    className="text-xs text-red-400 hover:underline flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800"
                >
                  <UserIcon className="w-4 h-4" />
                  Sign In / Register
                </Link>
              )}

              <Link
                to="/test-drive"
                className="w-full py-3 rounded-xl text-center text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-glow"
              >
                Book a Test Drive
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
