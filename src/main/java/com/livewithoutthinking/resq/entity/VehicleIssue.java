package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "vehicleissue")
public class VehicleIssue {

    @Id
    @Column(name = "IssueID")
    private String issueId; // IssueID là VARCHAR(36)

    @Column(name = "Name", nullable = false)
    private String name; // Tên sự cố
}
