package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findById(int id);
    List<User> findByRole(int roleId);
    List<User> findByFullName(String fullName);
}
