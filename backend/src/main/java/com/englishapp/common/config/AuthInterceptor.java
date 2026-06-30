package com.englishapp.common.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthInterceptor(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                             @NonNull Object handler) throws Exception {

        // 不是所有请求都会对应到Controller方法, 比如静态资源、默认处理器之类，也可能经过拦截器
        // 如果当前 handler 不是 HandlerMethod，就直接放行

        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        // 判断方法上有没有 @LoginRequired
        // Controller 类上有没有 @LoginRequired
        boolean needLogin = handlerMethod.hasMethodAnnotation(LoginRequired.class)
            || handlerMethod.getBeanType().isAnnotationPresent(LoginRequired.class);
        if (!needLogin) {
            return true;
        }

        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":401,\"message\":\"Unauthorized\",\"data\":null}");
            return false;
        }

        try {
            // 进行解析JWT,
            // 这里会去做 JWT 校验，主要包括：
            // token 签名对不对
            // token 有没有过期
            // token 内容能不能正常解析
            Long userId = jwtTokenProvider.parseUserId(authorization.substring(7));
            UserContext.setUserId(userId);
            return true;
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":401,\"message\":\"Invalid token\",\"data\":null}");
            return false;
        }
    }

    @Override
    public void afterCompletion(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                @NonNull Object handler, Exception ex) {
        UserContext.clear();
    }
}
