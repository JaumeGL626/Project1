
package com.example.demo.config;

import com.example.demo.controller.AuthController;
import com.example.demo.entity.Announcement;
import com.example.demo.entity.User;
import com.example.demo.enums.Role;
import com.example.demo.repository.AnnouncementRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Component
@Profile("dev")
public class DevDataSeeder implements CommandLineRunner {

    private static final Logger logger= LoggerFactory.getLogger(DevDataSeeder.class);
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AnnouncementRepository announcementRepository;


    public DevDataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder, AnnouncementRepository announcementRepository){
        this.userRepository=userRepository;
        this.passwordEncoder= passwordEncoder;
        this.announcementRepository=announcementRepository;


    }
    @Override
    public void run (String... args){
        logger.info("Inicialitzant dades de desenvolupament...");
        announcementRepository.deleteAll();
        userRepository.deleteAll();





        User user1= User.builder()
                .username("brian")
                .email("u249348@campus.udg.edu")
                .password(passwordEncoder.encode("1234"))
                .description("Soc un nen que esstudia GEINF a la UDG")
                .role(Role.USER)
                .profilePicture("https://res.cloudinary.com/swafuttr/image/upload/v1783977983/best-profile-pictures-2h94ge4qz9y05dbw_t8nika.jpg")
                .build();
        userRepository.save(user1);

        Announcement announcement1= Announcement.builder()
                .date(LocalDateTime.now())
                .urlPhotos(null)
                .description("Avui comenca un nou curs!")
                .user(user1)
                .title("Curs 2026.2027")
                .build();
        announcementRepository.save(announcement1);
    }

}
