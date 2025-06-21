package com.livewithoutthinking.resq.mapper;

import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserMapper {
    public static UserDto toDTO(User user) {
        if (user == null) return null;

        UserDto dto = new UserDto();
        dto.setUserid(user.getUserId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setStatus(user.getStatus());
        dto.setAddress(user.getAddress());
        dto.setSdt(user.getSdt());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLoyaltyPoint(user.getLoyaltyPoint());
        return dto;
    }

    public static  User toEntity(UserDto dto, PasswordEncoder encoder) {
        if (dto == null) return null;
        User user = new User();
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setSdt(dto.getSdt());
        user.setAddress(dto.getAddress());
        user.setUsername(dto.getUserName());
        user.setPassword(encoder.encode(dto.getPassword()));
        return user;
    }
}
