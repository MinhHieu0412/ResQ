package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "vehicleissue")
public class VehicleIssue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IssueID")
    private int issueId; 

    @Column(name = "Name", nullable = false)
    private String name; // Tên sự cố
}
