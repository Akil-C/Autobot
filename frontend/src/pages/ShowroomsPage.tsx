import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { SHOWROOMS_DATA } from '../data/vehiclesData';

export const ShowroomsPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai'];

  const filteredShowrooms = selectedCity === 'All'
    ? SHOWROOMS_DATA
    : SHOWROOMS_DATA.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] py-16 px-6 lg:px-12">
      <div className="max-w-[1520px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
              // PHYSICAL PRESENCE
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
              FIND YOUR AUTOBOT<span className="text-[#0055ff]">.</span>
            </h1>
          </div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-technical">
            ARCHITECTURAL SHOWROOM NETWORK
          </span>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12 font-mono text-xs">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 uppercase tracking-technical transition-colors ${
                selectedCity === city
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white hairline-border'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Showrooms Grid (Editorial Minimal, No Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredShowrooms.map((showroom, idx) => (
            <div key={showroom.id} className="bg-[#0f1014] p-8 hairline-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 pb-3 border-b border-white/5 mb-4">
                  <span className="uppercase text-[#0055ff]">STUDIO // 0{idx + 1}</span>
                  <span>{showroom.city.toUpperCase()}</span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-4">
                  {showroom.name}
                </h3>

                <div className="space-y-3 font-mono text-xs text-zinc-400 mb-6">
                  <div>
                    <span className="text-zinc-600 block text-[10px] uppercase">ADDRESS:</span>
                    <span className="text-zinc-300 leading-relaxed block">{showroom.address}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[10px] uppercase">COMMUNICATIONS:</span>
                    <span className="text-white block">{showroom.phone}</span>
                    <span className="text-zinc-400 block">{showroom.email}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[10px] uppercase">OPERATING HOURS:</span>
                    <span className="text-zinc-300 block">{showroom.operatingHours}</span>
                  </div>
                </div>

                <div className="py-3 border-t border-white/5 font-mono text-[11px] text-zinc-500">
                  <span className="text-zinc-600 uppercase block mb-1">AVAILABLE AMENITIES:</span>
                  <span>{showroom.amenities.join(' • ')}</span>
                </div>
              </div>

              {/* CTAs: GET DIRECTIONS, BOOK VISIT, ENQUIRE */}
              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2 font-mono text-xs">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(showroom.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full uppercase tracking-technical hairline-border text-zinc-300 hover:text-white"
                >
                  GET DIRECTIONS
                </a>
                <Link
                  to={`/test-drive?location=${encodeURIComponent(showroom.name)}`}
                  className="px-4 py-2 rounded-full uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6]"
                >
                  BOOK VISIT
                </Link>
                <Link
                  to="/enquiry"
                  className="px-4 py-2 rounded-full uppercase tracking-technical hairline-border text-zinc-400 hover:text-white"
                >
                  ENQUIRE
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
