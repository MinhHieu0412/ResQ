package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Conversation;
import com.livewithoutthinking.resq.repository.ConversationRepoisitory;
import com.livewithoutthinking.resq.service.ConversationService;
import com.livewithoutthinking.resq.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationServiceImpl implements ConversationService {
    @Autowired
    private ConversationRepoisitory conversationRepo;

    public List<Conversation> findByStaff(int staffId) {
        return conversationRepo.findConversationsByStaffId(staffId);
    }
}
