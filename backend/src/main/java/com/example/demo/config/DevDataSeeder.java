
package com.example.demo.config;

import com.example.demo.controller.AuthController;
import com.example.demo.entity.*;
import com.example.demo.enums.ChatType;
import com.example.demo.enums.Role;
import com.example.demo.repository.*;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;


@Component
@Profile("dev")
public class DevDataSeeder implements CommandLineRunner {

    private static final Logger logger= LoggerFactory.getLogger(DevDataSeeder.class);
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AnnouncementRepository announcementRepository;
    private final ForumRepository forumRepository;
    private final SubForumRepository subForumRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;


    public DevDataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder, AnnouncementRepository announcementRepository,
                         ForumRepository forumRepository, SubForumRepository subForumRepository, ChatRepository chatRepository, MessageRepository messageRepository){
        this.userRepository=userRepository;
        this.passwordEncoder= passwordEncoder;
        this.announcementRepository=announcementRepository;
        this.forumRepository=forumRepository;
        this.subForumRepository=subForumRepository;
        this.chatRepository=chatRepository;
        this.messageRepository=messageRepository;


    }
    @Override
    public void run (String... args){
        logger.info("Inicialitzant dades de desenvolupament...");
        messageRepository.deleteAll();
        chatRepository.deleteAll();
        subForumRepository.deleteAll();
        forumRepository.deleteAll();
        announcementRepository.deleteAll();
        userRepository.deleteAll();


        //Users


        User user1= User.builder()
                .username("brian")
                .email("u249348@campus.udg.edu")
                .password(passwordEncoder.encode("1234"))
                .description("Soc un nen que esstudia GEINF a la UDG")
                .role(Role.USER)
                .profilePicture("https://res.cloudinary.com/swafuttr/image/upload/v1783977983/best-profile-pictures-2h94ge4qz9y05dbw_t8nika.jpg")
                .build();
        user1=userRepository.save(user1);

        User user2= User.builder()
                .username("kai")
                .email("u111@campus.udg.edu")
                .password(passwordEncoder.encode("1234"))
                .description("Soc una noia que estudia GEB")
                .role(Role.USER)
                .profilePicture("https://res.cloudinary.com/swafuttr/image/upload/v1786200818/gdwg21xuvcwzbcefyz5e.png")
                .build();
        user2=userRepository.save(user2);

        //Announcements

        Announcement announcement1= Announcement.builder()
                .date(LocalDateTime.now())
                .urlPhotos(List.of("https://res.cloudinary.com/swafuttr/image/upload/v1784670128/udg_universitat_girona_nuevo_logo_b6xukw.jpg","https://res.cloudinary.com/swafuttr/image/upload/v1784670185/publicacio_buxvl0.jpg"))
                .description("Avui comenca un nou curs!")
                .user(user1)
                .title("Curs 2026.2027")
                .build();
        announcementRepository.save(announcement1);

        Announcement announcement2= Announcement.builder()
                .date(LocalDateTime.now())
                .urlPhotos(List.of("https://res.cloudinary.com/swafuttr/image/upload/v1786134056/ktlthbjzabvg8uyiy7gj.jpg"))
                .description("DOnem per iniciat el club de videojocs! Som un grup petit de unes quantes persones on ens apasiona el mon dels videojocs!")
                .user(user2)
                .title("Inaugurem el club de videojocs!")
                .build();
        announcementRepository.save(announcement2);

        //forum

        Forum forum1 = Forum.builder()
                .name("Club de futbol")
                .description("Aquest es el forum oficial del club de futbol, animeu-vos a participar!")
                .createdBy(user1)
                .createdAt(LocalDateTime.now())
                .build();
        forum1=forumRepository.save(forum1);

        Forum forum2 = Forum.builder()
                .name("Club Otaku")
                .description("Aquest es el forum oficial del club otaku (En desenvolupament)")
                .createdBy(user1)
                .createdAt(LocalDateTime.now())
                .build();
        forum2=forumRepository.save(forum2);

        //subforum

        SubForum subForum1 = SubForum.builder()
                .name("Partits amistosos")
                .description("Aqui en parlarem sobre els partis amistosos")
                .forum(forum1)
                .createdBy(user1)
                .build();
        subForum1=subForumRepository.save(subForum1);

        SubForum subForum2 = SubForum.builder()
                .name("Apartat de preguntes")
                .description("Qualsevol dubte, no tingueu por de preguntar")
                .forum(forum1)
                .createdBy(user1)
                .build();
        subForum2=subForumRepository.save(subForum2);

        SubForum subForum3 = SubForum.builder()
                .name("Anuncis")
                .description("Aqui deixarem tot anunci interesant")
                .forum(forum1)
                .createdBy(user1)
                .build();
        subForum3=subForumRepository.save(subForum3);

        //  Chats subforum
        Chat chat1 = Chat.builder()
                .name("Alineacions")
                .chatType(ChatType.SUBFORUM)
                .subForum(subForum1)
                .participants(List.of(user1, user2))
                .build();
        chat1=chatRepository.save(chat1);

        Chat chat2 = Chat.builder()
                .name("Propostes de jugades")
                .chatType(ChatType.SUBFORUM)
                .subForum(subForum1)
                .participants(List.of(user1, user2))
                .build();
        chat2=chatRepository.save(chat2);

        // Messages chat1
        Message message1 = Message.builder()
                .content("Inici de la epica conversacio!")
                .dateCreated(LocalDateTime.now())
                .filesUrl(Collections.emptyList())
                .user(user1)
                .chat(chat1)
                .build();
        message1=messageRepository.save(message1);

        Message message2 = Message.builder()
                .content("Fem servir una alineacio 4-4-2!")
                .dateCreated(LocalDateTime.now())
                .filesUrl(Collections.emptyList())
                .user(user2)
                .chat(chat1)
                .build();
        message2=messageRepository.save(message2);

        // Private chat
        Chat chat5 = Chat.builder()
                .name("BestFriend")
                .chatType(ChatType.PRIVATE)
                .participants(List.of(user1, user2))
                .build();
        chat5=chatRepository.save(chat5);

        Message message3 = Message.builder()
                .content("Aquest es el inici de la nostra epica conversacio!")
                .dateCreated(LocalDateTime.now())
                .filesUrl(Collections.emptyList())
                .user(user1)
                .chat(chat5)
                .build();
        message3=messageRepository.save(message3);

    }




}
