package com.tulunadu.tourism.controller;

import com.tulunadu.tourism.dto.ApiResponse;
import com.tulunadu.tourism.dto.ChatRequest;
import com.tulunadu.tourism.service.GeminiAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class GeminiAiController {
    private final GeminiAiService geminiAiService;

    public GeminiAiController(GeminiAiService geminiAiService) {
        this.geminiAiService = geminiAiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<Map<String, String>>> chat(
            @Valid @RequestBody ChatRequest request,
            Authentication authentication) {
        String reply = geminiAiService.processUserQuery(authentication.getName(), request.getMessage().trim());
        return ResponseEntity.ok(ApiResponse.ok("Gemini AI response", Map.of("reply", reply)));
    }
}