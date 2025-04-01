package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "conversation")
public class Conversation {

    @Id
    @Column(name = "ConversationID")
    private String conversationId; // ConversationID là VARCHAR(36)

    @ManyToOne
    @JoinColumn(name = "ContactType", referencedColumnName = "ContactID")
    private ContactType contactType; // Liên kết với bảng ContactType

    @ManyToOne
    @JoinColumn(name = "SenderID", referencedColumnName = "UserID")
    private User sender; // Liên kết với bảng Users cho người gửi

    @ManyToOne
    @JoinColumn(name = "RecipientID", referencedColumnName = "StaffID")
    private Staff recipient; // Liên kết với bảng Staff cho người nhận

    @Column(name = "Subject")
    private String subject; // Chủ đề cuộc trò chuyện

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo cuộc trò chuyện

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật cuộc trò chuyện

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
