package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Table(name = "refund_requests")
public class RefundRequest {

    @Id
    @Column(name = "RefundID")
    private String refundId; // RefundID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "RRID", referencedColumnName = "RRID", nullable = false)
    private RequestRescue requestRescue; // Liên kết với bảng RequestRescue (khóa ngoại RRID)

    @ManyToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", nullable = false)
    private User user; // Liên kết với bảng Users (khóa ngoại UserID)

    @Column(name = "Amount")
    private BigDecimal amount; // Số tiền hoàn

    @Column(name = "Reason")
    private String reason; // Lý do hoàn tiền

    @Column(name = "Status")
    private String status; // Trạng thái

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
