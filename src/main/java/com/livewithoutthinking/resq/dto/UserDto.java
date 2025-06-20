package com.livewithoutthinking.resq.dto;


import lombok.Data;
import java.util.Date;

@Data
public class UserDto {
    private Integer userId;
    private String username;
    private String fullName;
    private String email;
    private String sdt;
    private String status;
    private Date dob;
    private String gender;
    private String address;
    private boolean phoneVerified;
    private Date createdAt;
    private Date updatedAt;
    private String language;
    private String appColor;
    private int loyaltyPoint;
    private String roleName;
}

