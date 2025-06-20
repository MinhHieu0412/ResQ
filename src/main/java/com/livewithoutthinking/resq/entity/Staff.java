package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StaffID")
    private Integer staffId;

    @OneToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
    private User user; // Liên kết với bảng Users, thông qua UserID

    @Column(name = "Position")
    private String position;

    @Column(name = "Hired_date")
    private java.util.Date hiredDate; // Ngày thuê

    @Column(name = "AvgTime")
    private Float avgTime; // Thời gian trung bình

    @ManyToMany
    @JoinTable(
            name="schedule",
            joinColumns = @JoinColumn(name="StaffID"),
            inverseJoinColumns = @JoinColumn(name = "ScheduleID")
    )
    private List<Schedule> schedule;


    // Constructor, getters, setters và các phương thức khác nếu cần
}
