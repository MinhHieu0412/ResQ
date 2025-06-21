package com.livewithoutthinking.resq.controller;


import com.livewithoutthinking.resq.config.FileService;
import com.livewithoutthinking.resq.dto.ReportDto;
import com.livewithoutthinking.resq.entity.Report;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.repository.StaffRepository;
import com.livewithoutthinking.resq.service.ReportService;
import com.livewithoutthinking.resq.service.serviceImpl.PartnerServiceImpl;
import com.livewithoutthinking.resq.service.serviceImpl.CustomerServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/report")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    private StaffRepository staffRepository;
    private ReportService reportService;
    private FileService fileService;
    private CustomerServiceImpl userServiceImpl;
    private PartnerServiceImpl partnerServiceImpl;


    public ReportController(StaffRepository staffRepository, ReportService reportService, FileService fileService, CustomerServiceImpl userServiceImpl, PartnerServiceImpl partnerServiceImpl) {
        this.staffRepository = staffRepository;
        this.reportService = reportService;
        this.fileService = fileService;
        this.userServiceImpl = userServiceImpl;
        this.partnerServiceImpl = partnerServiceImpl;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReportDto>>> getReports() {
        try {
            List<Report> reports = reportService.showAllReport();
            List<ReportDto> dtos = reports.stream()
                    .map(ReportDto::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(ApiResponse.success(dtos, "Get all report successfully!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error getting reports!"));
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Report>> getReportById(@PathVariable  Integer id) {
        try{
            Optional<Report> report = Optional.ofNullable(reportService.getReportById(id));
            if(report.isPresent()){
                return ResponseEntity.ok(ApiResponse.success(report.get(), "Get report successfully!"));
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.errorServer("Error getting report!"));
            }
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error getting report!" +e.getMessage()));
        }
    }


}
