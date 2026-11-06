package com.autobot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, unique = true, length = 60)
    private String slug;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String tagline;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(name = "starting_price", nullable = false, precision = 15, scale = 2)
    private BigDecimal startingPrice;

    @Column(name = "fuel_type", nullable = false, length = 50)
    private String fuelType;

    @Column(nullable = false, length = 100)
    private String transmission;

    @Column(nullable = false)
    private Integer horsepower;

    @Column(name = "torque_nm", nullable = false)
    private Integer torqueNm;

    @Column(name = "range_or_mileage", nullable = false, length = 50)
    private String rangeOrMileage;

    @Column(name = "seating_capacity", nullable = false)
    private Integer seatingCapacity;

    @Column(name = "top_speed_kmh", nullable = false)
    private Integer topSpeedKmh;

    @Column(name = "acceleration_0_to_100", nullable = false, precision = 4, scale = 2)
    private BigDecimal acceleration0to100;

    @Column(name = "safety_rating_stars", nullable = false)
    private Integer safetyRatingStars = 5;

    @Column(name = "battery_capacity_kwh", precision = 6, scale = 2)
    private BigDecimal batteryCapacityKwh;

    @Column(name = "charging_time_min")
    private Integer chargingTimeMin;

    @Column(name = "hero_image", nullable = false, length = 500)
    private String heroImage;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 30)
    private String status = "Available";

    @Column(name = "launch_date", nullable = false)
    private LocalDate launchDate;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<VehicleColor> colors = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<VehicleVariant> variants = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
