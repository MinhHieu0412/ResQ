package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Partner;

import java.util.List;
import java.util.Optional;

public interface PartnerService {
    List<Partner> findAll();
    Partner findById(Integer id);
    Partner findByUser(int uId);
}
