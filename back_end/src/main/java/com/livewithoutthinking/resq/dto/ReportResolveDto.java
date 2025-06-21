package com.livewithoutthinking.resq.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportResolveDto {
    private String responseToComplainant;
    private String status;
    private Integer resolverId;
}
