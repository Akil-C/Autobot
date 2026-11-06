import React, { useState } from 'react';
import { 
  RotateCw, 
  Sun, 
  Moon, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  Maximize2, 
  Check, 
  Layers 
} from 'lucide-react';
import { Vehicle, VehicleColor } from '../../types/vehicle';

interface InteractiveVehicleViewerProps {
  vehicle: Vehicle;
  selectedColor: VehicleColor;
  onColorChange?: (color: VehicleColor) => void;
  className?: string;
}

export const InteractiveVehicleViewer: React.FC<InteractiveVehicleViewerProps> = ({
  vehicle,
  selectedColor,
  onColorChange,
  className = ''
}) => {
  const [viewAngle, setViewAngle] = useState<'front' | 'side' | 'rear'>('front');
  const [lightsActive, setLightsActive] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [spoilerDeployed, setSpoilerDeployed] = useState<boolean>(false);

  // Play synthetic automotive throttle acoustic sound using Web Audio API!
  const toggleEngineAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Electric hyper-turbine drone frequency ramp
      osc.type = vehicle.fuelType === 'Pure Electric' ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(65, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 1.8);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 3.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.6);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3600);
    } catch (e) {
      console.warn('Audio not allowed', e);
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800 shadow-2xl flex flex-col ${className}`}>
      
      {/* Studio Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-zinc-300">Live 3D Studio</span>
          <span className="text-zinc-600">|</span>
          <span className="text-amber-400 font-bold">{selectedColor.name}</span>
        </div>

        {/* View Angles Selector */}
        <div className="pointer-events-auto flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md p-1 rounded-full border border-zinc-800 text-xs">
          {(['front', 'side', 'rear'] as const).map((angle) => (
            <button
              key={angle}
              onClick={() => setViewAngle(angle)}
              className={`px-3 py-1 rounded-full capitalize font-semibold transition-all ${
                viewAngle === angle 
                  ? 'bg-amber-400 text-black shadow-glow' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {angle}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] md:min-h-[480px] flex items-center justify-center p-6 overflow-hidden">
        
        {/* Studio Floor Radial Light Grid */}
        <div 
          className="absolute inset-0 opacity-40 transition-colors duration-500"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${selectedColor.hex}33 0%, rgba(9,10,15,0.8) 55%, #090a0f 100%)`
          }}
        />

        {/* Studio Floor Perspective Ellipse Shadow */}
        <div 
          className="absolute bottom-10 w-[75%] h-16 rounded-[100%] blur-xl opacity-80"
          style={{ background: '#000000' }}
        />

        {/* Interactive Car Canvas & Image Representation */}
        <div className="relative z-10 w-full max-w-4xl transition-all duration-700 ease-out transform">
          
          <img
            src={selectedColor.imageUrl || vehicle.heroImage}
            alt={`${vehicle.name} in ${selectedColor.name}`}
            className="w-full h-auto object-contain max-h-[440px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] transition-all duration-700"
          />

          {/* Dynamic Color Hue Reflection Tint Overlay */}
          <div 
            className="absolute inset-0 mix-blend-color opacity-30 pointer-events-none rounded-2xl transition-all duration-700"
            style={{ backgroundColor: selectedColor.hex }}
          />

          {/* Headlights Neon Beams effect when active */}
          {lightsActive && (
            <div className="absolute top-[38%] left-[2%] w-32 h-16 bg-cyan-400/20 blur-2xl rounded-full pointer-events-none animate-pulse-glow" />
          )}

          {/* Active Aero Spoiler indicator */}
          {spoilerDeployed && (
            <div className="absolute -top-3 right-[15%] px-2.5 py-0.5 rounded-full text-[10px] bg-amber-400 text-black font-extrabold uppercase tracking-widest shadow-glow animate-bounce">
              Aero Active: +140kg Downforce
            </div>
          )}
        </div>

      </div>

      {/* Interactive Controls Toolbar & Color Switcher */}
      <div className="p-5 bg-zinc-950/90 border-t border-zinc-800/80 z-20 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Exterior Colors Palette */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Finish:
          </span>
          <div className="flex items-center gap-2">
            {vehicle.colors.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => onColorChange && onColorChange(color)}
                  className={`group relative w-8 h-8 rounded-full p-0.5 transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-amber-400 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  title={`${color.name} (${color.price === 0 ? 'Standard' : `+₹${color.price.toLocaleString('en-IN')}`})`}
                >
                  <div
                    className="w-full h-full rounded-full border border-white/20 shadow-inner flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <Check className={`w-3.5 h-3.5 ${color.hex === '#f8fafc' || color.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Toggles (Sound, Lights, Aero) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLightsActive(!lightsActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              lightsActive 
                ? 'bg-amber-400/15 border-amber-400/40 text-amber-400' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Toggle Matrix Laser Headlights"
          >
            {lightsActive ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            <span>Matrix Lights</span>
          </button>

          <button
            onClick={() => setSpoilerDeployed(!spoilerDeployed)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              spoilerDeployed 
                ? 'bg-amber-400/15 border-amber-400/40 text-amber-400' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Deploy Active Variable Rear Wing"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Active Aero</span>
          </button>

          <button
            onClick={toggleEngineAudio}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isPlayingAudio 
                ? 'bg-amber-400 text-black font-bold animate-pulse' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Synthesize Powertrain Acoustic Tone"
          >
            {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isPlayingAudio ? 'Accelerating...' : 'Engine Note'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
