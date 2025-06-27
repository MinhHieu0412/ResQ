package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.PersonalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDataRepository extends JpaRepository<PersonalData, Integer> {
}
