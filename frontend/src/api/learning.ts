import request from "./request";
import type { ApiResponse, Course, Dashboard, Word } from "../types";

export const getDashboard = (): Promise<ApiResponse<Dashboard>> =>
  request.get("/dashboard") as Promise<ApiResponse<Dashboard>>;

export const getCourses = (): Promise<ApiResponse<Course[]>> =>
  request.get("/courses") as Promise<ApiResponse<Course[]>>;

export const getTodayWords = (): Promise<ApiResponse<Word[]>> =>
  request.get("/words/today") as Promise<ApiResponse<Word[]>>;
