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
import java.util.Date;
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
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PaymentRepository paymentRepo;
    @Autowired
    private NotificationRepository notificationRepo;
    @Autowired
    private NotificationTemplateRepository notifTemplateRepo;

    public List<RequestResQDto> findAll(){
        List<RequestRescue> listAll = reqResQRepo.findAll();
        List<RequestResQDto> rrDtos = new ArrayList<>();
        for (RequestRescue rr : listAll) {
            RequestResQDto dto = RequestResQMapper.toDTO(rr);
            Bill rrBill = billRepo.findBillsByReqResQ(rr.getRrid());
            if(rrBill != null){
                dto.setTotalPrice(rrBill.getTotalPrice());
                dto.setTotal(rrBill.getTotal());
                dto.setAppFee(rrBill.getAppFee());
                dto.setCurrency(rrBill.getCurrency());
                dto.setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    dto.setPaymentMethod(rrBill.getPayment().getName());
                }else{
                    dto.setPaymentMethod("N/A");
                }
            }else{
                dto.setTotalPrice(0);
                dto.setTotal(0);
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
                rrDto.get().setTotal(rrBill.getTotal());
                rrDto.get().setCurrency(rrBill.getCurrency());
                rrDto.get().setAppFee(rrBill.getAppFee());
                rrDto.get().setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    rrDto.get().setPaymentMethod(rrBill.getPayment().getName());
                }else{
                    rrDto.get().setPaymentMethod("N/A");
                }
            }else{
                rrDto.get().setTotalPrice(0);
                rrDto.get().setTotal(0);
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
                dto.setTotal(rrBill.getTotal());
                dto.setCurrency(rrBill.getCurrency());
                dto.setAppFee(rrBill.getAppFee());
                dto.setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    dto.setPaymentMethod(rrBill.getPayment().getName());
                }else{
                    dto.setPaymentMethod("N/A");
                }
            }else{
                dto.setTotalPrice(0);
                dto.setTotal(0);
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
                dto.setTotal(rrBill.getTotal());
                dto.setCurrency(rrBill.getCurrency());
                dto.setAppFee(rrBill.getAppFee());
                dto.setPaymentStatus(rrBill.getStatus());
                if(rrBill.getPayment() != null){
                    dto.setPaymentMethod(rrBill.getPayment().getName());
                }else{
                    dto.setPaymentMethod("N/A");
                }
            }else{
                dto.setTotalPrice(0);
                dto.setTotal(0);
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
                dto.setTotal(rrBill.getTotal());
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
                dto.setTotal(rrBill.getTotal());
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
                dto.setTotal(rrBill.getTotal());
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
        if(!feedbackList.isEmpty()){
            status.setHasFeedbacks(true);
        }
        List<Report> reportList = reportRepo.findByRequestRescue(requestId);
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
        RequestRescue newRescue = RequestResQMapper.toEntity(requestDto);
        User customer = userRepo.findUserById(requestDto.getCustomerId());
        Payment payment = paymentRepo.customerPaymentId(customer.getUserId(), requestDto.getPaymentMethod());
        requestDto.setTotalPrice(requestDto.getTotal());

        newRescue.setUser(customer);
        newRescue.setStatus("PENDING");
        RequestRescue savedRescue = reqResQRepo.save(newRescue);

        Double appFee = (requestDto.getTotal() * 15) / 100;

        Bill newBill = new Bill();
        newBill.setRequestRescue(savedRescue);
        newBill.setCreatedAt(new Date());
        newBill.setPayment(payment);
        newBill.setAppFee(appFee);
        newBill.setTotalPrice(requestDto.getTotalPrice());
        newBill.setTotal(requestDto.getTotal());
        newBill.setStatus("PENDING");
        billRepo.save(newBill);

        NotificationTemplate notiTemplate = notifTemplateRepo.findByNotiType("NOTI");
        Notification noti = new Notification();
        noti.setCreatedAt(new Date());
        noti.setMessage("New Request Rescue has been created at " +
                new java.text.SimpleDateFormat("h:mma").format(new Date()));
        noti.setUser(customer);
        noti.setNotificationTemplate(notiTemplate);
        notificationRepo.save(noti);

        return newRescue;
    }

    public RequestRescue updateRequest(RequestResQDto requestDto){
        RequestRescue request = reqResQRepo.findById(requestDto.getRrid())
                .orElseThrow(() -> new RuntimeException("Request not found"));
        if(requestDto.getULocation() != null){
            request.setULocation(requestDto.getULocation());
        }
        if(requestDto.getDestination() != null){
            request.setDestination(requestDto.getDestination());
        }
        Bill bill = billRepo.findBillsByReqResQ(requestDto.getRrid());
        if(requestDto.getPaymentMethod() != null){
            Payment payment = paymentRepo.customerPaymentId(requestDto.getCustomerId(), requestDto.getPaymentMethod());
            bill.setPayment(payment);
        }
        if(requestDto.getTotal() > 0){
            bill.setTotal(requestDto.getTotal());
        }
        billRepo.save(bill);
        return reqResQRepo.save(request);

    }
}
