package com.autobot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "vehicle_variants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleVariant {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    @JsonIgnore
    private Vehicle vehicle;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String badge;

    @Column(name = "price_delta", nullable = false, precision = 12, scale = 2)
    private BigDecimal priceDelta = BigDecimal.ZERO;

    @Column(nullable = false, length = 100)
    private String drivetrain;

    @Column(nullable = false, length = 20)
    private String acceleration;

    @Column(name = "top_speed", nullable = false, length = 30)
    private String topSpeed;

    @Column(name = "range_or_mileage", nullable = false, length = 50)
    private String rangeOrMileage;

    @Column(nullable = false, length = 50)
    private String power;

    @Column(nullable = false, length = 50)
    private String torque;
}
