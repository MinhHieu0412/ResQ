package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ManagerRepository extends JpaRepository<Staff, Integer> {
    @Query("SELECT s FROM Staff s WHERE s.position = 'Manager'")
    List<Staff> findAllManagers();
    @Query("SELECT s FROM Staff s WHERE s.position = 'Manager' AND (" +
            "s.user.fullName LIKE :keyword OR s.user.sdt LIKE :keyword OR s.user.email LIKE :keyword)")
    List<Staff> searchManagers(String keyword);
}
