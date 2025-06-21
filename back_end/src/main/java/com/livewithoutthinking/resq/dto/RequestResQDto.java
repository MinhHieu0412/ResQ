package com.livewithoutthinking.resq.dto;

import com.livewithoutthinking.resq.entity.Partner;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class RequestResQDto {
    int rrid;
    String partnerName;
    String partnerPhone;
    String userName;
    String userPhone;
    String uLocation;
    String reqStatus;
    String rescueType;
    String cancelNote;
    String paymentMethod;
    String paymentStatus;
    String currency;
    String description;
    String note;
    Date startTime;
    Date endTime;
    double totalPrice;
    double appFee;
    MultipartFile image;
}
