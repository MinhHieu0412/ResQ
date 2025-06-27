package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Documentary;
import com.livewithoutthinking.resq.entity.Notification;
import com.livewithoutthinking.resq.entity.NotificationTemplate;
import com.livewithoutthinking.resq.entity.Partner;
import com.livewithoutthinking.resq.repository.DocumentaryRepository;
import com.livewithoutthinking.resq.repository.NotificationRepository;
import com.livewithoutthinking.resq.repository.NotificationTemplateRepository;
import com.livewithoutthinking.resq.repository.PartnerRepository;
import com.livewithoutthinking.resq.service.DocumentaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DocumentaryServiceImpl implements DocumentaryService {
    @Autowired
    private DocumentaryRepository documentaryRepo;
    @Autowired
    private PartnerRepository partnerRepo;
    @Autowired
    private NotificationTemplateRepository notiTempRepo;
    @Autowired
    private NotificationRepository notiRepo;

    public List<Documentary> findByPartnerId_PartnerId(Integer partnerId) {
        return documentaryRepo.findByPartnerId_PartnerId(partnerId);
    }
    public List<Documentary> getUnverifiedPartnerDoc(Integer partnerId) {
        return documentaryRepo.getUnverifiedPartnerDoc(partnerId);
    }

    public boolean rejectPartner(List<String> documentTypes, int partnerId, String reason) {
        boolean isUpdated = false;
        List<Documentary> unverifiedDocs = documentaryRepo.getUnverifiedPartnerDoc(partnerId);
        Set<String> documentTypeSet = new HashSet<>(documentTypes);

        for (Documentary unverified : unverifiedDocs) {
            String type = unverified.getDocumentType();

            if (documentTypeSet.contains(type)) {
                unverified.setDocumentStatus("REJECTED");
            } else {
                unverified.setDocumentStatus("APPROVED");
            }
            documentaryRepo.save(unverified);
            isUpdated = true;
        }


        if (isUpdated) {
            Partner partner = partnerRepo.findPartnerById(partnerId);
            Notification notification = new Notification();
            NotificationTemplate notiTemplate = notiTempRepo.findByNotiType("DOCUMENT_REJECT");
            notification.setNotificationTemplate(notiTemplate);
            notification.setUser(partner.getUser());
            notification.setMessage(reason);
            notification.setCreatedAt(new Date());
            notiRepo.save(notification);
        }
        return isUpdated;
    }
}
