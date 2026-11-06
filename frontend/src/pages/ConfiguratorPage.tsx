import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  FileText, 
  Download, 
  Mail, 
  Share2, 
  SlidersHorizontal 
} from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { 
  Vehicle, 
  VehicleColor, 
  VehicleVariant, 
  VehicleInterior, 
  VehicleWheel, 
  Quotation, 
  UserConfiguration 
} from '../types/vehicle';
import { ConfiguratorService, CurrencyFormatter } from '../services/api';
import { InteractiveVehicleViewer } from '../components/ui/InteractiveVehicleViewer';

export const ConfiguratorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const modelParam = searchParams.get('model');
  const variantParam = searchParams.get('variant');

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(() => {
    const found = VEHICLES_DATA.find((v) => v.slug === modelParam || v.id === modelParam);
    return found || VEHICLES_DATA[0];
  });

  // Steps: 1 to 8
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(selectedVehicle.colors[0]);
  const [selectedVariant, setSelectedVariant] = useState<VehicleVariant>(() => {
    if (variantParam) {
      const vFound = selectedVehicle.variants.find((v) => v.id === variantParam);
      if (vFound) return vFound;
    }
    return selectedVehicle.variants[0];
  });
  const [selectedInterior, setSelectedInterior] = useState<VehicleInterior>(selectedVehicle.interiorOptions[0]);
  const [selectedWheel, setSelectedWheel] = useState<VehicleWheel>(selectedVehicle.wheels[0]);
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([]);

  // Customer form for Quotation
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Mumbai');
  const [issuedQuotation, setIssuedQuotation] = useState<Quotation | null>(null);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    setSelectedColor(selectedVehicle.colors[0]);
    setSelectedVariant(selectedVehicle.variants[0]);
    setSelectedInterior(selectedVehicle.interiorOptions[0]);
    setSelectedWheel(selectedVehicle.wheels[0]);
    setSelectedPackageIds([]);
    setSelectedAccessoryIds([]);
  }, [selectedVehicle]);

  // Price calculations
  const pricing = useMemo(() => {
    return ConfiguratorService.calculateQuotationPrice(
      selectedVehicle,
      selectedVariant.id,
      selectedColor.id,
      selectedInterior.id,
      selectedWheel.id,
      selectedPackageIds,
      selectedAccessoryIds
    );
  }, [selectedVehicle, selectedVariant, selectedColor, selectedInterior, selectedWheel, selectedPackageIds, selectedAccessoryIds]);

  const togglePackage = (pkgId: string) => {
    setSelectedPackageIds((prev) =>
      prev.includes(pkgId) ? prev.filter((id) => id !== pkgId) : [...prev, pkgId]
    );
  };

  const toggleAccessory = (accId: string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(accId) ? prev.filter((id) => id !== accId) : [...prev, accId]
    );
  };

  const handleGenerateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    setIsSubmittingQuote(true);

    const userConfig: UserConfiguration = {
      vehicleId: selectedVehicle.id,
      variantId: selectedVariant.id,
      colorId: selectedColor.id,
      interiorId: selectedInterior.id,
      wheelId: selectedWheel.id,
      packageIds: selectedPackageIds,
      accessoryIds: selectedAccessoryIds,
      pricingBreakdown: pricing,
      customerDetails: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        city: customerCity
      }
    };

    const quote = await ConfiguratorService.createQuotation(userConfig, selectedVehicle);
    setIssuedQuotation(quote);
    setIsSubmittingQuote(false);
    setCurrentStep(8);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const stepsList = [
    'MODEL',
    'VARIANT',
    'EXTERIOR',
    'INTERIOR',
    'WHEELS',
    'PACKAGES',
    'ACCESSORIES',
    'SUMMARY'
  ];

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] pb-24">
      
      {/* Top Technical Stepper Bar (64px) */}
      <div className="bg-[#090a0c] hairline-border-b sticky top-16 z-30">
        <div className="max-w-[1520px] mx-auto px-6 lg:px-12 py-3 flex items-center justify-between overflow-x-auto no-scrollbar gap-6">
          
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#0055ff] font-bold">ATELIER //</span>
            <span className="text-white font-bold">{selectedVehicle.name}</span>
          </div>

          {/* Steps List */}
          <div className="flex items-center space-x-4 sm:space-x-6 font-mono text-xs">
            {stepsList.map((stepName, idx) => {
              const stepNum = idx + 1;
              const isCurrent = currentStep === stepNum;
              const isPassed = currentStep > stepNum;

              return (
                <button
                  key={stepName}
                  onClick={() => setCurrentStep(stepNum)}
                  className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isCurrent
                      ? 'text-[#0055ff] font-bold border-b-2 border-[#0055ff] pb-0.5'
                      : isPassed
                      ? 'text-zinc-300 hover:text-white'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  <span>0{stepNum} — {stepName}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Price Indicator */}
          <div className="hidden md:flex items-baseline gap-2 font-mono text-xs">
            <span className="text-zinc-500">EST. TOTAL:</span>
            <span className="text-[#0055ff] font-bold">
              {CurrencyFormatter.formatINR(pricing.estimatedTotal)}
            </span>
          </div>

        </div>
      </div>

      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Large Vehicle Visual (7 cols) */}
          <div className="lg:col-span-7 sticky top-32 space-y-4">
            <InteractiveVehicleViewer
              vehicle={selectedVehicle}
              selectedColor={selectedColor}
              onColorChange={(c) => setSelectedColor(c)}
            />

            {/* Technical Spec Matrix Under Visualizer */}
            <div className="grid grid-cols-4 py-3 px-6 bg-[#0f1014] hairline-border font-mono text-xs text-center">
              <div>
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block">DRIVE</span>
                <span className="text-white font-bold">{selectedVariant.badge}</span>
              </div>
              <div className="border-x border-white/5">
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block">0-100</span>
                <span className="text-white font-bold">{selectedVariant.acceleration}</span>
              </div>
              <div className="border-r border-white/5">
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block">OUTPUT</span>
                <span className="text-[#0055ff] font-bold">{selectedVariant.power}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block">RANGE</span>
                <span className="text-white font-bold">{selectedVariant.rangeOrMileage}</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Options Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#0f1014] p-8 hairline-border space-y-8">
            
            {/* 01 — MODEL */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 flex justify-between items-baseline font-mono">
                  <span className="text-xs uppercase tracking-meta text-[#0055ff]">01 / SELECT MODEL</span>
                  <span className="text-xs text-zinc-500">{VEHICLES_DATA.length} AVAILABLE</span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {VEHICLES_DATA.map((v) => {
                    const isSelected = v.id === selectedVehicle.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicle(v)}
                        className={`p-4 hairline-border cursor-pointer transition-colors flex items-center justify-between ${
                          isSelected ? 'bg-white/5 border-[#0055ff]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div>
                          <span className="font-display font-bold text-base text-white block">{v.name}</span>
                          <span className="font-mono text-[11px] text-zinc-500 uppercase">{v.category} • {v.fuelType}</span>
                        </div>
                        <div className="text-right font-mono text-xs">
                          <span className="text-[#0055ff] font-bold block">{CurrencyFormatter.formatINR(v.startingPrice)}</span>
                          {isSelected && <span className="text-white text-[10px]">[SELECTED]</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-4 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6] transition-colors"
                >
                  NEXT: 02 — VARIANT &rarr;
                </button>
              </div>
            )}

            {/* 02 — VARIANT */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-meta text-[#0055ff]">
                  02 / TRIM VARIANT SELECTION
                </div>

                <div className="space-y-3">
                  {selectedVehicle.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-5 hairline-border cursor-pointer transition-colors ${
                          isSelected ? 'bg-white/5 border-[#0055ff]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-2 font-mono">
                          <span className="font-display font-bold text-lg text-white">{v.name}</span>
                          <span className="text-xs text-[#0055ff] font-bold">
                            {v.priceDelta === 0 ? 'BASE TRIM' : `+${CurrencyFormatter.formatINR(v.priceDelta)}`}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-zinc-400 mb-3">{v.drivetrain} // {v.power} // {v.acceleration}</p>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase">
                          <span>FEATURES:</span>
                          <span className="text-zinc-300">{v.features.join(' • ')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="py-3 px-6 rounded-full font-mono text-xs uppercase tracking-technical text-zinc-400 hairline-border hover:text-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6]"
                  >
                    NEXT: 03 — EXTERIOR &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* 03 — EXTERIOR PAINT */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-meta text-[#0055ff]">
                  03 / EXTERIOR FINISH
                </div>

                <div className="space-y-2">
                  {selectedVehicle.colors.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <div
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`p-4 hairline-border cursor-pointer flex items-center justify-between transition-colors ${
                          isSelected ? 'bg-white/5 border-[#0055ff]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center gap-3 font-mono">
                          <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: color.hex }} />
                          <div>
                            <span className="text-xs font-bold text-white block">{color.name}</span>
                            <span className="text-[10px] text-zinc-500 uppercase">{color.exteriorFinish || 'METALLIC'}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-zinc-400">
                          {color.price === 0 ? 'INCLUDED' : `+${CurrencyFormatter.formatINR(color.price)}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="py-3 px-6 rounded-full font-mono text-xs uppercase tracking-technical text-zinc-400 hairline-border hover:text-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6]"
                  >
                    NEXT: 04 — INTERIOR &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* 04 — INTERIOR */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-meta text-[#0055ff]">
                  04 / INTERIOR ATELIER
                </div>

                <div className="space-y-2">
                  {selectedVehicle.interiorOptions.map((item) => {
                    const isSelected = selectedInterior.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedInterior(item)}
                        className={`p-4 hairline-border cursor-pointer flex items-center justify-between transition-colors ${
                          isSelected ? 'bg-white/5 border-[#0055ff]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center gap-3 font-mono">
                          <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: item.hex }} />
                          <div>
                            <span className="text-xs font-bold text-white block">{item.name}</span>
                            <span className="text-[10px] text-zinc-500 uppercase">{item.material}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-zinc-400">
                          {item.price === 0 ? 'STANDARD' : `+${CurrencyFormatter.formatINR(item.price)}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="py-3 px-6 rounded-full font-mono text-xs uppercase tracking-technical text-zinc-400 hairline-border hover:text-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="flex-1 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6]"
                  >
                    NEXT: 05 — WHEELS &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* 05 — WHEELS */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-meta text-[#0055ff]">
                  05 / WHEELS & FORGED ALLOYS
                </div>

                <div className="space-y-2">
                  {selectedVehicle.wheels.map((wheel) => {
                    const isSelected = selectedWheel.id === wheel.id;
                    return (
                      <div
                        key={wheel.id}
                        onClick={() => setSelectedWheel(wheel)}
                        className={`p-4 hairline-border cursor-pointer flex items-center justify-between transition-colors ${
                          isSelected ? 'bg-white/5 border-[#0055ff]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="font-mono">
                          <span className="text-xs font-bold text-white block">{wheel.name}</span>
                          <span className="text-[10px] text-zinc-500 uppercase">{wheel.sizeInch}" // {wheel.finish}</span>
                        </div>
                        <span className="font-mono text-xs text-zinc-400">
                          {wheel.price === 0 ? 'STANDARD' : `+${CurrencyFormatter.formatINR(wheel.price)}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="py-3 px-6 rounded-full font-mono text-xs uppercase tracking-technical text-zinc-400 hairline-border hover:text-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="flex-1 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6]"
                  >
                    NEXT: 06 — PACKAGES &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* 06 — PACKAGES */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-meta text-[#0055ff]">
                  06 / FACTORY TECHNOLOGY PACKAGES
                </div>

                <div className="space-y-3">
                  {selectedVehicle.packages.map((pkg) => {
                    const isSelected = selectedPackageIds.includes(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => togglePackage(pkg.id)}
                        className={`p-4 hairline-border cursor-pointer transition-colors ${
                          isSelected ? 'bg-white/5 border-[#0055ff]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-1 font-mono">
                          <span className="text-xs font-bold text-white">{pkg.name}</span>
                          <span className="text-xs text-[#0055ff] font-bold">+{CurrencyFormatter.formatINR(pkg.price)}</span>
                        </div>
                        <p className="font-mono text-[11px] text-zinc-400">{pkg.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="py-3 px-6 rounded-full font-mono text-xs uppercase tracking-technical text-zinc-400 hairline-border hover:text-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(7)}
                    className="flex-1 py-3 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6]"
                  >
                    NEXT: 07 — ACCESSORIES &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* 07 — ACCESSORIES & TECHNICAL PRICE PANEL */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-meta text-[#0055ff]">
                  07 / ACCESSORIES & LIVE PRICE CALCULATION
                </div>

                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {selectedVehicle.accessories.map((acc) => {
                    const isSelected = selectedAccessoryIds.includes(acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={`p-3 hairline-border cursor-pointer flex items-center justify-between text-xs font-mono ${
                          isSelected ? 'bg-white/5 border-[#0055ff]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div>
                          <span className="text-white block font-bold">{acc.name}</span>
                          <span className="text-[10px] text-zinc-500 uppercase">{acc.category}</span>
                        </div>
                        <span className="text-[#0055ff] font-bold">+{CurrencyFormatter.formatINR(acc.price)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Technical Price Breakdown Table */}
                <div className="p-5 bg-[#090a0c] hairline-border space-y-2 font-mono text-xs">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-meta pb-2 border-b border-white/5">
                    TECHNICAL PRICE COMPUTATION
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>BASE VEHICLE</span>
                    <span className="text-white">{CurrencyFormatter.formatINR(pricing.basePrice)}</span>
                  </div>
                  {pricing.colorPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>PREMIUM COLOUR</span>
                      <span className="text-white">+{CurrencyFormatter.formatINR(pricing.colorPrice)}</span>
                    </div>
                  )}
                  {pricing.packagesPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>TECHNOLOGY PACKAGE</span>
                      <span className="text-white">+{CurrencyFormatter.formatINR(pricing.packagesPrice)}</span>
                    </div>
                  )}
                  {pricing.accessoriesPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>ACCESSORIES</span>
                      <span className="text-white">+{CurrencyFormatter.formatINR(pricing.accessoriesPrice)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400 pt-2 border-t border-white/5">
                    <span>DISCOUNT APPLIED</span>
                    <span className="text-zinc-300">-{CurrencyFormatter.formatINR(pricing.applicableDiscount)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#0055ff] pt-2 border-t border-white/10">
                    <span>ESTIMATED TOTAL</span>
                    <span>{CurrencyFormatter.formatINR(pricing.estimatedTotal)}</span>
                  </div>
                </div>

                {/* Customer Contact Form */}
                <form onSubmit={handleGenerateQuotation} className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="NAME *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="px-3 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="PHONE *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="px-3 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="EMAIL *"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="px-3 py-2.5 bg-[#090a0c] hairline-border text-white placeholder-zinc-600 focus:outline-none focus:border-[#0055ff]"
                    />
                    <select
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="px-3 py-2.5 bg-[#090a0c] hairline-border text-white focus:outline-none focus:border-[#0055ff]"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingQuote}
                    className="w-full py-4 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6] transition-colors mt-2"
                  >
                    {isSubmittingQuote ? 'GENERATING QUOTATION...' : '08 — GENERATE QUOTATION'}
                  </button>
                </form>
              </div>
            )}

            {/* 08 — SUMMARY & OFFICIAL QUOTATION */}
            {currentStep === 8 && issuedQuotation && (
              <div className="space-y-6 font-mono text-xs">
                <div className="pb-4 border-b border-white/10 flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-meta text-[#0055ff]">08 / OFFICIAL QUOTATION DOSSIER</span>
                  <span className="text-white font-bold">{issuedQuotation.quotationNumber}</span>
                </div>

                <div className="p-6 bg-[#090a0c] hairline-border space-y-4">
                  <div className="border-b border-white/5 pb-3">
                    <span className="text-zinc-500 uppercase text-[10px] block">CLIENT IDENTIFIER</span>
                    <strong className="text-white text-sm block">{customerName}</strong>
                    <span className="text-zinc-400">{customerEmail} • {customerPhone} • {customerCity}</span>
                  </div>

                  <div className="border-b border-white/5 pb-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">SPECIFICATION:</span>
                      <span className="text-white font-bold">{selectedVehicle.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">TRIM VARIANT:</span>
                      <span className="text-white">{selectedVariant.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">EXTERIOR PAINT:</span>
                      <span className="text-white">{selectedColor.name}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#0055ff] pt-2">
                    <span>ESTIMATED ON-ROAD:</span>
                    <span>{CurrencyFormatter.formatINR(pricing.estimatedTotal)}</span>
                  </div>
                </div>

                {/* Action Buttons: DOWNLOAD PDF & EMAIL QUOTATION */}
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadPdf}
                    className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD PDF</span>
                  </button>

                  <button
                    onClick={() => setEmailSent(true)}
                    className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6] transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{emailSent ? 'QUOTATION TRANSMITTED TO EMAIL' : 'EMAIL QUOTATION'}</span>
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-zinc-500 hover:text-white uppercase tracking-meta text-[10px]"
                  >
                    [START NEW CONFIGURATION]
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
