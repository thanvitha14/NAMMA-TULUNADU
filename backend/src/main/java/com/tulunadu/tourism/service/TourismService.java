package com.tulunadu.tourism.service;

import com.tulunadu.tourism.model.Beach;
import com.tulunadu.tourism.model.Temple;
import com.tulunadu.tourism.repository.BeachRepository;
import com.tulunadu.tourism.repository.TempleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class TourismService {
    @Autowired
    private BeachRepository beachRepository;

    @Autowired
    private TempleRepository templeRepository;

    public List<Beach> getAllBeaches() {
        return beachRepository.findAll();
    }

    public List<Beach> searchBeaches(String query) {
        return beachRepository.findByNameContainingIgnoreCase(query);
    }

    public Beach getBeachById(Long id) {
        return beachRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Beach not found."));
    }

    public List<Temple> getAllTemples() {
        return templeRepository.findAll();
    }

    public List<Temple> searchTemples(String query) {
        return templeRepository.findByNameContainingIgnoreCase(query);
    }

    public Temple getTempleById(Long id) {
        return templeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Temple not found."));
    }
}