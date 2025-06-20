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
    private int paymentId; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
    private User user; // Liên kết với bảng Users

    @Column(name = "Name")
    private String name; // Tên người sở hữu tài khoản

    @Column(name = "AccountName")
    private String accountName; // Tên tài khoản

    @Column(name = "AccountNo")
    private String accountNo; // Số tài khoản

    @Column(name = "CardNo")
    private String cardNo; // Số thẻ (nếu có)

    @Column(name = "ExpiredDate")
    private Date expiredDate; // Ngày hết hạn (nếu có)

    @Column(name = "Method")
    private String method; // Phương thức thanh toán (Ví dụ: Thẻ tín dụng, chuyển khoản)

    @Column(name = "IsDefault")
    private boolean isDefault; // Cài đặt là mặc định hay không

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "partner_id")
//    private Partner partner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BillID", referencedColumnName = "BillID")
    private Bill bill;
}
