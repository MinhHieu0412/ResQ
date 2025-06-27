package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Documentary;

import java.util.List;

public interface DocumentaryService {
    List<Documentary> findByPartnerId_PartnerId(Integer partnerId);
    List<Documentary> getUnverifiedPartnerDoc(Integer partnerId);
    boolean rejectPartner(List<String> documentTypes, int partnerId, String reason);
}
