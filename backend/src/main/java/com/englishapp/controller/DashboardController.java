package com.englishapp.controller;

import com.englishapp.common.config.ApiResponse;
import com.englishapp.common.config.LoginRequired;
import com.englishapp.common.config.UserContext;
import com.englishapp.dto.DashboardDTO;
import com.englishapp.service.StudyRecordService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final StudyRecordService studyRecordService;

    public DashboardController(StudyRecordService studyRecordService) {
        this.studyRecordService = studyRecordService;
    }

    @GetMapping
    @LoginRequired
    public ApiResponse<DashboardDTO> dashboard() {
        return ApiResponse.success(studyRecordService.buildDashboard(UserContext.getUserId()));
    }
}
