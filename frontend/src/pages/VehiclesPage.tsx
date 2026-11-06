import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Check, 
  Car, 
  Zap, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { VehicleCard } from '../components/ui/VehicleCard';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { Vehicle } from '../types/vehicle';

export const VehiclesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFuelType, setSelectedFuelType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(30000000); // 3 Cr

  const categories = [
    'All',
    'Sedan',
    'SUV',
    'Electric SUV',
    'Electric Sedan',
    'Performance',
    'Luxury',
    'Compact SUV',
    'Hypercar'
  ];

  const fuelTypes = ['All', 'Pure Electric', 'Plug-in Hybrid', 'Twin-Turbo V8', 'Hydrogen-Electric'];

  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATA.filter((vehicle) => {
      // Search
      const matchesSearch = 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory = 
        selectedCategory === 'All' || vehicle.category.toLowerCase() === selectedCategory.toLowerCase();

      // Fuel Type
      const matchesFuel = 
        selectedFuelType === 'All' || vehicle.fuelType === selectedFuelType;

      // Price
      const matchesPrice = vehicle.startingPrice <= priceMax;

      return matchesSearch && matchesCategory && matchesFuel && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'performance') return a.acceleration0to100 - b.acceleration0to100;
      if (sortBy === 'power') return b.horsepower - a.horsepower;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, selectedFuelType, sortBy, priceMax]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFuelType('All');
    setSortBy('featured');
    setPriceMax(30000000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-zinc-900 pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Car className="w-3.5 h-3.5" />
                <span>The Full Portfolio</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                Autobot Vehicle Fleet
              </h1>
              <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
                Explore 15 state-of-the-art fictional models engineered for electric supremacy, track dominance, and sovereign luxury.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <span>Showing:</span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-bold">
                {filteredVehicles.length} of {VEHICLES_DATA.length} models
              </span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-panel p-5 rounded-2xl border border-zinc-800/80 mb-10 space-y-5">
          
          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by model, performance, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="featured">Featured / Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="performance">Fastest (0-100 km/h)</option>
                <option value="power">Highest Power (HP)</option>
              </select>
            </div>

            {/* Reset Button */}
            {(searchQuery || selectedCategory !== 'All' || selectedFuelType !== 'All' || sortBy !== 'featured') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

          </div>

          {/* Category Filter Pills */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-2">
              Body Style & Class
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-amber-400 text-black shadow-glow font-bold'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Type Pills */}
          <div className="pt-2 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mr-2">
                Powertrain:
              </span>
              {fuelTypes.map((fuel) => (
                <button
                  key={fuel}
                  onClick={() => setSelectedFuelType(fuel)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedFuelType === fuel
                      ? 'bg-zinc-800 text-amber-400 border border-amber-400/30'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {fuel}
                </button>
              ))}
            </div>

            {/* Quick Compare Shortcut */}
            <Link
              to="/compare"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Compare up to 3 models side-by-side →</span>
            </Link>
          </div>

        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-panel rounded-3xl border border-zinc-800">
            <Car className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-white mb-2">
              No Vehicles Match Your Selected Criteria
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Try adjusting your category, powertrain filters, or clearing the search keyword.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
