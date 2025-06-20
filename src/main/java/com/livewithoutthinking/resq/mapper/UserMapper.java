package com.livewithoutthinking.resq.mapper;
import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.User;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserMapper {

    public static UserDto toDTO(User user) {
        if (user == null) return null;

        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setUsername(user.getUsername());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setSdt(user.getSdt());
        dto.setStatus(user.getStatus());
        dto.setDob(user.getDob());
        dto.setGender(user.getGender());
        dto.setAddress(user.getAddress());
        dto.setPhoneVerified(user.isPhoneVerified());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        dto.setLanguage(user.getLanguage());
        dto.setAppColor(user.getAppColor());
        dto.setLoyaltyPoint(user.getLoyaltyPoint());
        dto.setRoleName(user.getRole() != null ? user.getRole().getRoleName() : null);
        return dto;
    }
}

