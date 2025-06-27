package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Documentary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DocumentaryRepository extends JpaRepository<Documentary, Integer> {
    List<Documentary> findByPartnerId_PartnerId(Integer partnerId);

    @Query("SELECT doc FROM Documentary doc WHERE doc.documentStatus = 'PENDING' AND doc.partnerId.partnerId = :partnerId")
    List<Documentary> getUnverifiedPartnerDoc(int partnerId);

    @Query("SELECT doc FROM Documentary doc WHERE doc.documentType = :type AND doc.partnerId.partnerId = :partnerId")
    Documentary getDocumentaryByType(String type, int partnerId);
}

