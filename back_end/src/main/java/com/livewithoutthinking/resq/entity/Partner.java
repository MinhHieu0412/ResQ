package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Table(name = "partner")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PartnerID")
    private int partnerId;

    @OneToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", nullable = false)
    private User user; // Liên kết với bảng Users qua UserID

    @Column(name = "ResFix")
    private int resFix; // Loại đối tác sửa tại chỗ

    @Column(name = "ResTow")
    private int resTow; // Loại đối tác kéo xe

    @Column(name = "ResDrive")
    private int resDrive; // Loại đối tác lái thay

    @Column(name = "Location")
    private String location; // Địa chỉ đối tác

    @Column(name = "VerificationStatus")
    private boolean verificationStatus; // Trạng thái xác minh (0 hoặc 1)

    @Column(name = "AvgTime")
    private float avgTime; // Thời gian trung bình

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo đối tác

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật đối tác

    @Column(name = "WalletAmount", precision = 10, scale = 2)
    private BigDecimal walletAmount = BigDecimal.ZERO;
    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
