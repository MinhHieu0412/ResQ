package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.PartnerDto;
import com.livewithoutthinking.resq.dto.UserDashboard;
import com.livewithoutthinking.resq.entity.Bill;
import com.livewithoutthinking.resq.entity.Partner;
import com.livewithoutthinking.resq.entity.RequestRescue;
import com.livewithoutthinking.resq.mapper.PartnerMapper;
import com.livewithoutthinking.resq.repository.BillRepository;
import com.livewithoutthinking.resq.repository.RequestResQRepository;
import com.livewithoutthinking.resq.service.PartnerService;
import com.livewithoutthinking.resq.repository.PartnerRepository;
import com.livewithoutthinking.resq.service.FeedbackService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PartnerServiceImpl implements PartnerService {
    @Autowired
    private PartnerRepository partnerRepo;
    @Autowired
    private RequestResQRepository requestResQRepo;
    @Autowired
    private BillRepository billRepo;

    public List<PartnerDto> findAll(){
        List<Partner> partnerList =  partnerRepo.findAll();
        List<PartnerDto> showList = new ArrayList<>();
        for (Partner partner : partnerList) {
            PartnerDto dto = PartnerMapper.toDTO(partner);
            showList.add(dto);
        }
        return showList;
    }
    public Optional<PartnerDto> findPartnerById(int partnerId) {
        Partner result = partnerRepo.findPartnerById(partnerId);
        PartnerDto dto = PartnerMapper.toDTO(result);
        return Optional.ofNullable(dto);
    }
    public List<PartnerDto> searchPartners(String keyword){
        List<Partner> result = partnerRepo.searchPartners("%"+keyword+"%");
        List<PartnerDto> showList = new ArrayList<>();
        for (Partner partner : result) {
            PartnerDto dto = PartnerMapper.toDTO(partner);
            showList.add(dto);
        }
        return showList;
    }
    public UserDashboard partnerDashboard(int partnerId){
        List<RequestRescue> partnerRR = requestResQRepo.searchByPartner(partnerId);
        List<Bill> partnerBill = billRepo.findBillsByPartner(partnerId);
        UserDashboard partnerDash = new UserDashboard();
        int totalSuccess = 0;
        int totalCancel = 0;
        for(RequestRescue rr : partnerRR){
            if(rr.getStatus().equalsIgnoreCase("completed")){
                totalSuccess++;
            }else if(rr.getStatus().equalsIgnoreCase("canceled")){
                totalCancel++;
            }
        }
        double revenue = 0.0;
        for(Bill b : partnerBill){
            revenue = revenue + b.getTotalPrice();
        }

        partnerDash.setTotalSuccess(totalSuccess);
        partnerDash.setTotalCancel(totalCancel);
        if(!partnerRR.isEmpty()){
            partnerDash.setPercentSuccess((double)totalSuccess/partnerRR.size()*100);
        }
        partnerDash.setTotalAmount(revenue);
        return partnerDash;
    }
    public boolean approvePartner(int partnerId){
        Partner partner = partnerRepo.findPartnerById(partnerId);
        partner.setVerificationStatus(true);
        partnerRepo.save(partner);
        return true;
    }
}
