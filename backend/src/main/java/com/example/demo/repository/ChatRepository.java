package com.example.demo.repository;

import com.example.demo.entity.Chat;
import com.example.demo.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository  extends JpaRepository<Chat,Long> {

    Optional <Chat> findById(Long id);
    List<Chat> findByName(String name);
    List<Chat> findBySubForumIdOrderByNameAsc(Long id);
    List<Chat>findByUserId(Long id);

}
