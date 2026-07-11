package com.example.demo.controller;

import com.example.demo.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/images")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService){
        this.imageService=imageService;
    }

    @PostMapping(path="/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file){

        try{
            String imageUrl= imageService.uploadImage(file);
            return ResponseEntity.ok(Map.of("url",imageUrl));
        }
        catch (IOException e){
            return ResponseEntity.status(500).body("Error al pujar la imatge");
        }

    }
}
