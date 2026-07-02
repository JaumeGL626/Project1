
package com.example.demo.config;

import com.example.demo.controller.AuthController;
import com.example.demo.entity.User;
import com.example.demo.enums.Role;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;




@Component
@Profile("dev")
public class DevDataSeeder implements CommandLineRunner {

    private static final Logger logger= LoggerFactory.getLogger(DevDataSeeder.class);
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    public DevDataSeeder( UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder= passwordEncoder;


    }
    @Override
    public void run (String... args){
        logger.info("Inicialitzant dades de desenvolupament...");
        userRepository.deleteAll();





        User user1= User.builder()
                .username("brian")
                .email("u249348@campus.udg.edu")
                .password(passwordEncoder.encode("1234"))
                .description("Soc un nen que esstudia GEINF a la UDG")
                .role(Role.USER)
                .build();
        userRepository.save(user1);
    }

}
