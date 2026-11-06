package com.autobot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "customer_enquiries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerEnquiry {

    @Id
    @Column(length = 60)
    private String id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(name = "vehicle_id", nullable = false, length = 50)
    private String vehicleId;

    @Column(name = "vehicle_name", nullable = false, length = 100)
    private String vehicleName;

    @Column(name = "preferred_variant", length = 100)
    private String preferredVariant;

    @Column(name = "preferred_contact_method", nullable = false, length = 20)
    private String preferredContactMethod = "PHONE";

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false, length = 30)
    private String status = "NEW";

    @Column(name = "assigned_rep", length = 100)
    private String assignedRep;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
