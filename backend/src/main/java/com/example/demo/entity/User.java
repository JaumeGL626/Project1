package com.example.demo.entity;
import com.example.demo.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String description;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String profilePicture;
    @OneToMany(mappedBy = "user")
    List<Announcement> announcementList= new ArrayList<>();

}