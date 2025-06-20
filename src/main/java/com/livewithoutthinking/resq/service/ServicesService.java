package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Services;
import com.livewithoutthinking.resq.repository.ServiceRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class ServicesService {

    private ServiceRepository serviceRepository;

    public ServicesService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Services> findAll() {
        return serviceRepository.findAll();
    }

    public Services findById( int id) {
        return serviceRepository.findById(id).orElse(null);
    }

    public Services save(Services service) {
        return serviceRepository.save(service);
    }



    public Services updatePrices(int serviceId, double fixedPrice, double pricePerKm) {
        Optional<Services> optionalService = serviceRepository.findById(serviceId);
        if (optionalService.isPresent()) {
            Services service = optionalService.get();
            service.setFixedPrice(fixedPrice);
            service.setPricePerKm(pricePerKm);
            return serviceRepository.save(service);
        }
        return null;
    }


    public List<Services> searchByName(String keyword) {
        return serviceRepository.findByServiceNameContainingIgnoreCase(keyword);
    }


    public List<Services> filterByType(String serviceType) {
        return serviceRepository.findByServiceTypeIgnoreCase(serviceType);
    }
}
