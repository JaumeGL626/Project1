package com.example.demo.mapper;

import com.example.demo.dto.AnnouncementResponse;
import com.example.demo.entity.Announcement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel ="spring")
public interface AnnouncementMapper {
    @Mapping(source = "user.id", target = "ownerId")
    @Mapping(source = "user.username", target = "owner")
    @Mapping(source= "user.profilePicture", target="ownerProfilePicture")
    AnnouncementResponse announcementToAnnouncementDto(Announcement announcement);
    List<AnnouncementResponse> announcementListToAnnouncementLisDto (List<Announcement> announcementList);
}
