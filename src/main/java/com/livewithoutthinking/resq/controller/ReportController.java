package com.livewithoutthinking.resq.controller;


import com.livewithoutthinking.resq.config.FileService;
import com.livewithoutthinking.resq.dto.ReportDto;
import com.livewithoutthinking.resq.dto.ReportResolveDto;
import com.livewithoutthinking.resq.entity.Report;
import com.livewithoutthinking.resq.entity.Staff;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.mapper.ReportMapper;
import com.livewithoutthinking.resq.repository.StaffRepository;
import com.livewithoutthinking.resq.service.ReportService;
import com.livewithoutthinking.resq.service.serviceImpl.PartnerServiceImpl;
import com.livewithoutthinking.resq.service.serviceImpl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/report")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    private StaffRepository staffRepository;
    private ReportService reportService;
    private ReportMapper reportMapper;
    private FileService fileService;
    private UserServiceImpl userServiceImpl;
    private PartnerServiceImpl partnerServiceImpl;


    public ReportController(StaffRepository staffRepository, ReportService reportService, ReportMapper reportMapper, FileService fileService, UserServiceImpl userServiceImpl, PartnerServiceImpl partnerServiceImpl) {
        this.staffRepository = staffRepository;
        this.reportService = reportService;
        this.reportMapper = reportMapper;
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


    @PostMapping
    public ResponseEntity<ApiResponse<?>> createReport(@Valid @ModelAttribute ReportDto reportDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(err -> err.getField() + ": " + err.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(ApiResponse.errorValidation("Validation failed", errors));
        }

        try {
            String pdfFileName = "";
            MultipartFile pdfFile = reportDto.getPdfFile();

            if (pdfFile != null && !pdfFile.isEmpty()) {
                pdfFileName = fileService.savePdfFile(pdfFile);
            }

            reportDto.setStatus("pending");
            Report report = reportMapper.toEntity(reportDto);

            Staff staff = staffRepository.findById(reportDto.getStaffid())
                    .orElseThrow(() -> new RuntimeException("Staff not found with id: " + reportDto.getStaffid()));
            report.setStaff(staff);
            report.setPdfFileName(pdfFileName);

            Report reportCreated = reportService.addNewReport(report);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(reportCreated, "Report created successfully!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer("Error creating report! " + e.getMessage()));
        }
    }




    @PutMapping("/{id}/resolve")
    private ResponseEntity<ApiResponse<Report>> resolveReport(@PathVariable Integer id, @Valid @RequestBody ReportResolveDto reportResolveDto,
                                                              BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .toList();
            return ResponseEntity.badRequest().body(ApiResponse.errorValidation("Errors when resolve report",errors));
        }
        try{
            Report report = reportService.getReportById(id);
            if(report==null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.errorServer("Error getting report!"));
            }
            report.setResponseToComplainant(reportResolveDto.getResponseToComplainant());
            report.setUpdatedAt(new Date());
            report.setStatus(reportResolveDto.getStatus());
            if (reportResolveDto.getResolverId() != null) {
                Staff resolver = staffRepository.findById(reportResolveDto.getResolverId())
                        .orElseThrow(() -> new RuntimeException("Resolver (staff) not found"));
                report.setResolver(resolver);
            }

            Report updated = reportService.addNewReport(report);
            return ResponseEntity.ok(ApiResponse.success(updated, "Report updated successfully!"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error creating report!"));
        }
    }

    @GetMapping("/users/search/{username}")
    public ResponseEntity<ApiResponse<List<Report>>> getReportsByUser(@PathVariable String username) {
        List<Report> reports = userServiceImpl.findByUsernameContainingIgnoreCase(username);

        if (reports == null || reports.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.errorServer("No reports found for user with username: " + username));
        }

        return ResponseEntity.ok(ApiResponse.success(reports, "Get all reports successfully!"));
    }

    @GetMapping("/partners/search/{username}")
    public ResponseEntity<ApiResponse<List<Report>>> getReportsByPartner(@PathVariable String username) {
        List<Report> reports = partnerServiceImpl.searchByUserUsername(username);

        if (reports == null || reports.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.errorServer("No reports found for partner with username: " + username));
        }

        return ResponseEntity.ok(ApiResponse.success(reports, "Get all reports successfully!"));
    }

    @GetMapping("/filter/status")
    public ResponseEntity<ApiResponse<List<Report>>> filterByStatus(@RequestParam("status") String status) {
        try {
            List<Report> reports = reportService.findByStatusIgnoreCase(status);
            if (reports == null || reports.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.errorServer("No reports found with status: " + status));
            }

            return ResponseEntity.ok(ApiResponse.success(reports, "Filtered reports by status successfully!"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer("Error filtering reports: " + e.getMessage()));
        }
    }

    @GetMapping("/staff/{staffid}")
    public ResponseEntity<ApiResponse<List<Report>>> getReportsByStaff(@PathVariable Integer staffid) {
        try{
            List<Report> reports = reportService.findByStaff_id(staffid);
            if (reports == null || reports.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.errorServer("No reports found with staffid: " + staffid));
            }

            List<ReportDto> dtos = reports.stream().map(ReportDto::new).collect(Collectors.toList());
            return ResponseEntity.ok(ApiResponse.success(reports, "Get all reports successfully!"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error filtering reports: " + e.getMessage()));
        }
    }

}
