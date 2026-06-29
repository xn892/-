"use client";

import Link from "next/link";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes, getTopRecipes } from "@/lib/recipes";

export function Hero() {
  const featured = recipes.slice(0, 3);
  const top = getTopRecipes(3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-cream to-green-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="animate-fade-up max-w-xl">
            <p className="mb-2 text-sm font-medium text-sage">厨房小白也能变大厨</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
              学做菜，
              <span className="bg-gradient-to-r from-warm to-warm-dark bg-clip-text text-transparent">
                从食趣开始
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted">
              精选菜谱 · 视频教学 · 分步跟做 · 购物清单，一站式学做菜。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/recipes"
                className="rounded-full bg-gradient-to-r from-warm to-warm-dark px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                开始探索
              </Link>
              <Link
                href="/recipes/1"
                className="rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-ink transition hover:border-warm hover:text-warm"
              >
                ▶ 今日推荐：番茄炒蛋
              </Link>
            </div>
          </div>

          {/* 快捷入口 */}
          <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { href: "/recipes", icon: "📖", label: "全部菜谱" },
              { href: "/ranking", icon: "🏆", label: "热门排行" },
              { href: "/shopping", icon: "🛒", label: "购物清单" },
              { href: "/community", icon: "💬", label: "厨友社区" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium text-ink sm:text-sm">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-ink">🔥 今日精选</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {featured.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">🏆 人气排行榜</h2>
          <Link href="/ranking" className="text-sm text-warm hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="space-y-3">
          {top.map((r, i) => (
            <Link
              key={r.id}
              href={`/recipes/${r.id}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-gray-300 text-white" : "bg-orange-300 text-white"
              }`}>
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink">{r.title}</p>
                <p className="text-sm text-muted">{r.likes.toLocaleString()} 人喜欢 · ▶ 有视频</p>
              </div>
              <span className="text-warm">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
