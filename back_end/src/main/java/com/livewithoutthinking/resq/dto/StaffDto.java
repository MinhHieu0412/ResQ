package com.livewithoutthinking.resq.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;

@Data
public class StaffDto {
    int staffId;
    int userId;
    String fullName;
    String userName;
    String email;
    String sdt;
    String avatar;
    String password;
    String address;
    Date createdAt;
    String status;
    int totalRescues;
    double responseTime;
}
