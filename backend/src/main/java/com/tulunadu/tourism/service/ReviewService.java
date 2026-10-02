package com.tulunadu.tourism.service;

import com.tulunadu.tourism.model.Review;
import com.tulunadu.tourism.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviews(String targetType, Long targetId) {
        return reviewRepository.findByTargetTypeAndTargetId(targetType, targetId);
    }

    public List<Review> getReviewsByItem(String itemName) {
        return reviewRepository.findByItemNameOrderByCreatedAtDesc(itemName);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }

    public Review saveReview(Review review) {
        if (review.getCreatedAt() == null) {
            review.setCreatedAt(java.time.LocalDateTime.now());
        }
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
