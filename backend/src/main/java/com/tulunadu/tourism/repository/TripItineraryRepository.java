package com.tulunadu.tourism.repository;

import com.tulunadu.tourism.model.TripItinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TripItineraryRepository extends JpaRepository<TripItinerary, Long> {
    List<TripItinerary> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<TripItinerary> findByUsernameOrderByCreatedAtDesc(String username);
    List<TripItinerary> findAllByOrderByCreatedAtDesc();
}
