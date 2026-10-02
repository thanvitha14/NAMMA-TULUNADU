package com.tulunadu.tourism.service;

import com.tulunadu.tourism.model.TripItinerary;
import com.tulunadu.tourism.repository.TripItineraryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TripItineraryServiceTest {
    @Mock
    private TripItineraryRepository tripRepository;

    @InjectMocks
    private TripItineraryService tripService;

    @Test
    void savesTripUsingAuthenticatedOwner() {
        TripItinerary trip = new TripItinerary();
        trip.setTitle("Coastal trip");
        trip.setDurationDays(3);

        tripService.saveTrip(trip, 42L, "traveler");

        assertEquals(42L, trip.getUserId());
        assertEquals("traveler", trip.getUsername());
        verify(tripRepository).save(trip);
    }

    @Test
    void rejectsDurationOutsideSupportedRange() {
        TripItinerary trip = new TripItinerary();
        trip.setTitle("Coastal trip");
        trip.setDurationDays(31);

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> tripService.saveTrip(trip, 42L, "traveler"));

        assertEquals(400, exception.getStatusCode().value());
    }

    @Test
    void doesNotExposeAnotherUsersTrip() {
        TripItinerary trip = new TripItinerary();
        trip.setUserId(7L);
        when(tripRepository.findById(10L)).thenReturn(Optional.of(trip));

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> tripService.getTripById(10L, 42L));

        assertEquals(404, exception.getStatusCode().value());
    }
}
