package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

@Entity
@Data
@Table(name = "refund_requests")
public class RefundRequest {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RefundID")
    private int refundId; 

    @ManyToOne
    @JoinColumn(name = "RRID", referencedColumnName = "RRID", nullable = false)
    private RequestRescue requestRescue; // Liên kết với bảng RequestRescue (khóa ngoại RRID)

    @ManyToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", nullable = false)
    private User user; // Liên kết với bảng Users (khóa ngoại UserID)

    @ManyToOne
    @JoinColumn(name = "SenderID", referencedColumnName = "StaffID", nullable = false, updatable = false)
    private Staff senderStaff; // Liên kết với bảng Staff (khóa ngoại StaffID)

    @ManyToOne
    @JoinColumn(name = "RecipientID", referencedColumnName = "StaffID")
    private Staff recipientStaff; // Liên kết với bảng Staff (khóa ngoại StaffID)

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

    public RequestRescue getRequestRescue() {
        return requestRescue;
    }

    public void setRequestRescue(RequestRescue requestRescue) {
        this.requestRescue = requestRescue;
    }

    public Staff getRecipientStaff() {
        return recipientStaff;
    }

    public void setRecipientStaff(Staff recipientStaff) {
        this.recipientStaff = recipientStaff;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Staff getSenderStaff() {
        return senderStaff;
    }

    public int getRefundId() {
        return refundId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
