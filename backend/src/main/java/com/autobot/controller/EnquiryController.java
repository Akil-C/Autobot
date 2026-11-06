package com.autobot.controller;

import com.autobot.entity.CustomerEnquiry;
import com.autobot.repository.EnquiryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin(origins = "*")
public class EnquiryController {

    private final EnquiryRepository enquiryRepository;

    public EnquiryController(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    @PostMapping
    public ResponseEntity<CustomerEnquiry> submitEnquiry(@RequestBody CustomerEnquiry enquiry) {
        if (enquiry.getId() == null || enquiry.getId().isBlank()) {
            enquiry.setId("enq-" + UUID.randomUUID().toString());
        }
        enquiry.setStatus("NEW");
        enquiry.setCreatedAt(LocalDateTime.now());

        CustomerEnquiry saved = enquiryRepository.save(enquiry);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<CustomerEnquiry>> getAllEnquiries() {
        return ResponseEntity.ok(enquiryRepository.findAll());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestParam String status) {
        return enquiryRepository.findById(id).map(enquiry -> {
            enquiry.setStatus(status);
            enquiryRepository.save(enquiry);
            return ResponseEntity.ok(enquiry);
        }).orElse(ResponseEntity.notFound().build());
    }
}
