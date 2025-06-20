package com.livewithoutthinking.resq.controller;


import com.livewithoutthinking.resq.entity.Documentary;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.service.DocumentaryService;
import com.livewithoutthinking.resq.service.PartnerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/documentary")
public class DocumentaryController {
    private DocumentaryService documentaryService ;
    public DocumentaryController(DocumentaryService documentaryService) {
        this.documentaryService = documentaryService;
    }


    @GetMapping("/partner/{partnerId}")
    public ResponseEntity<ApiResponse<List<Documentary>>> getPartnerDocumentaries(@PathVariable Integer partnerId) {
        try {
            List<Documentary> docs = documentaryService.findByPartnerId_PartnerId(partnerId);
            return ResponseEntity.ok(ApiResponse.success(docs, "Get partner's documentary successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer(e.getMessage()));
        }
    }
}
