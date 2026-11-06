package com.autobot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "vehicle_colors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleColor {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    @JsonIgnore
    private Vehicle vehicle;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "hex_code", nullable = false, length = 10)
    private String hexCode;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price = BigDecimal.ZERO;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "exterior_finish", length = 30)
    private String exteriorFinish = "metallic";
}
