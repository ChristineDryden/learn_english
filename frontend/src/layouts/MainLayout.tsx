import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const guestNavItems = [
    { to: "/", label: "首页" },
    { to: "/courses", label: "课程" },
    { to: "/words", label: "单词" },
    { to: "/auth", label: "登录注册" },
  ];

  const appNavItems = [
    { to: "/", label: "首页" },
    { to: "/courses", label: "课程" },
    { to: "/words", label: "单词" },
    { to: "/stats", label: "数据" },
    { to: "/profile", label: "我的" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,214,117,0.42),transparent_28%),linear-gradient(135deg,#f6f3ec_0%,#edf3fb_50%,#f4fbf6_100%)]">
        <div className="mx-auto h-full flex flex-col">
          <header className="sticky z-20">
            <div className="flex w-full items-center  border border-white/70 bg-white/78 px-4 py-3 shadow-[0_18px_48px_rgba(34,52,84,0.12)] backdrop-blur-[18px]">
              <button
                type="button"
                className="flex items-center gap-3 rounded-full px-4 py-2 text-left"
                onClick={() => navigate("/")}
              >
                <span className="text-[0.86rem] font-black uppercase tracking-[0.22em] text-[#d96b2b]">
                  English Flow
                </span>
              </button>

              <div className="ml-auto hidden items-center gap-2 md:flex">
                <nav className="flex items-center gap-2">
                  {guestNavItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-full bg-[#172033] px-4 py-2.5 text-sm font-medium text-white transition"
                          : "rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <button
                  type="button"
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  onClick={() => navigate("/prototype")}
                >
                  查看原型
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#172033] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#24314b]"
                  onClick={() => navigate("/auth")}
                >
                  开始学习
                </button>
              </div>
            </div>
          </header>

          <main className=" px-10 overflow-scroll flex-1 pt-10">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-8">
      <header className="mb-6">
        <div className="glass-panel flex flex-col gap-5 rounded-[30px] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">
              English Flow
            </p>
            <h1 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] leading-tight font-semibold text-slate-900">
              今天从一个稳定的小进步开始
            </h1>
            <p className="mt-3 max-w-[720px] text-sm leading-7 text-slate-600">
              {`Hi, ${user?.nickname}。课程、单词、数据反馈会围绕你的每日学习节奏组织成一个稳定的工作台。`}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 rounded-[24px] border border-white/70 bg-white/70 p-5 shadow-[0_16px_40px_rgba(40,66,96,0.08)] md:max-w-[320px]">
            <span className="text-sm text-slate-500">当前任务</span>
            <strong className="text-[1.15rem] leading-7 font-semibold text-slate-900">
              继续课程学习，并完成今日单词复习
            </strong>
            <div className="mt-1.5 flex flex-wrap gap-3">
              <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/")}
              >
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
          </div>
        </div>
      </header>

      <nav className="glass-panel mb-6 flex w-fit gap-3 rounded-full p-2 max-md:w-full max-md:overflow-x-auto">
        {appNavItems.map((item) => (
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
