import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = isAuthenticated
    ? [
        { to: "/", label: "首页" },
        { to: "/courses", label: "课程" },
        { to: "/words", label: "单词" },
        { to: "/stats", label: "数据" },
        { to: "/profile", label: "我的" },
      ]
    : [
        { to: "/", label: "首页" },
        { to: "/courses", label: "课程" },
        { to: "/words", label: "单词" },
        { to: "/auth", label: "登录注册" },
      ];

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-8">
      <header className="mb-6">
        <div className="glass-panel flex flex-col gap-5 rounded-[30px] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">English Flow</p>
            <h1 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] leading-tight font-semibold text-slate-900">
              {isAuthenticated ? "今天从一个稳定的小进步开始" : "一个把英语学习做成日常习惯的网站"}
            </h1>
            <p className="mt-3 max-w-[720px] text-sm leading-7 text-slate-600">
              {isAuthenticated
                ? `Hi, ${user?.nickname}。课程、单词、数据反馈会围绕你的每日学习节奏组织成一个稳定的工作台。`
                : "通过场景课程、单词记忆和学习反馈，帮助用户每天花 15 到 25 分钟持续提升英语能力。"}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 rounded-[24px] border border-white/70 bg-white/70 p-5 shadow-[0_16px_40px_rgba(40,66,96,0.08)] md:max-w-[320px]">
            <span className="text-sm text-slate-500">{isAuthenticated ? "当前任务" : "快速开始"}</span>
            <strong className="text-[1.15rem] leading-7 font-semibold text-slate-900">
              {isAuthenticated ? "继续课程学习，并完成今日单词复习" : "注册后即可保存学习记录，开启个人学习工作台"}
            </strong>
            <div className="mt-1.5">
              {isAuthenticated ? (
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="primary-button" onClick={() => navigate("/")}>
                    继续学习
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      logout();
                      navigate("/auth");
                    }}
                  >
                    退出登录
                  </button>
                </div>
              ) : (
                <button type="button" className="primary-button" onClick={() => navigate("/auth")}>
                  登录 / 注册
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="glass-panel mb-6 flex w-fit gap-3 rounded-full p-2 max-md:w-full max-md:overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              isActive
                ? "rounded-full bg-[#172033] px-[18px] py-2.5 text-sm text-white transition"
                : "rounded-full px-[18px] py-2.5 text-sm text-slate-600 transition hover:bg-[#172033] hover:text-white"
            }
          >
            {item.label}
          </NavLink>
        ))}

        {!isAuthenticated ? (
          <NavLink
            to="/prototype"
            className={({ isActive }) =>
              isActive
                ? "rounded-full bg-[#d96b2b] px-[18px] py-2.5 text-sm text-white transition"
                : "rounded-full px-[18px] py-2.5 text-sm text-[#b65c25] transition hover:bg-[#fff1e5]"
            }
          >
            查看原型
          </NavLink>
        ) : null}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
