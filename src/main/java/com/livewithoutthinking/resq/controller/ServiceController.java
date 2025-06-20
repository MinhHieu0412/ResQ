package com.livewithoutthinking.resq.controller;


import com.livewithoutthinking.resq.dto.UpdatePriceRequest;
import com.livewithoutthinking.resq.entity.Services;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.service.ServicesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/service")
public class ServiceController {
    private ServicesService servicesService;

    public ServiceController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<Services>>> showAllServices() {
        try{
            List<Services> services = servicesService.findAll();
            return ResponseEntity.ok(ApiResponse.success(services,"Get All Services Successfully!"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error getting services!"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Services>> getService(@PathVariable Integer id) {
        try{
            Optional<Services> service = Optional.ofNullable(servicesService.findById(id));
            if (service.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success(service.get(), "Get Service Successfully!"));
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.errorServer("Service not found: " + id));
            }
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error getting service!"));
        }
    }


    @PutMapping("/{id}/update-price")
    public ResponseEntity<ApiResponse<Services>> updatePrices(
            @PathVariable int id,
            @RequestBody UpdatePriceRequest request
    ) {
        try {
            Services updated = servicesService.updatePrices(id, request.getFixedPrice(), request.getPricePerKm());
            if (updated != null) {
                return ResponseEntity.ok(ApiResponse.success(updated, "Updated service prices successfully!"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.errorServer("Service not found with ID: " + id));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error updating service prices!"));
        }
    }


    @GetMapping("/search/{name}")
    public ResponseEntity<ApiResponse<List<Services>>> searchByName(@PathVariable String name) {
        try {
            List<Services> results = servicesService.searchByName(name);
            return ResponseEntity.ok(ApiResponse.success(results, "Search results for name: " + name));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error searching service!"));
        }
    }


    @GetMapping("/filter/{type}")
    public ResponseEntity<ApiResponse<List<Services>>> filterByType(@PathVariable String type) {
        try {
            List<Services> results = servicesService.filterByType(type);
            return ResponseEntity.ok(ApiResponse.success(results, "Filter results for type: " + type));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error filtering service!"));
        }
    }

}
