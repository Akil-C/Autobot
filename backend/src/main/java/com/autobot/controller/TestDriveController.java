package com.autobot.controller;

import com.autobot.entity.TestDriveBooking;
import com.autobot.repository.TestDriveRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/test-drives")
@CrossOrigin(origins = "*")
public class TestDriveController {

    private final TestDriveRepository testDriveRepository;

    public TestDriveController(TestDriveRepository testDriveRepository) {
        this.testDriveRepository = testDriveRepository;
    }

    @PostMapping
    public ResponseEntity<TestDriveBooking> createBooking(@RequestBody TestDriveBooking booking) {
        if (booking.getId() == null || booking.getId().isBlank()) {
            booking.setId("td-" + UUID.randomUUID().toString());
        }
        if (booking.getPreferredDate() == null || booking.getPreferredDate().isBefore(LocalDate.now())) {
            booking.setPreferredDate(LocalDate.now().plusDays(1));
        }
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDateTime.now());

        TestDriveBooking saved = testDriveRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<TestDriveBooking>> getAllBookings() {
        return ResponseEntity.ok(testDriveRepository.findAll());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestParam String status) {
        return testDriveRepository.findById(id).map(booking -> {
            booking.setStatus(status);
            testDriveRepository.save(booking);
            return ResponseEntity.ok(booking);
        }).orElse(ResponseEntity.notFound().build());
    }
}
