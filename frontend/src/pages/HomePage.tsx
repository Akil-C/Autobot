import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Sliders, 
  FileText, 
  Car, 
  Calendar, 
  Headphones, 
  Sparkles,
  Gauge,
  Layers,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { VehicleCard } from '../components/ui/VehicleCard';
import { InteractiveVehicleViewer } from '../components/ui/InteractiveVehicleViewer';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { CurrencyFormatter } from '../services/api';

export const HomePage: React.FC = () => {
  const featuredVehicles = VEHICLES_DATA.slice(0, 6);
  const heroVehicle = VEHICLES_DATA[0]; // Autobot Aero X
  const [selectedColor, setSelectedColor] = useState(heroVehicle.colors[0]);

  const whyAutobotPoints = [
    {
      icon: Cpu,
      title: 'Intelligent Engineering',
      desc: 'Bespoke high-output 800V silicon-carbide architecture coupled with real-time neural torque distribution across all wheels.'
    },
    {
      icon: ShieldCheck,
      title: 'Advanced Safety Suite',
      desc: 'Solid-state LiDAR with 360-degree radar matrix providing predictive active accident avoidance rated 5 Stars across all global test regimes.'
    },
    {
      icon: Zap,
      title: 'Connected Technology',
      desc: 'Autonomous over-the-air evolutionary firmware, continuous machine-learning driver adaptation, and satellite cloud integration.'
    },
    {
      icon: Sparkles,
      title: 'Premium Comfort',
      desc: 'Active acoustic cancellation reducing interior ambient cabin sound to -42dB, complemented by bio-sourced artisanal leather craft.'
    },
    {
      icon: Layers,
      title: 'Sustainable Mobility',
      desc: 'Circular manufacturing footprint using 100% recycled aluminum monocoques, clean hydrogen hybrid stacks, and closed-loop batteries.'
    },
    {
      icon: Award,
      title: 'Customer First Concierge',
      desc: 'White-glove 24/7 dedicated personal ownership representative, door-step maintenance delivery, and lifetime road assistance.'
    }
  ];

  const techHighlights = [
    {
      tag: 'LEVEL 3+ AUTONOMY',
      title: 'Autobot Co-Pilot Neural ADAS',
      desc: 'High-bandwidth neural networks process 1.2 billion environmental calculations per second. Seamless highway hands-free pilot, automatic interchange merging, and precision ultrasonic automated valet parking.',
      img: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80'
    },
    {
      tag: '800V ARCHITECTURE',
      title: 'FlashCharge 350kW Battery Tech',
      desc: 'Next-generation nickel-manganese-cobalt prismatic cells with liquid cooling allow adding 400 km of range in just 15 minutes at any Autobot Supercharging hub.',
      img: 'https://images.unsplash.com/photo-1558441719-74e2d3bb9709?auto=format&fit=crop&w=1200&q=80'
    },
    {
      tag: 'DIGITAL COCKPIT',
      title: 'Curved OLED Panoramic Screen',
      desc: 'An uninterrupted 35.4-inch 8K curved panoramic display stretching from pillar to pillar, accompanied by augmented reality head-up projections mapping navigation directly onto the asphalt.',
      img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="flex flex-col bg-zinc-950 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Background Atmosphere Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2400&q=85"
            alt="Autobot flagship electric vehicle"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Next Generation of Automotive Luxury</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.05] mb-6">
              ENGINEERED FOR <br />
              <span className="gold-gradient-text">WHAT'S NEXT.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-10 max-w-2xl">
              Discover the latest generation of performance, technology and design with Autobot. Electric agility meets handcrafted coachwork.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/vehicles"
                className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:shadow-glow transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Cars</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/configurator"
                className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 transition-all flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Configure Your Car</span>
              </Link>

              <Link
                to="/test-drive"
                className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold text-zinc-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span>Book a Test Drive</span>
              </Link>
            </div>

            {/* Quick Hero Key Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-12 mt-12 border-t border-zinc-800/80 max-w-lg">
              <div>
                <span className="font-display text-2xl sm:text-3xl font-black text-white block">2.7s</span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">0-100 km/h</span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-black text-amber-400 block">780 HP</span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Peak Power</span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-black text-white block">685 km</span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Electric Range</span>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-zinc-500 text-[11px] uppercase tracking-widest gap-1 animate-bounce">
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-amber-400" />
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE COLOR CUSTOMIZER PREVIEW HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
            Interactive Atelier Visualizer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Experience the Autobot Studio
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Interact with our flagship Autobot Aero X fastback in real-time. Switch metallic paint finishes, toggle matrix laser illumination, and audition the electric turbine sound.
          </p>
        </div>

        <InteractiveVehicleViewer
          vehicle={heroVehicle}
          selectedColor={selectedColor}
          onColorChange={(color) => setSelectedColor(color)}
        />
      </section>

      {/* 3. FEATURED MODELS SECTION */}
      <section className="py-20 bg-zinc-950/80 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Curated Lineup
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Featured Showroom Models
              </h2>
            </div>
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400 hover:text-amber-300 group"
            >
              <span>Explore All 15 Models</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY AUTOBOT SECTION */}
      <section className="py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              The Autobot Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
              Why Autobot?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              We reject automotive compromise. Every millimeter of an Autobot vehicle is sculptured to elevate the human experience on the road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyAutobotPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 rounded-2xl hover:border-amber-400/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. VEHICLE TECHNOLOGY SHOWCASE */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Next-Gen Innovations
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
              Pioneering Automotive Technology
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              ADAS, Connected Cloud, Smart Infotainment, and High-Energy EV Powertrains engineered in-house.
            </p>
          </div>

          <div className="space-y-12">
            {techHighlights.map((tech, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
                    {tech.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4">
                    {tech.title}
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                    {tech.desc}
                  </p>
                  <Link
                    to="/technology"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>Read Technology Whitepaper</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                </div>

                <div className={`aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={tech.img}
                    alt={tech.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CUSTOMER EXPERIENCE SECTION */}
      <section className="py-24 bg-zinc-900/50 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Frictionless Acquisition
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
              The Autobot Ownership Experience
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              From online atelier configuration to door-to-door white glove delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="font-display text-3xl font-black text-zinc-700 block mb-3">01</span>
                <h4 className="font-display text-lg font-bold text-white mb-2">Online Configurator</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tailor exterior paint, handcrafted cabins, sport wheels, and driver-assist packages with live price estimation.
                </p>
              </div>
              <Link to="/configurator" className="mt-6 text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline">
                Start Building →
              </Link>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="font-display text-3xl font-black text-zinc-700 block mb-3">02</span>
                <h4 className="font-display text-lg font-bold text-white mb-2">Instant Quotation</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Generate formal itemized quotation PDFs certified with valid taxes, warranty coverage, and seasonal financing.
                </p>
              </div>
              <Link to="/vehicles" className="mt-6 text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline">
                Get Quotation →
              </Link>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="font-display text-3xl font-black text-zinc-700 block mb-3">03</span>
                <h4 className="font-display text-lg font-bold text-white mb-2">Priority Test Drive</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Book a slot at our flagship experience centers or request a private test-drive directly at your residence.
                </p>
              </div>
              <Link to="/test-drive" className="mt-6 text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline">
                Book Test Drive →
              </Link>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="font-display text-3xl font-black text-zinc-700 block mb-3">04</span>
                <h4 className="font-display text-lg font-bold text-white mb-2">Lifetime Concierge</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Continuous support, remote telemetry diagnostics, and complimentary nationwide fast-charging network access.
                </p>
              </div>
              <Link to="/contact" className="mt-6 text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline">
                Contact Concierge →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. GRAND CALL TO ACTION */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black border-t border-zinc-900">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
            alt="Autobot Track"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 block">
            The Horizon Awaits
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-tight mb-6">
            YOUR NEXT DRIVE <br />
            <span className="gold-gradient-text">STARTS HERE.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Step into the era of intelligent luxury. Schedule an exclusive one-on-one session with our automotive product specialists today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/vehicles"
              className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:shadow-glow transition-all"
            >
              Explore Models
            </Link>
            <Link
              to="/test-drive"
              className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-all"
            >
              Book a Test Drive
            </Link>
            <Link
              to="/configurator"
              className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold text-amber-400 hover:text-white border border-amber-400/30 hover:border-amber-400 transition-all"
            >
              Configure Online
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
