package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "documentary")
public class Documentary {

    @Id
    @Column(name = "DocumentID")
    private String documentId; // DocumentID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "PartnerID", referencedColumnName = "PartnerID")
    private Partner partnerId; // Liên kết với bảng Partner qua PartnerID

    @ManyToOne
    @JoinColumn(name = "VehicleID", referencedColumnName = "VehicleID")
    private Vehicle vehicle; // Liên kết với bảng Vehicle qua VehicleID

    @Column(name = "DocumentType")
    private String documentType; // Loại giấy tờ (ví dụ: "Giấy đăng ký", "Bảo hiểm", v.v.)

    @Column(name = "DocumentNumber")
    private String documentNumber; // Số giấy tờ (ví dụ: Số giấy đăng ký xe)

    @Column(name = "DocumentImage")
    private String documentImage; // Đường dẫn hoặc URL tới hình ảnh giấy tờ

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
