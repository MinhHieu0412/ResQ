package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentID")
    private Long paymentId;

    @Column(name = "Method", nullable = false)
    private String method; // MOMO, PAYPAL, COD, BANK_TRANSFER, etc.

    @Column(name = "Provider")
    private String provider; // Tên nhà cung cấp, ví dụ: "MoMo", "PayPal", "Vietcombank"

    @Column(name = "Status")
    private String status; // PENDING, COMPLETED, FAILED, CANCELED

    @Column(name = "TransactionId")
    private String transactionId; // Mã giao dịch từ MoMo/PayPal

    @Column(name = "Currency")
    private String currency; // VND, USD

    @Column(name = "Amount")
    private Double amount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CreatedAt")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "UpdatedAt")
    private Date updatedAt;

    @OneToMany(mappedBy = "payment")
    private List<Bill> bills; // Một Payment có thể gắn với nhiều Bill nếu gộp đơn
}
