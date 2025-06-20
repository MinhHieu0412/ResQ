package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Feedback;
import com.livewithoutthinking.resq.repository.FeedbackRepository;
import com.livewithoutthinking.resq.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepo;

    public List<Feedback> findAll() {
        return feedbackRepo.findAll();
    }
}
