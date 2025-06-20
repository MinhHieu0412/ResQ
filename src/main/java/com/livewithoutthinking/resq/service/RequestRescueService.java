package com.livewithoutthinking.resq.service;


import com.livewithoutthinking.resq.entity.RequestRescue;
import com.livewithoutthinking.resq.repository.RequestRescueRepository;
import org.springframework.stereotype.Service;

@Service
public class RequestRescueService {

    private RequestRescueRepository requestRescueRepository;

    public RequestRescueService(RequestRescueRepository requestRescueRepository) {
        this.requestRescueRepository = requestRescueRepository;
    }

    public RequestRescue getRequestRescueById(int id) {
        return requestRescueRepository.findById(id).get();
    }
}
