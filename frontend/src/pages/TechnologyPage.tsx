import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Eye, 
  Wifi, 
  Layers, 
  Radio, 
  Volume2, 
  Activity, 
  ArrowRight 
} from 'lucide-react';

export const TechnologyPage: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Autobot Neural ADAS (Level 3+)',
      tag: 'PREDICTIVE PERCEPTION',
      desc: 'Our proprietary perception engine fuses solid-state forward LiDAR, 12 ultrasonic arrays, and 8 high-definition surround cameras. The onboard neural processor runs 1,200 teraflops of compute, predicting erratic vehicular maneuvers 450 milliseconds before they manifest.'
    },
    {
      icon: Zap,
      title: '800V Ultra-High Voltage Platform',
      tag: 'POWERTRAIN EFFICIENCY',
      desc: 'Silicon-carbide (SiC) inverters operate at 99.2% electrical efficiency. The 800V architecture enables sustained high-speed autobahn cruising without thermal throttling and adds 400 km of range in just 15 minutes via 350kW DC chargers.'
    },
    {
      icon: Wifi,
      title: 'Autonomous OTA Evolutionary Kernel',
      tag: 'CLOUD CONNECTIVITY',
      desc: 'An Autobot is not static machinery; it is an evolving supercomputer. Encrypted gigabit satellite uplinks deliver weekly improvements to torque vectoring maps, autonomous highway lane-change algorithms, and dynamic cabin lighting sequences.'
    },
    {
      icon: Volume2,
      title: 'Acoustic Soundstage with Active Noise Shield',
      tag: 'ACOUSTIC ENGINEERING',
      desc: 'Triple-layer acoustic laminate glazing meets dual interior micro-sensors that measure suspension vibrations, generating inverted acoustic sound waves through 22 Dolby Atmos speakers to cancel road and tire resonance.'
    },
    {
      icon: Activity,
      title: 'Predictive MagneRide & Pneumatic Chassis',
      tag: 'CHASSIS DYNAMICS',
      desc: 'Dual-optical road scanners analyze pavement imperfections 15 meters ahead at up to 120 km/h, continuously adjusting hydraulic damper stiffness within 5 milliseconds for a magic-carpet ride across broken city asphalt.'
    },
    {
      icon: ShieldCheck,
      title: 'Armor Cell Composite Safety Cage',
      tag: 'PASSIVE SURVIVABILITY',
      desc: 'Hydroformed high-strength boron steel combines with woven carbon-fiber door sills, dissipating multi-angle side impacts while protecting the liquid-submerged battery pack within an airtight titanium cocoon.'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Science & Architecture</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            Intelligence at the Atomic Level
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Delve into the proprietary algorithms, thermal battery engineering, and silicon-carbide powertrains that set Autobot apart from legacy automotive manufacturing.
          </p>
        </div>

        {/* Hero Technology Showcase */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
                Digital Cockpit Revolution
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
                The 35.4" Continuous Curved OLED Cockpit
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Spanning the dashboard from driver to passenger, our unified active-matrix OLED panel features 8K pixel density with zero blue-light fatigue. Combined with head-up augmented reality that paints real-time navigation markers over highway asphalt.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-display text-3xl font-black text-white block">8K</span>
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Resolution</span>
                </div>
                <div className="border-x border-zinc-800 px-6">
                  <span className="font-display text-3xl font-black text-amber-400 block">&lt; 1 ms</span>
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Touch Latency</span>
                </div>
                <div>
                  <span className="font-display text-3xl font-black text-white block">35.4"</span>
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Curved Display</span>
                </div>
              </div>
            </div>

            <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-700/60 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
                alt="Autobot cockpit display"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-zinc-800 hover:border-amber-400/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/configurator"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow-glow"
          >
            <span>Configure a Technology Package</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
