package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "staff")
public class Staff {

    @Id
    @Column(name = "StaffID")
    private String staffId; // StaffID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
    private User user; // Liên kết với bảng Users, thông qua UserID

    @Column(name = "Position")
    private String position;

    @Column(name = "Hired_date")
    private java.util.Date hiredDate; // Ngày thuê

    @Column(name = "AvgTime")
    private Float avgTime; // Thời gian trung bình

    // Constructor, getters, setters và các phương thức khác nếu cần
}
