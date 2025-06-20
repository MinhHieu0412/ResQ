package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Documentary;
import com.livewithoutthinking.resq.repository.DocumentaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentaryService {

    private final DocumentaryRepository documentaryRepository;
    public DocumentaryService(DocumentaryRepository documentaryRepository) {
        this.documentaryRepository = documentaryRepository;
    }
    public List<Documentary> findByPartnerId_PartnerId(Integer partnerId) {
        return documentaryRepository.findByPartnerId_PartnerId(partnerId);
    }
}
