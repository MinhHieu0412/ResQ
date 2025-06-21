package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Bill;

import java.util.List;

public interface BillService {
    Bill findBillsByReqResQ(int rrId);
    List<Bill> findBillsByPartner(int parnerId);
}
