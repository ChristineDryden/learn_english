package com.englishapp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.englishapp.entity.Course;
import java.util.List;

public interface CourseService extends IService<Course> {

    List<Course> listFeaturedCourses();
}
