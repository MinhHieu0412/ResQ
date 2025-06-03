package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {

    // Tìm staff theo UserID của User liên kết
    Staff findByUser_UserId(Integer userId);
}
