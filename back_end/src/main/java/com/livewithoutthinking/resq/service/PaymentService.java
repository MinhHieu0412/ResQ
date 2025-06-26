package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.dto.PaymentDto;

import java.util.List;

public interface PaymentService {
    List<PaymentDto> customerPayments(int customerId);
}
