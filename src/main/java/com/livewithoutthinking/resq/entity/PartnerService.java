/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 *
 * @author ANVO
 */
@Entity
@Data
@Table(name = "partnerservices")
public class PartnerService {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PartnerServiceID")
    private int parnerserviceId;
    
    @ManyToOne
    @JoinColumn(name = "PartnerID", referencedColumnName = "PartnerID", nullable = false)
    private Partner partner; // Liên kết với bảng Partners qua PartnerID
    
    @OneToOne
    @JoinColumn(name = "ServiceID", referencedColumnName = "ServiceID", nullable = false)
    private Services services; // Liên kết với bảng Services qua ServiceID
}
