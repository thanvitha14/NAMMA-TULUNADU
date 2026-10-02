package com.tulunadu.tourism.model;

import jakarta.persistence.*;

@Entity
@Table(name = "temples")
public class Temple {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String deity;
    private String district;
    private Double latitude;
    private Double longitude;

    @Column(columnDefinition = "TEXT")
    private String significance;

    private String timings;
    private String dressCode;
    private String imageUrl;

    public Temple() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDeity() { return deity; }
    public void setDeity(String deity) { this.deity = deity; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getSignificance() { return significance; }
    public void setSignificance(String significance) { this.significance = significance; }
    public String getTimings() { return timings; }
    public void setTimings(String timings) { this.timings = timings; }
    public String getDressCode() { return dressCode; }
    public void setDressCode(String dressCode) { this.dressCode = dressCode; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}