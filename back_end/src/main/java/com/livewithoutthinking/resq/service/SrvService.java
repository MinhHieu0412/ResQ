package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.ServiceDto;

import java.util.List;

public interface SrvService {
    List<ServiceDto> findByServiceType(String keyword);
}
