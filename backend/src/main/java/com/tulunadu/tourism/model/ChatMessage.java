package com.tulunadu.tourism.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_history")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String sessionId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String userPrompt;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String geminiReply;

    private String language = "en";
    private LocalDateTime createdAt = LocalDateTime.now();

    public ChatMessage() {}
    public ChatMessage(String sessionId, String userPrompt, String geminiReply) {
        this.sessionId = sessionId;
        this.userPrompt = userPrompt;
        this.geminiReply = geminiReply;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public String getUserPrompt() { return userPrompt; }
    public void setUserPrompt(String userPrompt) { this.userPrompt = userPrompt; }
    public String getGeminiReply() { return geminiReply; }
    public void setGeminiReply(String geminiReply) { this.geminiReply = geminiReply; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}