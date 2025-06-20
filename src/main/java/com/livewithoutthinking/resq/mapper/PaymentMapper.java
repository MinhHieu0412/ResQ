package com.livewithoutthinking.resq.mapper;

import com.livewithoutthinking.resq.dto.PaymentDto;
import com.livewithoutthinking.resq.entity.Payment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PaymentMapper {

    // Hàm public để controller gọi
    public List<PaymentDto> mapToPaymentDto(List<Payment> payments) {
        return payments.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Hàm private dùng nội bộ để map từng cái
    private PaymentDto mapToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setPaymentId(payment.getPaymentId());
        dto.setName(payment.getName());
        dto.setAccountName(payment.getAccountName());
        dto.setAccountNo(payment.getAccountNo());
        dto.setCardNo(payment.getCardNo());
        dto.setExpiredDate(payment.getExpiredDate());
        dto.setMethod(payment.getMethod());
        dto.setDefault(payment.isDefault());
        dto.setCreatedAt(payment.getCreatedAt());
        dto.setUpdatedAt(payment.getUpdatedAt());

        if (payment.getUser() != null) {
            dto.setUsername(payment.getUser().getUsername());
        }

        return dto;
    }
}
