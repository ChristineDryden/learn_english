import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <section>
      <PageHeader
        eyebrow="Profile"
        title="我的学习中心"
        description="这里承载用户的长期学习状态，帮助用户理解自己的目标、进度和下一阶段方向。"
        aside={
          <div className="rounded-[24px] border border-[#ffd8bb] bg-[#fff7ef] p-5">
            <div className="text-sm text-slate-500">当前状态</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">{isAuthenticated ? "已登录，可同步个人学习记录" : "未登录，建议先登录保存学习进度"}</div>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="content-panel">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-[1.2rem] font-semibold text-slate-900">账号信息</h3>
              <p className="mt-2 text-sm text-slate-500">统一查看身份信息和学习身份状态。</p>
            </div>
            <span className="pill-tag">{isAuthenticated ? "已登录" : "游客模式"}</span>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[22px] border border-slate-200/90 bg-slate-50/90 p-5">
              <div className="text-sm text-slate-500">昵称</div>
              <div className="mt-2 text-xl font-semibold text-slate-900">{user?.nickname || "未设置"}</div>
            </div>
            <div className="rounded-[22px] border border-slate-200/90 bg-slate-50/90 p-5">
              <div className="text-sm text-slate-500">邮箱</div>
              <div className="mt-2 text-base font-medium text-slate-900">{user?.email || "登录后显示你的邮箱"}</div>
            </div>
          </div>
        </section>

        <section className="content-panel self-start">
          <div className="mb-5">
            <h3 className="text-[1.2rem] font-semibold text-slate-900">学习目标</h3>
            <p className="mt-2 text-sm text-slate-500">帮助用户知道为什么回来、今天学什么、下一步往哪走。</p>
          </div>

          <div className="grid gap-3">
            {[
              "当前目标：30 天完成日常交流主题课程",
              "每日节奏：20 分钟课程 + 8 个高频词复习",
              "下一阶段：从输入理解过渡到场景表达",
            ].map((item) => (
              <article key={item} className="rounded-[20px] border border-slate-200/90 bg-slate-50/90 p-4 text-sm leading-6 text-slate-600">
                {item}
              </article>
            ))}
          </div>

          {isAuthenticated ? (
            <button type="button" className="secondary-button mt-6" onClick={logout}>
              退出登录
            </button>
          ) : null}
        </section>
      </div>
    </section>
  );
}
