package com.englishapp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.englishapp.dto.DashboardDTO;
import com.englishapp.entity.StudyRecord;
import com.englishapp.mapper.StudyRecordMapper;
import com.englishapp.service.StudyRecordService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StudyRecordServiceImpl extends ServiceImpl<StudyRecordMapper, StudyRecord> implements StudyRecordService {

    @Override
    public DashboardDTO buildDashboard(Long userId) {
        LocalDate today = LocalDate.now();
        int todayMinutes = lambdaQuery()
            .eq(StudyRecord::getUserId, userId)
            .eq(StudyRecord::getStudyDate, today)
            .list()
            .stream()
            .mapToInt(StudyRecord::getMinutesSpent)
            .sum();

        int weeklyLessons = lambdaQuery()
            .eq(StudyRecord::getUserId, userId)
            .ge(StudyRecord::getStudyDate, today.minusDays(6))
            .list()
            .stream()
            .mapToInt(StudyRecord::getLessonsCompleted)
            .sum();

        int totalWords = lambdaQuery()
            .eq(StudyRecord::getUserId, userId)
            .list()
            .stream()
            .mapToInt(StudyRecord::getWordsLearned)
            .sum();

        List<String> tips = List.of(
            "Keep a 20-minute daily speaking rhythm.",
            "Review difficult words before sleep.",
            "Practice one listening shadowing task every day."
        );

        return new DashboardDTO(todayMinutes, totalWords, weeklyLessons, tips);
    }
}
