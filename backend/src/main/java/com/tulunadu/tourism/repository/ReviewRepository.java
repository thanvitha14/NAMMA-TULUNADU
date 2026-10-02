package com.tulunadu.tourism.repository;

import com.tulunadu.tourism.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByItemNameOrderByCreatedAtDesc(String itemName);
    List<Review> findByTargetTypeAndTargetId(String targetType, Long targetId);
    List<Review> findAllByOrderByCreatedAtDesc();
}
