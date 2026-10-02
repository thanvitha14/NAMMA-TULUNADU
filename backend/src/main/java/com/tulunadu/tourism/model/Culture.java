package com.tulunadu.tourism.model;

import jakarta.persistence.*;

@Entity
@Table(name = "festivals")
public class Culture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String category;
    private String season;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String culturalImportance;

    private String imageUrl;

    public Culture() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCulturalImportance() { return culturalImportance; }
    public void setCulturalImportance(String culturalImportance) { this.culturalImportance = culturalImportance; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}