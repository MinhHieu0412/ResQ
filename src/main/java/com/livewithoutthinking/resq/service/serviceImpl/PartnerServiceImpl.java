package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Partner;
import com.livewithoutthinking.resq.entity.Report;
import com.livewithoutthinking.resq.service.PartnerService;
import com.livewithoutthinking.resq.repository.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PartnerServiceImpl implements PartnerService {
    @Autowired
    private PartnerRepository partnerRepo;

    public List<Partner> findAll(){
        return partnerRepo.findAll();
    }


        public Partner findById(Integer id) {
            return partnerRepo.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Partner not found"));
        }



    public Partner findByUser(int userId) {
        return partnerRepo.findByUser(userId);
    }

    public List<Report> searchByUserUsername(@Param("username") String username){
        List<Partner> partners = partnerRepo.searchByUserUsername(username);
        List<Report> allReports = new ArrayList<>();

        for (Partner partner : partners) {
            if (partner.getReports() != null) {
                allReports.addAll(partner.getReports());
            }
        }

        return allReports;
    }

}
