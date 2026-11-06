import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, X, RefreshCw } from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { CurrencyFormatter } from '../services/api';

export const VehiclesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = [
    'All',
    'Sedan',
    'SUV',
    'Electric SUV',
    'Electric Sedan',
    'Performance',
    'Luxury',
    'Compact SUV'
  ];

  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter((vehicle) => {
      const matchesSearch = 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.fuelType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = 
        selectedCategory === 'All' || vehicle.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'power') return b.horsepower - a.horsepower;
      if (sortBy === 'acceleration') return a.acceleration0to100 - b.acceleration0to100;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] py-16 px-6 lg:px-12">
      <div className="max-w-[1520px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
              // PRODUCTION CATALOGUE
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
              VEHICLE SYSTEMS
            </h1>
          </div>

          <div className="font-mono text-xs text-zinc-500 uppercase tracking-technical">
            SHOWING {filteredVehicles.length} OF {VEHICLES_DATA.length} MODELS REGISTERED
          </div>
        </div>

        {/* Technical Filter Bar (Hairline, Minimal, No Generic Cards) */}
        <div className="py-6 border-b border-white/10 mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 font-mono text-xs">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 mr-2 uppercase tracking-meta">CLASS:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 uppercase tracking-technical transition-colors ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white hairline-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <input
                type="text"
                placeholder="SEARCH ARCHIVE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 bg-transparent hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-[#090a0c] hairline-border text-zinc-300 focus:outline-none focus:border-[#0055ff] cursor-pointer"
            >
              <option value="featured">SORT: FEATURED</option>
              <option value="price-asc">PRICE: ASCENDING</option>
              <option value="price-desc">PRICE: DESCENDING</option>
              <option value="power">POWER: HIGHEST</option>
              <option value="acceleration">0-100: FASTEST</option>
            </select>
          </div>

        </div>

        {/* Editorial Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredVehicles.map((machine, index) => (
            <div key={machine.id} className="group flex flex-col justify-between">
              
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1014] hairline-border mb-6">
                  <img
                    src={machine.heroImage}
                    alt={machine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 font-mono text-[10px] text-zinc-300 bg-black/80 px-2 py-0.5 tracking-technical">
                    0{index + 1}
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#0055ff] transition-colors">
                    {machine.name}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-meta text-zinc-500">
                    {machine.category}
                  </span>
                </div>

                <p className="font-sans text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                  {machine.tagline}
                </p>

                {/* Technical Specs List */}
                <div className="space-y-2 py-3 border-y border-white/5 font-mono text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">STARTING PRICE</span>
                    <span className="text-white font-semibold">
                      {CurrencyFormatter.formatINR(machine.startingPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">OUTPUT / TORQUE</span>
                    <span className="text-white">{machine.horsepower} HP // {machine.torqueNm} NM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">0–100 KM/H</span>
                    <span className="text-[#0055ff] font-bold">{machine.acceleration0to100} SEC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">RANGE / MILEAGE</span>
                    <span className="text-white">{machine.rangeOrMileage}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  to={`/vehicles/${machine.slug}`}
                  className="font-mono text-xs uppercase tracking-technical font-semibold text-white hover:text-[#0055ff] flex items-center gap-1.5 transition-colors"
                >
                  <span>VIEW MODEL</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0055ff]" />
                </Link>

                <div className="h-3 w-px bg-white/10" />

                <Link
                  to={`/configurator?model=${machine.slug}`}
                  className="font-mono text-xs uppercase tracking-technical text-zinc-400 hover:text-white transition-colors"
                >
                  CONFIGURE
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
