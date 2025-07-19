package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.PartnerDto;
import com.livewithoutthinking.resq.dto.UserDashboard;
import com.livewithoutthinking.resq.entity.*;
import com.livewithoutthinking.resq.mapper.PartnerMapper;
import com.livewithoutthinking.resq.repository.*;
import com.livewithoutthinking.resq.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PartnerServiceImpl implements PartnerService {
    @Autowired
    private PartnerRepository partnerRepo;
    @Autowired
    private RequestRescueRepository requestResQRepo;
    @Autowired
    private BillRepository billRepo;
    @Autowired
    private NotificationTemplateRepository notiTemplateRepo;
    @Autowired
    private NotificationRepository notiRepo;
    @Autowired
    private DocumentaryRepository documentaryRepo;

    public List<Partner> findAll(){
        return partnerRepo.findAll();
    }

    public Partner findById(Integer id) {
        return partnerRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Partner not found"));
    }

    public void updatePartnerStatus(Integer partnerId, String status, LocalDateTime blockUntil) {
        Partner partner = partnerRepo.findById(partnerId)
                .orElseThrow(() -> new RuntimeException("Partner not found"));
        partner.setStatus(status);
        partner.setBlockUntil(blockUntil);
        partnerRepo.save(partner);
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

    public List<Partner> searchByUsernameContainingIgnoreCase(String keyword) {
        return partnerRepo.findByUser_UsernameContainingIgnoreCase(keyword);
    }

    public List<PartnerDto> findAllDto(){
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
        boolean isNew = false;
        Partner partner = partnerRepo.findPartnerById(partnerId);
        if(!partner.isVerificationStatus()){
            partner.setVerificationStatus(true);
            isNew = true;
        }
        if(partner.getResTow() == 2){
            partner.setResTow(1);
        }
        if(partner.getResDrive() == 2){
            partner.setResDrive(1);
        }
        if(partner.getResFix() == 2){
            partner.setResFix(1);
        }
        Partner savedPartner = partnerRepo.save(partner);
        List<Documentary> unverifiedDocs = documentaryRepo.getUnverifiedPartnerDoc(partnerId);
        for(Documentary doc : unverifiedDocs){
            doc.setDocumentStatus("APPROVED");
            documentaryRepo.save(doc);
        }
        if(savedPartner != null){
            Notification notification = new Notification();
            NotificationTemplate notiTemplate = notiTemplateRepo.findByNotiType("DOCUMENT_APPROVE");
            notification.setNotificationTemplate(notiTemplate);
            notification.setUser(partner.getUser());
            if(isNew){
                notification.setMessage("We have successfully verified your documents. Now you have become our partner.");
            }else{
                notification.setMessage("Your request for new service has been verified.");
            }
            notification.setCreatedAt(new Date());
            notiRepo.save(notification);
        }
        return true;
    }

    public boolean updatePartnerWalletAmount(int partnerId){
        Partner partner = partnerRepo.findPartnerById(partnerId);
        partner.setWalletAmount(BigDecimal.valueOf(50000));
        partnerRepo.save(partner);
        return true;
    }
}
