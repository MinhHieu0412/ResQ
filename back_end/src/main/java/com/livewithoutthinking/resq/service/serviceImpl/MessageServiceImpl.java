package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Message;
import com.livewithoutthinking.resq.repository.MessageRepository;
import com.livewithoutthinking.resq.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepo;

    public List<Message> findByConversation(int conversationId) {
        return messageRepo.findByConversation(conversationId);
    }
}
