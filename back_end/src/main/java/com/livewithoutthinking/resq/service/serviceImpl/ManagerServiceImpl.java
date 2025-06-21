package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.StaffDto;
import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.*;
import com.livewithoutthinking.resq.mapper.StaffMapper;
import com.livewithoutthinking.resq.mapper.UserMapper;
import com.livewithoutthinking.resq.repository.*;
import com.livewithoutthinking.resq.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.util.*;

@Service
public class ManagerServiceImpl implements ManagerService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ManagerRepository managerRepo;
    @Autowired
    private ConversationRepoisitory conversationRepo;
    @Autowired
    private MessageRepository messageRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private PasswordEncoder encoder;

    public List<StaffDto> findAllManagers() {
        List<Staff> staffs = managerRepo.findAllManagers();
        List<StaffDto> staffDtos = new ArrayList<StaffDto>();
        for (Staff staff : staffs) {
            StaffDto dto = StaffMapper.toDTO(staff);
            Double responseTime = avgResponseTime(staff.getStaffId());
            dto.setResponseTime((responseTime != null && responseTime > 0) ? responseTime : 0.0);
            staffDtos.add(dto);
        }
        return staffDtos;
    }

    public Optional<Staff> findManagerById(int staffId) {
        return managerRepo.findById(staffId);
    }

    public List<StaffDto> searchManagers(String keyword){
        List<Staff> result = managerRepo.searchManagers("%"+keyword+"%");
        List<StaffDto> staffDtos = new ArrayList<>();
        for(Staff staff : result){
            StaffDto staffDto = StaffMapper.toDTO(staff);
            Double responseTime = avgResponseTime(staff.getStaffId());
            staffDto.setResponseTime((responseTime != null && responseTime > 0) ? responseTime : 0.0);
            staffDtos.add(staffDto);
        }
        return staffDtos;
    }

    public Double avgResponseTime(int staffId) {
        double totalSeconds = 0.0;
        int count = 0;

        Optional<Staff> optionalStaff = managerRepo.findById(staffId);
        if (optionalStaff.isEmpty()) return null;
        Staff staff = optionalStaff.get();
        int staffUserId = staff.getUser().getUserId();
        List<Conversation> conversations = conversationRepo.findConversationsByStaffId(staffId);
        if(conversations.isEmpty()) return null;
        for (Conversation conversation : conversations) {
            int userId = conversation.getSender().getUserId();

            List<Message> messages = messageRepo.findByConversation(conversation.getConversationId());
            messages.sort(Comparator.comparing(Message::getCreatedAt));

            if (messages.size() >= 2) {
                Message first = messages.get(0);
                Message second = messages.get(1);

                if (first.getSender().getUserId() == userId && second.getSender().getUserId() == staffUserId) {
                    Duration diff = Duration.between(first.getCreatedAt().toInstant(), second.getCreatedAt().toInstant());
                    totalSeconds += diff.getSeconds();
                    count++;
                }
            }
        }
        return count == 0 ? 0.0 : totalSeconds / count / 60.0;
    }

    public Staff createNew(UserDto dto, MultipartFile avatar){
        User newUser = new User();
        Role role = roleRepo.findByName("STAFF");
        newUser = UserMapper.toEntity(dto, encoder);
        newUser.setRole(role);
        newUser.setCreatedAt(new Date());
        newUser.setStatus("Active");

        if (avatar != null && !avatar.isEmpty()) {
            try {
                // Ví dụ: lưu vào thư mục local: /uploads
                String filename = UUID.randomUUID() + "_" + avatar.getOriginalFilename();
                String uploadDir = "uploads/"; // thư mục bạn tự tạo
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(filename);
                Files.copy(avatar.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                newUser.setAvatar(filename); // hoặc lưu URL nếu dùng cloud

            } catch (IOException e) {
                throw new RuntimeException("Save avatar image failed", e);
            }
        }

        userRepo.save(newUser);

        Staff newManager = new Staff();
        newManager.setUser(newUser);
        newManager.setPosition("Manager");
        newManager.setHiredDate(new Date());
        newManager.setAvgTime((float) 0.0);
        return managerRepo.save(newManager);
    }


}

