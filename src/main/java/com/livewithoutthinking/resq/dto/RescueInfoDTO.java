package com.livewithoutthinking.resq.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
@Data
@AllArgsConstructor
public class RescueInfoDTO {
    private int rrid;
    private int billId;
    private String requestUserFullName;
    private String partnerFullName;
    private int paymentId;
    private String paymentMethod;
    private double total;
    private double totalPrice;
    private String method;
    private Date createdAt;
    private String billStatus;
}
