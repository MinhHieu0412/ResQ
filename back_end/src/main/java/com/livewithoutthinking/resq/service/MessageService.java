package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Message;

import java.util.List;

public interface MessageService {
    List<Message> findByConversation(int conversationId);
}
