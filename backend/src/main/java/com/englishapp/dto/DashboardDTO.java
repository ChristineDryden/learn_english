package com.englishapp.dto;

import java.util.List;

public class DashboardDTO {

    private Integer todayMinutes;
    private Integer totalWords;
    private Integer weeklyLessons;
    private List<String> learningTips;

    public DashboardDTO(Integer todayMinutes, Integer totalWords, Integer weeklyLessons, List<String> learningTips) {
        this.todayMinutes = todayMinutes;
        this.totalWords = totalWords;
        this.weeklyLessons = weeklyLessons;
        this.learningTips = learningTips;
    }

    public Integer getTodayMinutes() {
        return todayMinutes;
    }

    public void setTodayMinutes(Integer todayMinutes) {
        this.todayMinutes = todayMinutes;
    }

    public Integer getTotalWords() {
        return totalWords;
    }

    public void setTotalWords(Integer totalWords) {
        this.totalWords = totalWords;
    }

    public Integer getWeeklyLessons() {
        return weeklyLessons;
    }

    public void setWeeklyLessons(Integer weeklyLessons) {
        this.weeklyLessons = weeklyLessons;
    }

    public List<String> getLearningTips() {
        return learningTips;
    }

    public void setLearningTips(List<String> learningTips) {
        this.learningTips = learningTips;
    }
}
