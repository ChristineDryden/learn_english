import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, getDashboard, getTodayWords } from "../api/learning";
import CourseCard from "../components/CourseCard";
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

  const featuredCourse = courses[0];
  const previewCourses = courses.slice(0, 3);
  const previewWords = words.slice(0, 2);

  if (!isAuthenticated) {
    return (
      <section className="grid gap-14 pb-8">
        <section className="flex min-h-[calc(100vh-120px)] flex-col justify-center">
          <div className="mx-auto max-w-[980px] text-center">
            <div className="inline-flex items-center rounded-full border border-[#e8dfd1] bg-white/82 px-3 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-[#d96b2b] shadow-[0_10px_28px_rgba(56,70,96,0.05)]">
              English Flow
            </div>
            <h1 className="mt-7 text-[clamp(2.55rem,6.2vw,5.35rem)] leading-[1.02] font-semibold tracking-[-0.05em] text-slate-950">
              让英语学习
              <br />
              清楚地持续发生
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[1rem] leading-8 text-slate-600">
              English Flow 把课程、单词、复习和反馈整理进一个克制、清晰、持续的学习系统。
              少一点资料堆积，多一点每天都愿意打开的节奏感。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className="primary-button px-6 py-3.5" onClick={() => navigate("/auth")}>
                开始学习
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-300 bg-white/74 px-6 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-white"
                onClick={() => navigate("/prototype")}
              >
                观看演示
              </button>
            </div>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-[170%] rounded-full bg-[#ffd68f]/34 blur-3xl" />
            <div className="absolute right-[8%] top-12 h-48 w-48 rounded-full bg-[#adcfff]/18 blur-3xl" />
            <div className="relative mx-auto max-w-[1120px] rounded-[42px] border border-white/84 bg-white/82 p-4 shadow-[0_42px_120px_rgba(34,48,82,0.14)] backdrop-blur-[22px]">
              <div className="rounded-[34px] border border-slate-200/70 bg-[#fbfbfd] p-5">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">English Flow</div>
                    <div className="mt-1 text-xs text-slate-500">Learning Dashboard</div>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">Daily Rhythm</div>
                </div>

                <div className="mt-5 grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
                  <div className="rounded-[30px] bg-[#171e2d] p-6 text-white shadow-[0_24px_64px_rgba(23,32,51,0.24)]">
                    <div className="text-xs uppercase tracking-[0.18em] text-[#ffbf7a]">Today</div>
                    <div className="mt-3 max-w-[420px] text-[2rem] leading-[1.12] font-semibold">
                      继续课程，
                      <br />
                      完成今日单词复习
                    </div>
                    <div className="mt-5 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[46%] rounded-full bg-gradient-to-r from-[#ffb44c] to-[#ff845c]" />
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        ["18 min", "学习时长"],
                        ["126", "掌握词汇"],
                        ["6", "本周课程"],
                      ].map(([value, label]) => (
                        <div key={label} className="rounded-[18px] border border-white/10 bg-white/6 p-4">
                          <div className="text-xl font-semibold text-white">{value}</div>
                          <div className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-slate-300">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_32px_rgba(36,48,78,0.05)]">
                      <div className="text-xs uppercase tracking-[0.18em] text-[#d96b2b]">Current Course</div>
                      <div className="mt-3 text-xl font-semibold text-slate-900">Daily Survival English</div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">从明确场景切入，用更轻的认知负担开始今天的学习。</p>
                    </div>
                    <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_32px_rgba(36,48,78,0.05)]">
                      <div className="text-xs uppercase tracking-[0.18em] text-[#d96b2b]">Word Review</div>
                      <div className="mt-4 grid gap-3">
                        {previewWords.map((word) => (
                          <div key={word.id} className="rounded-[18px] border border-slate-200/80 bg-slate-50/80 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <strong className="text-sm font-semibold text-slate-900">{word.word}</strong>
                              <span className="text-xs text-slate-400">Lv.{word.difficulty}</span>
                            </div>
                            <div className="mt-2 text-sm leading-6 text-slate-500">{word.meaning}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["场景课程", "用真实语境切入，让用户一开始就知道学了能用在哪。"],
            ["今日单词", "不再孤立地背词，而是用例句和分类建立记忆。"],
            ["节奏设计", "每次只推进一点点，让坚持变得比启动更重要。"],
            ["持续反馈", "让用户每天都能看到自己的投入与积累变化。"],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-[30px] border border-white/82 bg-white/78 p-6 shadow-[0_18px_48px_rgba(34,52,84,0.07)] backdrop-blur-[18px]">
              <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">{title}</div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[42px] border border-white/18 bg-[#171e2d] px-6 py-8 text-white shadow-[0_30px_100px_rgba(23,32,51,0.18)] md:px-8 md:py-9">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#ffbf7a]">Learning Flow</div>
              <h2 className="mt-3 text-[clamp(2.4rem,5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
                课程
                <br />
                单词
                <br />
                复习
                <br />
                反馈
              </h2>
              <p className="mt-6 max-w-[520px] text-[1rem] leading-8 text-slate-300">
                Apple 风格最有价值的不是“更像 Apple”，而是让每一层内容都更容易理解。这里我们把学习路径压缩成 4 个清楚的动作。
              </p>
            </div>

            <div className="grid gap-4">
              {[
                ["01", "课程学习", "从一个明确场景开始，降低进入成本。"],
                ["02", "单词记忆", "把高频词和语境绑定，记忆更自然。"],
                ["03", "复习回收", "让今天学到的内容不在第二天消失。"],
                ["04", "反馈沉淀", "让用户能感知节奏，而不是盲目堆内容。"],
              ].map(([index, title, desc]) => (
                <article key={title} className="rounded-[28px] border border-white/10 bg-white/7 p-5 backdrop-blur-md">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffbf7a]">{index}</div>
                  <h3 className="mt-2 text-[1.2rem] font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <section className="content-panel">
            <div className="mb-6">
              <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">Product Interface</div>
              <h2 className="mt-2 text-[1.9rem] font-semibold tracking-[-0.03em] text-slate-950">不是一堆功能，而是一套更容易使用的学习界面</h2>
            </div>

            <div className="rounded-[30px] border border-slate-200/80 bg-[#fbfbfd] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Workspace Preview</div>
                  <div className="mt-1 text-xs text-slate-500">更接近真实产品界面，而不是概念卡片</div>
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">Mockup</div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.14fr_0.86fr]">
                <div className="rounded-[26px] bg-[#171e2d] p-5 text-white">
                  <div className="text-xs uppercase tracking-[0.18em] text-[#ffbf7a]">Dashboard</div>
                  <div className="mt-3 text-[1.55rem] font-semibold">今天继续你的学习节奏</div>
                  <div className="mt-4 grid gap-3">
                    {[
                      "继续课程学习",
                      "完成 8 个高频词复习",
                      "查看本周学习反馈",
                    ].map((task) => (
                      <div key={task} className="rounded-[18px] border border-white/10 bg-white/6 p-3 text-sm text-slate-200">
                        {task}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    ["Course View", "清楚的课程入口"],
                    ["Word View", "低负担词汇记忆"],
                    ["Stats View", "每天都能看到变化"],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_12px_28px_rgba(36,48,78,0.05)]">
                      <div className="text-sm font-semibold text-slate-900">{title}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="grid gap-4">
            <div className="content-panel">
              <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">Real Content</div>
              <h3 className="mt-2 text-[1.45rem] font-semibold text-slate-950">真实内容预览</h3>
            </div>
            <div className="grid gap-4">
              {previewCourses.slice(0, 2).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {previewWords.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [`${dashboard?.totalWords ?? "12.8k"}+`, "累计掌握词汇"],
            ["4.2k h", "累计学习时长"],
            ["87%", "周任务完成率"],
            ["3.6x", "连续学习提升概率"],
          ].map(([value, label]) => (
            <article key={label} className="rounded-[32px] border border-white/82 bg-white/78 p-7 text-center shadow-[0_18px_42px_rgba(34,52,84,0.07)] backdrop-blur-[18px]">
              <div className="text-[2.1rem] font-semibold tracking-[-0.05em] text-slate-950">{value}</div>
              <div className="mt-2 text-sm text-slate-500">{label}</div>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["“更像一套认真整理过的学习产品，而不是把很多功能堆在一个页面里。”", "Luna · 产品经理"],
            ["“我最喜欢的是每天打开后，不需要重新想今天从哪开始。”", "Ryan · 设计师"],
            ["“课程、单词和反馈放在一起之后，持续学习的阻力明显变小。”", "Annie · 运营"],
          ].map(([quote, author]) => (
            <article key={author} className="rounded-[30px] border border-white/82 bg-white/76 p-6 shadow-[0_18px_42px_rgba(34,52,84,0.07)] backdrop-blur-[18px]">
              <p className="text-base leading-8 text-slate-700">{quote}</p>
              <div className="mt-5 text-sm font-medium text-slate-500">{author}</div>
            </article>
          ))}
        </section>

        <section className="content-panel">
          <div className="mb-6">
            <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">FAQ</div>
            <h2 className="mt-2 text-[1.9rem] font-semibold tracking-[-0.03em] text-slate-950">常见问题</h2>
          </div>
          <div className="grid gap-4">
            {[
              ["适合零基础用户吗？", "当前版本更适合有一点英语基础、希望重新建立稳定学习节奏的用户。"],
              ["每天需要学多久？", "建议每天 15 到 25 分钟，重点是保持稳定，而不是一次学很多。"],
              ["为什么要把课程和单词放在一起？", "因为用户更容易在具体语境里记住表达，而不是孤立地背单词。"],
              ["登录后会和现在这个页面一样吗？", "不会。游客看到的是介绍页，登录后会进入围绕个人进度组织的学习工作台。"],
            ].map(([question, answer]) => (
              <article key={question} className="rounded-[26px] border border-slate-200/80 bg-slate-50/70 p-5">
                <h3 className="text-base font-semibold text-slate-900">{question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="rounded-[36px] border border-[#182133] bg-[#171e2d] px-6 py-8 text-white shadow-[0_28px_90px_rgba(23,32,51,0.16)] md:px-8">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[0.86rem] font-black uppercase tracking-[0.22em] text-[#ffbf7a]">English Flow</div>
              <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.04em]">把英语学习整理成你真的愿意持续做的事。</h2>
              <p className="mt-4 max-w-[560px] text-sm leading-7 text-slate-300">
                Apple 的风格不是为了“看起来像 Apple”，而是为了让复杂的产品被理解得更快。English Flow 也应该朝这个方向走。
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-white">浏览</div>
                <div className="mt-3 grid gap-2 text-sm text-slate-300">
                  <button type="button" className="text-left transition hover:text-white" onClick={() => navigate("/courses")}>
                    课程
                  </button>
                  <button type="button" className="text-left transition hover:text-white" onClick={() => navigate("/words")}>
                    单词
                  </button>
                  <button type="button" className="text-left transition hover:text-white" onClick={() => navigate("/prototype")}>
                    原型演示
                  </button>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">开始</div>
                <div className="mt-3 grid gap-2 text-sm text-slate-300">
                  <button type="button" className="text-left transition hover:text-white" onClick={() => navigate("/auth")}>
                    登录 / 注册
                  </button>
                  <button type="button" className="text-left transition hover:text-white" onClick={() => navigate("/auth")}>
                    立即开始学习
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    );
  }

  return (
    <section className="grid gap-6">
      <section className="relative overflow-hidden rounded-[38px] bg-[#172033] px-6 py-7 text-white shadow-[0_30px_90px_rgba(23,32,51,0.2)] md:px-8 md:py-9">
        <div className="absolute -right-14 top-0 h-56 w-56 rounded-full bg-[#ffb44c]/18 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#8fd9ff]/12 blur-3xl" />
        <div className="relative grid gap-8 xl:grid-cols-[1.18fr_0.82fr]">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#ffbf7a]">Learning Workspace</p>
            <h2 className="mt-3 max-w-[760px] text-[clamp(2rem,5vw,3.8rem)] leading-[0.94] font-semibold">
              今天继续你的学习节奏。
            </h2>
            <p className="mt-5 max-w-[620px] text-[1rem] leading-7 text-slate-200">
              首页应该像一个轻量学习工作台，而不是一块塞满信息的公告板。你只需要一眼看到今天该做什么，然后自然地进入下一步。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#172033] transition hover:bg-slate-100"
                onClick={() => navigate("/courses")}
              >
                继续课程
              </button>
              <button
                type="button"
                className="rounded-full border border-white/18 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/8"
                onClick={() => navigate("/words")}
              >
                今日单词
              </button>
            </div>
          </div>

          <div className="grid gap-3 self-start">
            <div className="rounded-[26px] border border-white/12 bg-white/8 p-5 backdrop-blur-md">
              <div className="text-sm text-slate-300">今日任务</div>
              <div className="mt-2 text-lg font-semibold">完成 1 节场景课程，并复习 8 个高频词</div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[42%] rounded-full bg-gradient-to-r from-[#ffb44c] to-[#ff8a3d]" />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
              {[
                ["4 天", "连续学习"],
                ["2 节", "本周完成课程"],
                ["下一步", "先做单词复习"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[22px] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
                  <div className="text-lg font-semibold text-white">{value}</div>
                  <div className="mt-1 text-sm text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { value: `${dashboard?.todayMinutes ?? "--"} min`, label: "今日学习时长" },
          { value: dashboard?.totalWords ?? "--", label: "累计掌握词汇" },
          { value: dashboard?.weeklyLessons ?? "--", label: "本周完成课程" },
        ].map((item) => (
          <article key={item.label} className="rounded-[26px] border border-white/70 bg-white/72 p-5 shadow-[0_18px_46px_rgba(40,66,96,0.08)] backdrop-blur-[18px]">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className="mt-3 text-[1.9rem] font-semibold tracking-tight text-slate-900">{item.value}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="grid gap-4">
          <article className="content-panel bg-gradient-to-r from-[#fff7ef] to-white">
            <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">Focus</div>
            <h3 className="mt-3 text-[1.5rem] font-semibold text-slate-900">{featuredCourse?.title || "Daily Survival English"}</h3>
            <p className="mt-3 max-w-[720px] text-sm leading-7 text-slate-600">
              {featuredCourse?.description || "从一个明确场景切入，比在首页堆很多卡片更容易进入学习状态。"}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="primary-button" onClick={() => navigate("/courses")}>
                继续课程
              </button>
              <button type="button" className="secondary-button" onClick={() => navigate("/stats")}>
                查看数据
              </button>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {previewWords.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        </section>

        <aside className="grid gap-6 self-start">
          <section className="content-panel">
            <div className="mb-5">
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">Guidance</p>
              <h3 className="mt-2 text-[1.45rem] font-semibold text-slate-900">下一步建议</h3>
            </div>
            <div className="grid gap-3">
              {(dashboard?.learningTips ?? []).map((tip) => (
                <div key={tip} className="rounded-[20px] border border-slate-200/90 bg-slate-50/90 p-4 text-sm leading-6 text-slate-600">
                  {tip}
                </div>
              ))}
              <div className="rounded-[20px] border border-slate-200/90 bg-slate-50/90 p-4 text-sm leading-6 text-slate-600">
                先完成单词复习，再进入下一节课程，今天的学习闭环会更完整。
              </div>
            </div>
          </section>

          <section className="content-panel">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">Recommended</p>
                <h3 className="mt-2 text-[1.45rem] font-semibold text-slate-900">精选课程</h3>
              </div>
              <button type="button" className="text-sm font-medium text-[#b65c25]" onClick={() => navigate("/courses")}>
                全部课程
              </button>
            </div>
            <div className="grid gap-4">
              {courses.slice(1, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </aside>
      </section>
    </section>
  );
}
