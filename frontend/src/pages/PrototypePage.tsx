import { useState } from "react";

type PrototypeTab = "home" | "courses" | "course-detail" | "words" | "stats" | "profile";

interface PrototypeNavItem {
  key: PrototypeTab;
  label: string;
  hint: string;
}

const navItems: PrototypeNavItem[] = [
  { key: "home", label: "首页", hint: "今日任务与学习概览" },
  { key: "courses", label: "课程页", hint: "浏览和选择课程" },
  { key: "course-detail", label: "课程详情", hint: "查看课程目标与开始学习" },
  { key: "words", label: "单词页", hint: "完成今日单词学习" },
  { key: "stats", label: "数据页", hint: "查看进步和趋势" },
  { key: "profile", label: "我的", hint: "查看个人信息与目标" },
];

const taskCards = [
  { title: "Daily Survival English", desc: "完成第 3 节：餐厅点餐表达", meta: "12 min · A1" },
  { title: "今日单词复习", desc: "完成 8 个高频词的掌握标记", meta: "8 words · business" },
];

const courseCards = [
  { title: "Daily Survival English", level: "A1", lessons: 18, minutes: 240, status: "推荐入门" },
  { title: "Workplace Communication", level: "B1", lessons: 24, minutes: 360, status: "职场提升" },
  { title: "Travel Conversation Sprint", level: "A2", lessons: 14, minutes: 180, status: "旅行场景" },
];

const wordCards = [
  { word: "resilient", phonetic: "/rɪˈzɪliənt/", meaning: "能够快速恢复的", sentence: "She stayed resilient during the exam season." },
  { word: "negotiate", phonetic: "/nɪˈɡəʊʃieɪt/", meaning: "协商，谈判", sentence: "They negotiated a new project timeline." },
];

const weeklyData = [
  { day: "Mon", minutes: 20 },
  { day: "Tue", minutes: 35 },
  { day: "Wed", minutes: 28 },
  { day: "Thu", minutes: 42 },
  { day: "Fri", minutes: 18 },
  { day: "Sat", minutes: 50 },
  { day: "Sun", minutes: 32 },
];

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5 flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between">
      <h3 className="text-[1.2rem] font-semibold text-slate-900">{title}</h3>
      <span className="text-sm text-slate-500">{subtitle}</span>
    </div>
  );
}

function HomePrototype() {
  return (
    <div className="grid gap-6">
      <section className="content-panel">
        <div className="grid gap-5 md:grid-cols-[1.3fr_0.9fr]">
          <div>
            <span className="pill-tag">V1 首页原型</span>
            <h2 className="mt-4 text-[2rem] leading-tight font-semibold text-slate-900">今天继续你的英语节奏</h2>
            <p className="mt-3 max-w-[680px] text-sm leading-7 text-slate-600">
              首页负责告诉用户今天学什么、从哪里开始，以及学完后会得到什么反馈。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="primary-button">
                继续课程学习
              </button>
              <button type="button" className="secondary-button">
                进入今日单词
              </button>
            </div>
          </div>
          <div className="rounded-[28px] border border-[#ffd7b8] bg-[#fff7ef] p-5">
            <div className="text-sm text-slate-500">今日目标</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">20 分钟课程 + 8 个单词复习</div>
            <div className="mt-4 text-sm leading-6 text-slate-600">连续学习 4 天，今天完成后可以解锁“本周稳定输出”徽章。</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["18 min", "今日学习时长"],
          ["126", "累计掌握词汇"],
          ["6", "本周完成课程"],
        ].map(([value, label]) => (
          <div key={label} className="content-panel">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-[2rem] font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="content-panel">
        <SectionTitle title="今日任务" subtitle="首页的关键作用是帮助用户马上开始" />
        <div className="grid gap-4 md:grid-cols-2">
          {taskCards.map((task) => (
            <article key={task.title} className="rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-5">
              <div className="text-sm text-slate-500">{task.meta}</div>
              <h4 className="mt-3 text-lg font-semibold text-slate-900">{task.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{task.desc}</p>
              <button type="button" className="primary-button mt-5">
                立即开始
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function CoursesPrototype() {
  return (
    <section className="content-panel">
      <SectionTitle title="课程页原型" subtitle="帮助用户浏览、筛选并选择学习内容" />
      <div className="mb-5 flex flex-wrap gap-3">
        {["全部", "A1-A2", "B1+", "旅行", "职场", "日常交流"].map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courseCards.map((course) => (
          <article key={course.title} className="rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="pill-tag">{course.level}</span>
              <span className="text-sm text-slate-500">{course.status}</span>
            </div>
            <h4 className="mt-4 text-xl font-semibold text-slate-900">{course.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{course.lessons} lessons · {course.minutes} mins</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">围绕真实场景拆解表达、句型和高频词，让用户知道这门课学完能解决什么问题。</p>
            <div className="mt-5 flex gap-3">
              <button type="button" className="primary-button">
                查看详情
              </button>
              <button type="button" className="secondary-button">
                开始学习
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CourseDetailPrototype() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
      <section className="content-panel">
        <SectionTitle title="课程详情页原型" subtitle="内容输入的核心页面" />
        <span className="pill-tag">A1 · Daily Survival English</span>
        <h2 className="mt-4 text-[1.9rem] font-semibold text-slate-900">餐厅点餐英语</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          用户在这一页需要知道：这门课适合谁、学完能获得什么、从哪里开始。
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["12 min", "建议时长"],
            ["3", "核心表达"],
            ["8", "关联单词"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{label}</div>
              <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3">
          {[
            "Lesson 1: How many people, please?",
            "Lesson 2: I’d like to order the grilled chicken.",
            "Lesson 3: Could we have the bill, please?",
          ].map((lesson, index) => (
            <div key={lesson} className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-white p-4">
              <div>
                <div className="text-sm text-slate-500">章节 {index + 1}</div>
                <div className="mt-1 font-medium text-slate-900">{lesson}</div>
              </div>
              <span className={index === 0 ? "pill-tag" : "text-sm text-slate-400"}>{index === 0 ? "进行中" : "未开始"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-panel self-start">
        <SectionTitle title="重点内容" subtitle="帮助用户快速理解课程价值" />
        <ul className="grid gap-3 text-sm leading-6 text-slate-600">
          <li className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">核心表达：I’d like to order..., Could we have..., Is service included?</li>
          <li className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">推荐单词：menu, reservation, order, bill, tip</li>
          <li className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">学习目标：在餐厅场景中完成点餐、询问和结账表达。</li>
        </ul>
        <button type="button" className="primary-button mt-6 w-full">
          开始学习本课程
        </button>
      </section>
    </div>
  );
}

function WordsPrototype() {
  return (
    <section className="content-panel">
      <SectionTitle title="单词页原型" subtitle="今日单词记忆与掌握标记" />
      <div className="mb-5 rounded-[24px] border border-[#d8e7ff] bg-[#f4f8ff] p-5">
        <div className="text-sm text-slate-500">今日进度</div>
        <div className="mt-2 text-2xl font-semibold text-slate-900">2 / 8 已完成</div>
        <div className="mt-3 h-3 rounded-full bg-white">
          <div className="h-3 w-1/4 rounded-full bg-gradient-to-r from-[#ffb44c] to-[#e77933]" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {wordCards.map((word) => (
          <article key={word.word} className="rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xl font-semibold text-slate-900">{word.word}</h4>
                <div className="text-sm text-slate-500">{word.phonetic}</div>
              </div>
              <span className="pill-tag">今日词</span>
            </div>
            <p className="mt-4 text-base font-semibold text-slate-800">{word.meaning}</p>
            <p className="mt-2 text-sm italic leading-6 text-slate-600">{word.sentence}</p>
            <div className="mt-5 flex gap-3">
              <button type="button" className="primary-button">
                已掌握
              </button>
              <button type="button" className="secondary-button">
                再复习
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatsPrototype() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
      <section className="content-panel">
        <SectionTitle title="数据页原型" subtitle="帮助用户看到变化和积累" />
        <div className="flex min-h-[240px] items-end gap-4 pt-4">
          {weeklyData.map((item) => (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-[180px] w-full items-end rounded-full bg-slate-200/80 p-2">
                <div
                  className="w-full rounded-full bg-gradient-to-b from-[#ffb44c] to-[#e77933]"
                  style={{ height: `${item.minutes * 1.6}px` }}
                />
              </div>
              <span className="text-sm text-slate-600">{item.day}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="content-panel">
        <SectionTitle title="成长路径" subtitle="数据不只是统计，更要带来行动建议" />
        <div className="grid gap-3">
          {[
            "本周已完成 3 次课程学习，稳定性正在提升。",
            "高频词掌握度达到 68%，下周建议增加复习密度。",
            "下一阶段建议进入职场沟通主题课程。",
          ].map((text) => (
            <article key={text} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {text}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfilePrototype() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="content-panel">
        <SectionTitle title="我的页面原型" subtitle="承载用户的长期状态" />
        <div className="rounded-[24px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
          <div className="text-sm text-slate-500">用户昵称</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">Champion</div>
          <div className="mt-2 text-sm text-slate-500">1324589321@qq.com</div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["4 天", "连续学习"],
            ["126", "掌握词汇"],
            ["9", "完成课程"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{label}</div>
              <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="content-panel self-start">
        <SectionTitle title="学习目标" subtitle="帮助用户理解自己为什么要继续使用产品" />
        <div className="grid gap-3">
          {[
            "目标：30 天完成日常交流主题课程",
            "每日计划：20 分钟课程 + 8 个单词",
            "当前阶段：从输入理解过渡到场景表达",
          ].map((goal) => (
            <div key={goal} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {goal}
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="secondary-button">
            修改目标
          </button>
          <button type="button" className="primary-button">
            退出登录
          </button>
        </div>
      </section>
    </div>
  );
}

export default function PrototypePage() {
  const [activeTab, setActiveTab] = useState<PrototypeTab>("home");

  return (
    <section className="grid gap-6 xl:grid-cols-[280px_1fr]">
      <aside className="content-panel h-fit">
        <div className="mb-5">
          <div className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">Prototype</div>
          <h2 className="mt-2 text-[1.5rem] font-semibold text-slate-900">English App V1 交互原型</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">通过点击左侧页面切换，你可以直接感受这个产品在 V1 阶段的大致样子和用户路径。</p>
        </div>
        <div className="grid gap-2.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={
                  isActive
                    ? "rounded-[20px] border border-[#172033] bg-[#172033] px-4 py-3 text-left text-white transition"
                    : "rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-left text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                }
              >
                <div className="font-medium">{item.label}</div>
                <div className={isActive ? "mt-1 text-xs text-slate-200" : "mt-1 text-xs text-slate-500"}>{item.hint}</div>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="grid gap-6">
        <section className="content-panel border-[#ffd8bb] bg-gradient-to-r from-[#fff6ee] to-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-medium text-[#c5682d]">原型说明</div>
              <h3 className="mt-1 text-[1.5rem] font-semibold text-slate-900">这不是最终 UI，而是用来确认产品形态的交互原型</h3>
              <p className="mt-2 max-w-[720px] text-sm leading-6 text-slate-600">
                重点是帮助你确认页面结构、信息层级和学习闭环，而不是现在就把视觉打磨到设计稿级别。
              </p>
            </div>
            <div className="rounded-[20px] border border-[#ffd8bb] bg-white/80 px-4 py-3 text-sm text-slate-600">
              当前查看：<span className="font-semibold text-slate-900">{navItems.find((item) => item.key === activeTab)?.label}</span>
            </div>
          </div>
        </section>

        {activeTab === "home" && <HomePrototype />}
        {activeTab === "courses" && <CoursesPrototype />}
        {activeTab === "course-detail" && <CourseDetailPrototype />}
        {activeTab === "words" && <WordsPrototype />}
        {activeTab === "stats" && <StatsPrototype />}
        {activeTab === "profile" && <ProfilePrototype />}
      </div>
    </section>
  );
}
