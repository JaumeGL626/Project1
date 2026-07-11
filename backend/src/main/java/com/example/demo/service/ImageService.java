package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.config.CloudinaryConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service

public class ImageService {
    private Cloudinary cloudinary;

    public ImageService(Cloudinary cloudinary){
        this.cloudinary=cloudinary;
    }

    public String uploadImage(MultipartFile file) throws IOException {
        Map uploadResult=cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("secure_url").toString();
    }

}
