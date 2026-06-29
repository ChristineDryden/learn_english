CREATE DATABASE IF NOT EXISTS english_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE english_app;

CREATE TABLE IF NOT EXISTS course (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    lesson_count INT NOT NULL,
    duration_minutes INT NOT NULL,
    cover_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS word_book (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    word VARCHAR(50) NOT NULL,
    phonetic VARCHAR(50),
    meaning VARCHAR(255) NOT NULL,
    example_sentence VARCHAR(255),
    category VARCHAR(50),
    difficulty INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS study_record (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    study_date DATE NOT NULL,
    minutes_spent INT DEFAULT 0,
    words_learned INT DEFAULT 0,
    lessons_completed INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS app_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO app_user (nickname, email, password) VALUES
('Demo User', 'demo@englishflow.com', '$2y$10$fQqLzu6QLnS67GtSuup20.XIMTFq0/lc/G2rccjiTh7EbywZdSRQu');

INSERT INTO course (title, level, description, lesson_count, duration_minutes, cover_url) VALUES
('Daily Survival English', 'A1', 'Useful expressions for travel and everyday conversation.', 18, 240, 'https://images.unsplash.com/photo-1513258496099-48168024aec0'),
('Workplace Communication', 'B1', 'Emails, meetings and presentations for professional English.', 24, 360, 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'),
('IELTS Speaking Sprint', 'B2', 'Focused speaking drills and answer-building strategies.', 16, 220, 'https://images.unsplash.com/photo-1455390582262-044cdead277a');

INSERT INTO word_book (word, phonetic, meaning, example_sentence, category, difficulty) VALUES
('resilient', '/rɪˈzɪliənt/', 'able to recover quickly after difficulties', 'She stayed resilient during the exam season.', 'mindset', 3),
('negotiate', '/nɪˈɡəʊʃieɪt/', 'to discuss in order to reach an agreement', 'They negotiated a new project timeline.', 'business', 2),
('immerse', '/ɪˈmɜːs/', 'to become deeply involved in something', 'Immerse yourself in English podcasts every morning.', 'learning', 4),
('accurate', '/ˈækjərət/', 'correct and exact', 'Your pronunciation is becoming more accurate.', 'learning', 2);

INSERT INTO study_record (user_id, study_date, minutes_spent, words_learned, lessons_completed) VALUES
(1, CURRENT_DATE, 35, 12, 1),
(1, CURRENT_DATE - INTERVAL 1 DAY, 20, 8, 1),
(1, CURRENT_DATE - INTERVAL 2 DAY, 40, 15, 2);
