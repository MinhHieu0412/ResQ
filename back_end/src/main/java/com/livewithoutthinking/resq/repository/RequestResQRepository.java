package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.RequestRescue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface RequestResQRepository extends JpaRepository<RequestRescue, Integer> {
    @Query("SELECT rr FROM RequestRescue rr WHERE rr.partner.partnerId = :partnerId")
    List<RequestRescue> searchByPartner(int partnerId);

    @Query("SELECT rr FROM RequestRescue rr WHERE rr.user.userId = :userId")
    List<RequestRescue> searchByUser(int userId);

    @Query("SELECT rr FROM RequestRescue rr WHERE rr.uLocation LIKE :keyword OR rr.user.fullName LIKE :keyword OR " +
            "rr.partner.user.fullName LIKE :keyword")
    List<RequestRescue>searchRR(String keyword);

    @Query("SELECT rr FROM RequestRescue rr WHERE (rr.uLocation LIKE :keyword OR rr.partner.user.fullName LIKE :keyword) AND " +
            "rr.user.userId = :userId")
    List<RequestRescue>searchRRWithUser(int userId, String keyword);

    @Query("SELECT rr FROM RequestRescue rr WHERE (rr.uLocation LIKE :keyword OR rr.user.fullName LIKE :keyword) AND " +
            "rr.partner.partnerId = :partnerId")
    List<RequestRescue>searchRRWithPartner(int partnerId, String keyword);

    @Query("SELECT count(r) FROM RequestRescue r WHERE r.user.userId = :userId")
    int countTotalRequestRescue(int userId);
}
