package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "refund_reports")
public class RefundReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RefundReportID")
    private int refundReportId; 

    @ManyToOne
    @JoinColumn(name = "StaffID", referencedColumnName = "StaffID", nullable = false)
    private Staff staff; // Liên kết với bảng Staff (khóa ngoại StaffID)

    @ManyToOne
    @JoinColumn(name = "RefundID", referencedColumnName = "RefundID", nullable = false)
    private RefundRequest refundRequest; // Liên kết với bảng RefundRequests (khóa ngoại RefundID)

    @Column(name = "Reason")
    private String reason; // Lý do báo cáo

    @Column(name = "Status")
    private String status; // Trạng thái báo cáo

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
