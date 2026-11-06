package com.autobot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "test_drive_bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestDriveBooking {

    @Id
    @Column(length = 60)
    private String id;

    @Column(name = "customer_name", nullable = false, length = 100)
    private String customerName;

    @Column(name = "customer_email", nullable = false, length = 100)
    private String customerEmail;

    @Column(name = "customer_phone", nullable = false, length = 30)
    private String customerPhone;

    @Column(name = "vehicle_id", nullable = false, length = 50)
    private String vehicleId;

    @Column(name = "vehicle_name", nullable = false, length = 100)
    private String vehicleName;

    @Column(name = "preferred_date", nullable = false)
    private LocalDate preferredDate;

    @Column(name = "preferred_time_slot", nullable = false, length = 50)
    private String preferredTimeSlot;

    @Column(name = "showroom_location", nullable = false, length = 200)
    private String showroomLocation;

    @Column(nullable = false, length = 30)
    private String status = "PENDING";

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
