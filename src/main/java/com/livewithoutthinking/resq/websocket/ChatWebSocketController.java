package com.livewithoutthinking.resq.websocket;

import com.livewithoutthinking.resq.dto.MessageDTO;
import com.livewithoutthinking.resq.entity.Message;
import com.livewithoutthinking.resq.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    /**
     * Xử lý tin nhắn gửi tới /app/chat.send
     */
    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessage chatMessage) {
        Message savedMessage = messageService.sendMessage(
                chatMessage.getCustomerId(),
                chatMessage.getStaffUserId(),
                chatMessage.getSenderId(),
                chatMessage.getContent(),
                chatMessage.getConversationId() // thêm conversationId nếu có
        );

        MessageDTO dto = new MessageDTO();
        dto.setMessageId(savedMessage.getMessageId());
        dto.setSenderId(savedMessage.getSender().getUserId());
        dto.setSenderName(savedMessage.getSender().getFullname());
        dto.setContent(savedMessage.getContent());
        dto.setCreatedAt(savedMessage.getCreatedAt());

        messagingTemplate.convertAndSend("/topic/conversations/" + savedMessage.getConversation().getConversationId(), dto);
    }

}
