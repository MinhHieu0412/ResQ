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
            staffDtos.add(staffDto);
        }
        return staffDtos;
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
