package com.livewithoutthinking.resq.controller;

import com.livewithoutthinking.resq.dto.RescueInfoDTO;
import com.livewithoutthinking.resq.dto.UpdateStatusRequest;
import com.livewithoutthinking.resq.repository.RescueHistoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rescue-info")
public class RescueInfoController {

    @Autowired
    private RescueHistoryRepository rescueHistoryRepository;

    // ✅ GET ALL (không truyền RRID)
    @GetMapping
    public List<RescueInfoDTO> getAllRescueInfo() {
        return rescueHistoryRepository.findAllRescueInfo();
    }

    @PutMapping("/update-status")
    @Transactional
    public void updateStatus(@RequestBody UpdateStatusRequest request) {
        rescueHistoryRepository.updateBillStatusByBillId(request.getBillId(), request.getStatus());
    }
}
