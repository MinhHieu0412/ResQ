package com.livewithoutthinking.resq.controller;

import com.livewithoutthinking.resq.dto.LoginDto;
import com.livewithoutthinking.resq.dto.LoginResponse;
import com.livewithoutthinking.resq.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resq")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDto loginUser) {
        LoginResponse reponse = loginService.login(loginUser);
        return ResponseEntity.ok(reponse);
    }

}
