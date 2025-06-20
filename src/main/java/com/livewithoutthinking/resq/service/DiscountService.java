package com.livewithoutthinking.resq.service;


import com.livewithoutthinking.resq.entity.Discount;
import com.livewithoutthinking.resq.repository.DiscountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscountService {

    private DiscountRepository discountRepository;

    public DiscountService(DiscountRepository discountRepository) {
        this.discountRepository = discountRepository;
    }

    public List<Discount> getDiscounts() {
        return discountRepository.findAll();
    }

    public Discount saveDiscount(Discount discount) {
        return discountRepository.save(discount);
    }
    public Discount findDiscountById(Integer id) {
        return discountRepository.findById(id).get();
    }

    public List<Discount> searchDiscounts(String name) {
        return discountRepository.searchDiscounts(name);
    }
}
