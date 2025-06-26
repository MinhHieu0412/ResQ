package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.RequestRescue;
import com.livewithoutthinking.resq.entity.RequestService;
import com.livewithoutthinking.resq.entity.Services;
import com.livewithoutthinking.resq.repository.RequestServiceRepository;
import com.livewithoutthinking.resq.repository.ServiceRepository;
import com.livewithoutthinking.resq.service.RequestSrvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestSrvServiceImpl implements RequestSrvService {
    @Autowired
    private RequestServiceRepository requestServiceRepo;
    @Autowired
    private ServiceRepository serviceRepo;

    public List<RequestService> createRequestServices(List<Integer> services, RequestRescue request) {
        List<RequestService> result = new ArrayList<>();
        for (Integer serviceId : services) {
            Services service = serviceRepo.findById(serviceId).orElse(null);
            if (service != null) {
                RequestService requestService = new RequestService();
                requestService.setRequest(request);
                requestService.setService(service);
                result.add(requestServiceRepo.save(requestService));
            }
        }
        return result;
    }

    public List<RequestService> getReqSrvByResquest(int rrId){
        return requestServiceRepo.getReqSrvByResquest(rrId);
    }
}
