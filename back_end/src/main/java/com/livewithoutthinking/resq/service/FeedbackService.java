package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.FeedbackDto;
import com.livewithoutthinking.resq.entity.Feedback;

import java.util.List;

public interface FeedbackService {
    List<FeedbackDto> findAll();
    List<FeedbackDto> searchByPartner(int partnerId);
    FeedbackDto searchByRRid(int rrId);
    Double averageRate(int partnerId);
}
