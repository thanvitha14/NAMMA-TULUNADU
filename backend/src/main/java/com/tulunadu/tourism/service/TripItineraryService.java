package com.tulunadu.tourism.service;

import com.tulunadu.tourism.model.TripItinerary;
import com.tulunadu.tourism.repository.TripItineraryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TripItineraryService {
    private final TripItineraryRepository tripRepository;

    public TripItineraryService(TripItineraryRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<TripItinerary> getTripsByUser(Long userId) {
        return tripRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public TripItinerary getTripById(Long id, Long userId) {
        return tripRepository.findById(id)
                .filter(trip -> userId.equals(trip.getUserId()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trip not found."));
    }

    public TripItinerary saveTrip(TripItinerary trip, Long userId, String username) {
        if (trip.getTitle() == null || trip.getTitle().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Trip title is required.");
        }
        if (trip.getDurationDays() == null || trip.getDurationDays() < 1 || trip.getDurationDays() > 30) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Trip duration must be between 1 and 30 days.");
        }
        trip.setId(null);
        trip.setUserId(userId);
        trip.setUsername(username);
        trip.setCreatedAt(java.time.LocalDateTime.now());
        return tripRepository.save(trip);
    }

    public void deleteTrip(Long id, Long userId) {
        TripItinerary trip = getTripById(id, userId);
        tripRepository.delete(trip);
    }
}
