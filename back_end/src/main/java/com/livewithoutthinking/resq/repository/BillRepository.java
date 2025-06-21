package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Bill;
import com.livewithoutthinking.resq.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    @Query("SELECT b FROM Bill b WHERE b.requestRescue.rrid = :rrId")
    Bill findBillsByReqResQ(int rrId);
    @Query("SELECT b FROM Bill b WHERE b.requestRescue.partner.partnerId = :partnerId")
    List<Bill> findBillsByPartner(int partnerId);
    @Query("SELECT b FROM Bill b WHERE b.requestRescue.user.userId = :userId")
    List<Bill> findBillsByUser(int userId);

}
