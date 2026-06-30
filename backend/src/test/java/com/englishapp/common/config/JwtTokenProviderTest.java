package com.englishapp.common.config;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class JwtTokenProviderTest {

    @Test
    void shouldGenerateTokenAndParseUserId() {
        AuthProperties authProperties = new AuthProperties();
        authProperties.setJwtSecret("english-app-jwt-secret-key-2026-change-this-value");
        authProperties.setExpirationHours(72);

        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider(authProperties);

        String token = jwtTokenProvider.generateToken(1001L, "test@example.com");
        System.out.println(token);
        Long userId = jwtTokenProvider.parseUserId(token);
        System.out.println(userId);

        Assertions.assertNotNull(token);
        Assertions.assertEquals(1001L, userId);
    }

    @Test
    void shouldThrowExceptionWhenTokenIsInvalid() {
        AuthProperties authProperties = new AuthProperties();
        authProperties.setJwtSecret("english-app-jwt-secret-key-2026-change-this-value");
        authProperties.setExpirationHours(72);

        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider(authProperties);

        Assertions.assertThrows(JwtException.class, () -> jwtTokenProvider.parseUserId("invalid-token"));
    }
}
