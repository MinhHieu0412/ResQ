package com.livewithoutthinking.resq.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.service.CustomerService;
import com.livewithoutthinking.resq.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/resq/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private VehicleService vehicleService;

    // Profile
    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCustomer(@PathVariable("customerId") int customerId){
        try{
            return ok(customerService.getCustomer(customerId));
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateCustomer/{customerId}")
    public ResponseEntity<?> updateCustomer(@PathVariable("customerId") int customerId,
                                            @RequestBody String userDtoString){
        try{
            ObjectMapper mapper = new ObjectMapper();
            UserDto dto = mapper.readValue(userDtoString, UserDto.class);
            if(dto.getUserId() == 0 ){
                dto.setUserId(customerId);
            }
            Map<String, String> errors = validateUpdateCustomer(dto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            return ok(customerService.updateCustomer(dto));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error updating staff: " + e.getMessage());
        }
    }

    // Vehicle
    @GetMapping("/vehicles/{customerId}")
    public ResponseEntity<?> getVehicles(@PathVariable("customerId") int customerId){
        try{
            return ok(vehicleService.getByUserId(customerId));
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    //Support
    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok(body);
    }

    //Validate
    private Map<String, String> validateUpdateCustomer(UserDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();

        // DOB
        if (dto.getDob() == null) {
            errors.put("dob", "Date of birth is required");
        }
        //Gender
        if(dto.getGender() == null || dto.getGender().trim().isEmpty()) {
            errors.put("gender", "Gender is required");
        }
        return errors;
    }

}
