package com.livewithoutthinking.resq.service;


import com.livewithoutthinking.resq.entity.Report;
import com.livewithoutthinking.resq.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Report addNewReport(Report report) {
    return reportRepository.save(report);
    }

    public List<Report> showAllReport() {
        return reportRepository.findAll();
    }

    public Report getReportById(int id) {
        return reportRepository.findById(id).get();
    }

    public List<Report> findByStatusIgnoreCase(String status) {
    return reportRepository.findByStatusIgnoreCase(status);
}
    public List<Report>  findByRequestRescue(int rrId) {
        return reportRepository.findByRequestRescue(rrId);
    }
}
