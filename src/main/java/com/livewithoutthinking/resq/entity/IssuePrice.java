package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "issueprice")
public class IssuePrice {

    @Id
    @Column(name = "IssuePriceID")
    private String issuePriceId; // IssuePriceID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "IssueID", referencedColumnName = "IssueID", nullable = false)
    private VehicleIssue vehicleIssue; // Liên kết với bảng VehicleIssue

    @Column(name = "Price", nullable = false)
    private double price; // Giá dịch vụ sửa chữa sự cố
}
