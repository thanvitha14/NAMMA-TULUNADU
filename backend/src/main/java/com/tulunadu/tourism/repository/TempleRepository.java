package com.tulunadu.tourism.repository;

import com.tulunadu.tourism.model.Temple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TempleRepository extends JpaRepository<Temple, Long> {
    List<Temple> findByDistrictContainingIgnoreCase(String district);
    List<Temple> findByNameContainingIgnoreCase(String name);
}