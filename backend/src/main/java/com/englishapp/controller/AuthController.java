package com.englishapp.controller;

import com.englishapp.common.config.ApiResponse;
import com.englishapp.common.config.LoginRequired;
import com.englishapp.common.config.UserContext;
import com.englishapp.dto.AuthResponse;
import com.englishapp.dto.LoginRequest;
import com.englishapp.dto.RegisterRequest;
import com.englishapp.dto.UserProfileDTO;
import com.englishapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.success(userService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success(userService.login(request));
    }

    @GetMapping("/me")
    @LoginRequired
    public ApiResponse<UserProfileDTO> me() {
        return ApiResponse.success(userService.getProfile(UserContext.getUserId()));
    }
}
