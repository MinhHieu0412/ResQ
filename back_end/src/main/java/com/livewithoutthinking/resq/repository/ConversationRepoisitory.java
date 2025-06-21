package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConversationRepoisitory extends JpaRepository<Conversation, Integer> {
    @Query("SELECT con FROM Conversation con WHERE con.recipient.staffId = :staffId")
    List<Conversation> findConversationsByStaffId(int staffId);
}
