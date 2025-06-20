package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}
