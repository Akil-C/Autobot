package com.autobot.controller;

import com.autobot.entity.Vehicle;
import com.autobot.repository.VehicleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleRepository vehicleRepository;

    public VehicleController(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getVehicles(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        
        List<Vehicle> list;
        if (category != null && !category.equalsIgnoreCase("All")) {
            list = vehicleRepository.findByCategoryIgnoreCase(category);
        } else if (search != null && !search.isBlank()) {
            list = vehicleRepository.findByNameContainingIgnoreCase(search);
        } else {
            list = vehicleRepository.findAll();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("vehicles", list);
        response.put("total", list.size());
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable String id) {
        return vehicleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<?> getVehicleBySlug(@PathVariable String slug) {
        return vehicleRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
