package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.ServiceDto;
import com.livewithoutthinking.resq.entity.Services;
import com.livewithoutthinking.resq.mapper.ServiceMapper;
import com.livewithoutthinking.resq.repository.ServiceRepository;
import com.livewithoutthinking.resq.service.SrvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SrvServiceImpl implements SrvService {
    @Autowired
    private ServiceRepository serviceRepo;

    public List<ServiceDto> findByServiceType(String keyword) {
        List<Services> results = serviceRepo.findByServiceType(keyword);
        List<ServiceDto> dtos = new ArrayList<>();
        for (Services service : results) {
            ServiceDto dto = ServiceMapper.toDTO(service);
            dtos.add(dto);
        }
        return dtos;
    }
}
