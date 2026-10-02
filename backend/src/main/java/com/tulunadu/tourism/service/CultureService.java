package com.tulunadu.tourism.service;

import com.tulunadu.tourism.model.Culture;
import com.tulunadu.tourism.model.Event;
import com.tulunadu.tourism.repository.CultureRepository;
import com.tulunadu.tourism.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class CultureService {
    @Autowired
    private CultureRepository cultureRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Culture> getAllTraditions() {
        return cultureRepository.findAll();
    }

    public Culture getTraditionById(Long id) {
        return cultureRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cultural tradition not found."));
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByType(String type) {
        return eventRepository.findByEventType(type);
    }
}