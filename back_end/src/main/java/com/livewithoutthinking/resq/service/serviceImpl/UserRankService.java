package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.UserRank;

public interface UserRankService {
    UserRank createUserRank(int userId);
    void updateUserRank(int userId);
}
