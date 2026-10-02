package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.model.Favorite;
import com.tulunadu.tourism.service.FavoriteService;
import com.tulunadu.tourism.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {
    private final FavoriteService favoriteService;
    private final UserRepository userRepository;

    public FavoriteController(FavoriteService favoriteService, UserRepository userRepository) {
        this.favoriteService = favoriteService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Favorite>>> getFavorites(Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(ApiResponse.ok("Fetched user favorites", favoriteService.getFavoritesByUserId(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Favorite>> addFavorite(
            @RequestBody Map<String, Object> payload, Authentication authentication) {
        Long userId = getUserId(authentication);
        String itemName = String.valueOf(payload.getOrDefault("itemName", "")).trim();
        if (itemName.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Favorite item name is required.");
        }
        String itemType = String.valueOf(payload.getOrDefault("itemType", "BEACH")).toUpperCase();
        if (!Set.of("BEACH", "TEMPLE", "FOOD", "EVENT").contains(itemType)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported favorite category.");
        }
        Favorite saved = favoriteService.addFavorite(userId, itemName, itemType);
        return ResponseEntity.ok(ApiResponse.ok("Added to favorites", saved));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<String>> removeFavorite(
            @RequestParam String itemName,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        favoriteService.removeFavorite(userId, itemName);
        return ResponseEntity.ok(ApiResponse.ok("Removed from favorites", itemName));
    }

    private Long getUserId(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .map(user -> user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not found."));
    }
}
