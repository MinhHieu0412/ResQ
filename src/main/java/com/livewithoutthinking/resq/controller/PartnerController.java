package com.livewithoutthinking.resq.controller;

import com.livewithoutthinking.resq.entity.Partner;
import com.livewithoutthinking.resq.entity.Payment;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.service.PartnerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/partners")
public class PartnerController {
    private PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

//    @GetMapping("/{id}/payments")
//    public ResponseEntity<ApiResponse<List<Payment>>> getPaymentsByPartner(@PathVariable Integer id) {
//        try {
//            Partner partner = partnerService.findById(id);
//            List<Payment> payments = partner.getPayments();
//
//            return ResponseEntity.ok(
//                    ApiResponse.success(payments, "Get all payments of partner #" + id)
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(404).body(
//                    ApiResponse.notfound(null, "Not find partner với id = " + id)
//            );
//        }
//    }
}
