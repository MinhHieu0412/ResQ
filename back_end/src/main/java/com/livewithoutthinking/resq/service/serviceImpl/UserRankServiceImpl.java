package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.VehicleDto;
import com.livewithoutthinking.resq.entity.Bill;
import com.livewithoutthinking.resq.entity.RequestRescue;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.entity.UserRank;
import com.livewithoutthinking.resq.repository.BillRepository;
import com.livewithoutthinking.resq.repository.RequestRescueRepository;
import com.livewithoutthinking.resq.repository.UserRankRepository;
import com.livewithoutthinking.resq.repository.UserRepository;
import com.livewithoutthinking.resq.statics.Rank;
import com.livewithoutthinking.resq.statics.RankData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserRankServiceImpl implements UserRankService {
    @Autowired
    private UserRankRepository userRankRepo;
    @Autowired
    private UserRepository userRepo;

    //Create New User Rank
    public UserRank createUserRank(int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserRank userRank = new UserRank();
        Rank rank = RankData.getByName("Earth")
                .orElseThrow(() -> new RuntimeException("Rank not found"));

        userRank.setUser(user);
        userRank.setRankName(rank.getName());
        userRank.setChangeLimitLeft(rank.getChangeLimit());
        userRankRepo.save(userRank);
        return userRank;
    }

    //Update User Rank
    public void updateUserRank(int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserRank userRank = userRankRepo.findByUser(user);
        Rank newRank = RankData.getAllRanks().stream()
                .filter(r -> user.getLoyaltyPoint() >= r.getMinPoint())
                .max((r1, r2) -> Integer.compare(r1.getMinPoint(), r2.getMinPoint()))
                .orElseThrow(() -> new RuntimeException("No suitable rank found"));

        // Nếu rank hiện tại khác với rank mới → cập nhật
        if (!userRank.getRankName().equals(newRank.getName())) {
            userRank.setRankName(newRank.getName());
            userRank.setChangeLimitLeft(newRank.getChangeLimit());
            userRankRepo.save(userRank);
        }
    }
}
