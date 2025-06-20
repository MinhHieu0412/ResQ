package com.livewithoutthinking.resq.controller;

import com.livewithoutthinking.resq.dto.DailyRenvenueData;
import com.livewithoutthinking.resq.dto.DataRangeRequest;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }
//    @PostMapping("/rescue-chart")
//    public List<Map<String, Object>> getRescueChart(@RequestBody DataRangeRequest request) {
//        return dashboardService.getRescueChartData(request.getStart(), request.getEnd());
//    }
    @PostMapping("/revenue")
    public ResponseEntity<ApiResponse<List<DailyRenvenueData>>> getRevenue(
            @RequestBody DataRangeRequest range
    ) {
        List<DailyRenvenueData> revenueList =
                dashboardService.getRevenueByDateRange(range.getStart(), range.getEnd());

        return ResponseEntity.ok(ApiResponse.success(revenueList, "Get revenue successfully"));
    }
    @GetMapping("/rescue/daily")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getDailyRescue(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        Map<String, Long> stats = dashboardService.getDailyRescueStats(date);
        return ResponseEntity.ok(ApiResponse.success(stats, "Get daily rescue stats successfully"));
    }

    @GetMapping("/rescue/range")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getRescueByRange(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        Map<String, Long> stats = dashboardService.getRescueStatsInRange(start, end);
        return ResponseEntity.ok(ApiResponse.success(stats, "Get range rescue stats successfully"));
    }
    @GetMapping("/revenue/total")

    public ResponseEntity<ApiResponse<Double>> getTotalRevenue() {
        Double total = dashboardService.getTotalRevenue();
        return ResponseEntity.ok(ApiResponse.success(total, "Fetched total revenue successfully"));
    }
    @GetMapping("/revenue/last-month")
    public ResponseEntity<ApiResponse<Double>> getLastRevenue() {
        Double revenue = dashboardService.getLastMonthRevenue();
        return ResponseEntity.ok(ApiResponse.success(revenue, "Fetched last month revenue successfully"));
    }

    @GetMapping("/rescue/this-month")
    public ResponseEntity<ApiResponse<Long>> getThisMonthRescueTotal() {
        Long total = dashboardService.getTotalRescueThisMonth();
        return ResponseEntity.ok(ApiResponse.success(total, "Fetched this month's total rescue successfully"));
    }
    @GetMapping("/rescue/last-month")
    public ResponseEntity<ApiResponse<Long>> getLastMonthRescueTotal() {
        Long total = dashboardService.getTotalRescueLastMonth();
        return ResponseEntity.ok(ApiResponse.success(total, "Fetched last month's total rescue successfully"));
    }
    @GetMapping("/customer/this-month")
    public ResponseEntity<ApiResponse<Long>> getCustomerThisMonth() {
        Long total = dashboardService.countNewCustomersThisMonth();
        return ResponseEntity.ok(ApiResponse.success(total, "Fetched new customers in this month"));
    }

    @GetMapping("/customer/last-month")
    public ResponseEntity<ApiResponse<Long>> getCustomerLastMonth() {
        Long total = dashboardService.countNewCustomersLastMonth();
        return ResponseEntity.ok(ApiResponse.success(total, "Fetched new customers in last month"));
    }
    @GetMapping("/customer/returning-this-month")
    public ResponseEntity<ApiResponse<?>> getReturningCustomerCountThisMonth() {
        Long count = dashboardService.getReturningCustomerCountThisMonth();
        return ResponseEntity.ok(ApiResponse.success(count, "Get returning customer count successfully"));
    }

    @GetMapping("/customer/returning-last-month")
    public ResponseEntity<ApiResponse<?>> getReturningCustomerCountLastMonth() {
        Long count = dashboardService.getReturningCustomerCountLastMonth();
        return ResponseEntity.ok(ApiResponse.success(count, "Get returning customer count last month successfully"));
    }
}
