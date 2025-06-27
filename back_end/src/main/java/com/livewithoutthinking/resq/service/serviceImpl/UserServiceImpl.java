package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.mapper.UserMapper;
import com.livewithoutthinking.resq.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder encoder;

    public UserDto updateStaff(UserDto dto, MultipartFile avatar) {
        User user = userRepo.findById(dto.getUserid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getFullName() != null && !dto.getFullName().trim().isEmpty()) {
            user.setFullName(dto.getFullName());
        }
        if (dto.getUserName() != null && !dto.getUserName().trim().isEmpty()) {
            user.setUsername(dto.getUserName());
        }
        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            user.setEmail(dto.getEmail());
        }
        if (dto.getSdt() != null && !dto.getSdt().trim().isEmpty()) {
            user.setSdt(dto.getSdt());
        }
        if (dto.getAddress() != null && !dto.getAddress().trim().isEmpty()) {
            user.setAddress(dto.getAddress());
        }
        if(dto.getPassword() != null && !dto.getPassword().trim().isEmpty()) {
            if(!dto.getPassword().startsWith("$2a$")){
                user.setPassword(encoder.encode(dto.getPassword()));
            }else{
                user.setPassword(dto.getPassword());
            }
        }

        if (avatar != null && !avatar.isEmpty()) {
            try {
                String filename = UUID.randomUUID() + "_" + avatar.getOriginalFilename();
                String uploadDir = "uploads/";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(filename);
                Files.copy(avatar.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                user.setAvatar(filename);
            } catch (IOException e) {
                throw new RuntimeException("Save avatar image failed", e);
            }
        }

        userRepo.save(user);
        return UserMapper.toDTO(user);
    }




}
