package com.englishapp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.englishapp.dto.DashboardDTO;
import com.englishapp.entity.StudyRecord;

public interface StudyRecordService extends IService<StudyRecord> {

    DashboardDTO buildDashboard(Long userId);
}
