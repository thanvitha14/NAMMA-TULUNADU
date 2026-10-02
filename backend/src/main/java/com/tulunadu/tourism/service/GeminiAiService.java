package com.tulunadu.tourism.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.tulunadu.tourism.model.ChatMessage;
import com.tulunadu.tourism.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class GeminiAiService {
    private final ChatMessageRepository chatMessageRepository;
    private final RestClient.Builder restClientBuilder;
    private final String apiKey;
    private final String model;
    private final String apiUrl;

    public GeminiAiService(
            ChatMessageRepository chatMessageRepository,
            RestClient.Builder restClientBuilder,
            @Value("${gemini.api.key}") String apiKey,
            @Value("${gemini.api.model}") String model,
            @Value("${gemini.api.url}") String apiUrl) {
        this.chatMessageRepository = chatMessageRepository;
        this.restClientBuilder = restClientBuilder;
        this.apiKey = apiKey;
        this.model = model;
        this.apiUrl = apiUrl;
    }

    public String processUserQuery(String username, String prompt) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Gemini API is not configured.");
        }

        Map<String, Object> request = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of(
                                "text", "You are an expert coastal Karnataka tourism guide specializing in Tulunadu. "
                                        + "Respond warmly, accurately, and helpfully.\n\n" + prompt)))));

        try {
            JsonNode response = restClientBuilder.baseUrl(apiUrl).build()
                    .post()
                    .uri(uriBuilder -> uriBuilder.path("/{model}:generateContent")
                            .queryParam("key", apiKey)
                            .build(model))
                    .body(request)
                    .retrieve()
                    .body(JsonNode.class);
            JsonNode textNode = response == null
                    ? null
                    : response.path("candidates").path(0).path("content").path("parts").path(0).path("text");
            if (textNode == null || !textNode.isTextual() || textNode.asText().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Gemini returned an empty response.");
            }

            String reply = textNode.asText();
            chatMessageRepository.save(new ChatMessage(username, prompt, reply));
            return reply;
        } catch (RestClientException exception) {
            throw mapProviderFailure(exception, model);
        }
    }

    static ResponseStatusException mapProviderFailure(RestClientException exception, String model) {
        if (exception instanceof RestClientResponseException responseException) {
            if (responseException.getStatusCode().value() == HttpStatus.TOO_MANY_REQUESTS.value()) {
                return new ResponseStatusException(
                        HttpStatus.TOO_MANY_REQUESTS,
                        "Gemini quota is exhausted for model " + model
                                + ". Wait for the quota to reset or check the Google AI Studio project's usage, rate limits, and billing.");
            }
            return new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Gemini returned HTTP " + responseException.getStatusCode().value()
                            + ". Check the API key's project access and configured model.");
        }
        return new ResponseStatusException(
                HttpStatus.BAD_GATEWAY,
                "Gemini could not be reached. Check the backend's internet connection and try again.");
    }
}
