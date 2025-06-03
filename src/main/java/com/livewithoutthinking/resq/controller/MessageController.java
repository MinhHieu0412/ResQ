package com.livewithoutthinking.resq.controller;

import com.livewithoutthinking.resq.dto.ConversationDTO;
import com.livewithoutthinking.resq.dto.MessageDTO;
import com.livewithoutthinking.resq.entity.Conversation;
import com.livewithoutthinking.resq.entity.Message;
import com.livewithoutthinking.resq.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    /**
     * API gửi 1 tin nhắn
     */
    @PostMapping("/send")
    public Message sendMessage(
            @RequestParam Integer customerId,
            @RequestParam Integer staffUserId,
            @RequestParam Integer senderId,
            @RequestParam String content,
            @RequestParam Integer conversationId
    ) {
        return messageService.sendMessage(customerId, staffUserId, senderId, content,conversationId);
    }




    /**
     * API lấy tất cả tin nhắn trong 1 cuộc trò chuyện
     */
    @GetMapping("/{conversationId}")
    public List<MessageDTO> getMessages(@PathVariable Integer conversationId) {
        return messageService.getMessages(conversationId);
    }

    /**
     * API đánh dấu tất cả tin nhắn trong cuộc trò chuyện là đã đọc
     */
    @PostMapping("/{conversationId}/mark-as-read")
    public String markMessagesAsRead(
            @PathVariable Integer conversationId,
            @RequestParam Integer readerId
    ) {
        messageService.markMessagesAsRead(conversationId, readerId);
        return "All messages marked as READ.";
    }

    // MessageController.java
    @GetMapping("/conversation/user/{userId}")
    public ConversationDTO getConversationByUserId(@PathVariable Integer userId) {
        List<ConversationDTO> conversations = messageService.getAllConversationsDTOByUserId(userId);
        if (conversations.isEmpty()) {
            throw new RuntimeException("Không tìm thấy cuộc trò chuyện cho userId: " + userId);
        }
        return conversations.get(0);
    }


    @GetMapping("/conversations/user/all/{userId}")
    public List<ConversationDTO> getAllConversations(@PathVariable Integer userId) {
        return messageService.getAllConversationsDTOByUserId(userId);
    }


}
