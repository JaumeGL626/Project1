package com.example.demo.repository;

import com.example.demo.entity.Announcement;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnnouncementRepository extends JpaRepository<Announcement,Long> {
    Optional<Announcement> findById(Long idAnnouncement);
    List<Announcement>findByUserId(Long userId);
}
