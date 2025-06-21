package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.RecordStatusDto;
import com.livewithoutthinking.resq.dto.RequestResQDto;
import com.livewithoutthinking.resq.entity.*;
import com.livewithoutthinking.resq.mapper.RequestResQMapper;
import com.livewithoutthinking.resq.repository.*;
import com.livewithoutthinking.resq.service.RequestResQService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequestResQServiceImpl implements RequestResQService {
    @Autowired
    private RequestResQRepository reqResQRepo;
    @Autowired
    private BillRepository billRepo;
    @Autowired
    private ReportRepository reportRepo;
    @Autowired
    private FeedbackRepository feedbackRepo;

    public List<RequestResQDto> findAll(){
        List<RequestRescue> listAll = reqResQRepo.findAll();
        List<RequestResQDto> rrDtos = new ArrayList<>();
        for (RequestRescue rr : listAll) {
            RequestResQDto dto = RequestResQMapper.toDTO(rr);
            Bill rrBill = billRepo.findBillsByReqResQ(rr.getRrid());
            if(rrBill != null){
                dto.setTotalPrice(rrBill.getTotalPrice());
                dto.setAppFee(rrBill.getAppFee());
                dto.setCurrency(rrBill.getCurrency());
                dto.setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    dto.setPaymentMethod(rrBill.getPayment().getMethod());
                }else{
                    dto.setPaymentMethod("N/A");
                }
            }else{
                dto.setTotalPrice(0);
                dto.setAppFee(0);
                dto.setPaymentStatus("N/A");
            }
            rrDtos.add(dto);
        }
        return rrDtos;
    }

    public Optional<RequestResQDto> findById(int rrId){
        Optional<RequestRescue> rrById = reqResQRepo.findById(rrId);
        Optional<RequestResQDto> rrDto = Optional.empty();
        if (rrById.isPresent()) {
            rrDto = Optional.of(RequestResQMapper.toDTO(rrById.get()));
            Bill rrBill = billRepo.findBillsByReqResQ(rrById.get().getRrid());
            if(rrBill != null){
                rrDto.get().setTotalPrice(rrBill.getTotalPrice());
                rrDto.get().setCurrency(rrBill.getCurrency());
                rrDto.get().setAppFee(rrBill.getAppFee());
                rrDto.get().setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    rrDto.get().setPaymentMethod(rrBill.getPayment().getMethod());
                }else{
                    rrDto.get().setPaymentMethod("N/A");
                }
            }else{
                rrDto.get().setTotalPrice(0);
                rrDto.get().setAppFee(0);
                rrDto.get().setPaymentStatus("N/A");
            }
        }
        return rrDto;
    }

    public List<RequestResQDto> searchByUser(int userId){
        List<RequestRescue> listResult = reqResQRepo.searchByUser(userId);
        List<RequestResQDto> rrDtos = new ArrayList<>();
        for (RequestRescue rr : listResult) {
            Bill rrBill = billRepo.findBillsByReqResQ(rr.getRrid());
            RequestResQDto dto = RequestResQMapper.toDTO(rr);
            if(rrBill != null){
                dto.setTotalPrice(rrBill.getTotalPrice());
                dto.setCurrency(rrBill.getCurrency());
                dto.setAppFee(rrBill.getAppFee());
                dto.setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    dto.setPaymentMethod(rrBill.getPayment().getMethod());
                }else{
                    dto.setPaymentMethod("N/A");
                }
            }else{
                dto.setTotalPrice(0);
                dto.setAppFee(0);
                dto.setPaymentStatus("N/A");
            }
            rrDtos.add(dto);
        }
        return rrDtos;
    }

    public List<RequestResQDto> searchByPartner(int partnerId){
        List<RequestRescue> listResult = reqResQRepo.searchByPartner(partnerId);
        List<RequestResQDto> rrDtos = new ArrayList<>();
        for (RequestRescue rr : listResult) {
            Bill rrBill = billRepo.findBillsByReqResQ(rr.getRrid());
            RequestResQDto dto = RequestResQMapper.toDTO(rr);
            if(rrBill != null){
                dto.setTotalPrice(rrBill.getTotalPrice());
                dto.setCurrency(rrBill.getCurrency());
                dto.setAppFee(rrBill.getAppFee());
                dto.setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    dto.setPaymentMethod(rrBill.getPayment().getMethod());
                }else{
                    dto.setPaymentMethod("N/A");
                }
            }else{
                dto.setTotalPrice(0);
                dto.setAppFee(0);
                dto.setPaymentStatus("N/A");
            }
            rrDtos.add(dto);
        }
        return rrDtos;
    }

    public List<RequestResQDto> searchRR(String keyword){
        List<RequestRescue> listResult = reqResQRepo.searchRR("%"+keyword+"%");
        List<RequestResQDto> rrDtos = new ArrayList<>();

        for (RequestRescue rr : listResult) {
            RequestResQDto dto = RequestResQMapper.toDTO(rr);
            Bill rrBill = billRepo.findBillsByReqResQ(rr.getRrid());
            if(rrBill != null){
                dto.setTotalPrice(rrBill.getTotalPrice());
                dto.setAppFee(rrBill.getAppFee());
                dto.setCurrency(rrBill.getCurrency());
                dto.setPaymentStatus(rrBill.getStatus());
            }
            rrDtos.add(dto);
        }
        return rrDtos;
    }

    public List<RequestResQDto> searchRRWithUser(int userId, String keyword){
        List<RequestRescue> listResult = reqResQRepo.searchRRWithUser(userId, "%"+keyword+"%");
        List<RequestResQDto> rrDtos = new ArrayList<>();
        for (RequestRescue rr : listResult) {
            RequestResQDto dto = RequestResQMapper.toDTO(rr);
            Bill rrBill = billRepo.findBillsByReqResQ(rr.getRrid());
            if(rrBill != null){
                dto.setTotalPrice(rrBill.getTotalPrice());
                dto.setAppFee(rrBill.getAppFee());
                dto.setCurrency(rrBill.getCurrency());
                dto.setPaymentStatus(rrBill.getStatus());
            }
            rrDtos.add(dto);
        }
        return rrDtos;
    }

    public List<RequestResQDto> searchRRWithPartner(int partnerId, String keyword){
        List<RequestRescue> listResult = reqResQRepo.searchRRWithPartner(partnerId, "%"+keyword+"%");
        List<RequestResQDto> rrDtos = new ArrayList<>();
        for (RequestRescue rr : listResult) {
            RequestResQDto dto = RequestResQMapper.toDTO(rr);
            Bill rrBill = billRepo.findBillsByReqResQ(rr.getRrid());
            if(rrBill != null){
                dto.setTotalPrice(rrBill.getTotalPrice());
                dto.setAppFee(rrBill.getAppFee());
                dto.setCurrency(rrBill.getCurrency());
                dto.setPaymentStatus(rrBill.getStatus());
            }
            rrDtos.add(dto);
        }
        return rrDtos;
    }

    public RecordStatusDto existedRecords(int requestId){
        RecordStatusDto status = new RecordStatusDto();
        List<Feedback> feedbackList = feedbackRepo.searchByRR(requestId);
        boolean hasFeedback = false;
        if(!feedbackList.isEmpty()){
            status.setHasFeedbacks(true);
        }
        List<Report> reportList = reportRepo.findByRequestRescue(requestId);
        boolean hasReport = false;
        if(!reportList.isEmpty()){
            for(Report r : reportList){
                if(r.getComplainantCustomer() != null){
                    status.setHasCustomerReport(true);
                }
                if(r.getComplainantPartner() != null){
                    status.setHasPartnerReport(true);
                }
            }
        }
        return status;
    }

    public RequestRescue createNew(RequestResQDto requestDto){
        RequestRescue newRescue = new RequestRescue();
        newRescue = RequestResQMapper.toEntity(requestDto);

        Bill newBill = new Bill();
        newBill.setTotalPrice(requestDto.getTotalPrice());
        return newRescue;
    }

    public RequestRescue updateRequest(RequestResQDto requestDto){
        RequestRescue newRescue = new RequestRescue();
        return newRescue;

    }
}
