"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";

type Mode = "login" | "register" | "forgot";

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login, register } = useApp();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const reset = () => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
    reset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-fade-up rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-warm to-warm-dark text-2xl text-white shadow-lg">
            🍳
          </div>
          <h2 className="text-2xl font-bold text-ink">食趣</h2>
          <p className="mt-1 text-sm text-muted">学做菜 · 厨房小白也能变大厨</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="昵称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-warm focus:ring-2 focus:ring-warm/20"
              required
            />
          )}
          <input
            type="email"
            placeholder="邮箱 / 手机号"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-warm focus:ring-2 focus:ring-warm/20"
            required
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-warm focus:ring-2 focus:ring-warm/20"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-warm to-warm-dark py-3 font-semibold text-white shadow-lg transition hover:opacity-90 active:scale-[0.98]"
          >
            {mode === "login" ? "登录" : "注册"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <button
            type="button"
            className="text-warm hover:underline"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
          >
            {mode === "login" ? "注册账号" : "已有账号？登录"}
          </button>
          <button type="button" className="text-muted hover:text-ink" onClick={() => { setMode("forgot"); setError(""); }}>
            忘记密码
          </button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-muted">或</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "💬", label: "微信" },
            { icon: "📱", label: "手机号" },
            { icon: "", label: "Apple" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 py-3 text-xs text-muted transition hover:border-warm hover:bg-orange-50"
              onClick={() => setError("演示版暂不支持第三方登录，请使用邮箱注册")}
            >
              <span className="text-lg">{item.icon || ""}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
