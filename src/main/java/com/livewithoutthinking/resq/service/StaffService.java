package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Staff;
import com.livewithoutthinking.resq.repository.StaffRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    private StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<Staff> findAll() {
        return staffRepository.findAll();
    }

    public Staff findById(int id) {
        return staffRepository.findById(id).orElse(null);
    }
}
