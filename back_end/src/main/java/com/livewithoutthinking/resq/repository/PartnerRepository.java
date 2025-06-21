package com.livewithoutthinking.resq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.livewithoutthinking.resq.entity.Partner;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    @Query("SELECT p FROM Partner p WHERE p.user.fullName LIKE :keyword")
    List<Partner> searchPartners(String keyword);
    @Query("SELECT p FROM Partner p WHERE p.partnerId = :partnerId")
    Partner findPartnerById(int partnerId);
}
