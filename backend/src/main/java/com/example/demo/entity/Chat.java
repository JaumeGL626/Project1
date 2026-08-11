package com.example.demo.entity;

import com.example.demo.enums.ChatType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private ChatType chatType;
    private String name;
    @ManyToMany
    private List<User> participants= new ArrayList<>();
    @OneToMany
    private List<Message> messages=new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
    private SubForum subForum;
}
