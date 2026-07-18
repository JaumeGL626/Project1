package com.example.demo.mapper;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.entity.Announcement;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel ="spring")
public interface AnnouncementMapper {
    AnnouncementDto announcementToAnnouncementDto(Announcement announcement);
    List< AnnouncementDto> announcementListToAnnouncementLisDto (List<Announcement> announcementList);
}
