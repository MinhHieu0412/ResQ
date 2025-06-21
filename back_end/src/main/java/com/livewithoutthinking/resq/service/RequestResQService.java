package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.RecordStatusDto;
import com.livewithoutthinking.resq.dto.RequestResQDto;
import com.livewithoutthinking.resq.entity.RequestRescue;

import java.util.List;
import java.util.Optional;

public interface RequestResQService {
    List<RequestResQDto> findAll();
    Optional<RequestResQDto> findById(int rrId);
    List<RequestResQDto> searchByUser(int userId);
    List<RequestResQDto> searchByPartner(int partnerId);
    List<RequestResQDto> searchRR(String keyword);
    List<RequestResQDto> searchRRWithUser(int userId, String keyword);
    List<RequestResQDto> searchRRWithPartner(int partnerId, String keyword);
    RecordStatusDto existedRecords(int requestId);
    RequestRescue createNew(RequestResQDto requestDto);
    RequestRescue updateRequest(RequestResQDto requestDto);
}
