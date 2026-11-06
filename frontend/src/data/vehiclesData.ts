import { Vehicle, Showroom, SpecialOffer } from '../types/vehicle';

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'autobot-aero-x',
    slug: 'autobot-aero-x',
    name: 'Autobot Aero X',
    tagline: 'The Ultimate Electric Performance Fastback',
    category: 'Electric Sedan',
    startingPrice: 8500000,
    fuelType: 'Pure Electric',
    transmission: 'Dual-Speed Direct Drive',
    horsepower: 780,
    torqueNm: 1050,
    rangeOrMileage: '685 km WLTP',
    seatingCapacity: 5,
    topSpeedKmh: 310,
    acceleration0to100: 2.7,
    safetyRatingStars: 5,
    batteryCapacityKwh: 108,
    chargingTimeMin: 18,
    dimensions: {
      lengthMm: 4975,
      widthMm: 1964,
      heightMm: 1395,
      wheelbaseMm: 2990,
      curbWeightKg: 2180,
    },
    heroImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'c1', name: 'Obsidian Black', hex: '#0f1015', price: 0, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'metallic' },
      { id: 'c2', name: 'Titanium Matte Silver', hex: '#8a929a', price: 45000, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'matte' },
      { id: 'c3', name: 'Apex Crimson Red', hex: '#b91c1c', price: 55000, imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'pearl' },
      { id: 'c4', name: 'Polar Arctic White', hex: '#f8fafc', price: 0, imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'gloss' },
      { id: 'c5', name: 'Hyper Cyan Neon', hex: '#06b6d4', price: 65000, imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'metallic' },
    ],
    variants: [
      { id: 'var-long-range', name: 'Aero X Extended Range', badge: 'LR AWD', priceDelta: 0, drivetrain: 'Dual-Motor AWD', acceleration: '3.4s', topSpeed: '260 km/h', rangeOrMileage: '740 km', power: '580 hp', torque: '820 Nm', features: ['Adaptive Air Suspension', 'Matrix LED Headlights', 'Panoramic Skyview Roof'] },
      { id: 'var-track-gt', name: 'Aero X Performance GT', badge: 'GT TRACK', priceDelta: 1400000, drivetrain: 'Tri-Motor Torque Vectoring', acceleration: '2.7s', topSpeed: '310 km/h', rangeOrMileage: '640 km', power: '780 hp', torque: '1050 Nm', features: ['Carbon-Ceramic Brakes', 'Active Aerodynamic Wing', 'Nappa Alcantara Cockpit', 'Autobot ADAS Level 3+'] }
    ],
    interiorOptions: [
      { id: 'int-graphite', name: 'Graphite Shadow Leather', material: 'Eco-Craft Vegan Leather', colorName: 'Stealth Black', hex: '#18181b', price: 0 },
      { id: 'int-saddle', name: 'Cognac Saddle Alcantara', material: 'Italian Perforated Semi-Aniline', colorName: 'Cognac Tan', hex: '#9a3412', price: 85000 },
      { id: 'int-lunar', name: 'Lunar Pure White', material: 'Stain-Resistant Bio-Synthetic Silk', colorName: 'Chalk White', hex: '#f4f4f5', price: 95000 },
    ],
    wheels: [
      { id: 'wh-20', name: '20" Vortex Aerodynamic Alloys', sizeInch: 20, finish: 'Diamond Cut Carbon Grey', price: 0 },
      { id: 'wh-21', name: '21" Blade Forged Monoblock', sizeInch: 21, finish: 'Satin Black with Cyber-Amber Lip', price: 120000 },
      { id: 'wh-22', name: '22" Stealth Carbon Aero Turbines', sizeInch: 22, finish: 'Full Forged Carbon Composite', price: 210000 },
    ],
    packages: [
      { id: 'pkg-tech', name: 'Autobot Intelligent Co-Pilot Suite', description: 'LiDAR + 12 Ultrasonic radar arrays for highway autonomous lane transit and auto summon.', price: 180000, highlightFeatures: ['Highway Pilot Pro', 'Remote Smart Summon', 'Augmented Reality HUD with Night Vision'] },
      { id: 'pkg-audio', name: 'Acoustic Soundstage 22-Speaker Studio', description: 'Custom tuned 1400W 3D Dolby Atmos sound with active road-noise cancellation.', price: 110000, highlightFeatures: ['Dolby Atmos Spatial Audio', 'Seat-Integrated Headrest Speakers', 'Active Cabin Acoustic Isolation'] },
      { id: 'pkg-winter', name: 'All-Climate Arctic Comfort Pack', description: 'Heated front and rear seats, steering wheel, heated windscreen washer jets & thermal battery preheat.', price: 65000, highlightFeatures: ['Sub-Zero Preconditioning', 'Steering Heat', 'Quad-Zone Climate Control'] }
    ],
    accessories: [
      { id: 'acc-wallbox', name: 'Autobot 22kW Super-Fast Home Wallbox', category: 'Tech', price: 65000, description: 'Smart bidirectional Wi-Fi connected home charger.' },
      { id: 'acc-mats', name: 'All-Weather Heavy Duty Floor & Trunk Liner', category: 'Protection', price: 18000, description: 'Laser-measured waterproof recycled elastomer mats.' },
      { id: 'acc-cover', name: 'Bespoke Satin Weatherproof Car Cloak', category: 'Protection', price: 28000, description: 'Hand-tailored breathable indoor/outdoor protective cover.' },
      { id: 'acc-carrier', name: 'Aerodynamic Roof Cargo Pod (480L)', category: 'Lifestyle', price: 75000, description: 'Wind-tunnel optimized carbon-finish roof storage.' },
    ],
    keyFeatures: [
      '800V Ultra-Fast Architecture (10% to 80% in 18 minutes)',
      'Cyber-Cockpit with 35.4" Continuous Curved OLED Display',
      'Dual Dynamic Air Suspension with Predictive Road Surface Scanner',
      'Biometric Driver Profile Recognition and Smart Ambient Synchronizer'
    ],
    detailedSpecifications: [
      {
        category: 'Powertrain & Performance',
        specs: [
          { label: 'System Horsepower', value: '780 HP' },
          { label: 'Torque', value: '1,050 Nm Peak' },
          { label: '0–100 km/h', value: '2.7 seconds' },
          { label: 'Top Speed', value: '310 km/h (electronically governed)' }
        ]
      },
      {
        category: 'Battery & Charging',
        specs: [
          { label: 'Battery Capacity', value: '108 kWh Lithium-Nickel-Cobalt' },
          { label: 'Fast Charging Rate', value: 'Up to 350 kW DC Fast Charge' },
          { label: 'On-Board Charger', value: '22 kW AC Three-Phase' },
          { label: 'Real World Range', value: '685 km WLTP Combined' }
        ]
      },
      {
        category: 'Chassis & Dynamics',
        specs: [
          { label: 'Suspension', value: 'Adaptive 3-Chamber Pneumatic Air with Active Roll Stabilization' },
          { label: 'Steering', value: 'All-Wheel Steering (rear angle up to 8.5°)' },
          { label: 'Brakes', value: 'Front 420mm Carbon-Ceramic with 10-piston calipers' },
          { label: 'Drag Coefficient', value: '0.208 Cd' }
        ]
      }
    ],
    status: 'New Launch',
    launchDate: '2026-03-01',
    description: 'The Autobot Aero X reimagines the grand touring sedan for the zero-emissions era. Built upon our custom 800-volt skateboard platform, the Aero X marries sculpted wind-cheating contours with blistering hypercar acceleration.'
  },
  {
    id: 'autobot-phantom-gt',
    slug: 'autobot-phantom-gt',
    name: 'Autobot Phantom GT',
    tagline: 'Pure Thoroughbred Grand Touring Masterpiece',
    category: 'Performance',
    startingPrice: 14500000,
    fuelType: 'Twin-Turbo V8',
    transmission: '8-Speed Dual-Clutch F1 Paddle Shift',
    horsepower: 820,
    torqueNm: 980,
    rangeOrMileage: '11.8 L / 100km',
    seatingCapacity: 4,
    topSpeedKmh: 345,
    acceleration0to100: 2.9,
    safetyRatingStars: 5,
    dimensions: {
      lengthMm: 4890,
      widthMm: 1980,
      heightMm: 1290,
      wheelbaseMm: 2850,
      curbWeightKg: 1740,
    },
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'p1', name: 'Midnight Graphite', hex: '#1e2229', price: 0, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'metallic' },
      { id: 'p2', name: 'Monza Rosso Corsa', hex: '#dc2626', price: 90000, imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'gloss' },
      { id: 'p3', name: 'Quicksilver Mirror Chrome', hex: '#cbd5e1', price: 120000, imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'metallic' },
      { id: 'p4', name: 'British Racing Emerald', hex: '#064e3b', price: 105000, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'pearl' }
    ],
    variants: [
      { id: 'var-gt-stradale', name: 'Phantom GT Stradale', badge: 'STRADALE', priceDelta: 0, drivetrain: 'Rear-Bias All-Wheel Drive', acceleration: '3.1s', topSpeed: '330 km/h', rangeOrMileage: '12.4 L / 100km', power: '740 hp', torque: '890 Nm', features: ['Active Exhaust Bypass Valves', 'Adaptive MagneRide Damping', 'Matrix Laser Beams'] },
      { id: 'var-gt-corsa', name: 'Phantom GT Corsa Scuderia', badge: 'CORSA', priceDelta: 2200000, drivetrain: 'Electronic Limited-Slip Differential', acceleration: '2.9s', topSpeed: '345 km/h', rangeOrMileage: '11.8 L / 100km', power: '820 hp', torque: '980 Nm', features: ['Titanium Inconel Exhaust', 'Dry Sump Lubrication', 'Full Carbon Monocoque Aerokit'] }
    ],
    interiorOptions: [
      { id: 'p-int-1', name: 'Nero Black with Carmine Contrast Stitch', material: 'Full Grain Bridge of Weir Leather', colorName: 'Nero Red', hex: '#111827', price: 0 },
      { id: 'p-int-2', name: 'Tuscan Tan with Carbon Fiber Inlays', material: 'Hand-Selected Semi-Aniline', colorName: 'Tuscan Sun', hex: '#b45309', price: 140000 }
    ],
    wheels: [
      { id: 'p-wh-1', name: '21" Forged Lightweight GT Spoke', sizeInch: 21, finish: 'Liquid Smoke', price: 0 },
      { id: 'p-wh-2', name: '22" Center-Lock Lightweight Racing Rims', sizeInch: 22, finish: 'Gloss Bronze', price: 190000 }
    ],
    packages: [
      { id: 'p-pkg-1', name: 'Carbon Fiber Exterior Aerokit', description: 'Front splitter, side skirts, rear diffuser and mirror caps sculptured in exposed twill carbon.', price: 340000, highlightFeatures: ['Exposed Carbon Splitter', 'Rear Venturi Diffuser', 'Downforce Optimizers'] }
    ],
    accessories: [
      { id: 'p-acc-1', name: 'Custom Italian Leather 4-Piece Luggage Set', category: 'Lifestyle', price: 110000, description: 'Precision dimensioned to slip into the Phantom rear boot.' }
    ],
    keyFeatures: [
      'Twin-Turbocharged 4.0L Flat-Plane Crank V8 with Dry Sump',
      'Electronic Active Differential with Race Mode Vectoring',
      'Carbon-Reinforced Polymer (CFRP) Passenger Safety Cell',
      'Active Variable Aero Wing with Air-Braking Mode'
    ],
    detailedSpecifications: [
      {
        category: 'Engine & Transmission',
        specs: [
          { label: 'Displacement', value: '3,996 cc Hot-V Twin-Turbo' },
          { label: 'Maximum Power', value: '820 HP @ 7,800 RPM' },
          { label: 'Redline', value: '8,500 RPM' },
          { label: 'Transmission', value: '8-Speed Dual-Clutch with Launch Control' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2025-11-15',
    description: 'Engineered for pure tactile visceral emotion. The Autobot Phantom GT channels classic endurance sports car lineage with contemporary aerospace composite technologies.'
  },
  {
    id: 'autobot-apex-suv',
    slug: 'autobot-apex-suv',
    name: 'Autobot Apex SUV',
    tagline: 'Commanding Luxury & Unshakable Electric Presence',
    category: 'Electric SUV',
    startingPrice: 9800000,
    fuelType: 'Pure Electric',
    transmission: 'Intelligent e-AWD',
    horsepower: 650,
    torqueNm: 920,
    rangeOrMileage: '620 km WLTP',
    seatingCapacity: 7,
    topSpeedKmh: 250,
    acceleration0to100: 3.8,
    safetyRatingStars: 5,
    batteryCapacityKwh: 115,
    chargingTimeMin: 22,
    dimensions: {
      lengthMm: 5120,
      widthMm: 2010,
      heightMm: 1740,
      wheelbaseMm: 3110,
      curbWeightKg: 2490,
    },
    heroImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'ap1', name: 'Stealth Obsidian', hex: '#0f172a', price: 0, imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'gloss' },
      { id: 'ap2', name: 'Nordic Frost Pearl', hex: '#e2e8f0', price: 50000, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'pearl' },
      { id: 'ap3', name: 'Sahara Sand Gold', hex: '#ca8a04', price: 75000, imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'metallic' },
      { id: 'ap4', name: 'Deep Pacific Sapphire', hex: '#1e3a8a', price: 60000, imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80', exteriorFinish: 'metallic' },
    ],
    variants: [
      { id: 'var-apex-exec', name: 'Apex Executive Lounge', badge: 'EXECUTIVE', priceDelta: 0, drivetrain: 'Intelligent e-AWD', acceleration: '4.2s', topSpeed: '230 km/h', rangeOrMileage: '650 km', power: '540 hp', torque: '780 Nm', features: ['First-Class Reclining Rear Captain Seats', 'Dual 16" Rear 4K Entertainment Screens', 'Air Purifier with Ionizer'] },
      { id: 'var-apex-plaid', name: 'Apex Dynamic First Edition', badge: 'DYNAMIC AWD', priceDelta: 1600000, drivetrain: 'Tri-Motor Super-Vectoring', acceleration: '3.8s', topSpeed: '250 km/h', rangeOrMileage: '610 km', power: '650 hp', torque: '920 Nm', features: ['Off-Road Air Lift (up to 280mm clearance)', '22-Inch Polished Chromatic Rims', 'Soft-Close Magnetic Doors'] }
    ],
    interiorOptions: [
      { id: 'ap-int-1', name: 'Ivory Cream & Open-Pore Walnut', material: 'Vegetable-Tanned Semi-Aniline', colorName: 'Ivory Elegance', hex: '#fef3c7', price: 0 },
      { id: 'ap-int-2', name: 'Espresso Truffle with Brushed Aluminium', material: 'Nappa Masterhide', colorName: 'Espresso', hex: '#451a03', price: 95000 },
    ],
    wheels: [
      { id: 'ap-wh-1', name: '21" Elegance Turbine Alloys', sizeInch: 21, finish: 'Diamond Cut Gunmetal', price: 0 },
      { id: 'ap-wh-2', name: '23" Executive Chiseled Monoblock', sizeInch: 23, finish: 'Polished Ceramic Silver', price: 160000 }
    ],
    packages: [
      { id: 'ap-pkg-1', name: 'Rear VIP Chauffeur Package', description: 'Heated, ventilated, 10-point massage seats with motorized footrests and folding aircraft tray tables.', price: 210000, highlightFeatures: ['10-Point Shiatsu Massage', 'Refrigerated Champagne Cooler', 'Privacy Glass with Power Blinds'] }
    ],
    accessories: [
      { id: 'ap-acc-1', name: 'Electrically Deployable Tow Hitch & Harness', category: 'Convenience', price: 55000, description: 'Supports 3,500 kg towing with trailer sway stabilization.' }
    ],
    keyFeatures: [
      'Tri-Chamber Air Suspension with Terrain Response Mode',
      'Panoramic Skyroof with Embedded Starlight LEDs',
      'Ultra-Low Cabin Noise with Active Acoustic Counter-Wave Tech',
      '7-Seat Modular Fold-Flat Electric Architecture'
    ],
    detailedSpecifications: [
      {
        category: 'Capabilities',
        specs: [
          { label: 'Wading Depth', value: '850 mm' },
          { label: 'Max Towing Capacity', value: '3,500 kg' },
          { label: 'Cargo Volume', value: '850L (expanded to 2,400L)' },
          { label: 'Air Clearance Lift', value: '180mm to 285mm adjustable' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2025-09-20',
    description: 'The pinnacle of electric family travel and executive chauffeur luxury. Autobot Apex SUV delivers cathedral-like silence and uncompromising safety across every terrain.'
  },
  {
    id: 'autobot-vanguard',
    slug: 'autobot-vanguard',
    name: 'Autobot Vanguard',
    tagline: 'The Modern Benchmark in Executive Luxury',
    category: 'Sedan',
    startingPrice: 6200000,
    fuelType: 'Plug-in Hybrid',
    transmission: '9-Speed Tronic Automatic',
    horsepower: 480,
    torqueNm: 700,
    rangeOrMileage: '1.9 L / 100km (110 km pure EV mode)',
    seatingCapacity: 5,
    topSpeedKmh: 260,
    acceleration0to100: 4.4,
    safetyRatingStars: 5,
    batteryCapacityKwh: 28,
    chargingTimeMin: 35,
    dimensions: {
      lengthMm: 5040,
      widthMm: 1910,
      heightMm: 1460,
      wheelbaseMm: 3020,
      curbWeightKg: 2020,
    },
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'v1', name: 'Black Onyx', hex: '#0a0a0a', price: 0, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80' },
      { id: 'v2', name: 'Mineral Steel Blue', hex: '#334155', price: 35000, imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80' },
      { id: 'v3', name: 'Glacier Silver Metallic', hex: '#cbd5e1', price: 0, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80' },
    ],
    variants: [
      { id: 'v-base', name: 'Vanguard Prestige PHEV', badge: 'PRESTIGE', priceDelta: 0, drivetrain: 'Intelligent e-AWD', acceleration: '4.9s', topSpeed: '240 km/h', rangeOrMileage: '110 km EV Range', power: '420 hp', torque: '620 Nm', features: ['Harman 16-Speaker Audio', 'Panoramic Sunroof', 'Level 2 ADAS'] },
      { id: 'v-master', name: 'Vanguard Ultimate Edition', badge: 'ULTIMATE', priceDelta: 950000, drivetrain: 'Performance Hybrid AWD', acceleration: '4.4s', topSpeed: '260 km/h', rangeOrMileage: '100 km EV Range', power: '480 hp', torque: '700 Nm', features: ['Head-Up Display', 'Rear Seat Entertainment', 'Soft-Close Doors'] }
    ],
    interiorOptions: [
      { id: 'vi-1', name: 'Graphite Black Leather', material: 'Perforated Dakota Leather', colorName: 'Graphite', hex: '#18181b', price: 0 },
      { id: 'vi-2', name: 'Mocha Brown with Ash Wood', material: 'Valcona Luxury Leather', colorName: 'Mocha', hex: '#78350f', price: 65000 }
    ],
    wheels: [
      { id: 'vw-1', name: '19" Multispoke Silver Finish', sizeInch: 19, finish: 'Silver', price: 0 },
      { id: 'vw-2', name: '20" Aeroblade Anthracite', sizeInch: 20, finish: 'Anthracite', price: 75000 }
    ],
    packages: [
      { id: 'vp-1', name: 'Comfort Executive Pack', description: 'Quad zone climate control, solar attenuating glass, and wireless rapid chargers.', price: 95000, highlightFeatures: ['Solar Glass', 'Wireless Induction Chargets', 'Four-Zone A/C'] }
    ],
    accessories: [
      { id: 'va-1', name: 'High-Fidelity Autobot DashCam 4K Dual', category: 'Tech', price: 22000, description: 'Stealth-mounted front and rear 4K night-vision recorder.' }
    ],
    keyFeatures: [
      'Twin-Engine Hybrid: 2.0L Turbo + High-Torque Electric Motor',
      'Over-the-Air Connected 5G Autonomous Drive Architecture',
      'Dynamic Laser Ambient Lighting with 64 Color Spectrums'
    ],
    detailedSpecifications: [
      {
        category: 'Engine & Efficiency',
        specs: [
          { label: 'Total Output', value: '480 HP / 700 Nm' },
          { label: 'Electric Only Range', value: 'Up to 110 km pure zero emissions' },
          { label: 'Combined Range', value: 'Over 920 km on a single tank + charge' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2025-06-10',
    description: 'Designed for the corporate boardroom and cross-country transits alike. Autobot Vanguard is the intelligent synthesis of athletic elegance and hybrid efficiency.'
  },
  {
    id: 'autobot-pulse-ev',
    slug: 'autobot-pulse-ev',
    name: 'Autobot Pulse EV',
    tagline: 'Agile Urban Energy & Sculpted Electric Utility',
    category: 'Compact SUV',
    startingPrice: 3800000,
    fuelType: 'Pure Electric',
    transmission: 'Single-Speed Electronic',
    horsepower: 310,
    torqueNm: 450,
    rangeOrMileage: '520 km WLTP',
    seatingCapacity: 5,
    topSpeedKmh: 195,
    acceleration0to100: 5.6,
    safetyRatingStars: 5,
    batteryCapacityKwh: 72,
    chargingTimeMin: 24,
    dimensions: {
      lengthMm: 4460,
      widthMm: 1850,
      heightMm: 1610,
      wheelbaseMm: 2740,
      curbWeightKg: 1810,
    },
    heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'pu1', name: 'Cyber Blue Metallic', hex: '#0284c7', price: 25000, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80' },
      { id: 'pu2', name: 'Solaris Yellow', hex: '#eab308', price: 30000, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80' },
      { id: 'pu3', name: 'Asphalt Matte Grey', hex: '#4b5563', price: 25000, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80' },
      { id: 'pu4', name: 'Crystal Snow White', hex: '#ffffff', price: 0, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'pu-city', name: 'Pulse City Pro', badge: 'CITY PRO', priceDelta: 0, drivetrain: 'Single-Motor RWD', acceleration: '6.4s', topSpeed: '180 km/h', rangeOrMileage: '450 km', power: '240 hp', torque: '350 Nm', features: ['14" Floating Central Touchscreen', '360° Bird-Eye Camera'] },
      { id: 'pu-awd', name: 'Pulse Sport AWD', badge: 'SPORT AWD', priceDelta: 550000, drivetrain: 'Dual-Motor AWD', acceleration: '5.6s', topSpeed: '195 km/h', rangeOrMileage: '520 km', power: '310 hp', torque: '450 Nm', features: ['All-Wheel Drive', 'Panoramic Sunroof', 'Wireless Apple CarPlay & Android Auto'] }
    ],
    interiorOptions: [
      { id: 'pui-1', name: 'Charcoal Fabric-Leatherette Fusion', material: 'Recycled Ocean Plastics Tech Fabric', colorName: 'Ocean Charcoal', hex: '#1f2937', price: 0 },
      { id: 'pui-2', name: 'Sandstone Eco-Leather', material: 'Bio-Sourced Vegan Leather', colorName: 'Sandstone', hex: '#d6d3d1', price: 40000 }
    ],
    wheels: [
      { id: 'puw-1', name: '18" Aero Blade Aero Caps', sizeInch: 18, finish: 'Gloss Black', price: 0 },
      { id: 'puw-2', name: '19" Dynamic Sport Diamond-Cut', sizeInch: 19, finish: 'Bi-Color Diamond Cut', price: 45000 }
    ],
    packages: [
      { id: 'pup-1', name: 'Urban Tech & Park Assistant Pack', description: 'Automated perpendicular and parallel parking with remote phone key entry.', price: 55000, highlightFeatures: ['Auto Park Assist', 'Digital Key Ultra-Wideband', 'Frunk Storage Organizer'] }
    ],
    accessories: [
      { id: 'pua-1', name: 'Autobot Portable Universal EV Emergency Charger', category: 'Tech', price: 18000, description: 'Weatherproof portable adapter set for all socket types.' }
    ],
    keyFeatures: [
      'Compact footprint with class-leading 500L rear cargo volume',
      'Ultra-efficient thermal heat pump for zero range degradation in cold weather',
      'High-speed 150 kW DC fast charging (10% to 80% in 24 mins)'
    ],
    detailedSpecifications: [
      {
        category: 'Urban Usability',
        specs: [
          { label: 'Turning Circle', value: '10.2 meters' },
          { label: 'Ground Clearance', value: '195 mm' },
          { label: 'Frunk Storage', value: '55 Liters' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2026-01-10',
    description: 'Zip through bustling city streets and escape for weekend adventures. The Autobot Pulse EV brings luxury design and electric agility within effortless reach.'
  },
  {
    id: 'autobot-cybertrack',
    slug: 'autobot-cybertrack',
    name: 'Autobot CyberTrack',
    tagline: 'The Unstoppable All-Terrain Electric Hyper-SUV',
    category: 'Electric SUV',
    startingPrice: 12500000,
    fuelType: 'Pure Electric',
    transmission: 'Quad-Motor Independent Torque Vectoring',
    horsepower: 1020,
    torqueNm: 1400,
    rangeOrMileage: '710 km WLTP',
    seatingCapacity: 6,
    topSpeedKmh: 280,
    acceleration0to100: 2.8,
    safetyRatingStars: 5,
    batteryCapacityKwh: 140,
    chargingTimeMin: 20,
    dimensions: {
      lengthMm: 5350,
      widthMm: 2120,
      heightMm: 1880,
      wheelbaseMm: 3300,
      curbWeightKg: 2950,
    },
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'ct1', name: 'Raw Brushed Titanium', hex: '#64748b', price: 120000, imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80' },
      { id: 'ct2', name: 'Stealth Tactical Matte Black', hex: '#18181b', price: 90000, imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80' },
      { id: 'ct3', name: 'Desert Dune Khaki', hex: '#78716c', price: 75000, imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'ct-tri', name: 'CyberTrack Tri-Motor Expedition', badge: 'TRI-MOTOR', priceDelta: 0, drivetrain: 'Tri-Motor AWD', acceleration: '3.6s', topSpeed: '240 km/h', rangeOrMileage: '750 km', power: '800 hp', torque: '1100 Nm', features: ['CrabWalk Diagonal Steering', 'Armor Glass', 'Full Steel Underbody Skid Plate'] },
      { id: 'ct-quad', name: 'CyberTrack Cyber-Beast Quad-Motor', badge: 'BEAST QUAD', priceDelta: 2400000, drivetrain: 'Quad-Motor Independent AWD', acceleration: '2.8s', topSpeed: '280 km/h', rangeOrMileage: '710 km', power: '1020 hp', torque: '1400 Nm', features: ['Tank Turn 360 Rotation', 'Off-Road Drone Station on Roof', '10kW Vehicle-to-Load Power Outlet Station'] }
    ],
    interiorOptions: [
      { id: 'cti-1', name: 'Tactical Kevlar Weave Dark Interior', material: 'Reinforced Military-Grade Water-Repellent Weave', colorName: 'Tactical Grey', hex: '#27272a', price: 0 },
      { id: 'cti-2', name: 'Arctic White High-Durability Armor Leather', material: 'Stain-Proof Ceramic Coated Bio-Hide', colorName: 'White Shield', hex: '#f4f4f5', price: 120000 }
    ],
    wheels: [
      { id: 'ctw-1', name: '20" Off-Road Beadlock Wheels with 35" All-Terrain Tires', sizeInch: 20, finish: 'Forged Matte Bronze', price: 0 },
      { id: 'ctw-2', name: '22" Cyber Forged Aero Wheels', sizeInch: 22, finish: 'Anodized Dark Graphite', price: 150000 }
    ],
    packages: [
      { id: 'ctp-1', name: 'Overland Survival Camping Ecosystem', description: 'Electric pop-up rooftop tent, integrated induction cooktop, and pressurized hot-water shower system.', price: 290000, highlightFeatures: ['Pop-Up Heated Tent', '10kW Induction Kitchen', 'Hot Shower System'] }
    ],
    accessories: [
      { id: 'cta-1', name: 'Heavy-Duty 12,000 lb Synthetic Winch', category: 'Protection', price: 65000, description: 'Concealed front bumper winch with wireless remote control.' }
    ],
    keyFeatures: [
      'Cold-Rolled Exoskeleton Body Panels (Bullet & Dent Resistant)',
      'Tank Turn Mode: 360-degree rotation on loose gravel and snow',
      'Massive 10 kW V2L Outlet (Can power an entire household or campsite for a week)'
    ],
    detailedSpecifications: [
      {
        category: 'Off-Road Extremes',
        specs: [
          { label: 'Ground Clearance', value: 'Up to 420 mm in Extract Mode' },
          { label: 'Towing Rating', value: '6,000 kg' },
          { label: 'Wading Depth', value: '1,050 mm' },
          { label: 'Payload Capacity', value: '1,600 kg' }
        ]
      }
    ],
    status: 'Limited Edition',
    launchDate: '2026-04-12',
    description: 'Forged with aerospace-grade alloys and 1020 horsepower quad electric motors. The CyberTrack defies conventional automotive categorization.'
  },
  {
    id: 'autobot-solstice',
    slug: 'autobot-solstice',
    name: 'Autobot Solstice',
    tagline: 'Open-Air Grandeur & Electric Whispers',
    category: 'Luxury',
    startingPrice: 11200000,
    fuelType: 'Pure Electric',
    transmission: 'Single-Speed Seamless Drive',
    horsepower: 610,
    torqueNm: 860,
    rangeOrMileage: '580 km WLTP',
    seatingCapacity: 4,
    topSpeedKmh: 270,
    acceleration0to100: 3.3,
    safetyRatingStars: 5,
    batteryCapacityKwh: 96,
    chargingTimeMin: 20,
    dimensions: {
      lengthMm: 4850,
      widthMm: 1950,
      heightMm: 1340,
      wheelbaseMm: 2880,
      curbWeightKg: 2050,
    },
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'so1', name: 'Côte d’Azur Riviera Blue', hex: '#0284c7', price: 80000, imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80' },
      { id: 'so2', name: 'Pearl Cashmere White', hex: '#f8fafc', price: 0, imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80' },
      { id: 'so3', name: 'Sunset Amber Metallic', hex: '#d97706', price: 85000, imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'so-cabrio', name: 'Solstice Speedster Cabriolet', badge: 'SPEEDSTER', priceDelta: 0, drivetrain: 'Dual-Motor AWD', acceleration: '3.7s', topSpeed: '250 km/h', rangeOrMileage: '580 km', power: '540 hp', torque: '780 Nm', features: ['Acoustic Z-Fold Soft Top (opens in 11s at up to 50 km/h)', 'Neck-Level Warmth Air Scarf'] },
      { id: 'so-corsa', name: 'Solstice Superleggera GT', badge: 'SUPERLEGGERA', priceDelta: 1800000, drivetrain: 'Dual-Motor Performance AWD', acceleration: '3.3s', topSpeed: '270 km/h', rangeOrMileage: '550 km', power: '610 hp', torque: '860 Nm', features: ['Electrochromic Folding Glass Hardtop', 'Carbon Fiber Cockpit Tub'] }
    ],
    interiorOptions: [
      { id: 'soi-1', name: 'Yacht Teak & Maritime Tan Leather', material: 'Full Grain Marine Water-Resistant Hide', colorName: 'Riviera Tan', hex: '#92400e', price: 110000 },
      { id: 'soi-2', name: 'Pure Chalk & Navy Blue Accents', material: 'Nappa Soft Touch', colorName: 'Chalk Navy', hex: '#e2e8f0', price: 0 }
    ],
    wheels: [
      { id: 'sow-1', name: '21" Turbofan Diamond Finished Rims', sizeInch: 21, finish: 'Silver & Polished Lip', price: 0 }
    ],
    packages: [
      { id: 'sop-1', name: 'Mediterranean Sunshine Warmth Package', description: 'Thermal neck warmers, heated armrests, and climate-controlled wind deflector.', price: 75000, highlightFeatures: ['Air Scarf', 'Heated Armrests', 'Electric Wind Deflector'] }
    ],
    accessories: [
      { id: 'soa-1', name: 'Bespoke Picnic Hamper in Carbon & Saddle Leather', category: 'Lifestyle', price: 60000, description: 'Handcrafted luxury tableware set for two.' }
    ],
    keyFeatures: [
      'Whisper-quiet electric convertible roof with 5-layer acoustic insulation',
      'Intelligent Air Curtains that eliminate cabin turbulence at highway speeds',
      'Bespoke Burmester 3D Surround Audio calibrated for roof-down acoustics'
    ],
    detailedSpecifications: [
      {
        category: 'Dimensions & Roof',
        specs: [
          { label: 'Roof Operation Time', value: '11 seconds to open or close' },
          { label: 'Aerodynamic Drag with Top Down', value: '0.24 Cd' },
          { label: 'Luggage Capacity', value: '380 Liters' }
        ]
      }
    ],
    status: 'New Launch',
    launchDate: '2026-02-14',
    description: 'The sensation of boundless open sky paired with silent, instantaneous electric torque. Autobot Solstice is the definitive luxury electric cabriolet.'
  },
  {
    id: 'autobot-velocity',
    slug: 'autobot-velocity',
    name: 'Autobot Velocity',
    tagline: 'Track Dominance Unleashed',
    category: 'Hypercar',
    startingPrice: 22000000,
    fuelType: 'Pure Electric',
    transmission: '2-Speed High-Torque Inverter Transmission',
    horsepower: 1350,
    torqueNm: 1750,
    rangeOrMileage: '520 km Track WLTP',
    seatingCapacity: 2,
    topSpeedKmh: 412,
    acceleration0to100: 1.95,
    safetyRatingStars: 5,
    batteryCapacityKwh: 105,
    chargingTimeMin: 15,
    dimensions: {
      lengthMm: 4720,
      widthMm: 2040,
      heightMm: 1180,
      wheelbaseMm: 2750,
      curbWeightKg: 1680,
    },
    heroImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 've1', name: 'Solar Flare Orange', hex: '#ea580c', price: 150000, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80' },
      { id: 've2', name: 'Raw Naked Carbon Fiber Weave', hex: '#262626', price: 350000, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80' },
      { id: 've3', name: 'Liquid Mercury Metallic', hex: '#94a3b8', price: 180000, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 've-track', name: 'Velocity Trackmaster Apex', badge: 'TRACKMASTER', priceDelta: 0, drivetrain: 'Quad-Motor All-Wheel Drive', acceleration: '1.95s', topSpeed: '412 km/h', rangeOrMileage: '520 km', power: '1350 hp', torque: '1750 Nm', features: ['Underbody Ground Effect Fans', 'Carbon-Ceramic Matrix Brakes', 'Dihedral Butterfly Doors'] }
    ],
    interiorOptions: [
      { id: 'vei-1', name: 'Alcantara Racing Bucket with 6-Point Harness', material: 'Weight-Optimized Fireproof Alcantara', colorName: 'Race Black & Orange', hex: '#0a0a0a', price: 0 }
    ],
    wheels: [
      { id: 'vew-1', name: '20"/21" Staggered Carbon Fiber Monocoque Rims', sizeInch: 21, finish: 'Gloss Carbon', price: 0 }
    ],
    packages: [
      { id: 'vep-1', name: 'FIA Track Telemetry & Pit-Wall Radio Suite', description: 'Real-time tire temperature mapping, downforce sensors, and onboard high-definition cornering cameras.', price: 190000, highlightFeatures: ['Thermal Tire Cameras', 'Aerodynamic Downforce Telemetry', 'Pit-Lane Speed Control'] }
    ],
    accessories: [
      { id: 'vea-1', name: 'Bespoke Carbon Racing Helmet & Nomex Suit', category: 'Lifestyle', price: 85000, description: 'Custom fitted with Autobot team livery.' }
    ],
    keyFeatures: [
      'Sub-2 second 0-100 km/h acceleration: 0-100 in 1.95 seconds',
      'Ground Effect Active Suction Fans generating 1,200 kg of downforce at 250 km/h',
      'Direct oil-cooled axial flux electric motors'
    ],
    detailedSpecifications: [
      {
        category: 'Aerodynamics & Force',
        specs: [
          { label: 'Downforce Peak', value: '1,200 kg @ 250 km/h' },
          { label: 'Lateral G-Force Rating', value: 'Up to 2.4 G in cornering' },
          { label: 'Chassis Torsional Rigidity', value: '65,000 Nm/degree' }
        ]
      }
    ],
    status: 'Limited Edition',
    launchDate: '2026-05-01',
    description: 'The pinnacle of automotive physics. The Autobot Velocity bends the boundaries between earthbound hypercars and aerospace technology.'
  },
  {
    id: 'autobot-horizon',
    slug: 'autobot-horizon',
    name: 'Autobot Horizon',
    tagline: 'The First-Class Presidential Suite on Wheels',
    category: 'Luxury',
    startingPrice: 16800000,
    fuelType: 'Pure Electric',
    transmission: 'Single-Speed Seamless Drive',
    horsepower: 680,
    torqueNm: 950,
    rangeOrMileage: '780 km WLTP',
    seatingCapacity: 4,
    topSpeedKmh: 240,
    acceleration0to100: 3.9,
    safetyRatingStars: 5,
    batteryCapacityKwh: 125,
    chargingTimeMin: 22,
    dimensions: {
      lengthMm: 5460,
      widthMm: 1980,
      heightMm: 1510,
      wheelbaseMm: 3390,
      curbWeightKg: 2550,
    },
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'ho1', name: 'Two-Tone Royal Obsidian & Silver Sand', hex: '#1e293b', price: 180000, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80' },
      { id: 'ho2', name: 'Imperial Emerald Green', hex: '#064e3b', price: 120000, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'ho-presidential', name: 'Horizon Presidential Limousine', badge: 'PRESIDENTIAL', priceDelta: 0, drivetrain: 'Dual-Motor AWD', acceleration: '3.9s', topSpeed: '240 km/h', rangeOrMileage: '780 km', power: '680 hp', torque: '950 Nm', features: ['42" Retractable Cinematic Theater Screen', 'Zero-Gravity Ottoman Recliners', 'Private Partition Electro-Glass'] }
    ],
    interiorOptions: [
      { id: 'hoi-1', name: 'Hand-Stitched Silk Cashmere & Fine Oak', material: 'Grade AAA Heritage Leather & Silk', colorName: 'Cream Champagne', hex: '#fef08a', price: 190000 }
    ],
    wheels: [
      { id: 'how-1', name: '22" Sovereign Chromatic Monoblock Rims', sizeInch: 22, finish: 'Mirror Chrome', price: 0 }
    ],
    packages: [
      { id: 'hop-1', name: 'State Diplomat Armor Protection Level VR7', description: 'Ballistic steel reinforcement, self-sealing fuel/battery system, and run-flat emergency inserts.', price: 1400000, highlightFeatures: ['Ballistic Shell', 'Run-Flat Protection', 'Oxygen Purification Emergency System'] }
    ],
    accessories: [
      { id: 'hoa-1', name: 'Personalized Silver Monogram Sill Plates', category: 'Convenience', price: 35000, description: 'Laser engraved with client initials.' }
    ],
    keyFeatures: [
      'Long-wheelbase 3.39m executive rear salon with zero-gravity seats',
      'Active Electronic Noise Cancellation creating -42dB cabin silence',
      'Dual rear refrigerators with bespoke crystal decanters'
    ],
    detailedSpecifications: [
      {
        category: 'Rear Comfort',
        specs: [
          { label: 'Legroom Rear', value: '1,280 mm' },
          { label: 'Theater Screen', value: '42-inch 8K Fold-Down OLED' },
          { label: 'Audio', value: '34-Speaker Studio Array with In-Seat Subwoofers' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2025-10-01',
    description: 'An architectural sanctuary for heads of state and visionary leaders. Autobot Horizon redefines prestige with silent power and unrivaled rear sanctuary craft.'
  },
  {
    id: 'autobot-terra-titan',
    slug: 'autobot-terra-titan',
    name: 'Autobot Terra Titan',
    tagline: 'Conquer the Earth in Uncompromising Luxury',
    category: 'SUV',
    startingPrice: 8900000,
    fuelType: 'Twin-Turbo V8',
    transmission: '10-Speed Heavy Duty Automatic',
    horsepower: 620,
    torqueNm: 850,
    rangeOrMileage: '13.2 L / 100km',
    seatingCapacity: 7,
    topSpeedKmh: 235,
    acceleration0to100: 4.8,
    safetyRatingStars: 5,
    dimensions: {
      lengthMm: 5200,
      widthMm: 2060,
      heightMm: 1920,
      wheelbaseMm: 3120,
      curbWeightKg: 2710,
    },
    heroImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'tt1', name: 'Mojave Desert Bronze', hex: '#78350f', price: 45000, imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80' },
      { id: 'tt2', name: 'Gunmetal Armour Grey', hex: '#374151', price: 0, imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'tt-v8', name: 'Terra Titan Overlander V8', badge: 'OVERLANDER', priceDelta: 0, drivetrain: 'Mechanical Full-Time 4WD with 3 Diff Locks', acceleration: '4.8s', topSpeed: '235 km/h', rangeOrMileage: '13.2 L / 100km', power: '620 hp', torque: '850 Nm', features: ['Triple Locking Differentials', 'Snorkel Air Intake', 'Fox Internal Bypass Shocks'] }
    ],
    interiorOptions: [
      { id: 'tti-1', name: 'Heavy Duty Saddle Saddlehide', material: 'Waxed Saddle Leather', colorName: 'Saddle Tan', hex: '#9a3412', price: 0 }
    ],
    wheels: [
      { id: 'ttw-1', name: '20" Titan Beadlock Forged Wheels', sizeInch: 20, finish: 'Matte Bronze', price: 0 }
    ],
    packages: [
      { id: 'ttp-1', name: 'Sahara Expedition Fuel & Water Pod Pack', description: 'Dual auxiliary long-range fuel tanks and integrated pressurized water system.', price: 160000, highlightFeatures: ['Auxiliary 80L Fuel Tank', 'Underbody Steel Skid Shield'] }
    ],
    accessories: [
      { id: 'tta-1', name: 'Heavy Duty LED Light Bar & Roof Rack', category: 'Lifestyle', price: 42000, description: 'Integrated 15,000 Lumen Baja roof lightbar.' }
    ],
    keyFeatures: [
      'Ladder-frame hydroformed high-tensile steel chassis with triple diff locks',
      'Dual-speed transfer case with crawling gear ratio of 48:1',
      'Waterproof cabin floor with drainage plugs for muddy adventures'
    ],
    detailedSpecifications: [
      {
        category: 'Off-Road Prowess',
        specs: [
          { label: 'Approach Angle', value: '41 degrees' },
          { label: 'Departure Angle', value: '36 degrees' },
          { label: 'Ramp Breakover', value: '29 degrees' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2025-08-10',
    description: 'Built for expeditions into uncharted territory where reliability is paramount. The Terra Titan merges ruthless off-road prowess with bespoke handcrafted cabin opulence.'
  },
  {
    id: 'autobot-nexus-gt',
    slug: 'autobot-nexus-gt',
    name: 'Autobot Nexus GT',
    tagline: 'Sleek Fastback Lines with Neural Intelligence',
    category: 'Electric Sedan',
    startingPrice: 7200000,
    fuelType: 'Pure Electric',
    transmission: 'Single-Speed Electronic',
    horsepower: 590,
    torqueNm: 810,
    rangeOrMileage: '640 km WLTP',
    seatingCapacity: 5,
    topSpeedKmh: 275,
    acceleration0to100: 3.2,
    safetyRatingStars: 5,
    batteryCapacityKwh: 92,
    chargingTimeMin: 19,
    dimensions: {
      lengthMm: 4880,
      widthMm: 1920,
      heightMm: 1410,
      wheelbaseMm: 2940,
      curbWeightKg: 2010,
    },
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'ne1', name: 'Graphite Storm', hex: '#1e293b', price: 0, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80' },
      { id: 'ne2', name: 'Alpine Frozen White', hex: '#f8fafc', price: 35000, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80' },
      { id: 'ne3', name: 'Electric Amethyst Purple', hex: '#581c87', price: 75000, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'ne-fastback', name: 'Nexus Fastback Sprint', badge: 'SPRINT', priceDelta: 0, drivetrain: 'Dual-Motor AWD', acceleration: '3.6s', topSpeed: '260 km/h', rangeOrMileage: '640 km', power: '520 hp', torque: '720 Nm', features: ['Frameless Glass Doors', 'Sport Suspension', 'Neural ADAS Assistant'] },
      { id: 'ne-vitesse', name: 'Nexus Vitesse Carbon', badge: 'VITESSE', priceDelta: 1100000, drivetrain: 'Dual-Motor Performance AWD', acceleration: '3.2s', topSpeed: '275 km/h', rangeOrMileage: '600 km', power: '590 hp', torque: '810 Nm', features: ['Carbon Ceramic Discs', 'Active Sport Aero Spoiler'] }
    ],
    interiorOptions: [
      { id: 'nei-1', name: 'Stealth Black Carbon Microfiber', material: 'Ultrasuede & Leather', colorName: 'Stealth Black', hex: '#0f172a', price: 0 }
    ],
    wheels: [
      { id: 'new-1', name: '20" Nexus Dynamic Sport Rims', sizeInch: 20, finish: 'Dark Satin Chrome', price: 0 }
    ],
    packages: [
      { id: 'nep-1', name: 'Neural Drive Level 3 Autonomy Pack', description: 'LiDAR mapping, auto parking valet, and automated overtaking assistant.', price: 145000, highlightFeatures: ['Full Self-Park Valet', 'Automated Highway Navigation'] }
    ],
    accessories: [
      { id: 'nea-1', name: 'Smart Wireless Glass Key Fob', category: 'Tech', price: 15000, description: 'Glass touchscreen display key with battery indicator.' }
    ],
    keyFeatures: [
      'Flowing aerodynamic fastback silhouette with drag coefficient of 0.219 Cd',
      'Dual-zone panoramic glass roof with variable liquid crystal tinting',
      'Intuitive Neural AI Voice Assistant with natural conversational capability'
    ],
    detailedSpecifications: [
      {
        category: 'Vehicle Dynamics',
        specs: [
          { label: 'Weight Distribution', value: '49:51 Front to Rear' },
          { label: 'Turning Radius', value: '11.0 meters' },
          { label: 'Coefficient of Drag', value: '0.219 Cd' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2026-01-25',
    description: 'A sports sedan born from clean-sheet thinking. Autobot Nexus GT brings athletic fastback elegance together with next-generation autonomous neural software.'
  },
  {
    id: 'autobot-zenith',
    slug: 'autobot-zenith',
    name: 'Autobot Zenith',
    tagline: 'Modern Family Electric Crossover with Endless Space',
    category: 'Compact SUV',
    startingPrice: 4600000,
    fuelType: 'Pure Electric',
    transmission: 'Single-Speed Direct Drive',
    horsepower: 380,
    torqueNm: 560,
    rangeOrMileage: '590 km WLTP',
    seatingCapacity: 5,
    topSpeedKmh: 210,
    acceleration0to100: 4.9,
    safetyRatingStars: 5,
    batteryCapacityKwh: 84,
    chargingTimeMin: 22,
    dimensions: {
      lengthMm: 4680,
      widthMm: 1890,
      heightMm: 1640,
      wheelbaseMm: 2820,
      curbWeightKg: 1950,
    },
    heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'ze1', name: 'Nordic Forest Green', hex: '#14532d', price: 30000, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80' },
      { id: 'ze2', name: 'Polar Silver', hex: '#e2e8f0', price: 0, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80' },
      { id: 'ze3', name: 'Midnight Blue', hex: '#1e3a8a', price: 30000, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'ze-pure', name: 'Zenith Comfort Plus', badge: 'COMFORT+', priceDelta: 0, drivetrain: 'Single Motor Long Range', acceleration: '5.9s', topSpeed: '190 km/h', rangeOrMileage: '590 km', power: '290 hp', torque: '420 Nm', features: ['Panoramic Roof', 'Heated Seats Front & Rear', 'Electric Tailgate'] },
      { id: 'ze-performance', name: 'Zenith Performance AWD', badge: 'SPORT AWD', priceDelta: 650000, drivetrain: 'Dual-Motor AWD', acceleration: '4.9s', topSpeed: '210 km/h', rangeOrMileage: '540 km', power: '380 hp', torque: '560 Nm', features: ['Torque Vectoring AWD', '20" Sport Wheels', 'Sport Leather Seats'] }
    ],
    interiorOptions: [
      { id: 'zei-1', name: 'Warm Charcoal & Ash Trim', material: 'Nordic Sustainable Wool & Leatherette', colorName: 'Charcoal Ash', hex: '#374151', price: 0 }
    ],
    wheels: [
      { id: 'zew-1', name: '19" Zenith Aerovane Rims', sizeInch: 19, finish: 'Two-Tone Gunmetal', price: 0 }
    ],
    packages: [
      { id: 'zep-1', name: 'Family Adventure & Storage System', description: 'Underfloor cargo organizer, rear picnic fold-out bench, and child seat monitors.', price: 48000, highlightFeatures: ['Rear Picnic Bench', 'Fold-Out Trunk Desk', 'Child Presence Radar'] }
    ],
    accessories: [
      { id: 'zea-1', name: 'Integrated Bicycle Rear Tow Carrier', category: 'Lifestyle', price: 38000, description: 'Quick-mount dual e-bike carrier with lock system.' }
    ],
    keyFeatures: [
      '600L cargo trunk with sub-trunk storage accommodating full-size luggage',
      'Child-presence millimeter radar preventing accidental lock-in',
      'Vehicle-to-Load 3.6 kW home backup power discharge capability'
    ],
    detailedSpecifications: [
      {
        category: 'Interior Space',
        specs: [
          { label: 'Boot Space', value: '600L expanding to 1,750L' },
          { label: 'Passenger Headroom', value: '1,040 mm front / 1,010 mm rear' },
          { label: 'Roof Rack Dynamic Load', value: '100 kg' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2025-11-01',
    description: 'The smart, serene family electric crossover. Autobot Zenith blends Scandinavian ergonomic tranquility with long-range electric peace of mind.'
  },
  {
    id: 'autobot-starlight',
    slug: 'autobot-starlight',
    name: 'Autobot Starlight',
    tagline: 'The Pinnacle of Three-Row Executive Presence',
    category: 'SUV',
    startingPrice: 10800000,
    fuelType: 'Plug-in Hybrid',
    transmission: '9-Speed Ultra-Shift Automatic',
    horsepower: 550,
    torqueNm: 800,
    rangeOrMileage: '2.4 L / 100km (90 km EV mode)',
    seatingCapacity: 7,
    topSpeedKmh: 245,
    acceleration0to100: 4.6,
    safetyRatingStars: 5,
    batteryCapacityKwh: 34,
    chargingTimeMin: 30,
    dimensions: {
      lengthMm: 5210,
      widthMm: 2020,
      heightMm: 1780,
      wheelbaseMm: 3160,
      curbWeightKg: 2620,
    },
    heroImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'sl1', name: 'Starlight Midnight Blue', hex: '#0f172a', price: 65000, imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80' },
      { id: 'sl2', name: 'Palladium Silver Metallic', hex: '#94a3b8', price: 0, imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'sl-first', name: 'Starlight Sovereign Edition', badge: 'SOVEREIGN', priceDelta: 0, drivetrain: 'Intelligent e-AWD Hybrid', acceleration: '4.6s', topSpeed: '245 km/h', rangeOrMileage: '90 km EV Range', power: '550 hp', torque: '800 Nm', features: ['Starlight Ambient Roof Canopy', 'Triple Sunroof Panels', 'Level 2.5 Driving Assistant'] }
    ],
    interiorOptions: [
      { id: 'sli-1', name: 'Porcelain White & Smoked Birch Wood', material: 'Full Grain Semi-Aniline Leather', colorName: 'Porcelain White', hex: '#f8fafc', price: 95000 }
    ],
    wheels: [
      { id: 'slw-1', name: '22" Multispoke Diamond Bright Wheels', sizeInch: 22, finish: 'Bright Polished', price: 0 }
    ],
    packages: [
      { id: 'slp-1', name: 'Entertainment & Wellness Sanctuary Pack', description: 'Individual climate capsules with aroma-therapy diffusing and dual seatback 15.6" screens.', price: 175000, highlightFeatures: ['Aromatherapy Diffusers', 'Individual Air Micro-Filters', 'Dual Touchscreens'] }
    ],
    accessories: [
      { id: 'sla-1', name: 'Automatic Electric Side Steps with Ground Projection', category: 'Convenience', price: 78000, description: 'Motorized footboards illuminate when doors unlock.' }
    ],
    keyFeatures: [
      'Starlight LED Canopy with 1,800 fiber-optic shooting stars in the ceiling',
      'Three rows of full adult-sized heated and ventilated comfort seats',
      'Plug-in Hybrid powertrain pairing a 3.0L Turbo V6 with an electric motor'
    ],
    detailedSpecifications: [
      {
        category: 'Third-Row Comfort',
        specs: [
          { label: 'Third Row Legroom', value: '880 mm' },
          { label: 'Third Row USB-C Ports', value: '65W Fast Charge per seat' },
          { label: 'Electric Third Row Fold', value: 'One-touch button in boot' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2025-07-18',
    description: 'When only the grandest scale will do. Autobot Starlight provides seven passengers with private jet caliber luxury, seamless hybrid propulsion, and starlit serenity.'
  },
  {
    id: 'autobot-hyperion',
    slug: 'autobot-hyperion',
    name: 'Autobot Hyperion',
    tagline: 'Hydrogen-Electric Future Racing Supercar',
    category: 'Hypercar',
    startingPrice: 28000000,
    fuelType: 'Hydrogen-Electric',
    transmission: 'Direct Drive Multi-Vector',
    horsepower: 1500,
    torqueNm: 2100,
    rangeOrMileage: '950 km Hydrogen Range',
    seatingCapacity: 2,
    topSpeedKmh: 435,
    acceleration0to100: 1.85,
    safetyRatingStars: 5,
    batteryCapacityKwh: 45,
    chargingTimeMin: 5, // 5 min hydrogen refuel
    dimensions: {
      lengthMm: 4790,
      widthMm: 2080,
      heightMm: 1150,
      wheelbaseMm: 2800,
      curbWeightKg: 1550,
    },
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'hy1', name: 'Nebula Electric Blue', hex: '#2563eb', price: 250000, imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80' },
      { id: 'hy2', name: 'Solar Gold Pearlescent', hex: '#ca8a04', price: 350000, imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'hy-apex', name: 'Hyperion Genesis Le Mans', badge: 'GENESIS', priceDelta: 0, drivetrain: 'Quad-Motor Fuel Cell AWD', acceleration: '1.85s', topSpeed: '435 km/h', rangeOrMileage: '950 km', power: '1500 hp', torque: '2100 Nm', features: ['Hydrogen Fuel-Cell with Carbon Composite Tanks', 'Active Aerodynamic Winglets', 'Laser Headlights'] }
    ],
    interiorOptions: [
      { id: 'hyi-1', name: 'Space-Grade Titanium & Carbon Fiber Cockpit', material: 'Nomex & Ultralight Dry Carbon', colorName: 'Deep Space', hex: '#09090b', price: 0 }
    ],
    wheels: [
      { id: 'hyw-1', name: '21"/22" Forged Magnesium Racing Wheels', sizeInch: 22, finish: 'Liquid Gold & Carbon', price: 0 }
    ],
    packages: [
      { id: 'hyp-1', name: 'Le Mans Endurance Aero & Cooling Kit', description: 'Carbon roof scoop, vortex generators, and high-flow cryogenic fuel radiators.', price: 380000, highlightFeatures: ['Cryogenic Radiators', 'Roof Induction Scoop'] }
    ],
    accessories: [
      { id: 'hya-1', name: 'Commemorative Carbon Display Scale Model (1:8)', category: 'Lifestyle', price: 95000, description: 'Hand-assembled in Germany matching your real vehicle spec.' }
    ],
    keyFeatures: [
      'Hydrogen fuel cell powertrain delivering 1,500 HP with only pure distilled water vapor exhaust',
      'Refuel from empty to 950 km in just 5 minutes',
      'Carbon-fiber monocoque chassis engineered to exceed Formula 1 impact safety thresholds'
    ],
    detailedSpecifications: [
      {
        category: 'Powertrain Innovations',
        specs: [
          { label: 'Hydrogen Storage', value: '700-bar Carbon Fiber Tanks (8.5 kg H2)' },
          { label: 'Fuel Cell Stack', value: '300 kW Proton Exchange Membrane' },
          { label: 'Buffer Battery', value: '45 kWh High-Discharge Graphene Supercell' }
        ]
      }
    ],
    status: 'Pre-Order',
    launchDate: '2026-09-01',
    description: 'The halo of Autobot engineering. The Hyperion unifies zero-emissions hydrogen fuel-cell longevity with 1,500 horsepower of unrelenting electric hypercar acceleration.'
  },
  {
    id: 'autobot-quantum-cross',
    slug: 'autobot-quantum-cross',
    name: 'Autobot Quantum Cross',
    tagline: 'Compact Dimensions, Boundless Ambition',
    category: 'Compact SUV',
    startingPrice: 3400000,
    fuelType: 'Pure Electric',
    transmission: 'Single-Speed Electronic',
    horsepower: 275,
    torqueNm: 400,
    rangeOrMileage: '480 km WLTP',
    seatingCapacity: 5,
    topSpeedKmh: 185,
    acceleration0to100: 6.2,
    safetyRatingStars: 5,
    batteryCapacityKwh: 65,
    chargingTimeMin: 25,
    dimensions: {
      lengthMm: 4380,
      widthMm: 1820,
      heightMm: 1580,
      wheelbaseMm: 2680,
      curbWeightKg: 1720,
    },
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { id: 'qc1', name: 'Graphite Grey', hex: '#475569', price: 0, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80' },
      { id: 'qc2', name: 'Crimson Red', hex: '#ef4444', price: 25000, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80' },
      { id: 'qc3', name: 'Arctic Snow', hex: '#ffffff', price: 0, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80' }
    ],
    variants: [
      { id: 'qc-urban', name: 'Quantum Cross Active', badge: 'ACTIVE', priceDelta: 0, drivetrain: 'Single-Motor FWD', acceleration: '6.9s', topSpeed: '175 km/h', rangeOrMileage: '480 km', power: '215 hp', torque: '320 Nm', features: ['12.3" Infotainment Display', 'Reverse Camera & Parking Sensors', 'Wireless Phone Charger'] },
      { id: 'qc-dynamic', name: 'Quantum Cross Dynamic AWD', badge: 'DYNAMIC AWD', priceDelta: 450000, drivetrain: 'Dual-Motor AWD', acceleration: '6.2s', topSpeed: '185 km/h', rangeOrMileage: '450 km', power: '275 hp', torque: '400 Nm', features: ['Intelligent All-Wheel Drive', 'Panoramic Sunroof', 'Heated Front Seats'] }
    ],
    interiorOptions: [
      { id: 'qci-1', name: 'Charcoal Tech Mesh Interior', material: 'Eco-Fabric & Synthetic Leather', colorName: 'Charcoal', hex: '#1e293b', price: 0 }
    ],
    wheels: [
      { id: 'qcw-1', name: '18" Aero Diamond Cut Wheels', sizeInch: 18, finish: 'Silver & Gloss Black', price: 0 }
    ],
    packages: [
      { id: 'qcp-1', name: 'Convenience & Sound Pack', description: 'Premium 10-speaker audio system, power tailgate with kick sensor, and blind spot monitor.', price: 42000, highlightFeatures: ['Kick-Sensor Tailgate', 'Blind Spot Detection'] }
    ],
    accessories: [
      { id: 'qca-1', name: 'All-Weather Boot Protective Tray', category: 'Protection', price: 9500, description: 'Durable rubber tray with raised lips.' }
    ],
    keyFeatures: [
      'Nimble footprint with generous 450L trunk capacity',
      'Ultra-compact turning circle of 9.8 meters for effortless city maneuvering',
      'High-strength passenger safety cage with 7 interior airbags'
    ],
    detailedSpecifications: [
      {
        category: 'Urban Geometry',
        specs: [
          { label: 'Length', value: '4,380 mm' },
          { label: 'Turning Circle', value: '9.8 meters' },
          { label: 'Charging Speed', value: '130 kW DC Fast Charge' }
        ]
      }
    ],
    status: 'Available',
    launchDate: '2026-02-01',
    description: 'The smart, spirited gateway into the Autobot ecosystem. The Quantum Cross is engineered for youthful explorers seeking premium craftsmanship and effortless electric mobility.'
  }
];

export const SHOWROOMS_DATA: Showroom[] = [
  {
    id: 'showroom-mumbai',
    name: 'Autobot Flagship Experience Center — Bandra Kurla Complex',
    city: 'Mumbai',
    address: 'Tower 4, Maker Maxity, Bandra Kurla Complex, Bandra East, Mumbai 400051',
    phone: '+91 22 8900 1200',
    email: 'mumbai.bkc@autobot.example',
    operatingHours: 'Mon - Sun: 09:30 AM – 08:30 PM',
    coordinates: { lat: 19.0657, lng: 72.8688 },
    amenities: ['Private VIP Configuration Lounge', 'High-Speed 350kW DC Fast Charging Station', 'Virtual Reality Vehicle Simulator', 'Gourmet Barista Bar']
  },
  {
    id: 'showroom-delhi',
    name: 'Autobot Experience Studio — Connaught Place',
    city: 'Delhi NCR',
    address: 'Block E, Inner Circle, Connaught Place, New Delhi 110001',
    phone: '+91 11 4872 3300',
    email: 'delhi.cp@autobot.example',
    operatingHours: 'Mon - Sun: 10:00 AM – 09:00 PM',
    coordinates: { lat: 28.6315, lng: 77.2167 },
    amenities: ['Executive Delivery Suite', 'Test Track Booking Center', '350kW DC Fast Charging', 'Lifestyle Boutique']
  },
  {
    id: 'showroom-bangalore',
    name: 'Autobot Innovation & Showcase Hub — Indiranagar',
    city: 'Bengaluru',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    phone: '+91 80 6799 4400',
    email: 'bengaluru.indiranagar@autobot.example',
    operatingHours: 'Mon - Sun: 09:30 AM – 08:30 PM',
    coordinates: { lat: 12.9719, lng: 77.6412 },
    amenities: ['Tech Workshop & Software Lab', '350kW Supercharger Station', 'Customer Delivery Pavilion']
  },
  {
    id: 'showroom-hyderabad',
    name: 'Autobot Luxury Atelier — Jubilee Hills',
    city: 'Hyderabad',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91 40 5543 8800',
    email: 'hyderabad.jh@autobot.example',
    operatingHours: 'Mon - Sun: 10:00 AM – 08:30 PM',
    coordinates: { lat: 17.4319, lng: 78.4073 },
    amenities: ['Private Atelier Bespoke Studio', 'Ultra-Fast Chargers', 'Chauffeur Lounge']
  },
  {
    id: 'showroom-chennai',
    name: 'Autobot Coastline Showcase — ECR',
    city: 'Chennai',
    address: 'East Coast Road, Neelankarai, Chennai, Tamil Nadu 600115',
    phone: '+91 44 4921 5500',
    email: 'chennai.ecr@autobot.example',
    operatingHours: 'Mon - Sun: 09:30 AM – 08:00 PM',
    coordinates: { lat: 12.9482, lng: 80.2586 },
    amenities: ['Seaside Test-Drive Departure Bay', 'Supercharging Hub', 'Bespoke Customizer Studio']
  }
];

export const SPECIAL_OFFERS_DATA: SpecialOffer[] = [
  {
    id: 'offer-festive-2026',
    title: 'Autobot Spring Innovation Privileges',
    subtitle: 'Complimentary Autobot 22kW Home Super-Wallbox + 3 Years Unlimited Charging Network Access',
    discountAmount: 185000,
    validUntil: '2026-04-30',
    applicableModels: ['autobot-aero-x', 'autobot-apex-suv', 'autobot-solstice'],
    badge: 'LIMITED TIME',
    terms: 'Valid on confirmed configurations locked in during the current calendar quarter. Includes certified professional residential installation.'
  },
  {
    id: 'offer-finance-prime',
    title: 'Autobot Financial Services — 3.99% Subsidized APR',
    subtitle: 'Tailored 60-month financing with 50% guaranteed buy-back value after 36 months',
    discountPercentage: 4.5,
    validUntil: '2026-05-31',
    applicableModels: ['autobot-vanguard', 'autobot-pulse-ev', 'autobot-nexus-gt', 'autobot-zenith'],
    badge: 'FINANCIAL PRIVILEGE',
    terms: 'Subject to credit assessment by Autobot Financial Services. Applicable to individual and corporate registrations.'
  },
  {
    id: 'offer-tradein-bonus',
    title: 'Prestige Upgrade Trade-In Bonus',
    subtitle: 'Receive an additional ₹2,50,000 appreciation bonus above market valuation when trading in your luxury vehicle',
    discountAmount: 250000,
    validUntil: '2026-06-30',
    applicableModels: ['autobot-aero-x', 'autobot-apex-suv', 'autobot-phantom-gt', 'autobot-starlight'],
    badge: 'TRADE-IN BONUS',
    terms: 'Applies to certified luxury vehicles manufactured in 2020 or later with verified service records.'
  }
];
