import { useEffect, useState } from "react";
import { getCourses, getDashboard, getTodayWords } from "../api/learning";
import CourseCard from "../components/CourseCard";
import StatCard from "../components/StatCard";
import WordCard from "../components/WordCard";
import { useAuth } from "../context/AuthContext";
import type { Course, Dashboard, Word } from "../types";

const guestDashboard: Dashboard = {
  todayMinutes: 35,
  totalWords: 120,
  weeklyLessons: 6,
  learningTips: ["先启动后完美，坚持比强度更重要。"],
};

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, wordRes] = await Promise.all([getCourses(), getTodayWords()]);
        setCourses(courseRes.data);
        setWords(wordRes.data.slice(0, 4));

        if (isAuthenticated) {
          const dashboardRes = await getDashboard();
          setDashboard(dashboardRes.data);
        } else {
          setDashboard(guestDashboard);
        }
      } catch {
        setDashboard(guestDashboard);
      }
    };

    void loadData();
  }, [isAuthenticated]);

  return (
    <section className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard value={`${dashboard?.todayMinutes ?? "--"} min`} label="今日学习时长" />
        <StatCard value={dashboard?.totalWords ?? "--"} label="累计掌握词汇" />
        <StatCard value={dashboard?.weeklyLessons ?? "--"} label="本周完成课程" />
      </div>

      <section className="content-panel">
        <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h2 className="text-[1.35rem] font-semibold text-slate-900">推荐课程</h2>
          <span className="text-sm text-slate-500">从真实场景切入学习</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <div className="content-panel">
          <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-[1.35rem] font-semibold text-slate-900">今日单词</h2>
            <span className="text-sm text-slate-500">用例句带动记忆</span>
          </div>
          <div className="grid gap-3.5">
            {words.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        </div>

        <div className="content-panel self-start">
          <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-[1.35rem] font-semibold text-slate-900">学习建议</h2>
            <span className="text-sm text-slate-500">保持长期节奏</span>
          </div>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-600">
            {(dashboard?.learningTips ?? []).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
