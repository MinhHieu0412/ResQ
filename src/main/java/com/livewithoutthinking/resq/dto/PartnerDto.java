package com.livewithoutthinking.resq.dto;


import lombok.Data;

import java.util.Date;

@Data
public class PartnerDto {
    private Integer partnerId;
    private String username;
    private String fullName;
    private String email;
    private String sdt;
    private String address;

    private boolean resFix;
    private boolean resTow;
    private boolean resDrive;
    private String partnerAddress;
    private boolean verificationStatus;
    private float avgTime;
    private Date createdAt;
    private Date updatedAt;
}

