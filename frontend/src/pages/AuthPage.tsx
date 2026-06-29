import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { RegisterPayload } from "../types";

type AuthMode = "login" | "register";

const initialForm: RegisterPayload = {
  nickname: "",
  email: "",
  password: "",
};

interface AuthLocationState {
  from?: {
    pathname?: string;
  };
}

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<RegisterPayload>(initialForm);
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as AuthLocationState | null)?.from?.pathname || "/";

  const updateField = <K extends keyof RegisterPayload>(key: K, value: RegisterPayload[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login({
          email: form.email,
          password: form.password,
        });
      } else {
        await register(form);
      }
      navigate(from, { replace: true });
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } }).response?.data?.message;
      setError(message || "操作失败，请稍后再试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center py-6">
      <article className="glass-panel w-full max-w-[480px] rounded-[28px] p-7">
        <div className="inline-flex gap-2.5 rounded-full bg-slate-100/90 p-1.5">
          <button
            type="button"
            className={
              mode === "login"
                ? "rounded-full bg-[#172033] px-5 py-2.5 text-sm font-medium text-white"
                : "rounded-full px-5 py-2.5 text-sm font-medium text-slate-600"
            }
            onClick={() => setMode("login")}
          >
            登录
          </button>
          <button
            type="button"
            className={
              mode === "register"
                ? "rounded-full bg-[#172033] px-5 py-2.5 text-sm font-medium text-white"
                : "rounded-full px-5 py-2.5 text-sm font-medium text-slate-600"
            }
            onClick={() => setMode("register")}
          >
            注册
          </button>
        </div>

        <h2 className="mt-5 text-3xl font-semibold text-slate-900">{mode === "login" ? "欢迎回来" : "创建你的学习账号"}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {mode === "login"
            ? "登录后可以保存个人学习记录、查看专属数据面板。"
            : "注册后即可开启课程、单词和学习打卡。"}
        </p>

        <form className="mt-5 grid gap-3.5" onSubmit={submit}>
          {mode === "register" ? (
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">昵称</span>
              <input
                value={form.nickname}
                onChange={(event) => updateField("nickname", event.target.value)}
                placeholder="例如：Luna"
                required
              />
            </label>
          ) : null}

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-800">邮箱</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-800">密码</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="至少 6 位"
              required
            />
          </label>

          {error ? <p className="text-sm text-[#c04e2e]">{error}</p> : null}

          <button type="submit" disabled={submitting} className="primary-button mt-1">
            {submitting ? "提交中..." : mode === "login" ? "立即登录" : "完成注册"}
          </button>
        </form>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          演示账号：
          <br />
          `demo@englishflow.com` / `123456`
        </p>
      </article>
    </section>
  );
}
