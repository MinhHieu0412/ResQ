package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.dto.UserDashboard;
import com.livewithoutthinking.resq.entity.Bill;
import com.livewithoutthinking.resq.entity.RequestRescue;
import com.livewithoutthinking.resq.entity.Role;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.mapper.UserMapper;
import com.livewithoutthinking.resq.repository.*;
import com.livewithoutthinking.resq.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private UserRepository customerRepo;
    @Autowired
    private BillRepository billRepo;
    @Autowired
    private RequestResQRepository requestResQRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private PasswordEncoder encoder;

    public List<UserDto> findAllCustomers() {
        List<User> result = customerRepo.findAllCustomers();
        List<UserDto> dtos = new ArrayList<>();
        for (User user : result) {
            UserDto dto = UserMapper.toDTO(user);
            List<RequestRescue> requestRescues = requestResQRepo.searchByUser(user.getUserId());
            dto.setTotalRescues(requestRescues.size());
            dtos.add(dto);
        }
        return dtos;
    }

    public Optional<User> findCustomerById(int userId) {
        return customerRepo.findById(userId);
    }

    public List<UserDto> searchCustomers(String keyword){
        List<User> result = customerRepo.searchCustomers("%"+keyword+"%");
        List<UserDto> userDtos = new ArrayList<>();
        for(User user : result){
            UserDto dto = UserMapper.toDTO(user);
            List<RequestRescue> requestRescues = requestResQRepo.searchByUser(user.getUserId());
            dto.setTotalRescues(requestRescues.size());
            userDtos.add(dto);
        }
        return userDtos;
    }

    public UserDashboard customerDashboard(int userId){
        List<RequestRescue> userRR = requestResQRepo.searchByUser(userId);
        List<Bill> userBill = billRepo.findBillsByUser(userId);
        UserDashboard userDash = new UserDashboard();
        int totalSuccess = 0;
        int totalCancel = 0;
        for(RequestRescue rr : userRR){
            if(rr.getStatus().equalsIgnoreCase("completed")){
                totalSuccess++;
            }else if(rr.getStatus().equalsIgnoreCase("canceled")){
                totalCancel++;
            }
        }
        double paid = 0.0;
        for(Bill b : userBill){
            paid = paid + b.getTotalPrice();
        }

        userDash.setTotalSuccess(totalSuccess);
        userDash.setTotalCancel(totalCancel);
        if(!userRR.isEmpty()){
            userDash.setPercentSuccess((double) totalSuccess /userRR.size()*100);
        }
        userDash.setTotalAmount(paid);
        return userDash;
    }

    public User createNew(UserDto dto, MultipartFile avatar){
        User newCus = new User();
        Role role = roleRepo.findByName("CUSTOMER");
        newCus = UserMapper.toEntity(dto, encoder);
        newCus.setStatus("Waiting");
        newCus.setRole(role);
        newCus.setCreatedAt(new Date());
        return customerRepo.save(newCus);
    }
}
