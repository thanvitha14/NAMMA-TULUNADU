package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.model.Review;
import com.tulunadu.tourism.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import com.tulunadu.tourism.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final UserRepository userRepository;

    public ReviewController(ReviewService reviewService, UserRepository userRepository) {
        this.reviewService = reviewService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Review>>> getReviews(
            @RequestParam(required = false) String itemName,
            @RequestParam(required = false) String targetType,
            @RequestParam(required = false) Long targetId) {
        List<Review> list;
        if (itemName != null && !itemName.isEmpty()) {
            list = reviewService.getReviewsByItem(itemName);
        } else if (targetType != null && targetId != null) {
            list = reviewService.getReviews(targetType, targetId);
        } else {
            list = reviewService.getAllReviews();
        }
        return ResponseEntity.ok(ApiResponse.ok("Fetched reviews", list));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Review>> addReview(@RequestBody Review review, Authentication authentication) {
        if (review.getRating() == null || review.getRating() < 1 || review.getRating() > 5
                || review.getItemName() == null || review.getItemName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A destination and rating from 1 to 5 are required.");
        }
        review.setId(null);
        review.setAuthorName(authentication.getName());
        review.setUser(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found.")));
        Review saved = reviewService.saveReview(review);
        return ResponseEntity.ok(ApiResponse.ok("Review added successfully!", saved));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(ApiResponse.ok("Review deleted successfully", "Deleted ID: " + id));
    }
}
