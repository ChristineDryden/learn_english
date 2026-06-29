package com.englishapp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.englishapp.entity.Word;
import java.util.List;

public interface WordService extends IService<Word> {

    List<Word> listTodayWords();
}
