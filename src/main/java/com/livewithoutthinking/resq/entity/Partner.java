package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "partner")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PartnerID")
    private Integer partnerId;


    @OneToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", nullable = false)
    private User user; // Liên kết với bảng Users qua UserID

    @Column(name = "ResFix")
    private boolean resFix; // Loại đối tác sửa tại chỗ
    
    @Column(name = "ResTow")
    private boolean resTow; // Loại đối tác kéo xe
    
    @Column(name = "ResDrive")
    private boolean resDrive; // Loại đối tác lái thay

    @Column(name = "PartnerAddress")
    private String partnerAddress; // Địa chỉ đối tác

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

    @OneToMany(mappedBy = "partner")
    private List<Report> reports;
//    @OneToMany(mappedBy = "partner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Payment> payments;



    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
