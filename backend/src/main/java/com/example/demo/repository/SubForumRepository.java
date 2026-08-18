package com.example.demo.repository;

import com.example.demo.entity.Chat;
import com.example.demo.entity.SubForum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubForumRepository extends JpaRepository<SubForum,Long> {

    //List<SubForum> findBuForumId(Long id);
    boolean existsByName(String name);
}
