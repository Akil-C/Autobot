import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Compass, 
  ArrowRight 
} from 'lucide-react';
import { SHOWROOMS_DATA } from '../data/vehiclesData';
import { Showroom } from '../types/vehicle';

export const ShowroomsPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai'];

  const filteredShowrooms = selectedCity === 'All' 
    ? SHOWROOMS_DATA 
    : SHOWROOMS_DATA.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Atelier Network</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Autobot Experience Showrooms
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
            Immerse yourself in our architectural flagship studios. Consult with bespoke vehicle customizers, inspect rare paint finishes, and depart on high-speed test drives.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-amber-400 text-black shadow-glow'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredShowrooms.map((showroom) => (
            <div 
              key={showroom.id} 
              className="glass-panel p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between hover:border-amber-400/40 transition-all shadow-xl"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  {showroom.city} Studio
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-4">
                  {showroom.name}
                </h3>

                <div className="space-y-3 text-xs text-zinc-300 mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-400 leading-relaxed">{showroom.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-zinc-300 font-semibold">{showroom.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-zinc-400">{showroom.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-zinc-400">{showroom.operatingHours}</span>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4 mb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Studio Amenities:
                  </h4>
                  <ul className="space-y-1.5">
                    {showroom.amenities.map((am, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{am}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/test-drive?location=${encodeURIComponent(showroom.name)}`}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors shadow-glow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Test Drive Here</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
