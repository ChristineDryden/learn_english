package com.englishapp.controller;

import com.englishapp.common.config.ApiResponse;
import com.englishapp.entity.Course;
import com.englishapp.service.CourseService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ApiResponse<List<Course>> listCourses() {
        return ApiResponse.success(courseService.listFeaturedCourses());
    }
}
