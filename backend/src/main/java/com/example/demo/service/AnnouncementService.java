package com.example.demo.service;

import com.example.demo.dto.AnnouncementRequest;
import com.example.demo.dto.AnnouncementResponse;
import com.example.demo.entity.Announcement;
import com.example.demo.entity.User;
import com.example.demo.mapper.AnnouncementMapper;
import com.example.demo.repository.AnnouncementRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;
    private final UserRepository userRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository, AnnouncementMapper announcementMapper,UserRepository userRepository){
        this.announcementMapper=announcementMapper;
        this.announcementRepository=announcementRepository;
        this.userRepository=userRepository;
    }
    @Transactional(readOnly = true)
    public List<AnnouncementResponse>  getAllAnnnouncements(){
        List<Announcement> announcement= announcementRepository.findAll();
        return announcementMapper.announcementListToAnnouncementLisDto(announcement);
    }
    @Transactional
    public AnnouncementResponse postAnnouncement(String email, AnnouncementRequest request){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));
        Announcement newAnnouncement = new Announcement();
        newAnnouncement.setUrlPhotos(request.urlPhotos());
        newAnnouncement.setDate(LocalDateTime.now());
        newAnnouncement.setDescription(request.description());
        newAnnouncement.setTitle(request.title());
        newAnnouncement.setUser(user);
        announcementRepository.save(newAnnouncement);
        return announcementMapper.announcementToAnnouncementDto(newAnnouncement);
    }
    @Transactional(readOnly = true)
    public List<AnnouncementResponse> getAllMyAnnouncements(String email){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));
        List<Announcement> announcementList=announcementRepository.findByUserId(user.getId());
        return announcementMapper.announcementListToAnnouncementLisDto(announcementList);
    }
    public void deleteAnnouncement (Long id ){
        Announcement announcement=announcementRepository.findById(id).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Announcement not found"
        ));
        announcementRepository.delete(announcement);
    }

}
