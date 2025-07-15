package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.userId = :userId")
    Optional<User> findUserById(int userId);

    @Query("SELECT u FROM User u WHERE u.personalData.pdId = :pdId")
    Optional<User> findByPersonalData(int pdId);

}
