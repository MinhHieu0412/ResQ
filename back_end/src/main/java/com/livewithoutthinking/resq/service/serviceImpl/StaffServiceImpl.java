package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.StaffDto;
import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.*;
import com.livewithoutthinking.resq.mapper.StaffMapper;
import com.livewithoutthinking.resq.mapper.UserMapper;
import com.livewithoutthinking.resq.repository.*;
import com.livewithoutthinking.resq.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.*;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private StaffRepository staffRepo;
    @Autowired
    private ConversationRepoisitory conversationRepo;
    @Autowired
    private MessageRepository messageRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private PasswordEncoder encoder;

    public List<StaffDto> findAllStaffs() {
        List<Staff> staffs = staffRepo.findAllStaffs();
        List<StaffDto> staffDtos = new ArrayList<StaffDto>();
        for (Staff staff : staffs) {
            StaffDto staffDto = StaffMapper.toDTO(staff);
            Double responseTime = avgResponseTime(staff.getStaffId());
            staffDto.setResponseTime((responseTime != null && responseTime > 0) ? responseTime : 0.0);
            staffDtos.add(staffDto);
        }
        return staffDtos;
    }

    public Optional<Staff> findStaffById(int staffId) {
        return staffRepo.findById(staffId);
    }

    public List<StaffDto> searchStaffs(String keyword){
        List<Staff> result = staffRepo.searchStaffs("%"+keyword+"%");
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

        Optional<Staff> optionalStaff = staffRepo.findById(staffId);
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
        userRepo.save(newUser);

        Staff newStaff = new Staff();
        newStaff.setUser(newUser);
        newStaff.setHiredDate(new Date());
        newStaff.setAvgTime((float) 0.0);
        return staffRepo.save(newStaff);
    }
}
