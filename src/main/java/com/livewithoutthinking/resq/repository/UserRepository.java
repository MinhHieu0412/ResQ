package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.role.roleId = :roleId")
    List<User> findByRole(int roleId);

    @Query("SELECT u FROM User u WHERE u.fullName LIKE :name")
    List<User> findByFullName(String name);


List<User> findByUsernameContainingIgnoreCase(String username);

    @Query("""
    SELECT COUNT(u) FROM User u
    WHERE MONTH(u.createdAt) = MONTH(CURRENT_DATE)
      AND YEAR(u.createdAt) = YEAR(CURRENT_DATE)
      AND u.userId NOT IN (SELECT s.user.userId FROM Staff s)
      AND u.userId NOT IN (SELECT p.user.userId FROM Partner p)
""")
    Long countNewCustomersThisMonth();


    @Query("""
    SELECT COUNT(u) FROM User u
    WHERE FUNCTION('MONTH', u.createdAt) = :month
      AND FUNCTION('YEAR', u.createdAt) = :year
      AND u.userId NOT IN (SELECT s.user.userId FROM Staff s)
      AND u.userId NOT IN (SELECT p.user.userId FROM Partner p)
""")
    Long countNewCustomersInMonth(@Param("month") int month, @Param("year") int year);







}
