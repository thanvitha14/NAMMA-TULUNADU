package com.tulunadu.tourism.repository;

import com.tulunadu.tourism.model.Beach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BeachRepository extends JpaRepository<Beach, Long> {
    List<Beach> findByDistrictContainingIgnoreCase(String district);
    List<Beach> findByNameContainingIgnoreCase(String name);
}