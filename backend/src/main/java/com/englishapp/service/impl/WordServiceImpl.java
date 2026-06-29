package com.englishapp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.englishapp.entity.Word;
import com.englishapp.mapper.WordMapper;
import com.englishapp.service.WordService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class WordServiceImpl extends ServiceImpl<WordMapper, Word> implements WordService {

    @Override
    public List<Word> listTodayWords() {
        return lambdaQuery()
            .orderByDesc(Word::getDifficulty)
            .last("limit 8")
            .list();
    }
}
