package com.livewithoutthinking.resq.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Setter
@Getter
public class MonthlyRevenueDto {
    private int month;
    private int year;
    private double totalRevenue;
    private double totalAppFee;
    private String status;         // có thể là trạng thái phổ biến nhất hoặc cuối cùng trong tháng
    private Date paymentDate;      // ngày cuối cùng có bill trong tháng

    public MonthlyRevenueDto(int month, int year, double totalRevenue, double totalAppFee, String status, Date paymentDate) {
        this.month = month;
        this.year = year;
        this.totalRevenue = totalRevenue;
        this.totalAppFee = totalAppFee;
        this.status = status;
        this.paymentDate = paymentDate;
    }

    // Getters & setters
}

