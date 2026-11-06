import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Sliders, 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  FileText, 
  Download, 
  Sparkles, 
  Car, 
  ShieldCheck, 
  HelpCircle, 
  Calendar, 
  Share2, 
  Copy,
  Printer
} from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { 
  Vehicle, 
  VehicleColor, 
  VehicleVariant, 
  VehicleInterior, 
  VehicleWheel, 
  VehiclePackage, 
  VehicleAccessory, 
  Quotation, 
  UserConfiguration 
} from '../types/vehicle';
import { ConfiguratorService, CurrencyFormatter } from '../services/api';
import { InteractiveVehicleViewer } from '../components/ui/InteractiveVehicleViewer';

export const ConfiguratorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modelParam = searchParams.get('model');
  const variantParam = searchParams.get('variant');

  // Find vehicle or default to Autobot Aero X
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(() => {
    const found = VEHICLES_DATA.find((v) => v.slug === modelParam || v.id === modelParam);
    return found || VEHICLES_DATA[0];
  });

  // Steps: 'vehicle' | 'color' | 'variant' | 'interior' | 'wheels' | 'packages' | 'accessories' | 'summary' | 'quote'
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Configuration selections
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
  const [copiedLink, setCopiedLink] = useState(false);

  // Update configuration when vehicle changes
  useEffect(() => {
    setSelectedColor(selectedVehicle.colors[0]);
    setSelectedVariant(selectedVehicle.variants[0]);
    setSelectedInterior(selectedVehicle.interiorOptions[0]);
    setSelectedWheel(selectedVehicle.wheels[0]);
    setSelectedPackageIds([]);
    setSelectedAccessoryIds([]);
  }, [selectedVehicle]);

  // Pricing Calculation
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
    setCurrentStep(8); // Quote confirmation screen

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrintOrPdf = () => {
    window.print();
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const stepsList = [
    'Model',
    'Exterior Paint',
    'Trim Variant',
    'Interior Atelier',
    'Wheels',
    'Packages',
    'Accessories',
    'Summary & Quote'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      
      {/* Top Header & Wizard Navigation */}
      <div className="bg-zinc-950/90 border-b border-zinc-800/80 sticky top-[72px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-sm">
                Configurator
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-amber-400 font-bold text-xs truncate max-w-[140px] sm:max-w-none">
                {selectedVehicle.name}
              </span>
            </div>

            {/* Stepper Pills */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {stepsList.map((stepName, idx) => {
                const stepNum = idx + 1;
                const isCurrent = currentStep === stepNum;
                const isPassed = currentStep > stepNum;

                return (
                  <button
                    key={stepName}
                    onClick={() => setCurrentStep(stepNum)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                      isCurrent
                        ? 'bg-amber-400 text-black shadow-glow'
                        : isPassed
                        ? 'bg-zinc-800 text-zinc-300 hover:text-white'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                  >
                    {stepNum}. {stepName}
                  </button>
                );
              })}
            </div>

            {/* Live Price Tag */}
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400">Estimated Total</span>
              <span className="font-display text-sm font-extrabold text-amber-400">
                {CurrencyFormatter.formatINR(pricing.estimatedTotal)}
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visualizer Stage & Live 3D Experience (7 cols) */}
          <div className="lg:col-span-7 sticky top-36">
            <InteractiveVehicleViewer
              vehicle={selectedVehicle}
              selectedColor={selectedColor}
              onColorChange={(c) => setSelectedColor(c)}
            />

            {/* Quick Specs Bar Below Visualizer */}
            <div className="grid grid-cols-4 gap-2 mt-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center text-xs">
              <div>
                <span className="text-[10px] uppercase text-zinc-400 block">Drivetrain</span>
                <span className="font-bold text-white truncate block">{selectedVariant.badge}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-400 block">0-100 km/h</span>
                <span className="font-bold text-white">{selectedVariant.acceleration}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-400 block">System Power</span>
                <span className="font-bold text-amber-400">{selectedVariant.power}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-400 block">Range / Fuel</span>
                <span className="font-bold text-white truncate block">{selectedVariant.rangeOrMileage}</span>
              </div>
            </div>

            {/* Actions: Share & Brochure */}
            <div className="flex items-center justify-between mt-4 px-2 text-xs">
              <button
                onClick={handleCopyConfig}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Configuration Link Copied!' : 'Share Build'}</span>
              </button>

              <Link
                to={`/vehicles/${selectedVehicle.slug}`}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>View Full Model Specifications →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Configuration Steps (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Select Model */}
            {currentStep === 1 && (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <h3 className="font-display text-lg font-bold text-white">Select Vehicle Model</h3>
                  <span className="text-xs text-amber-400 font-bold">{VEHICLES_DATA.length} Models</span>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-[520px] overflow-y-auto pr-1">
                  {VEHICLES_DATA.map((v) => {
                    const isSelected = v.id === selectedVehicle.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVehicle(v)}
                        className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={v.heroImage}
                            alt={v.name}
                            className="w-16 h-10 object-cover rounded-lg bg-zinc-950"
                          />
                          <div>
                            <span className="text-sm font-bold block">{v.name}</span>
                            <span className="text-[11px] text-zinc-400">{v.category} • {v.fuelType}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-extrabold text-amber-400 block">
                            {CurrencyFormatter.formatINR(v.startingPrice)}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 ml-auto mt-1" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-glow flex items-center justify-center gap-1.5"
                >
                  <span>Proceed to Exterior Paint</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Exterior Paint Colors */}
            {currentStep === 2 && (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Exterior Paint Finish</h3>
                    <p className="text-xs text-zinc-400">Multiple multi-coat and matte finishes</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {selectedColor.price === 0 ? 'Included' : `+${CurrencyFormatter.formatINR(selectedColor.price)}`}
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedVehicle.colors.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-8 h-8 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div>
                            <span className="text-sm font-bold text-white block">{color.name}</span>
                            <span className="text-[11px] uppercase tracking-wider text-zinc-400">
                              {color.exteriorFinish || 'Metallic'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-zinc-300">
                            {color.price === 0 ? 'Standard' : `+${CurrencyFormatter.formatINR(color.price)}`}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 ml-auto mt-1" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow flex items-center justify-center gap-1"
                  >
                    <span>Proceed to Trim Variant</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Trim Variant */}
            {currentStep === 3 && (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Select Trim Variant</h3>
                    <p className="text-xs text-zinc-400">Powertrain and mechanical tuning</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedVehicle.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`w-full p-5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-amber-400 mr-2">
                              {v.badge}
                            </span>
                            <span className="font-display text-base font-bold text-white">{v.name}</span>
                          </div>
                          <span className="text-xs font-bold text-amber-400">
                            {v.priceDelta === 0 ? 'Base Trim' : `+${CurrencyFormatter.formatINR(v.priceDelta)}`}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-400 mb-3">{v.drivetrain}</p>

                        <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-zinc-950 rounded-lg text-center text-xs mb-3">
                          <div>
                            <span className="text-[10px] text-zinc-400 block">0-100</span>
                            <span className="font-semibold text-white">{v.acceleration}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block">Top Speed</span>
                            <span className="font-semibold text-white">{v.topSpeed}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block">Power</span>
                            <span className="font-semibold text-white">{v.power}</span>
                          </div>
                        </div>

                        <ul className="space-y-1">
                          {v.features.slice(0, 2).map((feat, fIdx) => (
                            <li key={fIdx} className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-amber-400" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow flex items-center justify-center gap-1"
                  >
                    <span>Proceed to Interior Atelier</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Interior Atelier */}
            {currentStep === 4 && (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Interior Atelier</h3>
                    <p className="text-xs text-zinc-400">Hand-selected leathers and sustainable textiles</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedVehicle.interiorOptions.map((item) => {
                    const isSelected = selectedInterior.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedInterior(item)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-8 h-8 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: item.hex }}
                          />
                          <div>
                            <span className="text-sm font-bold text-white block">{item.name}</span>
                            <span className="text-[11px] text-zinc-400">{item.material}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-zinc-300">
                            {item.price === 0 ? 'Standard' : `+${CurrencyFormatter.formatINR(item.price)}`}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 ml-auto mt-1" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow flex items-center justify-center gap-1"
                  >
                    <span>Proceed to Wheels</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Wheels */}
            {currentStep === 5 && (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Wheels & Alloys</h3>
                    <p className="text-xs text-zinc-400">Forged monoblock and aerodynamic rims</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedVehicle.wheels.map((wheel) => {
                    const isSelected = selectedWheel.id === wheel.id;
                    return (
                      <button
                        key={wheel.id}
                        onClick={() => setSelectedWheel(wheel)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                        }`}
                      >
                        <div>
                          <span className="text-sm font-bold text-white block">{wheel.name}</span>
                          <span className="text-[11px] text-zinc-400">{wheel.sizeInch}" • {wheel.finish}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-zinc-300">
                            {wheel.price === 0 ? 'Standard' : `+${CurrencyFormatter.formatINR(wheel.price)}`}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 ml-auto mt-1" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow flex items-center justify-center gap-1"
                  >
                    <span>Proceed to Optional Packages</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Optional Packages */}
            {currentStep === 6 && (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Technological Packages</h3>
                    <p className="text-xs text-zinc-400">Curated factory hardware & software suites</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedVehicle.packages.map((pkg) => {
                    const isSelected = selectedPackageIds.includes(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => togglePackage(pkg.id)}
                        className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-bold text-white">{pkg.name}</span>
                          <span className="text-xs font-extrabold text-amber-400">
                            +{CurrencyFormatter.formatINR(pkg.price)}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-3">{pkg.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {pkg.highlightFeatures.map((h, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(7)}
                    className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow flex items-center justify-center gap-1"
                  >
                    <span>Proceed to Accessories</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Accessories & Summary */}
            {currentStep === 7 && (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Bespoke Accessories</h3>
                  <p className="text-xs text-zinc-400">Chargers, lifestyle travel items, and protection</p>
                </div>

                <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {selectedVehicle.accessories.map((acc) => {
                    const isSelected = selectedAccessoryIds.includes(acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold text-white block">{acc.name}</span>
                          <span className="text-[10px] text-zinc-400">{acc.category} • {acc.description}</span>
                        </div>
                        <span className="text-xs font-bold text-amber-400 flex-shrink-0 ml-3">
                          +{CurrencyFormatter.formatINR(acc.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Live Quotation Summary Breakdown Card */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-zinc-800">
                    Live Quotation Breakdown
                  </h4>
                  <div className="flex justify-between text-zinc-400">
                    <span>Base Vehicle ({selectedVehicle.name})</span>
                    <span className="text-white font-semibold">{CurrencyFormatter.formatINR(pricing.basePrice)}</span>
                  </div>
                  {pricing.variantPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Trim Variant ({selectedVariant.name})</span>
                      <span className="text-white font-semibold">+{CurrencyFormatter.formatINR(pricing.variantPrice)}</span>
                    </div>
                  )}
                  {pricing.colorPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Exterior Paint ({selectedColor.name})</span>
                      <span className="text-white font-semibold">+{CurrencyFormatter.formatINR(pricing.colorPrice)}</span>
                    </div>
                  )}
                  {pricing.interiorPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Interior Atelier</span>
                      <span className="text-white font-semibold">+{CurrencyFormatter.formatINR(pricing.interiorPrice)}</span>
                    </div>
                  )}
                  {pricing.wheelPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Wheels</span>
                      <span className="text-white font-semibold">+{CurrencyFormatter.formatINR(pricing.wheelPrice)}</span>
                    </div>
                  )}
                  {pricing.packagesPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Tech Packages ({selectedPackageIds.length})</span>
                      <span className="text-white font-semibold">+{CurrencyFormatter.formatINR(pricing.packagesPrice)}</span>
                    </div>
                  )}
                  {pricing.accessoriesPrice > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Accessories ({selectedAccessoryIds.length})</span>
                      <span className="text-white font-semibold">+{CurrencyFormatter.formatINR(pricing.accessoriesPrice)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-400 font-semibold pt-1">
                    <span>Privilege Promotional Discount (2%)</span>
                    <span>-{CurrencyFormatter.formatINR(pricing.applicableDiscount)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Estimated GST & Luxury Cess (18%)</span>
                    <span>+{CurrencyFormatter.formatINR(pricing.estimatedTaxesGst)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-amber-400 pt-2 border-t border-zinc-800">
                    <span>Estimated Total</span>
                    <span>{CurrencyFormatter.formatINR(pricing.estimatedTotal)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-400 leading-relaxed italic">
                  *Estimated price — final price may vary based on taxes, location, dealer charges and applicable offers.
                </p>

                {/* Customer Details Form */}
                <form onSubmit={handleGenerateQuotation} className="space-y-3 pt-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                    Enter Contact Details for Official PDF Quotation
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Corporate / Personal Email *"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                    <select
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Pune">Pune</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(6)}
                      className="py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingQuote}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow flex items-center justify-center gap-2 hover:opacity-95"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{isSubmittingQuote ? 'Generating...' : 'Generate Official Quotation'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 8: Formal Quotation Ready */}
            {currentStep === 8 && issuedQuotation && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-400/40 shadow-glow space-y-6">
                
                {/* Official Quotation Document Preview Header */}
                <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5">
                      <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-display font-black text-amber-400 text-lg">
                        A
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-black text-white">AUTOBOT AUTOMOTIVE</h4>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Official Vehicle Estimate</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Quotation No.</span>
                    <span className="font-mono text-xs font-bold text-amber-400">{issuedQuotation.quotationNumber}</span>
                  </div>
                </div>

                {/* Client & Vehicle Details */}
                <div className="grid grid-cols-2 gap-4 text-xs bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                  <div>
                    <span className="text-[10px] uppercase text-zinc-500 block">Prepared For</span>
                    <strong className="text-white block">{customerName}</strong>
                    <span className="text-zinc-400 block">{customerEmail}</span>
                    <span className="text-zinc-400 block">{customerPhone} • {customerCity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-zinc-500 block">Configured Spec</span>
                    <strong className="text-amber-400 block">{selectedVehicle.name}</strong>
                    <span className="text-zinc-300 block">{selectedVariant.name}</span>
                    <span className="text-zinc-400 block">{selectedColor.name} ({selectedColor.exteriorFinish || 'Metallic'})</span>
                  </div>
                </div>

                {/* Final Cost Summary */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>Base Vehicle & Selected Options Subtotal</span>
                    <span>{CurrencyFormatter.formatINR(pricing.basePrice + pricing.variantPrice + pricing.colorPrice + pricing.interiorPrice + pricing.wheelPrice + pricing.packagesPrice + pricing.accessoriesPrice)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Special Privilege Discount</span>
                    <span>-{CurrencyFormatter.formatINR(pricing.applicableDiscount)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Estimated GST (18%)</span>
                    <span>+{CurrencyFormatter.formatINR(pricing.estimatedTaxesGst)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-amber-400 pt-2 border-t border-zinc-800">
                    <span>Estimated On-Road Total</span>
                    <span>{CurrencyFormatter.formatINR(pricing.estimatedTotal)}</span>
                  </div>
                </div>

                {/* Actions: Download PDF, Book Drive, Configure another */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handlePrintOrPdf}
                    className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download / Print Quotation PDF</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={`/test-drive?model=${selectedVehicle.slug}`}
                      className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Book Test Drive</span>
                    </Link>

                    <button
                      onClick={() => setCurrentStep(1)}
                      className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider text-center transition-colors"
                    >
                      New Configuration
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
                  Quotation valid for 14 calendar days from date of issue. Non-contractual estimate.
                </p>

              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
