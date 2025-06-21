package com.livewithoutthinking.resq.service.serviceImpl;

import com.livewithoutthinking.resq.dto.LoginResponse;
import com.livewithoutthinking.resq.entity.User;
import com.livewithoutthinking.resq.repository.LoginRepository;
import com.livewithoutthinking.resq.dto.LoginDto;
import com.livewithoutthinking.resq.service.LoginService;
import com.livewithoutthinking.resq.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Optional<User> findByUsername(String username) {
        return loginRepository.findByUsername(username);
    }

    public LoginResponse login(LoginDto loginUser) {
        User u = loginRepository.findByUsername(loginUser.getLoginName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(loginUser.getPassword(), u.getPassword())) {
            String token = jwtUtil.generateToken(u.getUsername(), u.getRole().getRoleName());
            return new LoginResponse(token, u.getUserId(), u.getUsername(), u.getRole().getRoleName());
        } else {
            throw new RuntimeException("Wrong password");
        }
    }

}
