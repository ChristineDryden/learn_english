package com.englishapp.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.englishapp.entity.Course;
import com.englishapp.mapper.CourseMapper;
import com.englishapp.service.CourseService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course> implements CourseService {

    @Override
    public List<Course> listFeaturedCourses() {
        return list(new LambdaQueryWrapper<Course>()
            .orderByAsc(Course::getLevel)
            .last("limit 6"));
    }
}
