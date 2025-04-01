package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "partner")
public class Partner {

    @Id
    @Column(name = "PartnerID")
    private String partnerId; // PartnerID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", nullable = false)
    private User user; // Liên kết với bảng Users qua UserID

    @Column(name = "PartnerType")
    private String partnerType; // Loại đối tác

    @Column(name = "PartnerAddress")
    private String partnerAddress; // Địa chỉ đối tác

    @Column(name = "VerificationStatus")
    private boolean verificationStatus; // Trạng thái xác minh (0 hoặc 1)

    @Column(name = "StaffType")
    private String staffType; // Loại nhân viên của đối tác

    @Column(name = "AvgTime")
    private float avgTime; // Thời gian trung bình

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo đối tác

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật đối tác

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
