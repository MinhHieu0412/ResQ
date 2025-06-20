package com.livewithoutthinking.resq.service;


import com.livewithoutthinking.resq.dto.PaymentDto;
import com.livewithoutthinking.resq.entity.Payment;
import com.livewithoutthinking.resq.repository.PaymentRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    public List<Payment> getCustomerPayments() {
        return paymentRepository.findPaymentsByCustomers();
    }

    public List<Payment> getCustomerPaymentsByPartnerId(@Param("partnerId") Integer partnerId) {
        return paymentRepository.findPaymentsByPartnerId(partnerId);
    }

    public List<Payment> getPaymentsByPartnerId(Integer partnerId) {
        return paymentRepository.findPaymentsByPartnerId(partnerId);
    }

}
