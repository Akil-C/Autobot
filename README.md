# 🏎️ AUTOBOT — Premium Automotive Showroom Platform

> **"ENGINEERED FOR WHAT'S NEXT."**  
> Autobot is a next-generation luxury automotive showroom platform showcasing 15 bespoke fictional vehicles, live 3D exterior paint customizer, step-by-step configurator, official quotation generation, test-drive scheduling, and full administrator analytics.

---

## 🌟 Key Features & Website Structure

### 1. Public Showroom & Experience Pages
- **Home (`/`)**: Cinematic hero visual with parallax atmosphere, live interactive color customizer, featured models, technology highlights (ADAS Level 3+, 800V FlashCharge, 35.4" Curved OLED), and customer journey.
- **Vehicles Fleet (`/vehicles`)**: Complete catalogue of 15 unique models with search, body style filters (Sedan, SUV, Electric SUV, Electric Sedan, Performance, Luxury, Compact SUV, Hypercar), powertrain filters, and sorting.
- **Vehicle Details (`/vehicles/:slug`)**: High-fidelity interactive vehicle viewer, animated performance counters (0-100 km/h, horsepower, torque, top speed, WLTP range), trim variant comparisons, and key innovations.
- **Vehicle Configurator (`/configurator`)**: Step-by-step atelier wizard:
  1. Model selection
  2. Exterior paint finish (Obsidian Black, Titanium Matte, Apex Red, Arctic White, etc.)
  3. Trim variants with powertrain tuning
  4. Handcrafted interior leather options
  5. Forged wheels & aerodynamic alloys
  6. Factory technology packages (Autobot Co-Pilot Suite, Dolby Atmos Studio, Arctic Pack)
  7. Bespoke accessories (22kW Home Wallbox, all-weather protection, luggage sets)
  8. Real-time cost breakdown & official quotation generation with celebratory confetti!
- **Compare Models (`/compare`)**: Side-by-side technical specification matrix comparing up to 3 vehicles across 20+ engineering attributes.
- **Privilege Offers (`/offers`)**: Special financing incentives, complimentary 22kW wallbox bundles, and trade-in appreciation programs.
- **About Autobot (`/about`)**: Brand heritage, net-zero gigafactories, coachbuilt luxury, and global headquarters.
- **Flagship Showrooms (`/showrooms`)**: Studio locator across Mumbai (BKC), Delhi NCR (Connaught Place), Bengaluru (Indiranagar), Hyderabad (Jubilee Hills), and Chennai.
- **Book a Test Drive (`/test-drive`)**: Validated test-drive booking module with dynamic calendar date limits, time slots, showroom locations, and instant confirmation.
- **VIP Dealer Enquiry (`/enquiry`)**: Tailored client enquiry form with channel preferences (Phone, WhatsApp, Email) and anti-spam validation.
- **Technology & Innovation (`/technology`)**: In-depth architectural review of neural ADAS perception, 800V fast-charging batteries, active acoustic cancellation, and Armor Cell safety cages.
- **Knowledge Base FAQ (`/faq`)**: Categorized accordions covering ordering, EV charging, financing, and warranty.
- **Legal & Compliance**:
  - **Privacy Policy (`/privacy-policy`)**
  - **Terms & Conditions (`/terms`)**
  - **Cookie Policy (`/cookie-policy`)**
  - **Automotive Disclaimer (`/disclaimer`)**

### 2. Administrator Command Center (`/admin/dashboard`)
- **Executive KPIs**: Real-time fleet count, enquiry velocity, test drive bookings, and pipeline quotation value.
- **Recharts Analytics**: Monthly activity progression charts and model popularity share distributions.
- **Enquiry Management**: Review customer enquiries and update operational statuses (`NEW`, `CONTACTED`, `IN_PROGRESS`, `CLOSED`).
- **Test Drive Dispatch**: Track and update booking status (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- **Quotation Registry**: View generated quotation numbers, calculate tax breakdowns, and download official PDF estimates.
- **Immutable Audit Trail**: Security log recording administrative updates and timestamped entity operations.

---

## 🚗 The 15 Autobot Fleet Models

| Model | Class | Powertrain | Peak Output | 0-100 km/h | Range / Efficiency |
|---|---|---|---|---|---|
| **Autobot Aero X** | Electric Sedan | Pure Electric (Dual Motor) | 780 HP | 2.7s | 685 km WLTP |
| **Autobot Phantom GT** | Performance | 4.0L Twin-Turbo V8 | 820 HP | 2.9s | 11.8 L / 100km |
| **Autobot Apex SUV** | Electric SUV | Pure Electric (e-AWD) | 650 HP | 3.8s | 620 km WLTP |
| **Autobot Vanguard** | Luxury Sedan | Plug-in Hybrid | 480 HP | 4.4s | 1.9 L / 100km (110 km EV) |
| **Autobot Pulse EV** | Compact SUV | Pure Electric | 310 HP | 5.6s | 520 km WLTP |
| **Autobot CyberTrack** | Electric SUV | Quad-Motor Electric | 1020 HP | 2.8s | 710 km WLTP |
| **Autobot Solstice** | Luxury Cabriolet | Pure Electric | 610 HP | 3.3s | 580 km WLTP |
| **Autobot Velocity** | Hypercar | Pure Electric Inverter | 1350 HP | 1.95s | 520 km Track |
| **Autobot Horizon** | Luxury LWB Sedan | Pure Electric | 680 HP | 3.9s | 780 km WLTP |
| **Autobot Terra Titan** | Offroad SUV | 4.4L Twin-Turbo V8 | 620 HP | 4.8s | 13.2 L / 100km |
| **Autobot Nexus GT** | Electric Sedan | Pure Electric | 590 HP | 3.2s | 640 km WLTP |
| **Autobot Zenith** | Compact SUV | Pure Electric | 380 HP | 4.9s | 590 km WLTP |
| **Autobot Starlight** | Executive SUV | 3.0L Turbo V6 PHEV | 550 HP | 4.6s | 2.4 L / 100km |
| **Autobot Hyperion** | Hypercar | Hydrogen-Electric | 1500 HP | 1.85s | 950 km H2 Range |
| **Autobot Quantum Cross** | Compact SUV | Pure Electric | 275 HP | 6.2s | 480 km WLTP |

---

## 🛠️ Technology Stack

### Frontend
- **React 18+ & Vite** with TypeScript
- **Tailwind CSS** with obsidian/graphite dark automotive design system
- **Framer Motion & Three.js** visualizers
- **Recharts** for admin performance analytics
- **Lucide React** luxury iconography
- **Canvas Confetti** celebratory feedback

### Backend
- **Java 21 & Spring Boot 3+**
- **Spring Security** with stateless JWT authentication & RBAC
- **Spring Data JPA & Hibernate**
- **Flyway Database Migrations** (`V1__init_schema.sql`, `V2__seed_data.sql`)
- **Bean Validation & Lombok**
- **OpenAPI 3 / Swagger UI**

### Infrastructure
- **Docker & Docker Compose** (Frontend, Backend, MySQL 8, Redis, Nginx)
- **Nginx Reverse Proxy** with gzip compression & asset caching
- **GitHub Actions CI/CD Pipeline**

---

## 🚀 Quick Start Guide

### 1. Launching the Frontend
```powershell
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 2. Building for Production
```powershell
cd frontend
npm run build
```

### 3. Launching with Docker Compose
```powershell
docker-compose up --build
```
This boots MySQL 8, the Spring Boot API, and the React frontend on ports `80` and `8080`.

---

## 🛡️ Security & Disclaimers

- Passwords hashed using standard BCrypt algorithms.
- Vehicle prices recalculated and validated server-side during quotation generation.
- Role-based authorization (`CUSTOMER`, `SALES_MANAGER`, `ADMIN`, `SUPER_ADMIN`).
- Rate limiting and input sanitization on public enquiry and test-drive endpoints.

*Autobot Automotive Private Ltd. © 2026. All rights reserved.*
