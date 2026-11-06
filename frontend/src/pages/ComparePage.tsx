import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Plus, 
  X, 
  Sliders, 
  Check, 
  Minus, 
  Zap, 
  Gauge, 
  ShieldCheck, 
  Scale 
} from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { Vehicle } from '../types/vehicle';
import { CurrencyFormatter } from '../services/api';

export const ComparePage: React.FC = () => {
  // Default 3 compared vehicles
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Analysis</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Compare Autobot Vehicles
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
            Evaluate engineering benchmarks, powertrains, acceleration, dimensions, and specifications side-by-side (up to 3 models).
          </p>
        </div>

        {/* Vehicle Selector Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((slotIndex) => {
            const vehicle = vehicles[slotIndex];

            if (vehicle) {
              return (
                <div key={vehicle.id} className="glass-panel p-5 rounded-2xl border border-zinc-800 relative flex flex-col justify-between">
                  <button
                    onClick={() => handleRemoveVehicle(vehicle.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <img
                      src={vehicle.heroImage}
                      alt={vehicle.name}
                      className="w-full h-36 object-cover rounded-xl bg-zinc-900 mb-4"
                    />
                    <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                      {vehicle.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1 mb-3">
                      {vehicle.tagline}
                    </p>
                    <span className="font-display text-lg font-black text-amber-400 block">
                      {CurrencyFormatter.formatINR(vehicle.startingPrice)}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex gap-2">
                    <Link
                      to={`/configurator?model=${vehicle.slug}`}
                      className="flex-1 py-2 text-center text-xs font-bold uppercase rounded-lg bg-amber-400 text-black hover:bg-amber-300"
                    >
                      Configure
                    </Link>
                    <Link
                      to={`/vehicles/${vehicle.slug}`}
                      className="py-2 px-3 text-center text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div key={slotIndex} className="glass-panel p-8 rounded-2xl border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center min-h-[300px]">
                <Plus className="w-8 h-8 text-zinc-600 mb-3" />
                <h4 className="text-sm font-bold text-zinc-300 mb-2">Add Vehicle to Compare</h4>
                <p className="text-xs text-zinc-500 mb-4 max-w-xs">
                  Select another vehicle from the Autobot portfolio.
                </p>

                <select
                  onChange={(e) => {
                    if (e.target.value) handleAddVehicle(e.target.value);
                  }}
                  defaultValue=""
                  className="w-full max-w-xs px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="" disabled>Select vehicle...</option>
                  {availableToAdd.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.category})
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Matrix Table */}
        {vehicles.length > 0 && (
          <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl mb-16">
            
            <div className="p-6 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">
                Technical Comparison Matrix
              </h3>
              <span className="text-xs text-zinc-400">Comparing {vehicles.length} vehicle models</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  
                  {/* Category Header */}
                  <tr className="bg-zinc-900/80">
                    <td colSpan={vehicles.length + 1} className="py-3 px-6 font-bold uppercase tracking-wider text-amber-400 text-[11px]">
                      Core Performance & Powertrain
                    </td>
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold w-1/4">Starting Price</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 font-bold text-amber-400 text-sm">
                        {CurrencyFormatter.formatINR(v.startingPrice)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Fuel / Energy Type</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-white font-medium">{v.fuelType}</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Acceleration (0-100 km/h)</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 font-bold text-emerald-400">{v.acceleration0to100} seconds</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">System Horsepower</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 font-bold text-white">{v.horsepower} HP</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Peak Torque</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-white">{v.torqueNm} Nm</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Top Speed</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-white">{v.topSpeedKmh} km/h</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Range / Fuel Efficiency</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-white font-bold">{v.rangeOrMileage}</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Transmission</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-zinc-300">{v.transmission}</td>
                    ))}
                  </tr>

                  {/* Dimensions & Capacity */}
                  <tr className="bg-zinc-900/80">
                    <td colSpan={vehicles.length + 1} className="py-3 px-6 font-bold uppercase tracking-wider text-amber-400 text-[11px]">
                      Dimensions & Seating
                    </td>
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Seating Capacity</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-white font-semibold">{v.seatingCapacity} Passengers</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Length x Width x Height</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-zinc-300">
                        {v.dimensions.lengthMm} x {v.dimensions.widthMm} x {v.dimensions.heightMm} mm
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Wheelbase</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-zinc-300">{v.dimensions.wheelbaseMm} mm</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Curb Weight</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-zinc-300">{v.dimensions.curbWeightKg} kg</td>
                    ))}
                  </tr>

                  <tr className="border-b border-zinc-900 hover:bg-zinc-900/30">
                    <td className="py-3 px-6 text-zinc-400 font-semibold">Safety Rating</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-3 px-6 text-amber-400 font-bold">
                        {'★'.repeat(v.safetyRatingStars)} (5 Stars)
                      </td>
                    ))}
                  </tr>

                  {/* Highlights */}
                  <tr className="bg-zinc-900/80">
                    <td colSpan={vehicles.length + 1} className="py-3 px-6 font-bold uppercase tracking-wider text-amber-400 text-[11px]">
                      Key Standard Highlights
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30">
                    <td className="py-4 px-6 text-zinc-400 font-semibold align-top">Core Technologies</td>
                    {vehicles.map((v) => (
                      <td key={v.id} className="py-4 px-6 align-top">
                        <ul className="space-y-1.5">
                          {v.keyFeatures.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-zinc-300 text-[11px]">
                              <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
