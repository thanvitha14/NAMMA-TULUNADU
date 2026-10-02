package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.model.Beach;
import com.tulunadu.tourism.model.Temple;
import com.tulunadu.tourism.service.TourismService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TourismController {
    @Autowired
    private TourismService tourismService;

    @GetMapping("/beaches")
    public ResponseEntity<ApiResponse<List<Beach>>> getAllBeaches(@RequestParam(required = false) String search) {
        List<Beach> list = (search != null && !search.isEmpty()) 
                ? tourismService.searchBeaches(search) 
                : tourismService.getAllBeaches();
        return ResponseEntity.ok(ApiResponse.ok("Fetched beaches", list));
    }

    @GetMapping("/beaches/{id}")
    public ResponseEntity<ApiResponse<Beach>> getBeach(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Fetched beach", tourismService.getBeachById(id)));
    }

    @GetMapping("/temples")
    public ResponseEntity<ApiResponse<List<Temple>>> getAllTemples(@RequestParam(required = false) String search) {
        List<Temple> list = (search != null && !search.isEmpty()) 
                ? tourismService.searchTemples(search) 
                : tourismService.getAllTemples();
        return ResponseEntity.ok(ApiResponse.ok("Fetched temples", list));
    }

    @GetMapping("/temples/{id}")
    public ResponseEntity<ApiResponse<Temple>> getTemple(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Fetched temple", tourismService.getTempleById(id)));
    }
}