package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.entity.Report;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.repository.UserRepository;
import com.livewithoutthinking.resq.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;

    public User findById(int id) {
        return userRepo.findById(id).orElse(null);
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public List<User> findByRole(int roleId) {
        return userRepo.findByRole(roleId);
    }

    public List<User> findByFullName(String fullName) {
        return userRepo.findByFullName("%"+fullName+"%");
    }

    public List<Report> findByUsernameContainingIgnoreCase(String username) {
        List<User> users = userRepo.findByUsernameContainingIgnoreCase(username);
        List<Report> allReports = new ArrayList<>();

        for (User user : users) {
            if (user.getReports() != null) {
                allReports.addAll(user.getReports());
            }
        }

        return allReports;
    }

}
