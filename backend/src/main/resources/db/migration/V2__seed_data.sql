-- ===================================================
-- AUTOBOT SEED DATA
-- 15 Realistic Fictional Models & Admin User
-- ===================================================

-- Initial Admin and Customer Users (password hash for 'Autobot@2026')
INSERT INTO users (username, password, email, full_name, role) VALUES 
('admin', '$2a$10$7R3kMfs0XzXnJtK6b0k07eN7X8qBq.W4m56q4H7E1I5nU/r0d66u2', 'admin@autobot.example', 'Autobot Super Administrator', 'ADMIN'),
('sales_manager', '$2a$10$7R3kMfs0XzXnJtK6b0k07eN7X8qBq.W4m56q4H7E1I5nU/r0d66u2', 'sales@autobot.example', 'Senior Sales Director', 'SALES_MANAGER'),
('customer', '$2a$10$7R3kMfs0XzXnJtK6b0k07eN7X8qBq.W4m56q4H7E1I5nU/r0d66u2', 'customer@autobot.example', 'Rahul Sharma', 'CUSTOMER');

-- 15 Realistic Fictional Autobot Models
INSERT INTO vehicles (id, slug, name, tagline, category, starting_price, fuel_type, transmission, horsepower, torque_nm, range_or_mileage, seating_capacity, top_speed_kmh, acceleration_0_to_100, safety_rating_stars, battery_capacity_kwh, charging_time_min, hero_image, description, status, launch_date) VALUES 
('autobot-aero-x', 'autobot-aero-x', 'Autobot Aero X', 'The Ultimate Electric Performance Fastback', 'Electric Sedan', 8500000.00, 'Pure Electric', 'Dual-Speed Direct Drive', 780, 1050, '685 km WLTP', 5, 310, 2.70, 5, 108.0, 18, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80', 'The flagship fastback electric sedan combining 800V silicon-carbide architecture with track performance.', 'New Launch', '2026-03-01'),

('autobot-phantom-gt', 'autobot-phantom-gt', 'Autobot Phantom GT', 'Pure Thoroughbred Grand Touring Masterpiece', 'Performance', 14500000.00, 'Twin-Turbo V8', '8-Speed Dual-Clutch F1 Paddle Shift', 820, 980, '11.8 L / 100km', 4, 345, 2.90, 5, NULL, NULL, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80', 'Thoroughbred high-revving flat-plane crank twin-turbo V8 coupe.', 'Available', '2025-11-15'),

('autobot-apex-suv', 'autobot-apex-suv', 'Autobot Apex SUV', 'Commanding Luxury & Unshakable Electric Presence', 'Electric SUV', 9800000.00, 'Pure Electric', 'Intelligent e-AWD', 650, 920, '620 km WLTP', 7, 250, 3.80, 5, 115.0, 22, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80', 'First-class 7-passenger electric luxury SUV with tri-chamber air suspension.', 'Available', '2025-09-20'),

('autobot-vanguard', 'autobot-vanguard', 'Autobot Vanguard', 'The Modern Benchmark in Executive Luxury', 'Sedan', 6200000.00, 'Plug-in Hybrid', '9-Speed Tronic Automatic', 480, 700, '1.9 L / 100km', 5, 260, 4.40, 5, 28.0, 35, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80', 'The intelligent synthesis of executive poise and plug-in hybrid range.', 'Available', '2025-06-10'),

('autobot-pulse-ev', 'autobot-pulse-ev', 'Autobot Pulse EV', 'Agile Urban Energy & Sculpted Electric Utility', 'Compact SUV', 3800000.00, 'Pure Electric', 'Single-Speed Electronic', 310, 450, '520 km WLTP', 5, 195, 5.60, 5, 72.0, 24, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80', 'Nimble urban crossover engineered for effortless city commuting.', 'Available', '2026-01-10'),

('autobot-cybertrack', 'autobot-cybertrack', 'Autobot CyberTrack', 'The Unstoppable All-Terrain Electric Hyper-SUV', 'Electric SUV', 12500000.00, 'Pure Electric', 'Quad-Motor Independent Torque Vectoring', 1020, 1400, '710 km WLTP', 6, 280, 2.80, 5, 140.0, 20, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80', 'Forged exoskeleton with 1020 HP quad motors and 360-degree tank turn mode.', 'Limited Edition', '2026-04-12'),

('autobot-solstice', 'autobot-solstice', 'Autobot Solstice', 'Open-Air Grandeur & Electric Whispers', 'Luxury', 11200000.00, 'Pure Electric', 'Single-Speed Seamless Drive', 610, 860, '580 km WLTP', 4, 270, 3.30, 5, 96.0, 20, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80', 'Bespoke grand touring convertible with acoustic folding roof.', 'New Launch', '2026-02-14'),

('autobot-velocity', 'autobot-velocity', 'Autobot Velocity', 'Track Dominance Unleashed', 'Hypercar', 22000000.00, 'Pure Electric', '2-Speed High-Torque Inverter', 1350, 1750, '520 km Track WLTP', 2, 412, 1.95, 5, 105.0, 15, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80', 'Sub-2 second 0-100 hypercar generating 1,200 kg active downforce.', 'Limited Edition', '2026-05-01'),

('autobot-horizon', 'autobot-horizon', 'Autobot Horizon', 'The First-Class Presidential Suite on Wheels', 'Luxury', 16800000.00, 'Pure Electric', 'Single-Speed Seamless Drive', 680, 950, '780 km WLTP', 4, 240, 3.90, 5, 125.0, 22, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80', 'Ultra-long-wheelbase sovereign sanctuary with 42-inch rear theater screen.', 'Available', '2025-10-01'),

('autobot-terra-titan', 'autobot-terra-titan', 'Autobot Terra Titan', 'Conquer the Earth in Uncompromising Luxury', 'SUV', 8900000.00, 'Twin-Turbo V8', '10-Speed Heavy Duty Automatic', 620, 850, '13.2 L / 100km', 7, 235, 4.80, 5, NULL, NULL, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80', 'Rugged ladder-frame off-road conqueror with triple locking differentials.', 'Available', '2025-08-10'),

('autobot-nexus-gt', 'autobot-nexus-gt', 'Autobot Nexus GT', 'Sleek Fastback Lines with Neural Intelligence', 'Electric Sedan', 7200000.00, 'Pure Electric', 'Single-Speed Electronic', 590, 810, '640 km WLTP', 5, 275, 3.20, 5, 92.0, 19, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80', 'Aerodynamic fastback sports sedan with drag coefficient of 0.219 Cd.', 'Available', '2026-01-25'),

('autobot-zenith', 'autobot-zenith', 'Autobot Zenith', 'Modern Family Electric Crossover with Endless Space', 'Compact SUV', 4600000.00, 'Pure Electric', 'Single-Speed Direct Drive', 380, 560, '590 km WLTP', 5, 210, 4.90, 5, 84.0, 22, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80', 'Serene ergonomic family crossover with child-presence radar and 600L trunk.', 'Available', '2025-11-01'),

('autobot-starlight', 'autobot-starlight', 'Autobot Starlight', 'The Pinnacle of Three-Row Executive Presence', 'SUV', 10800000.00, 'Plug-in Hybrid', '9-Speed Ultra-Shift Automatic', 550, 800, '2.4 L / 100km', 7, 245, 4.60, 5, 34.0, 30, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=80', 'Executive 7-seater with 1,800 fiber-optic shooting stars in ceiling.', 'Available', '2025-07-18'),

('autobot-hyperion', 'autobot-hyperion', 'Autobot Hyperion', 'Hydrogen-Electric Future Racing Supercar', 'Hypercar', 28000000.00, 'Hydrogen-Electric', 'Direct Drive Multi-Vector', 1500, 2100, '950 km Hydrogen Range', 2, 435, 1.85, 5, 45.0, 5, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80', 'Hydrogen fuel-cell halo delivering 1,500 HP with only water vapor exhaust.', 'Pre-Order', '2026-09-01'),

('autobot-quantum-cross', 'autobot-quantum-cross', 'Autobot Quantum Cross', 'Compact Dimensions, Boundless Ambition', 'Compact SUV', 3400000.00, 'Pure Electric', 'Single-Speed Electronic', 275, 400, '480 km WLTP', 5, 185, 6.20, 5, 65.0, 25, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80', 'The spirited gateway into the Autobot ecosystem with ultra-compact 9.8m turning circle.', 'Available', '2026-02-01');

-- Colors
INSERT INTO vehicle_colors (id, vehicle_id, name, hex_code, price, image_url, exterior_finish) VALUES
('c1', 'autobot-aero-x', 'Obsidian Black', '#0f1015', 0.00, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80', 'metallic'),
('c2', 'autobot-aero-x', 'Titanium Matte Silver', '#8a929a', 45000.00, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80', 'matte'),
('c3', 'autobot-aero-x', 'Apex Crimson Red', '#b91c1c', 55000.00, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=80', 'pearl'),
('c4', 'autobot-aero-x', 'Polar Arctic White', '#f8fafc', 0.00, 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1800&q=80', 'gloss');

-- Showrooms
INSERT INTO showrooms (id, name, city, address, phone, email, operating_hours, lat, lng) VALUES
('showroom-mumbai', 'Autobot Flagship Experience Center — Bandra Kurla Complex', 'Mumbai', 'Tower 4, Maker Maxity, Bandra Kurla Complex, Bandra East, Mumbai 400051', '+91 22 8900 1200', 'mumbai.bkc@autobot.example', 'Mon - Sun: 09:30 AM – 08:30 PM', 19.0657, 72.8688),
('showroom-delhi', 'Autobot Experience Studio — Connaught Place', 'Delhi NCR', 'Block E, Inner Circle, Connaught Place, New Delhi 110001', '+91 11 4872 3300', 'delhi.cp@autobot.example', 'Mon - Sun: 10:00 AM – 09:00 PM', 28.6315, 77.2167),
('showroom-bangalore', 'Autobot Innovation & Showcase Hub — Indiranagar', 'Bengaluru', '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038', '+91 80 6799 4400', 'bengaluru.indiranagar@autobot.example', 'Mon - Sun: 09:30 AM – 08:30 PM', 12.9719, 77.6412);
