package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.PaymentDto;
import com.livewithoutthinking.resq.dto.RequestResQDto;
import com.livewithoutthinking.resq.entity.Payment;
import com.livewithoutthinking.resq.repository.PaymentRepository;
import com.livewithoutthinking.resq.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepo;

    public List<PaymentDto> customerPayments(int customerId){
        List<Payment> result = paymentRepo.customerPayments(customerId);
        List<PaymentDto> dtos = new ArrayList<PaymentDto>();
        for(Payment payment : result){
            PaymentDto dto = new PaymentDto();
            dto.setPaymentId(Math.toIntExact(payment.getPaymentId()));
            dto.setName(payment.getName());
            dtos.add(dto);
        }
        return dtos;
    }
}
