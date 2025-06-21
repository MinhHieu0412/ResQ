package com.livewithoutthinking.resq.service;

import com.livewithoutthinking.resq.entity.Role;

import java.util.List;

public interface RoleService {
    Role findByName(String name);
}
