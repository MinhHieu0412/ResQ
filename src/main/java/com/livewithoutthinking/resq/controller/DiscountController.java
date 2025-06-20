package com.livewithoutthinking.resq.controller;


import com.livewithoutthinking.resq.dto.DiscountDto;
import com.livewithoutthinking.resq.entity.Discount;
import com.livewithoutthinking.resq.helpers.ApiResponse;
import com.livewithoutthinking.resq.mapper.DiscountMapper;
import com.livewithoutthinking.resq.service.DiscountService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/discount")
public class DiscountController {

    private DiscountService discountService;
    private DiscountMapper discountMapper;

    public DiscountController(DiscountMapper discountMapper, DiscountService discountService) {
        this.discountMapper = discountMapper;
        this.discountService = discountService;
    }

    //Get all discounts
    @GetMapping
    public ResponseEntity<ApiResponse<List<Discount>>> getAllDiscounts() {
        try{
            List<Discount> discounts = discountService.getDiscounts();
            return ResponseEntity.ok(ApiResponse.success(discounts, "Get all discount successfully"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error when get all discounts: " + e.getMessage()));
        }
    }

    //Get discount by id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Discount>> getDiscountById(@PathVariable Integer id) {
        try{
            Optional<Discount> discount = Optional.ofNullable(discountService.findDiscountById(id));
            if (discount.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success(discount.get(), "Get discount successfully"));
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.errorServer("Discount not found: " + id));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error when get discount: " + e.getMessage()));
        }
    }

    // Save or update discount
    @PostMapping
    public ResponseEntity<ApiResponse<Discount>> saveDiscount(@Valid @RequestBody DiscountDto discountDto) {
        try{
            Discount discount = discountMapper.toEntity(discountDto);
            Discount saveDiscount = discountService.saveDiscount(discount);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(saveDiscount, "Discount successfully"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error when save discount: " + e.getMessage()));
        }
    }

    //Search Discounts
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Discount>>> searchDiscounts(@RequestParam String name) {
        try{
            List<Discount> discounts = discountService.searchDiscounts(name);
            return ResponseEntity.ok(ApiResponse.success(discounts, "Search discount successfully"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(ApiResponse.errorServer("Error when search discounts: " + e.getMessage()));
        }
    }
}
