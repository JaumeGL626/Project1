package com.example.demo.service;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.entity.Announcement;
import com.example.demo.mapper.AnnouncementMapper;
import com.example.demo.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    public AnnouncementService(AnnouncementRepository announcementRepository, AnnouncementMapper announcementMapper){
        this.announcementMapper=announcementMapper;
        this.announcementRepository=announcementRepository;
    }
    @Transactional(readOnly = true)
    public List<AnnouncementDto>  getAllAnnnouncements(){
        List<Announcement> announcement= announcementRepository.findAll();
        return announcementMapper.announcementListToAnnouncementLisDto(announcement);
    }

}
