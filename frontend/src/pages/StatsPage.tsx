import PageHeader from "../components/PageHeader";

const weeklyData: Array<{ day: string; minutes: number }> = [
  { day: "Mon", minutes: 20 },
  { day: "Tue", minutes: 35 },
  { day: "Wed", minutes: 28 },
  { day: "Thu", minutes: 40 },
  { day: "Fri", minutes: 18 },
  { day: "Sat", minutes: 50 },
  { day: "Sun", minutes: 30 },
];

export default function StatsPage() {
  return (
    <section>
      <PageHeader
        eyebrow="Stats"
        title="学习数据"
        description="数据页的目标不是做复杂报表，而是让用户看到自己的投入与变化，从而更愿意持续回来学习。"
        aside={
          <div className="rounded-[24px] border border-[#d8e7ff] bg-[#f4f8ff] p-5">
            <div className="text-sm text-slate-500">本周状态</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">学习频率稳定，适合继续保持轻量高频节奏</div>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <div className="content-panel">
          <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-[1.35rem] font-semibold text-slate-900">学习统计</h2>
            <span className="text-sm text-slate-500">可视化追踪每周投入</span>
          </div>
        <div className="flex min-h-[240px] items-end gap-4 pt-5">
          {weeklyData.map((item) => (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2.5">
              <div className="flex h-[180px] w-full items-end justify-center rounded-full bg-slate-200/80 p-2.5">
                <div
                  className="w-full rounded-full bg-gradient-to-b from-[#ffb44c] to-[#e77933]"
                  style={{ height: `${item.minutes * 1.6}px` }}
                />
              </div>
              <span className="text-sm text-slate-600">{item.day}</span>
            </div>
          ))}
        </div>
        </div>

        <div className="content-panel">
          <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-[1.35rem] font-semibold text-slate-900">成长路径</h2>
            <span className="text-sm text-slate-500">把英语拆成可持续的小目标</span>
          </div>
          <div className="grid gap-3.5">
            <article className="rounded-[20px] border border-slate-200/90 bg-slate-50/90 p-[18px]">
              <strong>第 1 周</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">完成发音热身与高频生存表达。</p>
            </article>
            <article className="rounded-[20px] border border-slate-200/90 bg-slate-50/90 p-[18px]">
              <strong>第 2 周</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">加入商务沟通和邮件写作练习。</p>
            </article>
            <article className="rounded-[20px] border border-slate-200/90 bg-slate-50/90 p-[18px]">
              <strong>第 3 周</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">增加听力精听和复述任务，提升输出。</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
