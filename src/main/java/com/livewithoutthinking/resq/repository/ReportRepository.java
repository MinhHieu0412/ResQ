package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
//    List<Report> findByCustomerNameContainingIgnoreCase(String customerName);
List<Report> findByStatusIgnoreCase(String status);
    List<Report> findByStaff_StaffId(Integer staffId);

}
