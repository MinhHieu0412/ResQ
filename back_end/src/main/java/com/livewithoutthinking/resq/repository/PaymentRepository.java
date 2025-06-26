package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment  p WHERE p.user.userId = :customerId")
    List<Payment> customerPayments(int customerId);

    @Query("SELECT p FROM Payment p WHERE p.user.userId = :userId AND p.name = :name")
    Payment customerPaymentId(int userId, String name);
}
