package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    @Query(value = """
    SELECT 
        DATE(rr.created_at) AS date,
        SUM(CASE WHEN rr.rescue_type = 'ResFix' THEN b.total_price ELSE 0 END) AS resFix,
        SUM(CASE WHEN rr.rescue_type = 'ResDrive' THEN b.total_price ELSE 0 END) AS resDrive,
        SUM(CASE WHEN rr.rescue_type = 'ResTow' THEN b.total_price ELSE 0 END) AS resTow
    FROM bill b
    JOIN requestrescue rr ON b.RRID = rr.RRID
    WHERE DATE(rr.created_at) BETWEEN :startDate AND :endDate
    GROUP BY DATE(rr.created_at)
    ORDER BY DATE(rr.created_at)
""", nativeQuery = true)
    List<Object[]> getRevenueByDateRange(LocalDate startDate, LocalDate endDate);

    @Query("""
    SELECT SUM(b.totalPrice)
    FROM Bill b
    WHERE FUNCTION('MONTH', b.createdAt) = FUNCTION('MONTH', CURRENT_DATE)
      AND FUNCTION('YEAR', b.createdAt) = FUNCTION('YEAR', CURRENT_DATE)
""")
    Double getTotalRevenueInCurrentMonth();


    @Query(value = """
    SELECT SUM(total_price)
    FROM bill
    WHERE MONTH(created_at) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)
      AND YEAR(created_at) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)
""", nativeQuery = true)
    Double getTotalRevenueInLastMonth();


}
