package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.dto.RescueInfoDTO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.livewithoutthinking.resq.entity.RescueHistory;

import java.util.List;

@Repository
public interface RescueHistoryRepository extends CrudRepository<RescueHistory, Integer> {

    @Query("SELECT new com.livewithoutthinking.resq.dto.RescueInfoDTO( " +
            "r.requestRescue.rrid, " +
            "r.bill.billId, " +
            "r.requestRescue.user.fullname, " +
            "r.requestRescue.partner.user.fullname, " +
            "r.bill.payment.paymentId, " +
            "r.bill.payment.method, " +
            "r.bill.total, " +
            "r.bill.totalPrice, " +
            "r.bill.method, " +
            "r.bill.createdAt, " +
            "r.bill.status) " +
            "FROM RescueHistory r")
    List<RescueInfoDTO> findAllRescueInfo();

    @Modifying
    @Query("UPDATE Bill b SET b.status = :status WHERE b.billId = :billId")
    void updateBillStatusByBillId(@Param("billId") int billId, @Param("status") String status);

}
