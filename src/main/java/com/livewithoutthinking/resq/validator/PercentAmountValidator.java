package com.livewithoutthinking.resq.validator;

import com.livewithoutthinking.resq.dto.DiscountDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.math.BigDecimal;

public class PercentAmountValidator implements ConstraintValidator<PercentAmountConstrait, DiscountDto> {
    @Override
    public boolean isValid(DiscountDto dto, ConstraintValidatorContext constraintValidatorContext) {
        if("Percent".equalsIgnoreCase(dto.getType()) && dto.getAmount() !=null){
            return dto.getAmount().compareTo(BigDecimal.valueOf(100)) <=0;
        }
        return true;
    }
}
