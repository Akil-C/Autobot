import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Gauge, Compass, Shield, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { CurrencyFormatter } from '../../services/api';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="group relative bg-zinc-900/60 rounded-2xl border border-zinc-800/80 hover:border-amber-400/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1">
      
      {/* Top Media & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
        <img
          src={vehicle.heroImage}
          alt={vehicle.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-zinc-800">
            {vehicle.category}
          </span>
          {vehicle.status === 'New Launch' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-black">
              New Launch
            </span>
          )}
          {vehicle.status === 'Limited Edition' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-black">
              Limited
            </span>
          )}
        </div>

        {/* 0-100 pill */}
        <div className="absolute bottom-3 right-3 bg-zinc-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-zinc-800 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-bold text-white">
            0-100: {vehicle.acceleration0to100}s
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              {vehicle.name}
            </h3>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
              {vehicle.fuelType}
            </span>
          </div>
          
          <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
            {vehicle.tagline}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 mb-5 text-center">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Power</span>
              <span className="text-xs font-bold text-zinc-200">{vehicle.horsepower} HP</span>
            </div>
            <div className="border-x border-zinc-800">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Range/Mileage</span>
              <span className="text-xs font-bold text-zinc-200 truncate block px-1">{vehicle.rangeOrMileage.split(' ')[0]} {vehicle.rangeOrMileage.includes('km') ? 'km' : ''}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Top Speed</span>
              <span className="text-xs font-bold text-zinc-200">{vehicle.topSpeedKmh} km/h</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Starting From</span>
              <span className="font-display text-lg font-extrabold text-amber-400">
                {CurrencyFormatter.formatINR(vehicle.startingPrice)}
              </span>
            </div>
            <span className="text-[10px] text-zinc-400">*Ex-showroom</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Link
              to={`/vehicles/${vehicle.slug}`}
              className="py-2.5 px-2 rounded-xl text-xs font-bold text-center bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 transition-colors flex items-center justify-center gap-1"
            >
              Explore
            </Link>
            <Link
              to={`/configurator?model=${vehicle.slug}`}
              className="py-2.5 px-2 rounded-xl text-xs font-bold text-center bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-400 transition-colors flex items-center justify-center gap-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              Configure
            </Link>
            <Link
              to={`/configurator?model=${vehicle.slug}&step=quote`}
              className="py-2.5 px-2 rounded-xl text-xs font-bold text-center bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 transition-colors flex items-center justify-center gap-1"
            >
              Quote
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
