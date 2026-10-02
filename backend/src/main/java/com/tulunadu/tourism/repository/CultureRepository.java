package com.tulunadu.tourism.repository;

import com.tulunadu.tourism.model.Culture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CultureRepository extends JpaRepository<Culture, Long> {
    List<Culture> findByNameContainingIgnoreCase(String name);
}