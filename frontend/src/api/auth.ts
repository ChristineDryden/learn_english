import request from "./request";
import type { ApiResponse, AuthResponse, LoginPayload, UserProfile, RegisterPayload } from "../types";

export const login = (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> =>
  request.post("/auth/login", payload) as Promise<ApiResponse<AuthResponse>>;

export const register = (payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> =>
  request.post("/auth/register", payload) as Promise<ApiResponse<AuthResponse>>;

export const getCurrentUser = (): Promise<ApiResponse<UserProfile>> =>
  request.get("/auth/me") as Promise<ApiResponse<UserProfile>>;
