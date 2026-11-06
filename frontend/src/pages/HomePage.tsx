import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sliders, ChevronDown } from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { CurrencyFormatter } from '../services/api';

export const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroVehicle = VEHICLES_DATA[0]; // Autobot Aero X
  const latestMachines = VEHICLES_DATA.slice(0, 6);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle parallax transform values
  const textTranslateY = scrollY * -0.15;
  const carTranslateY = scrollY * 0.12;

  return (
    <div className="bg-[#090a0c] text-[#f4f4f6] selection:bg-[#0055ff] selection:text-white">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION WITH TYPOGRAPHY OCCLUSION & SCROLL MOTION */}
      {/* ========================================================= */}
      <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden hairline-border-b pt-12 pb-20">
        
        {/* Background Subtle Technical Grid */}
        <div className="absolute inset-0 technical-grid opacity-60 pointer-events-none" />

        {/* Oversized Background AUTOBOT Typography (Back Layer) */}
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden"
          style={{ transform: `translateY(${textTranslateY}px)` }}
        >
          <span className="font-display font-black text-[22vw] leading-none text-white/[0.04] tracking-poster whitespace-nowrap">
            AUTOBOT
          </span>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-[1520px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (5 Cols): Editorial Headline & Actions */}
            <div className="lg:col-span-5 pt-8 lg:pt-0">
              
              {/* Technical Eyebrow */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0055ff]" />
                <span className="font-mono text-xs uppercase tracking-meta text-zinc-400">
                  AUTOBOT / AUTOMOTIVE SYSTEMS / 2026
                </span>
              </div>

              {/* Large Poster Headline */}
              <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-poster leading-[0.9] uppercase text-white mb-8">
                THE ROAD<br />
                STARTS<br />
                <span className="text-[#0055ff]">HERE.</span>
              </h1>

              {/* Supporting Editorial Text */}
              <p className="font-sans text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed mb-10">
                Discover a new generation of performance, technology and intelligent mobility.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-16">
                <Link
                  to="/vehicles"
                  className="px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] hover:bg-[#0047d6] text-white transition-colors flex items-center gap-2"
                >
                  <span>EXPLORE VEHICLES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={`/configurator?model=${heroVehicle.slug}`}
                  className="px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-technical font-semibold bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white hairline-border transition-colors flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#0055ff]" />
                  <span>CONFIGURE YOUR CAR</span>
                </Link>
              </div>

              {/* Three Technical Specifications */}
              <div className="grid grid-cols-3 pt-6 border-t border-white/10 max-w-md">
                <div>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-meta block">CATALOGUE</span>
                  <span className="font-mono text-xs font-bold text-white tracking-wider">15 MODELS</span>
                </div>
                <div className="border-x border-white/10 px-4">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-meta block">ARCHITECTURE</span>
                  <span className="font-mono text-xs font-bold text-white tracking-wider">NEXT-GEN</span>
                </div>
                <div className="pl-4">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-meta block">ATELIER</span>
                  <span className="font-mono text-xs font-bold text-[#0055ff] tracking-wider">CONFIGURATOR</span>
                </div>
              </div>

            </div>

            {/* Right Column (7 Cols): Photorealistic Flagship Car Visual (No Card) */}
            <div 
              className="lg:col-span-7 relative flex items-center justify-center transition-transform duration-75 ease-out"
              style={{ transform: `translateY(${carTranslateY}px)` }}
            >
              {/* Radial Lighting Glow Behind Car */}
              <div className="absolute w-[80%] aspect-square rounded-full bg-[#0055ff]/[0.07] blur-3xl pointer-events-none" />

              {/* Flagship Vehicle Image with Natural Shadow */}
              <div className="relative w-full max-w-3xl">
                <img
                  src={heroVehicle.heroImage}
                  alt="Autobot Flagship Performance Machine"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                  loading="eager"
                />

                {/* Technical Floating Callout */}
                <div className="absolute -bottom-4 right-2 font-mono text-[10px] text-zinc-500 tracking-meta uppercase bg-[#090a0c]/80 backdrop-blur-sm px-3 py-1 hairline-border">
                  FIGURE 01 — {heroVehicle.name.toUpperCase()} / {heroVehicle.horsepower} HP / {heroVehicle.rangeOrMileage}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-meta text-zinc-600">
          <span>SCROLL FOR SYSTEMS</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#0055ff]" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FEATURED VEHICLES: LATEST MACHINES */}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1520px] mx-auto px-6 lg:px-12 hairline-border-b">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
              // PRODUCTION LINEUP
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
              LATEST MACHINES
            </h2>
          </div>

          <Link
            to="/vehicles"
            className="font-mono text-xs uppercase tracking-technical text-zinc-400 hover:text-white flex items-center gap-2 group"
          >
            <span>VIEW ALL 15 MODELS</span>
            <ArrowRight className="w-4 h-4 text-[#0055ff] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Vehicle Grid (No Generic Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 pt-12">
          {latestMachines.map((machine, index) => (
            <div key={machine.id} className="group flex flex-col justify-between">
              
              {/* Large Image with Hairline Base */}
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

                {/* Model Title & Category */}
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

                {/* Technical Metadata Table */}
                <div className="space-y-2 py-3 border-y border-white/5 font-mono text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">STARTING PRICE</span>
                    <span className="text-white font-semibold">
                      {CurrencyFormatter.formatINR(machine.startingPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">POWER OUTPUT</span>
                    <span className="text-white">{machine.horsepower} HP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">RANGE / MILEAGE</span>
                    <span className="text-white">{machine.rangeOrMileage}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
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

      </section>

      {/* ========================================================= */}
      {/* 3. TECHNICAL PROOF SECTION: ENGINEERED DIFFERENTLY */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#090a0c] hairline-border-b">
        <div className="max-w-[1520px] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
                // BENCHMARK TELEMETRY
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
                ENGINEERED DIFFERENTLY<span className="text-[#0055ff]">.</span>
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 tracking-technical">
              CHASSIS CODE: ATB-800V-GEN3
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
            
            {/* Left Big Statistic: 0-100 km/h in 2.7 SEC */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xs uppercase tracking-meta text-zinc-500">
                VELOCITY ACCELERATION METRIC
              </div>

              <div className="flex items-baseline gap-6">
                <span className="font-display font-black text-6xl sm:text-8xl tracking-poster text-white">
                  0—100
                </span>
                <span className="font-display font-black text-4xl sm:text-6xl text-[#0055ff]">
                  2.7 SEC
                </span>
              </div>

              <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-md">
                Continuous instantaneous launch torque via dual liquid-cooled axial flux motors. Zero mechanical gear lash, zero power degradation under thermal stress.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 block uppercase tracking-meta">LATERAL G-FORCE</span>
                  <span className="font-bold text-white text-base">1.35 G PEAK</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase tracking-meta">100—0 BRAKING</span>
                  <span className="font-bold text-white text-base">31.2 METERS</span>
                </div>
              </div>
            </div>

            {/* Right: SVG Performance Telemetry Trace */}
            <div className="lg:col-span-7 bg-[#0f1014] p-8 hairline-border">
              <div className="flex items-center justify-between pb-4 border-b border-white/5 font-mono text-xs text-zinc-500 mb-6">
                <span>ACCELERATION & POWER DELIVERY TRACE</span>
                <span className="text-[#0055ff] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0055ff] animate-pulse" />
                  REAL-TIME SIMULATION
                </span>
              </div>

              {/* SVG Curve */}
              <div className="w-full aspect-[2/1] relative">
                <svg viewBox="0 0 600 280" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="220" x2="600" y2="220" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Speed Trace (Blue) */}
                  <path
                    d="M 20 250 C 120 240, 200 120, 320 60 C 440 30, 520 22, 580 20"
                    fill="none"
                    stroke="#0055ff"
                    strokeWidth="3"
                  />

                  {/* Torque Vectoring Curve (Achromatic white line) */}
                  <path
                    d="M 20 180 C 80 40, 160 30, 300 45 C 440 70, 520 90, 580 110"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />

                  {/* Marker Points */}
                  <circle cx="320" cy="60" r="4" fill="#0055ff" />
                  <circle cx="580" cy="20" r="4" fill="#ffffff" />
                  <text x="330" y="55" fill="#f4f4f6" fontSize="10" fontFamily="IBM Plex Mono">100 km/h (2.7s)</text>
                  <text x="500" y="18" fill="#0055ff" fontSize="10" fontFamily="IBM Plex Mono">310 km/h V-MAX</text>
                </svg>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[10px] text-zinc-500 uppercase tracking-meta">
                <span>HORIZONTAL AXIS: TIME (S)</span>
                <span>BLUE: VELOCITY (KM/H) • DASH: TORQUE (NM)</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. TECHNICAL SPECIFICATION SECTION: BUILT TO MOVE */}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1520px] mx-auto px-6 lg:px-12 hairline-border-b">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
              // CHASSIS ARCHITECTURE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-poster uppercase text-white">
              BUILT TO MOVE<span className="text-[#0055ff]">.</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500 tracking-technical">
            SCALE SPECIFICATION: 1:1 CALIBRATION
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          
          {/* Left: Definition List (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
              Every Autobot platform utilizes a modular hydroformed aluminum skateboard frame with integrated battery side-impact reinforcement rings and front multi-link geometry.
            </p>

            <dl className="space-y-4 border-t border-white/10 pt-6">
              {[
                { label: 'POWER', value: '780 HP' },
                { label: 'TORQUE', value: '1,050 NM' },
                { label: 'RANGE', value: '685 KM (WLTP)' },
                { label: 'DRIVE', value: 'INTELLIGENT DUAL-MOTOR AWD' },
                { label: 'BATTERY', value: '108 KWH LI-NCM (800V)' },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline justify-between py-2 border-b border-white/5 font-mono">
                  <dt className="text-xs text-zinc-500 tracking-meta uppercase">{item.label}</dt>
                  <dd className="text-sm font-bold text-white tracking-wider">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="pt-2">
              <Link
                to="/configurator"
                className="font-mono text-xs uppercase tracking-technical font-bold text-[#0055ff] hover:underline flex items-center gap-1.5"
              >
                <span>OPEN LIVE ATELIER CONFIGURATOR</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Technical SVG Blueprint Illustration with Construction Lines (7 cols) */}
          <div className="lg:col-span-7 bg-[#0f1014] p-8 hairline-border relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 tracking-meta pb-4 border-b border-white/5">
              <span>TECHNICAL BLUEPRINT / AERODYNAMIC SILHOUETTE</span>
              <span>DIMENSIONAL TOLERANCE: ±0.5MM</span>
            </div>

            {/* Schematic SVG */}
            <div className="w-full aspect-[16/9] flex items-center justify-center py-6">
              <svg viewBox="0 0 700 320" className="w-full h-full">
                {/* Ground Reference Plane */}
                <line x1="40" y1="260" x2="660" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                
                {/* Construction Lines */}
                <line x1="80" y1="40" x2="80" y2="260" stroke="#0055ff" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="620" y1="40" x2="620" y2="260" stroke="#0055ff" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="80" y1="40" x2="620" y2="40" stroke="#0055ff" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Overall Length Marker */}
                <line x1="80" y1="20" x2="620" y2="20" stroke="#ffffff" strokeWidth="1" />
                <text x="310" y="14" fill="#ffffff" fontSize="10" fontFamily="IBM Plex Mono">LENGTH: 4,975 MM</text>

                {/* Car Silhouette Wireframe Outline */}
                <path
                  d="M 80 230 C 100 230, 110 200, 140 190 C 200 170, 260 120, 340 100 C 440 80, 520 110, 560 180 C 580 190, 600 220, 620 230 L 620 250 L 550 250 C 550 210, 490 210, 490 250 L 250 250 C 250 210, 190 210, 190 250 L 80 250 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Wheels Wireframe */}
                <circle cx="220" cy="250" r="32" fill="none" stroke="#ffffff" strokeWidth="2" />
                <circle cx="220" cy="250" r="14" fill="none" stroke="#0055ff" strokeWidth="1.5" />
                <circle cx="520" cy="250" r="32" fill="none" stroke="#ffffff" strokeWidth="2" />
                <circle cx="520" cy="250" r="14" fill="none" stroke="#0055ff" strokeWidth="1.5" />

                {/* Wheelbase Dimension Marker */}
                <line x1="220" y1="280" x2="520" y2="280" stroke="#0055ff" strokeWidth="1" />
                <text x="330" y="295" fill="#0055ff" fontSize="10" fontFamily="IBM Plex Mono">WHEELBASE: 2,990 MM</text>

                {/* Height Dimension Marker */}
                <line x1="640" y1="100" x2="640" y2="260" stroke="#ffffff" strokeWidth="1" />
                <text x="645" y="185" fill="#ffffff" fontSize="10" fontFamily="IBM Plex Mono">HEIGHT: 1,395 MM</text>

                {/* Blue Points of Interest */}
                <circle cx="140" cy="190" r="3" fill="#0055ff" />
                <circle cx="340" cy="100" r="3" fill="#0055ff" />
                <circle cx="560" cy="180" r="3" fill="#0055ff" />
              </svg>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/5 font-mono text-[10px] text-zinc-500 uppercase text-center">
              <div>WIDTH: 1,964 MM</div>
              <div>GROUND CLR: 140 MM</div>
              <div>WHEELS: 21" FORGED</div>
              <div>DRAG: 0.208 CD</div>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* 5. SPECIFICATION TABLE (APPROX 12 ROWS, HAIRLINE, NO CARDS) */}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1520px] mx-auto px-6 lg:px-12 hairline-border-b">
        
        <div className="pb-8 border-b border-white/10 mb-8">
          <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-2">
            // FULL TECHNICAL DOSSIER
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-poster uppercase text-white">
            SPECIFICATION MATRIX
          </h2>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <tbody>
              {[
                { key: 'POWERTRAIN CONFIGURATION', val: 'DUAL PERMANENT MAGNET SYNCHRONOUS MOTORS' },
                { key: 'SYSTEM HORSEPOWER', val: '780 HP' },
                { key: 'PEAK TORQUE', val: '1,050 NM (INSTANTANEOUS)' },
                { key: 'ACCELERATION (0–100 KM/H)', val: '2.7 SECONDS' },
                { key: 'GOVERNED TOP SPEED', val: '310 KM/H' },
                { key: 'BATTERY CELL CHEMISTRY', val: '108 KWH LITHIUM-NICKEL-MANGANESE-COBALT (NCM811)' },
                { key: 'ELECTRICAL VOLTAGE PLATFORM', val: '800-VOLT DUAL INVERTER SILICON CARBIDE' },
                { key: 'MAXIMUM DC RECHARGE RATE', val: '350 KW (10% TO 80% IN 18 MINUTES)' },
                { key: 'CHASSIS SUSPENSION', val: 'ADAPTIVE 3-CHAMBER PNEUMATIC AIR WITH ROAD SCANNER' },
                { key: 'BRAKING SYSTEM', val: 'FRONT 420MM CARBON CERAMIC ROTORS / 10-PISTON MONOBLOCK' },
                { key: 'PASSENGER VOLUME', val: '5 ADULT SEATING CAPACITY' },
                { key: 'AERODYNAMIC COEFFICIENT', val: '0.208 CD (ACTIVE REAR SPOILER DEPLOYED)' },
              ].map((row, idx) => (
                <tr key={row.key} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 text-zinc-500 uppercase tracking-meta w-1/2">
                    0{idx < 9 ? '0' : ''}{idx + 1} — {row.key}
                  </td>
                  <td className="py-4 text-white font-bold tracking-wider text-right">
                    {row.val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 6. CALL TO ACTION: EDITORIAL SHOWROOM FINALE */}
      {/* ========================================================= */}
      <section className="py-28 max-w-[1520px] mx-auto px-6 lg:px-12 text-center">
        <span className="font-mono text-xs uppercase tracking-meta text-[#0055ff] block mb-4">
          // TAKE COMMAND
        </span>
        <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-poster uppercase text-white mb-6">
          YOUR NEXT DRIVE<br />
          <span className="text-[#0055ff]">STARTS HERE.</span>
        </h2>
        <p className="font-sans text-base text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Step into an Autobot studio. Experience tailored electric propulsion and bespoke coachcraft.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/vehicles"
            className="px-8 py-4 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-[#0055ff] text-white hover:bg-[#0047d6] transition-colors"
          >
            EXPLORE ALL MODELS
          </Link>
          <Link
            to="/test-drive"
            className="px-8 py-4 rounded-full font-mono text-xs uppercase tracking-technical font-bold bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            BOOK A TEST DRIVE
          </Link>
        </div>
      </section>

    </div>
  );
};
