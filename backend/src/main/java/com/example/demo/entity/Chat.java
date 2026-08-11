package com.example.demo.entity;

import com.example.demo.enums.ChatType;
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

public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private ChatType chatType;
    private String name;
    @ManyToMany
    @Builder.Default
    private List<User> participants= new ArrayList<>();
    @OneToMany (mappedBy = "chat")
    @Builder.Default
    private List<Message> messages=new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
    private SubForum subForum;
}
