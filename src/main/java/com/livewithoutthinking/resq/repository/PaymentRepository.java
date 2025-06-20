package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("""
    SELECT p FROM Payment p
    WHERE p.user.userId NOT IN (
        SELECT pt.user.userId FROM Partner pt
        UNION
        SELECT st.user.userId FROM Staff st
    )
""")
    List<Payment> findPaymentsByCustomers();
    @Query("""
    SELECT p FROM Payment p
    WHERE p.bill.requestRescue.partner.partnerId = :partnerId
""")
    List<Payment> findPaymentsByPartnerId(@Param("partnerId") Integer partnerId);


}
