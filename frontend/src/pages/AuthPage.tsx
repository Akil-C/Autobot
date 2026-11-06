import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!username || !password || (!isLogin && !email)) {
      setErrorMsg('Please complete all required credentials.');
      return;
    }

    try {
      await login(username, selectedRole);
      setSuccessMsg(`Welcome to Autobot, ${username}! Redirecting...`);
      setTimeout(() => {
        if (selectedRole === 'ADMIN' || selectedRole === 'SUPER_ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/vehicles');
        }
      }, 900);
    } catch {
      setErrorMsg('Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=80"
          alt="Autobot Atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-black" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-glow">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-display font-black text-amber-400 text-xl">
                A
              </div>
            </div>
            <span className="font-display font-black text-2xl tracking-widest text-white">
              AUTOBOT
            </span>
          </Link>

          <h2 className="font-display text-2xl font-extrabold text-white">
            {isLogin ? 'Executive Client Sign In' : 'Create Autobot Account'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Access saved vehicle builds, manage test drives, and view official quotations.
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 shadow-2xl">
          
          {/* Role Mode Selector for quick dev / test inspection */}
          <div className="mb-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1 text-center">
              Select Session Profile Role
            </span>
            <div className="grid grid-cols-3 gap-1">
              {(['CUSTOMER', 'SALES_MANAGER', 'ADMIN'] as const).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    selectedRole === r
                      ? 'bg-amber-400 text-black shadow-glow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {r === 'SALES_MANAGER' ? 'Sales Rep' : r}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Username *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. akil_autobot"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>{isLogin ? 'Sign In to Profile' : 'Register Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Toggle Login / Register */}
          <div className="text-center pt-6 mt-6 border-t border-zinc-800">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-zinc-400 hover:text-amber-400 transition-colors"
            >
              {isLogin ? "Don't have an account yet? Create one →" : 'Already registered? Sign in here →'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
