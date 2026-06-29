"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/lib/context";

type Mode = "login" | "register" | "forgot" | "phone";

export function LandingPage() {
  const { login, register, enterGuestMode } = useApp();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const goHome = () => router.push("/home");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (mode === "forgot") {
      if (!email.trim()) {
        setError("请输入注册邮箱");
        return;
      }
      setInfo("重置链接已发送至邮箱（演示）");
      return;
    }

    if (mode === "phone") {
      if (phone.length < 11 || code.length < 4) {
        setError("请输入手机号和验证码");
        return;
      }
      enterGuestMode();
      goHome();
      return;
    }

    if (mode === "login") {
      if (!login(email, password)) {
        setError("邮箱或密码错误，请先注册账号");
        return;
      }
    } else {
      if (password.length < 6) {
        setError("密码至少 6 位");
        return;
      }
      if (!register(name, email, password)) {
        setError("该邮箱已注册");
        return;
      }
    }
    goHome();
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-orange-50 via-cream to-amber-50 p-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-warm to-warm-dark text-4xl text-white shadow-xl">
            🍳
          </div>
          <h1 className="text-3xl font-bold text-ink">食趣</h1>
          <p className="mt-2 text-lg font-medium text-sage">学做菜</p>
          <p className="text-sm text-muted">厨房小白也能变大厨</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "phone" ? (
            <>
              <input
                type="tel"
                placeholder="手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-warm focus:ring-2 focus:ring-warm/20"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-warm"
                />
                <button
                  type="button"
                  onClick={() => setInfo("验证码已发送：1234（演示）")}
                  className="shrink-0 rounded-xl border border-warm px-4 py-3 text-sm text-warm"
                >
                  获取验证码
                </button>
              </div>
            </>
          ) : mode === "forgot" ? (
            <input
              type="email"
              placeholder="注册邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-warm focus:ring-2 focus:ring-warm/20"
            />
          ) : (
            <>
              {mode === "register" && (
                <input
                  type="text"
                  placeholder="昵称"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-warm focus:ring-2 focus:ring-warm/20"
                  required
                />
              )}
              <input
                type="email"
                placeholder="邮箱 / 手机号"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-warm focus:ring-2 focus:ring-warm/20"
                required
              />
              <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-warm focus:ring-2 focus:ring-warm/20"
                required
              />
            </>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
          {info && <p className="text-sm text-sage">{info}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-warm to-warm-dark py-3.5 font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            {mode === "login" && "登录"}
            {mode === "register" && "注册"}
            {mode === "forgot" && "发送重置链接"}
            {mode === "phone" && "手机号登录"}
          </button>
        </form>

          <div className="mt-4 flex justify-between text-sm">
            {mode === "login" && (
              <>
                <button type="button" className="text-warm hover:underline" onClick={() => { setMode("register"); setError(""); }}>
                  注册账号
                </button>
                <button type="button" className="text-muted hover:text-ink" onClick={() => { setMode("forgot"); setError(""); }}>
                  忘记密码
                </button>
              </>
            )}
            {mode === "register" && (
              <button type="button" className="text-warm hover:underline" onClick={() => { setMode("login"); setError(""); }}>
                已有账号？登录
              </button>
            )}
            {(mode === "forgot" || mode === "phone") && (
              <button type="button" className="text-warm hover:underline" onClick={() => { setMode("login"); setError(""); }}>
                返回登录
              </button>
            )}
          </div>

          {mode === "login" && (
            <>
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-muted">或</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => { enterGuestMode(); goHome(); }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 py-3 text-xs transition hover:border-green-500 hover:bg-green-50"
                >
                  <span className="text-lg">💬</span>
                  微信登录
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("phone"); setError(""); }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 py-3 text-xs transition hover:border-warm hover:bg-orange-50"
                >
                  <span className="text-lg">📱</span>
                  手机号登录
                </button>
                <button
                  type="button"
                  onClick={() => { enterGuestMode(); goHome(); }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 py-3 text-xs transition hover:border-gray-800 hover:bg-gray-50"
                >
                  <span className="text-lg"></span>
                  Apple
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => { enterGuestMode(); goHome(); }}
            className="mt-5 w-full text-center text-sm text-muted hover:text-warm"
          >
            暂不登录，先逛逛 →
          </button>
        </div>
      </div>
    </div>
  );
}
