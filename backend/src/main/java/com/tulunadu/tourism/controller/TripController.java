package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.model.TripItinerary;
import com.tulunadu.tourism.service.TripItineraryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.tulunadu.tourism.repository.UserRepository;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/trips")
public class TripController {
    private final TripItineraryService tripService;
    private final UserRepository userRepository;

    public TripController(TripItineraryService tripService, UserRepository userRepository) {
        this.tripService = tripService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TripItinerary>>> getTrips(Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(ApiResponse.ok("Fetched itineraries",
                tripService.getTripsByUser(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TripItinerary>> createTrip(
            @Valid @RequestBody TripItinerary trip,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        TripItinerary saved = tripService.saveTrip(trip, userId, authentication.getName());
        return ResponseEntity.ok(ApiResponse.ok("Trip itinerary saved successfully!", saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TripItinerary>> getTrip(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(ApiResponse.ok("Fetched itinerary",
                tripService.getTripById(id, userId)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTrip(@PathVariable Long id, Authentication authentication) {
        tripService.deleteTrip(id, getUserId(authentication));
        return ResponseEntity.ok(ApiResponse.ok("Trip deleted successfully", "Deleted ID: " + id));
    }

    private Long getUserId(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .map(user -> user.getId())
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.UNAUTHORIZED, "Account not found."));
    }
}
