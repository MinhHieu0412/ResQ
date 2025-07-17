package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.UserDiscountDto;

import java.util.List;

public interface UserDiscountService {
    List<UserDiscountDto> findByUserId(int userId);
    void removeExpiredDiscounts(int discountId);
}
