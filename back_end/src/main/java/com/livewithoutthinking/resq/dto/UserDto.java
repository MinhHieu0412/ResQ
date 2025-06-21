package com.livewithoutthinking.resq.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
    int userid;
    String fullName;
    String userName;
    String email;
    String sdt;
    String address;
    String avatar;
    String status;
    String currentPassword;
    String password;
    Date createdAt;
    int totalRescues;
    int loyaltyPoint;
    int role;
}
