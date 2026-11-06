import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Gauge, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Sparkles, 
  Check, 
  ChevronRight,
  Info
} from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { Vehicle, VehicleColor } from '../types/vehicle';
import { CurrencyFormatter } from '../services/api';
import { InteractiveVehicleViewer } from '../components/ui/InteractiveVehicleViewer';

export const VehicleDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const vehicle = VEHICLES_DATA.find((v) => v.slug === slug || v.id === slug);
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(() => {
    return vehicle ? vehicle.colors[0] : ({} as VehicleColor);
  });
  const [selectedTab, setSelectedTab] = useState<'specs' | 'features' | 'variants'>('specs');

  useEffect(() => {
    if (vehicle && vehicle.colors.length > 0) {
      setSelectedColor(vehicle.colors[0]);
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
        <h2 className="text-2xl font-bold text-white mb-4">Vehicle Not Found</h2>
        <p className="text-zinc-400 mb-6">The requested model does not exist in the Autobot registry.</p>
        <Link
          to="/vehicles"
          className="px-6 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider"
        >
          Return to Showroom
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to fleet</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Link to="/vehicles" className="hover:text-zinc-300">Vehicles</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">{vehicle.name}</span>
          </div>
        </div>
      </div>

      {/* Main Hero Visualizer Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <InteractiveVehicleViewer
          vehicle={vehicle}
          selectedColor={selectedColor}
          onColorChange={(c) => setSelectedColor(c)}
        />
      </section>

      {/* Vehicle Heading & Primary Action Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {vehicle.category}
                </span>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {vehicle.fuelType}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                {vehicle.name}
              </h1>
              <p className="text-base text-zinc-400 mt-2 max-w-2xl">
                {vehicle.tagline}
              </p>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-col sm:items-end border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 lg:pt-0 lg:pl-8">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Starting Price
              </span>
              <span className="font-display text-3xl sm:text-4xl font-black text-amber-400 mb-1">
                {CurrencyFormatter.formatINR(vehicle.startingPrice)}
              </span>
              <span className="text-[11px] text-zinc-500 mb-6">
                *Ex-showroom estimate (excl. regional registration)
              </span>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={`/configurator?model=${vehicle.slug}`}
                  className="px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:shadow-glow transition-all flex items-center gap-1.5"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Configure Now</span>
                </Link>

                <Link
                  to={`/configurator?model=${vehicle.slug}&step=quote`}
                  className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Get Quote</span>
                </Link>

                <Link
                  to={`/test-drive?model=${vehicle.slug}`}
                  className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <span>Test Drive</span>
                </Link>

                <Link
                  to={`/enquiry?model=${vehicle.slug}`}
                  className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-all flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-zinc-400" />
                  <span>Enquire</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Key Performance Metrics Counter Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-zinc-800/80 text-center">
            <Gauge className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <span className="font-display text-3xl sm:text-4xl font-black text-white block">
              {vehicle.acceleration0to100}s
            </span>
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              0–100 km/h Sprint
            </span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-zinc-800/80 text-center">
            <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <span className="font-display text-3xl sm:text-4xl font-black text-white block">
              {vehicle.horsepower} HP
            </span>
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Peak System Output
            </span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-zinc-800/80 text-center">
            <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <span className="font-display text-3xl sm:text-4xl font-black text-white block">
              {vehicle.torqueNm} Nm
            </span>
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Instantaneous Torque
            </span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-zinc-800/80 text-center">
            <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <span className="font-display text-3xl sm:text-4xl font-black text-white block">
              {vehicle.rangeOrMileage.split(' ')[0]}
            </span>
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              {vehicle.fuelType === 'Pure Electric' ? 'WLTP Range (km)' : 'Efficiency (L/100km)'}
            </span>
          </div>
        </div>
      </section>

      {/* Tabs: Specs, Features, Variants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex border-b border-zinc-800 mb-8 gap-8">
          <button
            onClick={() => setSelectedTab('specs')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
              selectedTab === 'specs' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Technical Specifications
            {selectedTab === 'specs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-glow" />
            )}
          </button>

          <button
            onClick={() => setSelectedTab('features')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
              selectedTab === 'features' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Key Innovations & Features
            {selectedTab === 'features' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-glow" />
            )}
          </button>

          <button
            onClick={() => setSelectedTab('variants')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
              selectedTab === 'variants' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Trim Variants ({vehicle.variants.length})
            {selectedTab === 'variants' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-glow" />
            )}
          </button>
        </div>

        {/* Tab 1: Detailed Specifications */}
        {selectedTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicle.detailedSpecifications.map((category, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-zinc-800">
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-2 border-b border-zinc-800">
                  {category.category}
                </h4>
                <div className="space-y-3">
                  {category.specs.map((item, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-baseline text-xs">
                      <span className="text-zinc-400">{item.label}</span>
                      <span className="text-white font-semibold text-right max-w-[55%]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Dimensions Card */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-2 border-b border-zinc-800">
                Chassis Dimensions
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Length</span>
                  <span className="text-white font-semibold">{vehicle.dimensions.lengthMm} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Width</span>
                  <span className="text-white font-semibold">{vehicle.dimensions.widthMm} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Height</span>
                  <span className="text-white font-semibold">{vehicle.dimensions.heightMm} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Wheelbase</span>
                  <span className="text-white font-semibold">{vehicle.dimensions.wheelbaseMm} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Curb Weight</span>
                  <span className="text-white font-semibold">{vehicle.dimensions.curbWeightKg} kg</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Key Features */}
        {selectedTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicle.keyFeatures.map((feat, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-zinc-800 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Pioneering Engineering Standard</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{feat}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Variants */}
        {selectedTab === 'variants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicle.variants.map((v) => (
              <div key={v.id} className="glass-panel p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-800 text-amber-400">
                      {v.badge}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {v.priceDelta === 0 ? 'Standard Trim' : `+${CurrencyFormatter.formatINR(v.priceDelta)}`}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black text-white mb-2">{v.name}</h3>
                  <p className="text-xs text-zinc-400 mb-6">{v.drivetrain}</p>

                  <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-zinc-900 rounded-xl mb-6 text-center text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-zinc-400 block">0-100</span>
                      <span className="font-bold text-white">{v.acceleration}</span>
                    </div>
                    <div className="border-x border-zinc-800">
                      <span className="text-[10px] uppercase text-zinc-400 block">Top Speed</span>
                      <span className="font-bold text-white">{v.topSpeed}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-zinc-400 block">Power</span>
                      <span className="font-bold text-white">{v.power}</span>
                    </div>
                  </div>

                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3">Included Highlights:</h5>
                  <ul className="space-y-2 mb-8">
                    {v.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/configurator?model=${vehicle.slug}&variant=${v.id}`}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider text-center transition-colors shadow-glow"
                >
                  Select & Configure This Trim
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
