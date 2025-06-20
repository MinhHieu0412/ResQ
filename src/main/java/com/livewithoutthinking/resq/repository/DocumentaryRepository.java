package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Documentary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentaryRepository extends JpaRepository<Documentary, Integer> {
    List<Documentary> findByPartnerId_PartnerId(Integer partnerId);
}
