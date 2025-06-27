package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.PersonalData;

public interface PersonalDataService {
    PersonalData getUnverifiedUserData(int customerId);
    boolean approvedCustomer(int customerId);
    boolean rejectedCustomer(int customerId, String reason);
}
