package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "leaverequests")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LeaveID")
    private int leaveId; // LeaveID là INT và tự động tăng

    @ManyToOne
    @JoinColumn(name = "StaffID", referencedColumnName = "StaffID", nullable = false)
    private Staff staff; // Liên kết với bảng Staff

    @Column(name = "LeaveType", nullable = false)
    private String leaveType; // Loại nghỉ phép (Nghỉ phép, Nghỉ bệnh, Nghỉ thai sản, v.v.)

    @Column(name = "StartDate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate; // Ngày bắt đầu nghỉ

    @Column(name = "EndDate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate; // Ngày kết thúc nghỉ

    @Column(name = "Reason")
    private String reason; // Lý do nghỉ

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false)
    private LeaveStatus status = LeaveStatus.PENDING; // Trạng thái yêu cầu (Pending, Approved, Rejected)

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    // Enum cho trạng thái yêu cầu nghỉ phép
    public enum LeaveStatus {
        PENDING, APPROVED, REJECTED
    }
}
