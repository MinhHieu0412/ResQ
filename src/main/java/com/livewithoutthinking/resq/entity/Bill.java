package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "bill")
public class Bill {

    @Id
    @Column(name = "BillID")
    private String billId; // BillID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "RRID", referencedColumnName = "RRID")
    private RequestRescue requestRescue; // Liên kết với bảng RequestRescue

    @Column(name = "TypePrice")
    private double typePrice; // Giá dịch vụ theo loại

    @Column(name = "DistancePrice")
    private double distancePrice; // Giá dịch vụ theo khoảng cách

    @Column(name = "ExtraPrice")
    private double extraPrice; // Giá dịch vụ phụ (nếu có)

    @Column(name = "Total")
    private double total; // Tổng số tiền cần thanh toán

    @ManyToOne
    @JoinColumn(name = "PaymentID", referencedColumnName = "PaymentID")
    private Payment payment; // Liên kết với bảng Payment

    @Column(name = "ULocation")
    private String uLocation; // Vị trí của người dùng

    @Column(name = "PLocation")
    private String pLocation; // Vị trí của đối tác

    @Column(name = "ServicePrice")
    private double servicePrice; // Giá dịch vụ

    @Column(name = "DiscountPrice")
    private double discountPrice; // Giá đã được giảm

    @Column(name = "DiscountAmount")
    private double discountAmount; // Số tiền giảm

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật
}
