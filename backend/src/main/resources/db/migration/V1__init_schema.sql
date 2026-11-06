-- ===================================================
-- AUTOBOT AUTOMOTIVE SHOWROOM PLATFORM
-- V1 Flyway Database Schema Migration
-- ===================================================

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'CUSTOMER',
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_username (username),
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS vehicles (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(60) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    starting_price DECIMAL(15,2) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    transmission VARCHAR(100) NOT NULL,
    horsepower INT NOT NULL,
    torque_nm INT NOT NULL,
    range_or_mileage VARCHAR(50) NOT NULL,
    seating_capacity INT NOT NULL,
    top_speed_kmh INT NOT NULL,
    acceleration_0_to_100 DECIMAL(4,2) NOT NULL,
    safety_rating_stars INT NOT NULL DEFAULT 5,
    battery_capacity_kwh DECIMAL(6,2),
    charging_time_min INT,
    hero_image VARCHAR(500) NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Available',
    launch_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_vehicle_category (category),
    INDEX idx_vehicle_price (starting_price),
    INDEX idx_vehicle_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS vehicle_colors (
    id VARCHAR(50) PRIMARY KEY,
    vehicle_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    hex_code VARCHAR(10) NOT NULL,
    price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    image_url VARCHAR(500) NOT NULL,
    exterior_finish VARCHAR(30) DEFAULT 'metallic',
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    INDEX idx_color_vehicle (vehicle_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS vehicle_variants (
    id VARCHAR(50) PRIMARY KEY,
    vehicle_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    badge VARCHAR(50) NOT NULL,
    price_delta DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    drivetrain VARCHAR(100) NOT NULL,
    acceleration VARCHAR(20) NOT NULL,
    top_speed VARCHAR(30) NOT NULL,
    range_or_mileage VARCHAR(50) NOT NULL,
    power VARCHAR(50) NOT NULL,
    torque VARCHAR(50) NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    INDEX idx_variant_vehicle (vehicle_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quotations (
    id VARCHAR(60) PRIMARY KEY,
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    vehicle_id VARCHAR(50) NOT NULL,
    variant_id VARCHAR(50) NOT NULL,
    color_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_city VARCHAR(100) NOT NULL,
    base_price DECIMAL(15,2) NOT NULL,
    customization_costs DECIMAL(15,2) NOT NULL,
    applicable_discount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    estimated_taxes DECIMAL(15,2) NOT NULL,
    estimated_total DECIMAL(15,2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ISSUED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP NOT NULL,
    INDEX idx_quote_number (quotation_number),
    INDEX idx_quote_email (customer_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS test_drive_bookings (
    id VARCHAR(60) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    vehicle_id VARCHAR(50) NOT NULL,
    vehicle_name VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time_slot VARCHAR(50) NOT NULL,
    showroom_location VARCHAR(200) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_td_status (status),
    INDEX idx_td_date (preferred_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS customer_enquiries (
    id VARCHAR(60) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    city VARCHAR(100) NOT NULL,
    vehicle_id VARCHAR(50) NOT NULL,
    vehicle_name VARCHAR(100) NOT NULL,
    preferred_variant VARCHAR(100),
    preferred_contact_method VARCHAR(20) NOT NULL DEFAULT 'PHONE',
    message TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    assigned_rep VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_enq_status (status),
    INDEX idx_enq_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS showrooms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    operating_hours VARCHAR(100) NOT NULL,
    lat DECIMAL(10,6) NOT NULL,
    lng DECIMAL(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    actor_username VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    entity_name VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100),
    ip_address VARCHAR(50),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_time (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
