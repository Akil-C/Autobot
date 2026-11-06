package com.autobot.repository;

import com.autobot.entity.CustomerEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnquiryRepository extends JpaRepository<CustomerEnquiry, String> {
    List<CustomerEnquiry> findByStatus(String status);
}
