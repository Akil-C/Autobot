package com.autobot.repository;

import com.autobot.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
    Optional<Vehicle> findBySlug(String slug);
    List<Vehicle> findByCategoryIgnoreCase(String category);
    List<Vehicle> findByNameContainingIgnoreCase(String name);
}
