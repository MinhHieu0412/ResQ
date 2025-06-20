package com.livewithoutthinking.resq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.livewithoutthinking.resq.entity.Partner;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Integer> {
    @Query("SELECT p FROM Partner p WHERE p.user.userId = :uId")
    Partner findByUser(int uId);
//    List<Partner> findByUsernameContainingIgnoreCase(String username);
@Query("SELECT p FROM Partner p WHERE LOWER(p.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
List<Partner> searchByUserUsername(@Param("username") String username);

}
