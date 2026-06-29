"use client";

import Link from "next/link";
import { useApp, useCanAccessApp } from "@/lib/context";
import { recipes } from "@/lib/recipes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, guestMode, favorites, shoppingList, logout } = useApp();
  const canAccess = useCanAccessApp();
  const router = useRouter();

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  if (!canAccess) return null;

  const favRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-warm to-warm-dark p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
            👨‍🍳
          </span>
          <div>
            <h1 className="text-2xl font-bold">{user?.name || "游客"}</h1>
            <p className="text-white/80">{user?.email || (guestMode ? "游客模式 · 部分功能受限" : "")}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{favorites.length}</p>
            <p className="text-sm text-white/80">收藏</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{shoppingList.length}</p>
            <p className="text-sm text-white/80">购物项</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{recipes.length}</p>
            <p className="text-sm text-white/80">可学菜谱</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { href: "/favorites", icon: "❤️", label: "我的收藏" },
          { href: "/shopping", icon: "🛒", label: "购物清单" },
          { href: "/ranking", icon: "🏆", label: "排行榜" },
          { href: "/community", icon: "💬", label: "社区" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      {favRecipes.length > 0 && (
        <div>
          <h2 className="mb-4 font-bold text-ink">最近收藏</h2>
          <div className="space-y-2">
            {favRecipes.slice(0, 5).map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.id}`}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm hover:shadow-md"
              >
                <span>{r.title}</span>
                <span className="text-sm text-warm">▶ 看视频</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!user && (
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-8 w-full rounded-xl bg-warm py-3 font-semibold text-white"
        >
          登录 / 注册
        </button>
      )}

      {user && (
        <button
          type="button"
          onClick={() => { logout(); router.push("/"); }}
          className="mt-8 w-full rounded-xl border border-red-200 py-3 text-red-500"
        >
          退出登录
        </button>
      )}
    </section>
  );
}
