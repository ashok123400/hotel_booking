package com.dailycodework.hotel.config;

import com.dailycodework.hotel.model.Role;
import com.dailycodework.hotel.model.User;
import com.dailycodework.hotel.model.Room;
import com.dailycodework.hotel.repository.RoleRepository;
import com.dailycodework.hotel.repository.UserRepository;
import com.dailycodework.hotel.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DefaultAdminConfig {

    @Bean
    CommandLineRunner createDefaultUsers(RoleRepository roleRepo,
                                         UserRepository userRepo,
                                         RoomRepository roomRepo,
                                         PasswordEncoder passwordEncoder) {
        return args -> {

            // -----------------------------
            // Ensure roles exist
            // -----------------------------
            Role adminRole = roleRepo.findByName("ROLE_ADMIN")
                    .orElseGet(() -> roleRepo.save(new Role("ROLE_ADMIN")));

            Role userRole = roleRepo.findByName("ROLE_USER")
                    .orElseGet(() -> roleRepo.save(new Role("ROLE_USER")));

            // -----------------------------
            // Create Default Admin
            // -----------------------------
            if (!userRepo.existsByEmail("admin@hotel.com")) {

                User admin = new User();
                admin.setFirstName("Default");
                admin.setLastName("Admin");
                admin.setEmail("admin@hotel.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.getRoles().add(adminRole);

                userRepo.save(admin);

                System.out.println("\n🟢 Default ADMIN created:");
                System.out.println("   Email: admin@hotel.com");
                System.out.println("   Password: admin123\n");
            }

            // -----------------------------
            // Create Default User
            // -----------------------------
            if (!userRepo.existsByEmail("user@hotel.com")) {

                User user = new User();
                user.setFirstName("Default");
                user.setLastName("User");
                user.setEmail("user@hotel.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.getRoles().add(userRole);

                userRepo.save(user);

                System.out.println("\n🟢 Default USER created:");
                System.out.println("   Email: user@hotel.com");
                System.out.println("   Password: user123\n");
            }

            // -----------------------------
            // Create Default Rooms
            // -----------------------------
            if (roomRepo.count() == 0) {

                Room room1 = new Room();
                room1.setRoomType("Deluxe Room");
                room1.setRoomPrice(new java.math.BigDecimal("2500.00"));
                room1.setBooked(false);
                room1.setPhoto(null); // Add default photo if needed

                Room room2 = new Room();
                room2.setRoomType("Single Room");
                room2.setRoomPrice(new java.math.BigDecimal("1500.00"));
                room2.setBooked(false);

                Room room3 = new Room();
                room3.setRoomType("Suite");
                room3.setRoomPrice(new java.math.BigDecimal("5000.00"));
                room3.setBooked(false);

                roomRepo.save(room1);
                roomRepo.save(room2);
                roomRepo.save(room3);

                System.out.println("\n🟢 Default ROOMS added to database\n");
            }
        };
    }
}
