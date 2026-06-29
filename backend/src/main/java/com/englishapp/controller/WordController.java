package com.englishapp.controller;

import com.englishapp.common.config.ApiResponse;
import com.englishapp.entity.Word;
import com.englishapp.service.WordService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/words")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/today")
    public ApiResponse<List<Word>> todayWords() {
        return ApiResponse.success(wordService.listTodayWords());
    }
}
