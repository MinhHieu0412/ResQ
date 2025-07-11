package com.livewithoutthinking.resq.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.livewithoutthinking.resq.dto.UserDto;
import com.livewithoutthinking.resq.dto.VehicleDto;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.service.CustomerService;
import com.livewithoutthinking.resq.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
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

    @PostMapping("/vehicles/createNew")
    public ResponseEntity<?> createNewVehicle(
            @RequestPart("vehicleDtoString") String vehicleDtoString,
            @RequestPart(value = "frontImage", required = false) MultipartFile frontImage,
            @RequestPart(value = "backImage", required = false) MultipartFile backImage) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            VehicleDto vehicleDto = mapper.readValue(vehicleDtoString, VehicleDto.class);

            Map<String, String> errors = validateVehicle(vehicleDto);
            if (frontImage == null || frontImage.isEmpty()) {
                errors.put("frontImage", "Front image is required");
            }
            if (backImage == null || backImage.isEmpty()) {
                errors.put("backImage", "Back image is required");
            }
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            return ResponseEntity.ok(vehicleService.addCustomerVehicle(vehicleDto, frontImage, backImage));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest().body("Error parsing vehicleDtoString: " + e.getMessage());
        }
    }

    @PutMapping("/vehicles/{vehicleId}")
    public ResponseEntity<?> getVehicle(@PathVariable("vehicleId") int vehicleId,
                                        @RequestPart("vehicleDtoString") String vehicleDtoString,
                                        @RequestPart(value = "frontImage", required = false) MultipartFile frontImage,
                                        @RequestPart(value = "backImage", required = false) MultipartFile backImage){
        try {
            ObjectMapper mapper = new ObjectMapper();
            VehicleDto vehicleDto = mapper.readValue(vehicleDtoString, VehicleDto.class);
            System.out.println(vehicleDto);
            Map<String, String> errors = validateVehicle(vehicleDto);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest(errors));
            }
            System.out.println(vehicleDto);
            return ResponseEntity.ok(vehicleService.updateCustomerVehicle(vehicleDto, frontImage, backImage));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest().body("Error parsing vehicleDtoString: " + e.getMessage());
        }
    }

    @GetMapping("/vehicles/image")
    public ResponseEntity<Resource> getImage(@RequestParam String path) throws IOException {
        Path imagePath = Paths.get(path);
        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(imagePath.toUri());
        String contentType = Files.probeContentType(imagePath);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    //Support
    private <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok(body);
    }

    //Validate
    private Map<String, String> validateVehicle(VehicleDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();
        String plateNoPattern = "^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$";
        if(dto.getPlateNo() == null || dto.getPlateNo().isEmpty()){
            errors.put("plateNo", "Plate no is required");
        }else if (!dto.getPlateNo().matches(plateNoPattern)) {
            errors.put("plateNo", "Invalid plate no format");
        }
        if(dto.getBrand() == null || dto.getBrand().isEmpty()){
            errors.put("brand", "Brand is required");
        }
        if(dto.getModel() == null || dto.getModel().isEmpty()){
            errors.put("model", "Model is required");
        }
        int currentYear = LocalDate.now().getYear();
        if(dto.getYear() < 1900 || dto.getYear() > currentYear){
            errors.put("year", "Year must be between 1900 and "+currentYear);
        }
        return errors;
    }

}
