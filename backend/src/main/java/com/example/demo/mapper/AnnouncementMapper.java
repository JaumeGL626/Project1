package com.example.demo.mapper;

import com.example.demo.dto.AnnouncementDto;
import com.example.demo.entity.Announcement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel ="spring")
public interface AnnouncementMapper {
    @Mapping(source = "user.id", target = "ownerId")
    @Mapping(source = "user.username", target = "owner")
    @Mapping(source= "user.profilePicture", target="ownerProfilePicture")
    AnnouncementDto announcementToAnnouncementDto(Announcement announcement);
    List< AnnouncementDto> announcementListToAnnouncementLisDto (List<Announcement> announcementList);
}
