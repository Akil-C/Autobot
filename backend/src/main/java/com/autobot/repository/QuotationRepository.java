package com.autobot.repository;

import com.autobot.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, String> {
    Optional<Quotation> findByQuotationNumber(String quotationNumber);
}
