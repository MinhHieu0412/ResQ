package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.entity.*;
import com.livewithoutthinking.resq.mapper.UserMapper;
import com.livewithoutthinking.resq.repository.BillRepository;
import com.livewithoutthinking.resq.repository.RequestRescueRepository;
import com.livewithoutthinking.resq.repository.UserRankRepository;
import com.livewithoutthinking.resq.repository.UserRepository;
import com.livewithoutthinking.resq.service.CustomerService;
import com.livewithoutthinking.resq.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private UserRepository customerRepository;
    @Autowired
    private RequestRescueRepository reqResQRepo;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRankService userRankService;

    public UserDto getCustomer(int customerId){
        User user = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(user != null){
            UserDto userDto = UserMapper.toDTO(user);
            return userDto;
        }
        return null;
    }

    public UserDto updateCustomer(UserDto dto){
        User user = customerRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(dto.getUsername() != null || dto.getUsername().isEmpty()){
            user.setUsername(dto.getUsername());
        }
        if(dto.getEmail() != null && !dto.getEmail().isEmpty()){
            user.setEmail(dto.getEmail());
        }
        if (dto.getDob() != null) {
            user.setDob(dto.getDob());
        }
        if (dto.getGender() != null && !dto.getGender().trim().isEmpty()) {
            user.setGender(dto.getGender());
        }
        customerRepository.save(user);
        return UserMapper.toDTO(user);
    }

    public void updateCustomerPoint(int rrId){
        RequestRescue requestRescue = reqResQRepo.findById(rrId)
                .orElseThrow(() -> new RuntimeException("RequestRescue not found"));
        Bill bill = billRepository.findBillsByReqResQ(requestRescue.getRrid());
        User user = userRepository.findUserById(requestRescue.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        int newPoint = (int) (bill.getTotal() / 1000);
        user.setLoyaltyPoint(newPoint+user.getLoyaltyPoint());

        userRepository.save(user);
        userRankService.updateUserRank(user.getUserId());
    }

}
