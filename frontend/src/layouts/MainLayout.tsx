import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/courses", label: "课程" },
  { to: "/words", label: "单词" },
  { to: "/stats", label: "数据" },
];

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-8">
      <header className="mb-6 grid gap-6 md:grid-cols-[1.7fr_1fr] md:items-end">
        <div>
          <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">English Flow</p>
          <h1 className="text-[clamp(2.2rem,6vw,4.8rem)] leading-[0.95] font-semibold text-slate-900">
            把英语学习做成每天都愿意打开的网站
          </h1>
          <p className="mt-4 max-w-[680px] text-[1.05rem] leading-7 text-slate-600">
            通过课程学习、单词记忆、打卡统计和每日建议，帮助用户形成稳定的英语输入与输出习惯。
          </p>
        </div>
        <div className="glass-panel flex flex-col gap-2 rounded-[28px] p-6">
          <span className="text-sm text-slate-500">{isAuthenticated ? `Hi, ${user?.nickname}` : "今日目标"}</span>
          <strong className="text-[1.6rem] leading-tight font-semibold text-slate-900">
            {isAuthenticated ? "保持你的连续学习节奏" : "20 分钟精听 + 8 个高频词复习"}
          </strong>
          <div className="mt-1.5">
            {isAuthenticated ? (
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
            ) : (
              <button type="button" className="secondary-button" onClick={() => navigate("/auth")}>
                登录 / 注册
              </button>
            )}
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
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
