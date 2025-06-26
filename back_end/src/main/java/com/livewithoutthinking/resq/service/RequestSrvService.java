package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.RequestRescue;
import com.livewithoutthinking.resq.entity.RequestService;

import java.util.List;

public interface RequestSrvService {
    List<RequestService> createRequestServices(List<Integer> services, RequestRescue request);
    List<RequestService> getReqSrvByResquest(int rrId);
}
