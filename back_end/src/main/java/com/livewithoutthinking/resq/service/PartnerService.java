package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.UserDashboard;
import com.livewithoutthinking.resq.dto.PartnerDto;
import com.livewithoutthinking.resq.entity.Partner;

import java.util.List;
import java.util.Optional;

public interface PartnerService {
    List<PartnerDto> findAll();
    List<PartnerDto> searchPartners(String keyword);
    UserDashboard partnerDashboard(int partnerId);
    Optional<PartnerDto> findPartnerById(int partnerId);
    boolean approvePartner(int partnerId);
}
