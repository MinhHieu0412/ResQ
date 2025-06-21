package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("SELECT m FROM Message m WHERE m.conversation.conversationId = :conversationId")
    List<Message> findByConversation(int conversationId);

}
