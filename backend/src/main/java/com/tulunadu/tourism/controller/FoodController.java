package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.model.Food;
import com.tulunadu.tourism.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/foods")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Food>>> getAllFoods(@RequestParam(required = false) String category) {
        List<Food> list = (category != null && !category.isEmpty())
                ? foodService.getFoodsByCategory(category.toUpperCase())
                : foodService.getAllFoods();
        return ResponseEntity.ok(ApiResponse.ok("Fetched food items", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Food>> getFood(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Fetched food item", foodService.getFoodById(id)));
    }
}