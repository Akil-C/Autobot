package com.autobot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quotation {

    @Id
    @Column(length = 60)
    private String id;

    @Column(name = "quotation_number", nullable = false, unique = true, length = 50)
    private String quotationNumber;

    @Column(name = "vehicle_id", nullable = false, length = 50)
    private String vehicleId;

    @Column(name = "variant_id", nullable = false, length = 50)
    private String variantId;

    @Column(name = "color_id", nullable = false, length = 50)
    private String colorId;

    @Column(name = "customer_name", nullable = false, length = 100)
    private String customerName;

    @Column(name = "customer_email", nullable = false, length = 100)
    private String customerEmail;

    @Column(name = "customer_phone", nullable = false, length = 30)
    private String customerPhone;

    @Column(name = "customer_city", nullable = false, length = 100)
    private String customerCity;

    @Column(name = "base_price", nullable = false, precision = 15, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "customization_costs", nullable = false, precision = 15, scale = 2)
    private BigDecimal customizationCosts;

    @Column(name = "applicable_discount", nullable = false, precision = 15, scale = 2)
    private BigDecimal applicableDiscount = BigDecimal.ZERO;

    @Column(name = "estimated_taxes", nullable = false, precision = 15, scale = 2)
    private BigDecimal estimatedTaxes;

    @Column(name = "estimated_total", nullable = false, precision = 15, scale = 2)
    private BigDecimal estimatedTotal;

    @Column(nullable = false, length = 30)
    private String status = "ISSUED";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "valid_until", nullable = false)
    private LocalDateTime validUntil;
}
