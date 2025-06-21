package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Bill;
import com.livewithoutthinking.resq.repository.BillRepository;
import com.livewithoutthinking.resq.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillRepository billRepo;

    public Bill findBillsByReqResQ(int rrId) {
        return billRepo.findBillsByReqResQ(rrId);
    }

    public List<Bill> findBillsByPartner(int partnerId) {
        return billRepo.findBillsByPartner(partnerId);
    }
}
