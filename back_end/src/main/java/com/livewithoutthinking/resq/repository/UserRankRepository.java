package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.entity.UserRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRankRepository extends JpaRepository<UserRank, Integer> {
    UserRank findByUser(User user);
}
