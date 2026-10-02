package com.tulunadu.tourism.config;

import com.tulunadu.tourism.model.Review;
import com.tulunadu.tourism.model.Role;
import com.tulunadu.tourism.model.User;
import com.tulunadu.tourism.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.admin.username:}")
    private String adminUsername;

    @Value("${app.admin.email:}")
    private String adminEmail;

    @Value("${app.admin.password:}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        Role roleUser = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));
        Role roleAdmin = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));

        initializeConfiguredAdmin(roleUser, roleAdmin);

        // Sample reviews are only inserted into an empty reviews table.
        User sampleReviewer = userRepository.findAll().stream().findFirst().orElse(null);
        if (reviewRepository.count() == 0 && sampleReviewer != null) {
            List<Review> samples = List.of(
                    new Review("Praveen Shetty", "Malpe Beach", "BEACH", 5, "Unforgettable sunset and stunning boat ride to St. Mary's Island. Highly recommended!"),
                    new Review("Ananya Rao", "Sri Krishna Matha - Iconic Pilgrimage, Udupi", "TEMPLE", 5, "Divinely peaceful darshan through Kanakana Kindi, followed by delicious Anna Prasada."),
                    new Review("Gautham Bhat", "Neer Dosa", "FOOD", 5, "Melt-in-mouth soft lace crepes with spicy chutney and coconut jaggery dip. Pure bliss."),
                    new Review("Rohit Poojary", "Yakshagana", "EVENT", 5, "The energy of the Chande beats and traditional costumes are mesmerizing! True pride of Tulunadu."),
                    new Review("Shruti Hegde", "Prawn Ghee Roast", "FOOD", 5, "Unmatched richness and fiery Byadagi chilli flavors! Authentic Shetty Lunch Home style."));
            samples.forEach(review -> review.setUser(sampleReviewer));
            reviewRepository.saveAll(samples);
        }
    }

    private void initializeConfiguredAdmin(Role roleUser, Role roleAdmin) {
        boolean hasAdminConfig = !adminUsername.isBlank() || !adminEmail.isBlank() || !adminPassword.isBlank();
        if (!hasAdminConfig) return;
        if (adminUsername.isBlank() || adminEmail.isBlank() || adminPassword.length() < 8) {
            throw new IllegalStateException(
                    "Configure ADMIN_USERNAME, ADMIN_EMAIL, and an ADMIN_PASSWORD of at least 8 characters together.");
        }

        User admin = userRepository.findByUsername(adminUsername).orElseGet(() -> {
            if (userRepository.existsByEmail(adminEmail)) {
                throw new IllegalStateException("ADMIN_EMAIL belongs to a different account.");
            }
            return new User(adminUsername, adminEmail, passwordEncoder.encode(adminPassword), "Administrator");
        });
        if (!admin.getEmail().equalsIgnoreCase(adminEmail)) {
            throw new IllegalStateException("ADMIN_EMAIL does not match the configured administrator account.");
        }

        Set<Role> roles = new HashSet<>(admin.getRoles());
        roles.add(roleUser);
        roles.add(roleAdmin);
        admin.setRoles(roles);
        userRepository.save(admin);
    }
}
