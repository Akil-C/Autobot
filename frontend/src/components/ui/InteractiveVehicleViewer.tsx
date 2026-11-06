import React, { useState } from 'react';
import { Check, Sun, Moon, Layers, Volume2, VolumeX } from 'lucide-react';
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
  const [lightsActive, setLightsActive] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [spoilerDeployed, setSpoilerDeployed] = useState<boolean>(false);

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
      
      osc.type = vehicle.fuelType === 'Pure Electric' ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(70, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + 1.6);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 3.0);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.3);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3300);
    } catch (e) {
      console.warn('Audio not allowed', e);
    }
  };

  return (
    <div className={`bg-[#0f1014] hairline-border relative flex flex-col ${className}`}>
      
      {/* Studio Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0055ff]" />
          <span className="text-zinc-400 uppercase tracking-meta">ATELIER STUDIO // 3D VIEW</span>
        </div>

        <div className="text-zinc-500 uppercase tracking-meta hidden sm:block">
          FINISH: <strong className="text-white">{selectedColor.name}</strong>
        </div>
      </div>

      {/* Main Vehicle Canvas Area (No Card) */}
      <div className="relative w-full aspect-[16/9] min-h-[340px] md:min-h-[460px] flex items-center justify-center p-8 overflow-hidden">
        
        {/* Subtle Ground Shadow & Radial Glow */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${selectedColor.hex}33 0%, transparent 60%)`
          }}
        />

        {/* Photorealistic Vehicle Display */}
        <div className="relative z-10 w-full max-w-3xl transition-all duration-500">
          <img
            src={selectedColor.imageUrl || vehicle.heroImage}
            alt={`${vehicle.name} in ${selectedColor.name}`}
            className="w-full h-auto object-contain max-h-[400px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
          />

          {/* Color Reflection Layer */}
          <div 
            className="absolute inset-0 mix-blend-color opacity-25 pointer-events-none transition-all duration-500"
            style={{ backgroundColor: selectedColor.hex }}
          />

          {/* Active Aero Pill */}
          {spoilerDeployed && (
            <div className="absolute top-2 right-4 font-mono text-[10px] bg-[#0055ff] text-white px-2.5 py-1 tracking-meta uppercase">
              ACTIVE AERO: +140KG DOWNFORCE
            </div>
          )}
        </div>

      </div>

      {/* Technical Toolbar & Circular Colour Selectors */}
      <div className="p-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        
        {/* Exterior Circular/Pill Color Selectors */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 uppercase tracking-meta text-[11px]">
            COLOUR:
          </span>
          <div className="flex items-center gap-2">
            {vehicle.colors.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => onColorChange && onColorChange(color)}
                  className={`w-7 h-7 rounded-full p-0.5 transition-all ${
                    isSelected 
                      ? 'ring-2 ring-[#0055ff] scale-110' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  title={`${color.name} (${color.price === 0 ? 'Included' : `+₹${color.price.toLocaleString('en-IN')}`})`}
                >
                  <div
                    className="w-full h-full rounded-full border border-white/20 flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <Check className={`w-3 h-3 ${color.hex === '#f8fafc' || color.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLightsActive(!lightsActive)}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-technical border transition-all ${
              lightsActive
                ? 'border-[#0055ff] text-[#0055ff] bg-[#0055ff]/10'
                : 'border-white/10 text-zinc-500 hover:text-white'
            }`}
          >
            LIGHTS {lightsActive ? '[ON]' : '[OFF]'}
          </button>

          <button
            onClick={() => setSpoilerDeployed(!spoilerDeployed)}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-technical border transition-all ${
              spoilerDeployed
                ? 'border-[#0055ff] text-[#0055ff] bg-[#0055ff]/10'
                : 'border-white/10 text-zinc-500 hover:text-white'
            }`}
          >
            AERO {spoilerDeployed ? '[ACTIVE]' : '[RETRACTED]'}
          </button>

          <button
            onClick={toggleEngineAudio}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-technical border transition-all ${
              isPlayingAudio
                ? 'border-[#0055ff] text-white bg-[#0055ff]'
                : 'border-white/10 text-zinc-500 hover:text-white'
            }`}
          >
            {isPlayingAudio ? 'ACOUSTIC [ON]' : 'AUDIO NOTE'}
          </button>
        </div>

      </div>

    </div>
  );
};
