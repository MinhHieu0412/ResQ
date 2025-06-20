package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "requestrescue")
public class RequestRescue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RRID")
    private Integer rrid;

    @ManyToOne
    @JoinColumn(name = "PartnerID", referencedColumnName = "PartnerID", nullable = false)
    private Partner partner; // Liên kết với bảng Partner (khóa ngoại PartnerID)

    @ManyToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", nullable = false)
    private User user; // Liên kết với bảng Users (khóa ngoại UserID)

    @Column(name = "StartTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime; // Thời gian bắt đầu

    @Column(name = "EndTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime; // Thời gian kết thúc

    @Column(name = "RescueType")
    private String rescueType; // Loại cứu hộ

    @Column(name = "Status")
    private String status; // Trạng thái

    @Column(name = "ULocation")
    private String uLocation; // Vị trí người yêu cầu

    @Column(name = "PLocation")
    private String pLocation; // Vị trí đối tác

    @Column(name = "CancelNote")
    private String cancelNote; // Ghi chú hủy yêu cầu cứu hộ

    @ManyToOne
    @JoinColumn(name = "DiscountID", referencedColumnName = "DiscountID")
    private Discount discount; // Liên kết với bảng Discount (khóa ngoại DiscountID)

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
