package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Discount;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.entity.UserDiscount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDiscountRepository extends JpaRepository<UserDiscount, Integer> {
    @Query("SELECT ud FROM UserDiscount ud WHERE ud.user = :user")
    List<UserDiscount> findByUser(User user);

    @Query("SELECT ud FROM UserDiscount ud WHERE ud.discount = :discount")
    List<UserDiscount> findByDiscount(Discount discount);

}
