import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sliders, Calendar, FileText, MessageSquare } from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { VehicleColor } from '../types/vehicle';
import { CurrencyFormatter } from '../services/api';
import { InteractiveVehicleViewer } from '../components/ui/InteractiveVehicleViewer';

export const VehicleDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const vehicle = VEHICLES_DATA.find((v) => v.slug === slug || v.id === slug);
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(() => {
    return vehicle ? vehicle.colors[0] : ({} as VehicleColor);
  });
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'variants'>('specs');

  useEffect(() => {
    if (vehicle && vehicle.colors.length > 0) {
      setSelectedColor(vehicle.colors[0]);
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#090a0c]">
        <h2 className="font-display text-2xl font-bold text-white mb-4">VEHICLE NOT FOUND</h2>
        <Link to="/vehicles" className="font-mono text-xs uppercase tracking-technical text-[#0055ff] hover:underline">
          &larr; RETURN TO FLEET ARCHIVE
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] pb-24">
      
      {/* Top Header Bar */}
      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 py-6 border-b border-white/10 flex items-center justify-between font-mono text-xs">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO CATALOGUE</span>
        </button>

        <div className="flex items-center gap-2 text-zinc-500">
          <span>ARCHIVE //</span>
          <span className="text-[#0055ff] font-bold">{vehicle.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 py-10">
        <InteractiveVehicleViewer
          vehicle={vehicle}
          selectedColor={selectedColor}
          onColorChange={(c) => setSelectedColor(c)}
        />
      </div>

      {/* Editorial Title & Primary CTA Actions */}
      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 py-8 border-y border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
              {vehicle.category} // {vehicle.fuelType}
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white mb-3">
              {vehicle.name}
            </h1>
            <p className="font-sans text-sm text-zinc-400 max-w-xl leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end justify-between font-mono">
            <div className="mb-6 lg:text-right">
              <span className="text-zinc-500 uppercase tracking-meta text-[10px] block">STARTING PRICE</span>
              <span className="font-display font-black text-3xl sm:text-4xl text-[#0055ff]">
                {CurrencyFormatter.formatINR(vehicle.startingPrice)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/configurator?model=${vehicle.slug}`}
                className="px-6 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6] transition-colors"
              >
                CONFIGURE
              </Link>
              <Link
                to={`/configurator?model=${vehicle.slug}&step=quote`}
                className="px-5 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                GET QUOTE
              </Link>
              <Link
                to={`/test-drive?model=${vehicle.slug}`}
                className="px-5 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-semibold text-zinc-300 hairline-border hover:text-white transition-colors"
              >
                BOOK TEST DRIVE
              </Link>
              <Link
                to={`/enquiry?model=${vehicle.slug}`}
                className="px-5 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                ENQUIRE NOW
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Technical Specifications Matrix */}
      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 py-16">
        
        {/* Tabs */}
        <div className="flex items-center space-x-8 border-b border-white/10 pb-4 mb-8 font-mono text-xs">
          {[
            { id: 'specs', label: '01 / TECHNICAL SPECIFICATIONS' },
            { id: 'features', label: '02 / ARCHITECTURAL FEATURES' },
            { id: 'variants', label: `03 / TRIM VARIANTS (${vehicle.variants.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`uppercase tracking-technical transition-colors ${
                activeTab === tab.id ? 'text-[#0055ff] font-bold border-b-2 border-[#0055ff] pb-4 -mb-4' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicle.detailedSpecifications.map((category, idx) => (
              <div key={idx} className="bg-[#0f1014] p-6 hairline-border">
                <h4 className="font-mono text-xs font-bold uppercase tracking-meta text-[#0055ff] mb-4 pb-2 border-b border-white/5">
                  {category.category}
                </h4>
                <dl className="space-y-3 font-mono text-xs">
                  {category.specs.map((item, sIdx) => (
                    <div key={sIdx} className="flex justify-between py-1 border-b border-white/5">
                      <dt className="text-zinc-500 uppercase">{item.label}</dt>
                      <dd className="text-white font-semibold text-right">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            <div className="bg-[#0f1014] p-6 hairline-border">
              <h4 className="font-mono text-xs font-bold uppercase tracking-meta text-[#0055ff] mb-4 pb-2 border-b border-white/5">
                DIMENSIONS & MASS
              </h4>
              <dl className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <dt className="text-zinc-500">LENGTH</dt>
                  <dd className="text-white">{vehicle.dimensions.lengthMm} MM</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <dt className="text-zinc-500">WIDTH</dt>
                  <dd className="text-white">{vehicle.dimensions.widthMm} MM</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <dt className="text-zinc-500">HEIGHT</dt>
                  <dd className="text-white">{vehicle.dimensions.heightMm} MM</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <dt className="text-zinc-500">WHEELBASE</dt>
                  <dd className="text-white">{vehicle.dimensions.wheelbaseMm} MM</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <dt className="text-zinc-500">CURB WEIGHT</dt>
                  <dd className="text-white">{vehicle.dimensions.curbWeightKg} KG</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicle.keyFeatures.map((feat, idx) => (
              <div key={idx} className="p-6 bg-[#0f1014] hairline-border font-mono text-xs">
                <span className="text-[#0055ff] block mb-1">STANDARD EQUIPMENT // 0{idx + 1}</span>
                <p className="text-zinc-200 leading-relaxed font-sans text-sm">{feat}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'variants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicle.variants.map((v) => (
              <div key={v.id} className="p-8 bg-[#0f1014] hairline-border flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-2 font-mono">
                    <span className="font-display font-bold text-2xl text-white">{v.name}</span>
                    <span className="text-sm text-[#0055ff] font-bold">
                      {v.priceDelta === 0 ? 'STANDARD' : `+${CurrencyFormatter.formatINR(v.priceDelta)}`}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-zinc-400 mb-6">{v.drivetrain} // {v.power} // {v.acceleration}</p>

                  <div className="space-y-1 font-mono text-xs text-zinc-400 mb-6">
                    {v.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#0055ff]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/configurator?model=${vehicle.slug}&variant=${v.id}`}
                  className="w-full py-3 rounded-full font-mono text-xs uppercase tracking-technical font-bold text-center block bg-white text-black hover:bg-[#0055ff] hover:text-white transition-colors"
                >
                  CONFIGURE THIS TRIM &rarr;
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
