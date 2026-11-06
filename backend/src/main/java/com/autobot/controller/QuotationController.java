package com.autobot.controller;

import com.autobot.entity.Quotation;
import com.autobot.repository.QuotationRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/quotations")
@CrossOrigin(origins = "*")
public class QuotationController {

    private final QuotationRepository quotationRepository;

    public QuotationController(QuotationRepository quotationRepository) {
        this.quotationRepository = quotationRepository;
    }

    @PostMapping
    public ResponseEntity<Quotation> createQuotation(@RequestBody Quotation request) {
        if (request.getId() == null || request.getId().isBlank()) {
            request.setId("quote-" + UUID.randomUUID().toString());
        }
        if (request.getQuotationNumber() == null || request.getQuotationNumber().isBlank()) {
            request.setQuotationNumber("ATB-2026-" + (int)(100000 + Math.random() * 900000));
        }

        // Server-side validation and calculation safeguards
        BigDecimal base = request.getBasePrice() != null ? request.getBasePrice() : BigDecimal.valueOf(8500000);
        BigDecimal custom = request.getCustomizationCosts() != null ? request.getCustomizationCosts() : BigDecimal.ZERO;
        BigDecimal subtotal = base.add(custom);
        
        // 2% Privilege promotional discount
        BigDecimal discount = subtotal.multiply(BigDecimal.valueOf(0.02));
        BigDecimal taxable = subtotal.subtract(discount);
        // 18% GST estimate
        BigDecimal taxes = taxable.multiply(BigDecimal.valueOf(0.18));
        BigDecimal total = taxable.add(taxes);

        request.setApplicableDiscount(discount);
        request.setEstimatedTaxes(taxes);
        request.setEstimatedTotal(total);
        request.setCreatedAt(LocalDateTime.now());
        request.setValidUntil(LocalDateTime.now().plusDays(14));
        request.setStatus("ISSUED");

        Quotation saved = quotationRepository.save(request);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuotation(@PathVariable String id) {
        return quotationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/{id}/pdf", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getQuotationPdf(@PathVariable String id) {
        Optional<Quotation> opt = quotationRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Quotation q = opt.get();

        String pdfText = "========================================================\n"
                + "              AUTOBOT AUTOMOTIVE SHOWROOM\n"
                + "            OFFICIAL VEHICLE ESTIMATE PDF\n"
                + "========================================================\n"
                + "Quotation No: " + q.getQuotationNumber() + "\n"
                + "Issued Date : " + q.getCreatedAt() + "\n"
                + "Valid Until : " + q.getValidUntil() + "\n"
                + "--------------------------------------------------------\n"
                + "Client Name : " + q.getCustomerName() + "\n"
                + "Client Email: " + q.getCustomerEmail() + "\n"
                + "Client Phone: " + q.getCustomerPhone() + "\n"
                + "City        : " + q.getCustomerCity() + "\n"
                + "--------------------------------------------------------\n"
                + "Vehicle ID  : " + q.getVehicleId() + "\n"
                + "Base Price  : INR " + q.getBasePrice() + "\n"
                + "Custom Opts : INR " + q.getCustomizationCosts() + "\n"
                + "Discount 2% : -INR " + q.getApplicableDiscount() + "\n"
                + "Taxes (18%) : +INR " + q.getEstimatedTaxes() + "\n"
                + "TOTAL EST.  : INR " + q.getEstimatedTotal() + "\n"
                + "========================================================\n"
                + "DISCLAIMER: This document is an estimate and not a sale\n"
                + "contract. Final on-road pricing confirmed by Autobot.\n"
                + "========================================================\n";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Autobot-Quote-" + q.getQuotationNumber() + ".txt\"")
                .body(pdfText);
    }
}
