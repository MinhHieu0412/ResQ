package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.*;
import com.livewithoutthinking.resq.mapper.UserMapper;
import com.livewithoutthinking.resq.repository.UserRepository;
import com.livewithoutthinking.resq.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private UserRepository customerRepository;

    public UserDto getCustomer(int customerId){
        User user = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(user != null){
            UserDto userDto = UserMapper.toDTO(user);
            return userDto;
        }
        return null;
    }

    public UserDto updateCustomer(UserDto dto){
        User user = customerRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (dto.getDob() != null) {
            user.setDob(dto.getDob());
        }
        if (dto.getGender() != null && !dto.getGender().trim().isEmpty()) {
            user.setGender(dto.getGender());
        }
        customerRepository.save(user);
        return UserMapper.toDTO(user);
    }

}
