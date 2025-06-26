package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Services, Integer> {
    @Query("SELECT srv FROM Services srv WHERE srv.serviceType = :keyword")
    List<Services> findByServiceType(String keyword);
}
