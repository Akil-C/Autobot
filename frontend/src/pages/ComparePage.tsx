import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, ArrowRight } from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { Vehicle } from '../types/vehicle';
import { CurrencyFormatter } from '../services/api';

export const ComparePage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'autobot-aero-x',
    'autobot-phantom-gt',
    'autobot-apex-suv'
  ]);

  const vehicles = selectedIds
    .map((id) => VEHICLES_DATA.find((v) => v.id === id))
    .filter(Boolean) as Vehicle[];

  const handleAddVehicle = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveVehicle = (id: string) => {
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  const availableToAdd = VEHICLES_DATA.filter((v) => !selectedIds.includes(v.id));

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] py-16 px-6 lg:px-12">
      <div className="max-w-[1520px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
              // TELEMETRY COMPARISON
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
              COMPARE VEHICLES<span className="text-[#0055ff]">.</span>
            </h1>
          </div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-technical">
            COMPARING {vehicles.length} OF 3 MAXIMUM SLOTS
          </span>
        </div>

        {/* Selected Vehicle Headers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((slotIdx) => {
            const v = vehicles[slotIdx];
            if (v) {
              return (
                <div key={v.id} className="bg-[#0f1014] p-6 hairline-border relative flex flex-col justify-between">
                  <button
                    onClick={() => handleRemoveVehicle(v.id)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <img
                      src={v.heroImage}
                      alt={v.name}
                      className="w-full h-36 object-cover bg-black mb-4"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-meta text-[#0055ff] block mb-1">
                      {v.category}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{v.name}</h3>
                    <span className="font-mono text-sm font-bold text-white block mb-4">
                      {CurrencyFormatter.formatINR(v.startingPrice)}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-white/5 font-mono text-xs">
                    <Link
                      to={`/configurator?model=${v.slug}`}
                      className="flex-1 py-2 rounded-full font-bold uppercase text-center bg-[#0055ff] text-white hover:bg-[#0047d6]"
                    >
                      CONFIGURE
                    </Link>
                    <Link
                      to={`/vehicles/${v.slug}`}
                      className="py-2 px-4 rounded-full uppercase hairline-border text-zinc-300 hover:text-white"
                    >
                      DOSSIER
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div key={slotIdx} className="bg-[#0f1014] p-8 border border-dashed border-white/10 flex flex-col items-center justify-center text-center min-h-[260px] font-mono text-xs">
                <Plus className="w-6 h-6 text-zinc-600 mb-2" />
                <span className="text-zinc-400 block mb-3 uppercase tracking-meta">SLOT 0{slotIdx + 1} EMPTY</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) handleAddVehicle(e.target.value);
                  }}
                  defaultValue=""
                  className="w-full px-3 py-2 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
                >
                  <option value="" disabled>SELECT MODEL TO ADD...</option>
                  {availableToAdd.map((av) => (
                    <option key={av.id} value={av.id}>{av.name} ({av.category})</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        {vehicles.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta w-1/4">BASE PRICE</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-[#0055ff] font-bold text-sm">
                      {CurrencyFormatter.formatINR(v.startingPrice)}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">POWERTRAIN</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-white font-semibold">{v.fuelType}</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">0–100 KM/H ACCELERATION</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-white font-bold">{v.acceleration0to100} SECONDS</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">HORSEPOWER</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-white font-bold">{v.horsepower} HP</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">PEAK TORQUE</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-white font-bold">{v.torqueNm} NM</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">TOP SPEED</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-white">{v.topSpeedKmh} KM/H</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">RANGE / EFFICIENCY</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-white">{v.rangeOrMileage}</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">DIMENSIONS (L x W x H)</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-zinc-300">
                      {v.dimensions.lengthMm} x {v.dimensions.widthMm} x {v.dimensions.heightMm} MM
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">WHEELBASE</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-zinc-300">{v.dimensions.wheelbaseMm} MM</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">SEATING CAPACITY</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-white">{v.seatingCapacity} OCCUPANTS</td>
                  ))}
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta">SAFETY STANDARD</td>
                  {vehicles.map((v) => (
                    <td key={v.id} className="py-4 text-[#0055ff] font-bold">5 STARS / GLOBAL STANDARD</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
