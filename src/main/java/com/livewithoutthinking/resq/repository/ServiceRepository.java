package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ServiceRepository extends JpaRepository<Services, Integer> {

    List<Services> findByServiceNameContainingIgnoreCase(String name);

    // Lọc theo loại dịch vụ
    List<Services> findByServiceTypeIgnoreCase(String type);
}
