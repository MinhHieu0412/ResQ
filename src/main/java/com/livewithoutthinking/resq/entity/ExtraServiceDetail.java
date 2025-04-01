package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "extraservicedetail")
public class ExtraServiceDetail {

    @Id
    @Column(name = "ESDetailID")
    private String esDetailId; // ESDetailID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "ExtraServiceID", referencedColumnName = "ExtraServiceID", nullable = false)
    private ExtraService extraService; // Liên kết với bảng ExtraService

    @ManyToOne
    @JoinColumn(name = "ServiceID", referencedColumnName = "ServiceID", nullable = false)
    private Services service; // Liên kết với bảng Services

    @ManyToOne
    @JoinColumn(name = "BillID", referencedColumnName = "BillID", nullable = false)
    private Bill bill; // Liên kết với bảng Bill
}
