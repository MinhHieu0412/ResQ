package com.livewithoutthinking.resq.controller;


import com.livewithoutthinking.resq.dto.PaymentDto;
import com.livewithoutthinking.resq.entity.Payment;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.mapper.PaymentMapper;
import com.livewithoutthinking.resq.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(("/admin/payment"))
public class PaymentController {


    private PaymentService paymentService;
    private PaymentMapper paymentMapper;

    public PaymentController(PaymentService paymentService, PaymentMapper paymentMapper) {
        this.paymentService = paymentService;
        this.paymentMapper = paymentMapper;
    }

    //Chỉnh lại lấy theo id
    @GetMapping("/customers")
    public ResponseEntity<ApiResponse<List<PaymentDto>>> getCustomerPayments() {
        try {
            List<Payment> payments = paymentService.getCustomerPayments();
            List<PaymentDto> dtos = paymentMapper.mapToPaymentDto(payments);
            return ResponseEntity.ok(ApiResponse.success(dtos, "Danh sách hóa đơn của khách hàng"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer("Lỗi khi lấy danh sách hóa đơn!"));
        }
    }



    @GetMapping("/partner/{partnerId}")
    public ResponseEntity<ApiResponse<List<PaymentDto>>> getPartnerPayments(@PathVariable Integer partnerId) {
        try {
            List<Payment> payments = paymentService.getPaymentsByPartnerId(partnerId);
            List<PaymentDto> dtos = paymentMapper.mapToPaymentDto(payments);
            return ResponseEntity.ok(ApiResponse.success(dtos, "Danh sách hóa đơn của partner"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer("Lỗi khi lấy danh sách hóa đơn của partner!"));
        }
    }
}
