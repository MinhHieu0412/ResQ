package com.livewithoutthinking.resq.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "message")
public class Message {

    @Id
    @Column(name = "MessageID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int messageId; // MessageID là INT AUTO_INCREMENT

    @ManyToOne
    @JoinColumn(name = "ConversationID", referencedColumnName = "ConversationID")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Conversation conversation;
    // Liên kết với bảng Conversation

    @ManyToOne
    @JoinColumn(name = "SenderID", referencedColumnName = "UserID")
    private User sender;


    @Column(name = "Content")
    private String content; // Nội dung tin nhắn

    @Enumerated(EnumType.STRING)
    private Status status = Status.SENT;

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Thời gian tạo tin nhắn

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Thời gian cập nhật tin nhắn

    // Constructor, Getters, Setters và các phương thức khác nếu cần

    public enum Status {
        SENT,
        READ
    }

    // Constructor, Getters, Setters và các phương thức khác nếu cần
}
