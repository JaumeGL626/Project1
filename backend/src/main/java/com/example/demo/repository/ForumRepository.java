package com.example.demo.repository;

import com.example.demo.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ForumRepository extends JpaRepository<Forum,Long> {

    Optional <Forum > findById(Long id);
    List<Forum> findAllByOrderByNameAsc();


}
