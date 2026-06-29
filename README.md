# English App

一个面向英语学习场景的网站基础工程，采用 `Spring Boot + MyBatis-Plus + React + TypeScript + Tailwind CSS` 技术栈，适合作为课程学习、单词记忆、学习打卡和数据看板类产品的起点。

## 项目结构

```text
english_app
├── backend      # Spring Boot + MyBatis-Plus 后端
├── frontend     # React + Vite + TypeScript + Tailwind CSS 前端
├── sql          # 初始化数据库脚本
└── README.md
```

## 已实现的基础模块

### 后端

- 课程模块：查询推荐课程列表
- 单词模块：查询今日推荐单词
- 学习看板模块：返回今日时长、累计单词、本周课程数和学习建议
- 跨域配置：允许前端本地开发访问 `/api/**`

### 前端

- 首页：展示学习概览、推荐课程、今日单词、学习建议
- 课程页：课程卡片列表
- 单词页：单词卡片列表
- 数据页：学习时长柱状图、成长路径
- 已迁移到 TypeScript：包含路由、认证上下文、请求层与页面组件类型定义
- 已接入 Tailwind CSS：页面与组件样式开始转向 utility-first 方式维护

## 技术建议

如果你要把它继续做成完整产品，建议下一步优先补这些能力：

1. 用户系统：注册、登录、JWT、个人学习档案
2. 学习任务：每日计划、打卡、连续学习天数
3. 单词训练：艾宾浩斯复习、拼写测试、发音音频
4. 课程体系：章节、课时、视频/音频/题目
5. 数据分析：学习趋势、薄弱项分析、掌握度评分
6. 管理后台：课程管理、单词管理、用户学习数据查看

## 本地启动

### 1. 初始化数据库

先创建 MySQL 数据库并执行脚本：

```sql
source /Users/zhang/Documents/work/english_app/sql/init.sql;
```

默认数据库配置在：

- `/Users/zhang/Documents/work/english_app/backend/src/main/resources/application.yml`

现在支持通过环境变量覆盖数据库连接，默认会连本地 MySQL：

```yaml
spring:
  datasource:
    url: jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/${DB_NAME:english_app}?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:123456}
```

如果你要连接远程数据库，可以这样启动：

```bash
DB_HOST=your-host \
DB_PORT=3306 \
DB_NAME=english_app \
DB_USERNAME=your-user \
DB_PASSWORD=your-password \
mvn spring-boot:run
```

### 2. 启动后端

```bash
cd /Users/zhang/Documents/work/english_app/backend
mvn spring-boot:run
```

默认地址：

- `http://localhost:8080`

接口示例：

- `GET http://localhost:8080/api/dashboard`
- `GET http://localhost:8080/api/courses`
- `GET http://localhost:8080/api/words/today`

### 3. 启动前端

```bash
cd /Users/zhang/Documents/work/english_app/frontend
npm install
npm run dev
```

默认地址：

- `http://localhost:5173`

## 后续可以继续让我帮你做的方向

- 直接补登录注册和权限
- 接着做完整数据库设计
- 增加后台管理系统
- 优化成移动端优先的学习产品
- 接入 AI 口语陪练、作文批改、单词生成
