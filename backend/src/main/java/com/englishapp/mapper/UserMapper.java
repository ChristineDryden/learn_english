package com.englishapp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.englishapp.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
