package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
