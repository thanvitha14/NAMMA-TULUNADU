package com.tulunadu.tourism.service;

import com.tulunadu.tourism.model.Favorite;
import com.tulunadu.tourism.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoritesByUserId(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public Favorite addFavorite(Long userId, String itemName, String itemType) {
        Optional<Favorite> existing = favoriteRepository.findByUserIdAndItemName(userId, itemName);
        if (existing.isPresent()) {
            return existing.get();
        }
        Favorite fav = new Favorite(userId, itemName, itemType);
        return favoriteRepository.save(fav);
    }

    @Transactional
    public void removeFavorite(Long userId, String itemName) {
        favoriteRepository.deleteByUserIdAndItemName(userId, itemName);
    }

    public boolean isFavorite(Long userId, String itemName) {
        return favoriteRepository.findByUserIdAndItemName(userId, itemName).isPresent();
    }
}
