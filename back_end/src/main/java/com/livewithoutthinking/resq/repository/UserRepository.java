package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.role.roleName = 'CUSTOMER'")
    List<User> findAllCustomers();

    @Query("SELECT u FROM User u WHERE u.role.roleName = 'CUSTOMER'AND (" +
            "u.fullName LIKE :keyword OR u.sdt LIKE :keyword OR u.email LIKE :keyword)")
    List<User> searchCustomers(String keyword);

    @Query("SELECT u FROM User u WHERE u.userId = :userId")
    User findUserById(int userId);
}
