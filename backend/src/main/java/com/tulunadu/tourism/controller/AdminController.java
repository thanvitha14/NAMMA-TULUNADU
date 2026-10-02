package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.model.*;
import com.tulunadu.tourism.repository.*;
import com.tulunadu.tourism.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private BeachRepository beachRepository;

    @Autowired
    private TempleRepository templeRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CultureRepository cultureRepository;

    @Autowired
    private EventRepository eventRepository;

    // View All Users
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllUsers() {
        List<Map<String, Object>> users = userRepository.findAll().stream()
                .map(user -> Map.<String, Object>of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "fullName", user.getFullName() == null ? "" : user.getFullName(),
                        "roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList())))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok("Fetched all users", users));
    }

    // View All Reviews
    @GetMapping("/reviews")
    public ResponseEntity<ApiResponse<List<Review>>> getAllReviews() {
        return ResponseEntity.ok(ApiResponse.ok("Fetched all reviews", reviewService.getAllReviews()));
    }

    // Delete Review
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<ApiResponse<String>> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(ApiResponse.ok("Review deleted by admin", "Deleted ID: " + id));
    }

    // Add Beach
    @PostMapping("/beaches")
    public ResponseEntity<ApiResponse<Beach>> addBeach(@RequestBody Beach beach) {
        Beach saved = beachRepository.save(beach);
        return ResponseEntity.ok(ApiResponse.ok("Beach added successfully", saved));
    }

    // Edit Beach
    @PutMapping("/beaches/{id}")
    public ResponseEntity<ApiResponse<Beach>> editBeach(@PathVariable Long id, @RequestBody Beach update) {
        return beachRepository.findById(id).map(existing -> {
            existing.setName(update.getName());
            existing.setDistrict(update.getDistrict());
            existing.setDescription(update.getDescription());
            existing.setActivities(update.getActivities());
            existing.setImageUrl(update.getImageUrl());
            Beach saved = beachRepository.save(existing);
            return ResponseEntity.ok(ApiResponse.ok("Beach updated successfully", saved));
        }).orElseGet(() -> ResponseEntity.badRequest().body(ApiResponse.error("Beach not found")));
    }

    // Delete Beach
    @DeleteMapping("/beaches/{id}")
    public ResponseEntity<ApiResponse<String>> deleteBeach(@PathVariable Long id) {
        beachRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Beach deleted successfully", "Deleted ID: " + id));
    }

    // Add Temple
    @PostMapping("/temples")
    public ResponseEntity<ApiResponse<Temple>> addTemple(@RequestBody Temple temple) {
        Temple saved = templeRepository.save(temple);
        return ResponseEntity.ok(ApiResponse.ok("Temple added successfully", saved));
    }

    // Add Food
    @PostMapping("/food")
    public ResponseEntity<ApiResponse<Food>> addFood(@RequestBody Food food) {
        Food saved = foodRepository.save(food);
        return ResponseEntity.ok(ApiResponse.ok("Food item added successfully", saved));
    }

    // Add Culture
    @PostMapping("/culture")
    public ResponseEntity<ApiResponse<Culture>> addCulture(@RequestBody Culture culture) {
        Culture saved = cultureRepository.save(culture);
        return ResponseEntity.ok(ApiResponse.ok("Culture tradition added successfully", saved));
    }

    // Add Event
    @PostMapping("/events")
    public ResponseEntity<ApiResponse<Event>> addEvent(@RequestBody Event event) {
        Event saved = eventRepository.save(event);
        return ResponseEntity.ok(ApiResponse.ok("Event added successfully", saved));
    }
}
