package com.livewithoutthinking.resq.controller;

import com.livewithoutthinking.resq.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resq/partner")
public class PartnerController {
    @Autowired
    private PartnerService partnerService;

    @PutMapping("/updateWalletPoint/{partnerId}")
    public ResponseEntity<String> updateWalletPoint(@PathVariable("partnerId") int partnerId) {
        try {
            boolean updated = partnerService.updatePartnerWalletAmount(partnerId);
            if (updated) {
                return ResponseEntity.ok("Update wallet amount successful.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update wallet amount failed.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("System error.");
        }
    }

}
