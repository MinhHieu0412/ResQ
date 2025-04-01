package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ScheduleID")
    private int scheduleId; // ScheduleID là INT và tự động tăng

    @ManyToOne
    @JoinColumn(name = "StaffID", referencedColumnName = "StaffID")
    private Staff staff; // Liên kết với bảng Staff, thông qua StaffID

    @Column(name = "StartTime")
    private java.sql.Time startTime; // Thời gian bắt đầu

    @Column(name = "EndTime")
    private java.sql.Time endTime; // Thời gian kết thúc

    @Column(name = "Date")
    @Temporal(TemporalType.DATE)
    private Date date; // Ngày làm việc

    @Column(name = "Status")
    private String status; // Trạng thái công việc

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
