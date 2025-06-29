package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    @Query("SELECT s FROM Staff s WHERE s.user.role.roleId = :roleId")
    List<Staff> findAllStaffs(int roleId);
    @Query("SELECT s FROM Staff s WHERE s.user.role.roleId = :roleId AND (" +
            "s.user.fullName LIKE :keyword OR s.user.sdt LIKE :keyword OR s.user.email LIKE :keyword)")
    List<Staff> searchStaffs(String keyword, int roleId);
}
