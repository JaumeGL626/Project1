package com.example.demo.repository;

import com.example.demo.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message,Long> {
    Optional <Message> findById(Long id);

    List<Message> findByChatIdOrderByDateCreatedAsc(Long chatId);
}
