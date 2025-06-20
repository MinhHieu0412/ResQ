package com.livewithoutthinking.resq.controller;
import com.livewithoutthinking.resq.dto.PartnerDto;
import com.livewithoutthinking.resq.entity.Feedback;
import com.livewithoutthinking.resq.mapper.PartnerMapper;
import com.livewithoutthinking.resq.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.livewithoutthinking.resq.entity.Partner;
import com.livewithoutthinking.resq.entity.Role;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.service.PartnerService;
import com.livewithoutthinking.resq.service.RoleService;
import com.livewithoutthinking.resq.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resq/admin")
public class AdminController {
    @Autowired
    private UserService userSrv;
    @Autowired
    private RoleService roleSrv;
    @Autowired
    private PartnerService partSrv;
    @Autowired
    private FeedbackService feedbackSrv;

    //==================FEEDBACK SECTION==================
    @GetMapping("/feedbacks")
    public ResponseEntity<List<Feedback>> getFeedbacks() {
        return ResponseEntity.status(200).body(feedbackSrv.findAll());
    }


    //==================CUSTOMER SECTION==================
    @GetMapping("/customers")
    public ResponseEntity<List<User>> getCustomers() {
        Role role = roleSrv.findByName("Customer");
        return ResponseEntity.status(200).body(userSrv.findByRole(role.getRoleId()));
    }

    @GetMapping("/customers/search/{fullName}")
    public ResponseEntity<List<User>> getCustomersByName(@PathVariable("fullName") String fullName) {
        return ResponseEntity.status(200).body(userSrv.findByFullName(fullName));
    }

    //==================PARTNER SECTION==================
//    @GetMapping("/partners")
//    public ResponseEntity<List<Partner>> getPartners() {
//        return ResponseEntity.status(200).body(partSrv.findAll());
//    }
    @GetMapping("/partners")
    public ResponseEntity<List<PartnerDto>> getPartners() {
        List<PartnerDto> dtoList = partSrv.findAll()
                .stream()
                .map(PartnerMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoList);
    }
    @GetMapping("/partners/search/{uName}")
    public ResponseEntity<List<Partner>> getPartnersByUser(@PathVariable("uName") String uName) {
        List<User> users = userSrv.findByFullName(uName);
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
        }
        System.out.println(users);
        List<Partner> partners = new ArrayList<>();
        for (User user : users) {
            Partner partner = partSrv.findByUser(user.getUserId());
            if (partner != null) {
                partners.add(partner);
            }
        }
        return ResponseEntity.status(200).body(partners);
    }
}
