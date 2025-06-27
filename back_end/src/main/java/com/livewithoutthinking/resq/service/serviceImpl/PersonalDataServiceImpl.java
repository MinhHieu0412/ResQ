package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.PersonalData;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.repository.UserRepository;
import com.livewithoutthinking.resq.service.PersonalDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonalDataServiceImpl implements PersonalDataService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public PersonalData getUnverifiedUserData(int customerId) {
        User user = userRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        if(user.getPersonalData().getVerificationStatus().equals("PENDING")){
            return user.getPersonalData();
        }
        return null;
    }
}
