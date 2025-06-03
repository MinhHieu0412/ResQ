package com.livewithoutthinking.resq.websocket;

import lombok.Data;

@Data
public class ChatMessage {
    private Integer customerId;
    private Integer staffUserId;
    private Integer senderId;
    private Integer conversationId;
    private String content;
}
