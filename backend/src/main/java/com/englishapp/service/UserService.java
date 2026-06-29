package com.englishapp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.englishapp.dto.AuthResponse;
import com.englishapp.dto.LoginRequest;
import com.englishapp.dto.RegisterRequest;
import com.englishapp.dto.UserProfileDTO;
import com.englishapp.entity.User;

public interface UserService extends IService<User> {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserProfileDTO getProfile(Long userId);
}
