package com.autobot.repository;

import com.autobot.entity.TestDriveBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestDriveRepository extends JpaRepository<TestDriveBooking, String> {
    List<TestDriveBooking> findByStatus(String status);
}
