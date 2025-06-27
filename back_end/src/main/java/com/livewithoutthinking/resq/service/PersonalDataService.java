package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.PersonalData;

public interface PersonalDataService {
    PersonalData getUnverifiedUserData(int customerId);
}
