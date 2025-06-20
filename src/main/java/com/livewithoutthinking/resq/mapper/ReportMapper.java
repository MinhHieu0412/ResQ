package com.livewithoutthinking.resq.mapper;

import com.livewithoutthinking.resq.dto.ReportDto;
import com.livewithoutthinking.resq.entity.Partner;
import com.livewithoutthinking.resq.entity.Report;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.service.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ReportMapper {
//    Đổi lại là RequestRescue
    private final RequestRescueService rescueRequest;
    private final StaffService staffService;
    private final UserService customerService;
    private final PartnerService partnerService;

    public ReportMapper(RequestRescueService rescueService, StaffService staffService, UserService customerService, PartnerService partnerService) {
        this.rescueRequest = rescueService;
        this.staffService = staffService;
        this.customerService = customerService;
        this.partnerService = partnerService;
    }

    public Report toEntity(ReportDto dto) {
        Report report = new Report();

        // Basic fields
        report.setName(dto.getName());
        report.setDescription(dto.getDescription());
        report.setResponseToComplainant(dto.getResponseToComplainant());

        // Rescue and staff
        report.setRequestRescue(rescueRequest.getRequestRescueById(dto.getRequestRescueId()));
        report.setStaff(staffService.findById(dto.getStaffid()));

        // Optional resolver
        if (dto.getResolverId() != null) {
            report.setResolver(staffService.findById(dto.getResolverId()));
        }

        // Complainant mapping
        if ("CUSTOMER".equalsIgnoreCase(dto.getComplainantType())) {
            User customer = customerService.findById(dto.getComplainantId());
            report.setComplainantCustomer(customer);
        } else if ("PARTNER".equalsIgnoreCase(dto.getComplainantType())) {
            Partner partner = partnerService.findById(dto.getComplainantId());
            report.setComplainantPartner(partner);
        }

        // Defendant mapping
        if ("CUSTOMER".equalsIgnoreCase(dto.getDefendantType())) {
            User customer = customerService.findById(dto.getDefendantId());
            report.setDefendantCustomer(customer);
        } else if ("PARTNER".equalsIgnoreCase(dto.getDefendantType())) {
            Partner partner = partnerService.findById(dto.getDefendantId());
            report.setDefendantPartner(partner);
        }


        //Status
        report.setStatus(dto.getStatus());
        report.setRequest(dto.getRequest());
        report.setWithin24H(dto.isWithin24H());
        // Timestamps
        report.setCreatedAt(new Date());
        report.setUpdatedAt(new Date());

        return report;
 }
}
