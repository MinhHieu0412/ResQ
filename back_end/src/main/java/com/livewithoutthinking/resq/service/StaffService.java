package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.StaffDto;
import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.Staff;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface StaffService {
    List<StaffDto> findAllStaffs();
    Optional<Staff> findStaffById(int staffId);
    List<StaffDto> searchStaffs(String keyword);
    Double avgResponseTime(int staffId);
    Staff createNew(UserDto dto, MultipartFile avatar);
}
