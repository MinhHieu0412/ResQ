package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.User;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    UserDto getCustomer(int customerId);
    UserDto updateCustomer(UserDto dto);
    void updateCustomerPoint(int rrId);
}
