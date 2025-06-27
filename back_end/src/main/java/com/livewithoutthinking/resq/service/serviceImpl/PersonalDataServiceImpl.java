package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Notification;
import com.livewithoutthinking.resq.entity.NotificationTemplate;
import com.livewithoutthinking.resq.entity.PersonalData;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.repository.NotificationRepository;
import com.livewithoutthinking.resq.repository.NotificationTemplateRepository;
import com.livewithoutthinking.resq.repository.PersonalDataRepository;
import com.livewithoutthinking.resq.repository.UserRepository;
import com.livewithoutthinking.resq.service.PersonalDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PersonalDataServiceImpl implements PersonalDataService {
    @Autowired
    private PersonalDataRepository personalDataRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private NotificationTemplateRepository notiTemplateRepo;
    @Autowired
    private NotificationRepository notiRepo;

    public PersonalData getUnverifiedUserData(int customerId) {
        User user = userRepo.findUserById(customerId);
        if(user.getPersonalData().getVerificationStatus().equals("PENDING")) {
            return user.getPersonalData();
        }

        return null;
    }

    public boolean approvedCustomer(int customerId){
        boolean approved = false;
        User user = userRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        if(user != null && user.getPersonalData().getVerificationStatus().equals("PENDING")){
            user.getPersonalData().setVerificationStatus("APPROVED");
            user.setStatus("ACTIVE");
            userRepo.save(user);
            personalDataRepo.save(user.getPersonalData());
            approved = true;
        }
        if(approved){
            Notification notification = new Notification();
            NotificationTemplate notiTemplate = notiTemplateRepo.findByNotiType("DOCUMENT_APPROVE");
            notification.setNotificationTemplate(notiTemplate);
            notification.setUser(user);
            notification.setMessage("We have successfully verified your personal data. Your account is now active.");
            notification.setCreatedAt(new Date());
            notiRepo.save(notification);
        }
        return approved;
    };

    public boolean rejectedCustomer(int customerId, String reason){
        boolean rejected = false;
        User user = userRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        if(user != null && user.getPersonalData().getVerificationStatus().equals("PENDING")){
            user.getPersonalData().setVerificationStatus("REJECTED");
            personalDataRepo.save(user.getPersonalData());
            rejected = true;
        }
        if(rejected){
            Notification notification = new Notification();
            NotificationTemplate notiTemplate = notiTemplateRepo.findByNotiType("DOCUMENT_REJECT");
            notification.setNotificationTemplate(notiTemplate);
            notification.setUser(user);
            notification.setMessage(reason);
            notification.setCreatedAt(new Date());
            notiRepo.save(notification);
        }
        return rejected;
    }
}
