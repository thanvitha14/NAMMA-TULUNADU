package com.tulunadu.tourism.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "itineraries")
public class TripItinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String username;

    @NotBlank
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    private String title;

    @NotNull
    @Min(1)
    @Max(30)
    @Column(name = "duration_days")
    private Integer durationDays = 2;

    @Column(name = "budget_category")
    private String budgetCategory = "Moderate";

    @Column(name = "itinerary_data", columnDefinition = "TEXT")
    private String itineraryData;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public TripItinerary() {}

    public TripItinerary(Long userId, String username, String title, Integer durationDays, String budgetCategory, String itineraryData) {
        this.userId = userId;
        this.username = username;
        this.title = title;
        this.durationDays = durationDays;
        this.budgetCategory = budgetCategory;
        this.itineraryData = itineraryData;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

    public String getBudgetCategory() { return budgetCategory; }
    public void setBudgetCategory(String budgetCategory) { this.budgetCategory = budgetCategory; }

    public String getItineraryData() { return itineraryData; }
    public void setItineraryData(String itineraryData) { this.itineraryData = itineraryData; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
