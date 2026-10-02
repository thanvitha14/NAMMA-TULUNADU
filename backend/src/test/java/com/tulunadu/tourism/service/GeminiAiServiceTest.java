package com.tulunadu.tourism.service;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GeminiAiServiceTest {
    @Test
    void explainsGeminiQuotaExhaustion() {
        RestClientException providerError = HttpClientErrorException.create(
                HttpStatus.TOO_MANY_REQUESTS,
                "Too Many Requests",
                HttpHeaders.EMPTY,
                new byte[0],
                null);

        ResponseStatusException exception = GeminiAiService.mapProviderFailure(providerError, "gemini-3.5-flash");

        assertEquals(HttpStatus.TOO_MANY_REQUESTS, exception.getStatusCode());
        assertTrue(exception.getReason().contains("quota is exhausted"));
        assertTrue(exception.getReason().contains("gemini-3.5-flash"));
    }

    @Test
    void reportsOtherGeminiHttpErrorsWithoutExposingProviderResponse() {
        RestClientException providerError = HttpClientErrorException.create(
                HttpStatus.UNAUTHORIZED,
                "Unauthorized",
                HttpHeaders.EMPTY,
                "sensitive provider response".getBytes(),
                null);

        ResponseStatusException exception = GeminiAiService.mapProviderFailure(providerError, "gemini-3.5-flash");

        assertEquals(HttpStatus.BAD_GATEWAY, exception.getStatusCode());
        assertTrue(exception.getReason().contains("HTTP 401"));
        assertTrue(!exception.getReason().contains("sensitive provider response"));
    }
}
