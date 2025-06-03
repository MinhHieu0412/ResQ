package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.ConversationDTO;
import com.livewithoutthinking.resq.dto.MessageDTO;
import com.livewithoutthinking.resq.entity.Conversation;
import com.livewithoutthinking.resq.entity.Message;
import com.livewithoutthinking.resq.entity.Staff;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.repository.ConversationRepository;
import com.livewithoutthinking.resq.repository.MessageRepository;
import com.livewithoutthinking.resq.repository.StaffRepository;
import com.livewithoutthinking.resq.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;

    /**
     * Gửi 1 tin nhắn
     */
    public Message sendMessage(Integer customerId, Integer staffUserId, Integer senderId, String content, Integer conversationId) {
        Conversation conversation;

        if (conversationId != null) {
            conversation = conversationRepository.findById(conversationId)
                    .orElseThrow(() -> new RuntimeException("Conversation not found"));
        } else {
            Staff staff = staffRepository.findByUser_UserId(staffUserId);
            if (staff == null) throw new RuntimeException("Staff not found");

            conversation = conversationRepository.findBySender_UserIdAndRecipient_StaffId(customerId, staff.getStaffId())
                    .orElseGet(() -> {
                        Conversation newConv = new Conversation();
                        newConv.setSender(new User(customerId));
                        newConv.setRecipient(staff);
                        newConv.setCreatedAt(new Date());
                        return conversationRepository.save(newConv);
                    });
        }

        Message msg = new Message();
        msg.setConversation(conversation);
        msg.setSender(new User(senderId));
        msg.setContent(content);
        msg.setStatus(Message.Status.SENT);
        msg.setCreatedAt(new Date());

        return messageRepository.save(msg);
    }


    /**
     * Lấy tất cả tin nhắn trong cuộc trò chuyện
     */
    public List<MessageDTO> getMessages(Integer conversationId) {
        Optional<Conversation> conversationOpt = conversationRepository.findById(conversationId);
        if (conversationOpt.isEmpty()) {
            throw new RuntimeException("Conversation not found!");
        }
        List<Message> messages = messageRepository.findByConversationOrderByCreatedAtAsc(conversationOpt.get());

        return messages.stream().map(msg -> {
            MessageDTO dto = new MessageDTO();
            dto.setMessageId(msg.getMessageId());
            dto.setSenderId(msg.getSender().getUserId());
            dto.setSenderName(msg.getSender().getFullname());
            dto.setContent(msg.getContent());
            dto.setCreatedAt(msg.getCreatedAt());
            return dto;
        }).toList();
    }

    /**
     * Đánh dấu tất cả tin nhắn chưa đọc thành đã đọc
     */
    public void markMessagesAsRead(Integer conversationId, Integer readerId) {
        Optional<Conversation> conversationOpt = conversationRepository.findById(conversationId);
        if (conversationOpt.isEmpty()) {
            throw new RuntimeException("Conversation not found!");
        }

        Conversation conversation = conversationOpt.get();
        List<Message> unreadMessages = messageRepository.findByConversationAndStatus(conversation, Message.Status.SENT);

        for (Message message : unreadMessages) {
            if (!message.getSender().getUserId().equals(readerId)) {
                message.setStatus(Message.Status.READ);
                message.setUpdatedAt(new Date());
            }
        }

        messageRepository.saveAll(unreadMessages);
    }

    // MessageService.java
    public List<ConversationDTO> getAllConversationsDTOByUserId(Integer userId) {
        List<Conversation> asSender = conversationRepository.findBySender_UserId(userId);
        List<Conversation> asStaff = conversationRepository.findByRecipient_User_UserId(userId);
        asSender.addAll(asStaff);

        return asSender.stream().map(conv -> {
            ConversationDTO dto = new ConversationDTO();
            dto.setConversationId(conv.getConversationId());
            dto.setSubject(conv.getSubject());
            dto.setContactType(conv.getContactType() != null ? conv.getContactType().getName() : null);
            dto.setRecipientId(conv.getRecipient() != null ? conv.getRecipient().getStaffId() : null);
            dto.setSenderId(conv.getSender() != null ? conv.getSender().getUserId() : null);
            dto.setUpdatedAt(conv.getUpdatedAt());


            // ✅ Join user từ sender
            User sender = conv.getSender();

            if (sender != null) {
                User userFromDb = userRepository.findById(sender.getUserId()).orElse(null);
                if (userFromDb != null) {
                    dto.setPartnerName(userFromDb.getFullname());
                    dto.setPartnerAvatar(userFromDb.getAvatar());
                    System.out.println("SenderId: " + sender.getUserId());
                    System.out.println("Avatar from DB: " + userFromDb.getAvatar());
                } else {
                    dto.setPartnerName("Không xác định");
                    dto.setPartnerAvatar(null);
                }
            } else {
                dto.setPartnerName("Không xác định");
                dto.setPartnerAvatar(null);
            }

            return dto;
        }).toList();
    }





}
