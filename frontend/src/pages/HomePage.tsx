import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, getDashboard, getTodayWords } from "../api/learning";
import CourseCard from "../components/CourseCard";
import PageHeader from "../components/PageHeader";
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
  const navigate = useNavigate();
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

  if (!isAuthenticated) {
    return (
      <section className="grid gap-6">
        <PageHeader
          eyebrow="Welcome"
          title="先看清产品，再决定开始哪一段英语旅程"
          description="游客首页的目标不是让用户立刻记住所有功能，而是让用户快速理解：这是一个通过课程、单词和学习反馈帮助你建立稳定英语节奏的平台。"
          aside={
            <div className="rounded-[24px] border border-[#ffd8bb] bg-[#fff7ef] p-5">
              <div className="text-sm text-slate-500">适合谁</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">想提升日常表达、词汇和持续学习习惯的英语学习者</div>
            </div>
          }
        />

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["场景课程", "从旅行、职场、日常交流等真实情境切入学习"],
            ["今日单词", "通过例句和分类帮助用户更自然地记忆高频词"],
            ["学习反馈", "用数据和建议让用户看到自己在持续进步"],
          ].map(([title, desc]) => (
            <article key={title} className="content-panel">
              <span className="pill-tag">{title}</span>
              <p className="mt-4 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </section>

        <section className="content-panel">
          <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-[1.35rem] font-semibold text-slate-900">推荐课程</h2>
            <span className="text-sm text-slate-500">先从真实场景开始理解这个产品会怎么陪你学</span>
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
              <h2 className="text-[1.35rem] font-semibold text-slate-900">今日单词预览</h2>
              <span className="text-sm text-slate-500">注册后可保存你的掌握状态和学习记录</span>
            </div>
            <div className="grid gap-3.5">
              {words.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          </div>

          <div className="content-panel self-start">
            <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h2 className="text-[1.35rem] font-semibold text-slate-900">为什么适合做成日常习惯</h2>
              <span className="text-sm text-slate-500">先建立节奏，再追求规模</span>
            </div>
            <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-600">
              <li>每天只需要 15 到 25 分钟，启动成本很低。</li>
              <li>课程、单词、反馈三块形成闭环，不会学完就散。</li>
              <li>登录后首页会自动变成你的学习工作台。</li>
            </ul>
            <button type="button" className="primary-button mt-6" onClick={() => navigate("/auth")}>
              注册并开启学习工作台
            </button>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="grid gap-6">
      <PageHeader
        eyebrow="Dashboard"
        title="今天继续你的学习节奏"
        description="登录后的首页不再负责介绍产品，而是成为稳定的学习工作台。用户需要一眼看到今天做什么、从哪里开始，以及当前进度如何。"
        aside={
          <div className="rounded-[24px] border border-[#d8e7ff] bg-[#f4f8ff] p-5">
            <div className="text-sm text-slate-500">今日任务</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">继续课程学习，并完成 8 个单词复习</div>
            <button type="button" className="primary-button mt-4" onClick={() => navigate("/words")}>
              进入今日单词
            </button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard value={`${dashboard?.todayMinutes ?? "--"} min`} label="今日学习时长" />
        <StatCard value={dashboard?.totalWords ?? "--"} label="累计掌握词汇" />
        <StatCard value={dashboard?.weeklyLessons ?? "--"} label="本周完成课程" />
      </div>

      <section className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <article className="content-panel">
          <div className="mb-3 text-sm font-medium text-[#d96b2b]">继续学习</div>
          <h3 className="text-[1.45rem] font-semibold text-slate-900">Daily Survival English</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">上次学习停留在“餐厅点餐表达”章节，继续完成这节课，可以顺手带出配套单词和例句记忆。</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="primary-button" onClick={() => navigate("/courses")}>
              继续课程
            </button>
            <button type="button" className="secondary-button" onClick={() => navigate("/stats")}>
              查看学习数据
            </button>
          </div>
        </article>

        <article className="content-panel">
          <div className="mb-3 text-sm font-medium text-[#d96b2b]">当前状态</div>
          <div className="grid gap-3 text-sm leading-6 text-slate-600">
            <div className="rounded-[18px] border border-slate-200/90 bg-slate-50/90 p-4">连续学习 4 天，节奏稳定。</div>
            <div className="rounded-[18px] border border-slate-200/90 bg-slate-50/90 p-4">本周已完成 2 节课程，适合继续推进日常交流主题。</div>
            <div className="rounded-[18px] border border-slate-200/90 bg-slate-50/90 p-4">今日最推荐先完成单词复习，再进入下一节课程。</div>
          </div>
        </article>
      </section>

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
            <span className="text-sm text-slate-500">完成今日单词后，你的学习闭环会更完整</span>
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
            <span className="text-sm text-slate-500">工作台需要给出下一步，而不仅是展示数据</span>
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
