package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.model.Culture;
import com.tulunadu.tourism.model.Event;
import com.tulunadu.tourism.service.CultureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/culture")
public class CultureController {
    @Autowired
    private CultureService cultureService;

    @GetMapping("/traditions")
    public ResponseEntity<ApiResponse<List<Culture>>> getAllTraditions() {
        return ResponseEntity.ok(ApiResponse.ok("Fetched culture and traditions", cultureService.getAllTraditions()));
    }

    @GetMapping("/traditions/{id}")
    public ResponseEntity<ApiResponse<Culture>> getTradition(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Fetched cultural tradition", cultureService.getTraditionById(id)));
    }

    @GetMapping("/events")
    public ResponseEntity<ApiResponse<List<Event>>> getAllEvents() {
        return ResponseEntity.ok(ApiResponse.ok("Fetched upcoming coastal events", cultureService.getAllEvents()));
    }
}