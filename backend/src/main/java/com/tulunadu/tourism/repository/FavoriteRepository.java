package com.tulunadu.tourism.repository;

import com.tulunadu.tourism.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
    Optional<Favorite> findByUserIdAndItemName(Long userId, String itemName);
    void deleteByUserIdAndItemName(Long userId, String itemName);
}