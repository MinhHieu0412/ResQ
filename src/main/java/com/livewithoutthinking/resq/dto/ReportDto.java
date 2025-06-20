package com.livewithoutthinking.resq.dto;

import com.livewithoutthinking.resq.entity.Report;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class ReportDto {

    @NotBlank(message = "Report name must not be blank")
    private String name;

    private String description;

    @NotNull(message = "Rescue request ID is required")
    private Integer requestRescueId;

    @NotNull(message = "Reporter (staff) ID is required")
    private Integer staffid;
    private String staffName; // thêm tên staff

    private Integer resolverId;
    private String resolverName; // thêm tên resolver

    // Complainant (CUSTOMER or PARTNER)
    @NotNull(message = "Complainant type is required (CUSTOMER or PARTNER)")
    private String complainantType;

    @NotNull(message = "Complainant ID is required")
    private Integer complainantId;
    private String complainantName; // thêm tên complainant

    // Defendant (CUSTOMER or PARTNER)
    @NotNull(message = "Defendant type is required (CUSTOMER or PARTNER)")
    private String defendantType;

    @NotNull(message = "Defendant ID is required")
    private Integer defendantId;
    private String defendantName; // thêm tên defendant

    private String responseToComplainant;

//    @NotBlank(message = "Status is required (e.g. PENDING, RESOLVED, REJECTED)")
    private String status;

    @NotBlank(message = "Request is required")
    private String request;

    private MultipartFile pdfFile;
    private boolean within24H;
    private Date createdAt;


    public ReportDto(Report report) {
        this.name = report.getName();
        this.description = report.getDescription();
        this.requestRescueId = report.getRequestRescue().getUser().getUserId();

        this.staffid = report.getStaff().getStaffId();
        this.staffName = report.getStaff().getUser().getFullName(); // hoặc getFullName()

        if (report.getResolver() != null) {
            this.resolverId = report.getResolver().getStaffId();
            this.resolverName = report.getResolver().getUser().getFullName(); // hoặc getFullName()
        }

        if (report.getComplainantCustomer() != null) {
            this.complainantType = "CUSTOMER";
            this.complainantId = report.getComplainantCustomer().getUserId();
            this.complainantName = report.getComplainantCustomer().getFullName(); // hoặc getName()
        } else if (report.getComplainantPartner() != null) {
            this.complainantType = "PARTNER";
            this.complainantId = report.getComplainantPartner().getPartnerId();
            this.complainantName = report.getComplainantPartner().getUser().getFullName();
        }

        if (report.getDefendantCustomer() != null) {
            this.defendantType = "CUSTOMER";
            this.defendantId = report.getDefendantCustomer().getUserId();
            this.defendantName = report.getDefendantCustomer().getFullName(); // hoặc getName()
        } else if (report.getDefendantPartner() != null) {
            this.defendantType = "PARTNER";
            this.defendantId = report.getDefendantPartner().getPartnerId();
            this.defendantName = report.getDefendantPartner().getUser().getFullName();
        }

        this.responseToComplainant = report.getResponseToComplainant();
        this.status = report.getStatus();
        this.request = report.getRequest();
        this.within24H = report.isWithin24H();
        this.createdAt = report.getCreatedAt();
    }
}
