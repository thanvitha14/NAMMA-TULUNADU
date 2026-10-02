package com.tulunadu.tourism;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Namma Tulunadu Spring Boot REST API for Coastal Karnataka.
 */
@SpringBootApplication
@EnableAsync
public class TulunaduApplication {

    public static void main(String[] args) {
        SpringApplication.run(TulunaduApplication.class, args);
        System.out.println("=============================================================");
        System.out.println("🌊 NAMMA TULUNADU SPRING BOOT REST API STARTED ON :8080");
        System.out.println("☕ Java 21, Spring Security, MySQL & Gemini integration ready");
        System.out.println("=============================================================");
    }
}