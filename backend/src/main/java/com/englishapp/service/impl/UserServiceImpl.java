package com.englishapp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.englishapp.common.config.JwtTokenProvider;
import com.englishapp.dto.AuthResponse;
import com.englishapp.dto.LoginRequest;
import com.englishapp.dto.RegisterRequest;
import com.englishapp.dto.UserProfileDTO;
import com.englishapp.entity.User;
import com.englishapp.mapper.UserMapper;
import com.englishapp.service.UserService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtTokenProvider jwtTokenProvider;

    public UserServiceImpl(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        boolean exists = lambdaQuery().eq(User::getEmail, request.getEmail()).exists();
        if (exists) {
            throw new IllegalArgumentException("This email is already registered");
        }

        User user = new User();
        user.setNickname(request.getNickname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        boolean saved;
        try {
            saved = save(user);
        } catch (DuplicateKeyException ex) {
            throw new IllegalArgumentException("This email is already registered");
        }
        if (!saved || user.getId() == null) {
            throw new IllegalStateException("User registration failed");
        }

        return buildAuthResponse(user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = lambdaQuery()
            .eq(User::getEmail, request.getEmail())
            .one();
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Email or password is incorrect");
        }
        return buildAuthResponse(user);
    }

    @Override
    public UserProfileDTO getProfile(Long userId) {
        User user = getById(userId);
        if (user == null) {
            throw new IllegalArgumentException("User does not exist");
        }
        return new UserProfileDTO(user.getId(), user.getNickname(), user.getEmail());
    }

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, new UserProfileDTO(user.getId(), user.getNickname(), user.getEmail()));
    }
}
