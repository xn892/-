"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { RecipeCard } from "@/components/RecipeCard";
import { getRecipe, getRelatedRecipes } from "@/lib/recipes";
import { useApp, useCanAccessApp } from "@/lib/context";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const recipe = getRecipe(id);
  const { isFavorite, toggleFavorite, addToShoppingList, comments, addComment } = useApp();
  const canAccess = useCanAccessApp();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [shopAdded, setShopAdded] = useState(false);

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  if (!canAccess) return null;
  if (!recipe) notFound();

  const related = getRelatedRecipes(id);
  const recipeComments = comments.filter((c) => c.recipeId === id);
  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const toggleIng = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleAddShopping = () => {
    addToShoppingList(recipe.id, recipe.title, recipe.ingredients);
    setShopAdded(true);
    setTimeout(() => setShopAdded(false), 2000);
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Link href="/recipes" className="mb-4 inline-block text-sm text-warm hover:underline">
        ← 返回菜谱
      </Link>

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
        {/* 教学视频 */}
        <div className="p-4 sm:p-6">
          <VideoPlayer videoId={recipe.videoId} title={recipe.videoTitle} />
        </div>

        <div className="relative aspect-[16/9] sm:mx-6 sm:mb-4 sm:overflow-hidden sm:rounded-2xl">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width:768px) 100vw, 896px"
            unoptimized={recipe.image.includes("youtube.com")}
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-ink">{recipe.title}</h1>
              <p className="mt-2 text-muted">{recipe.description}</p>
              <p className="mt-1 text-sm text-amber-500">
                {"★".repeat(Math.round(recipe.rating))} {recipe.rating} · 作者：{recipe.author}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggleFavorite(recipe.id)}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm transition hover:border-warm"
              >
                {isFavorite(recipe.id) ? "❤️ 已收藏" : "🤍 收藏"}
              </button>
              <button
                type="button"
                onClick={handleAddShopping}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm transition hover:border-warm"
              >
                {shopAdded ? "✓ 已加入清单" : "🛒 加入购物清单"}
              </button>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 text-sm">
            {[
              `⏱ ${recipe.time}`,
              `👨‍🍳 ${recipe.difficulty}`,
              `🍽 ${recipe.servings} 人份`,
              `🔥 ${recipe.calories} kcal`,
              `👍 ${recipe.likes.toLocaleString()}`,
            ].map((tag) => (
              <span key={tag} className="rounded-full bg-orange-50 px-3 py-1 text-warm-dark">
                {tag}
              </span>
            ))}
            {recipe.tags.map((t) => (
              <span key={t} className="rounded-full bg-green-50 px-3 py-1 text-sage">
                #{t}
              </span>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-r from-orange-50 to-green-50 p-4">
            <div className="font-mono text-3xl font-bold text-ink">{fmt(seconds)}</div>
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="rounded-full bg-warm px-4 py-2 text-sm font-semibold text-white"
            >
              {running ? "暂停" : "开始计时"}
            </button>
            <button
              type="button"
              onClick={() => { setSeconds(0); setRunning(false); }}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm"
            >
              重置
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="mb-4 text-xl font-bold">食材清单</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={ing.name}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-orange-50">
                      <input
                        type="checkbox"
                        checked={checked.has(i)}
                        onChange={() => toggleIng(i)}
                        className="h-4 w-4 accent-warm"
                      />
                      <span className={checked.has(i) ? "text-muted line-through" : ""}>
                        {ing.name}
                      </span>
                      <span className="ml-auto text-sm text-muted">{ing.amount}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold">
                烹饪步骤 ({step + 1}/{recipe.steps.length})
              </h2>
              <div className="space-y-3">
                {recipe.steps.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setStep(i)}
                    className={`w-full overflow-hidden rounded-xl border text-left transition ${
                      step === i
                        ? "border-warm bg-orange-50 shadow-sm"
                        : "border-gray-100 bg-gray-50/50 hover:border-orange-200"
                    }`}
                  >
                    {s.image && (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={s.image}
                          alt={`步骤 ${i + 1}`}
                          fill
                          className="object-cover"
                          unoptimized={s.image.includes("youtube.com")}
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="mb-1 inline-block rounded-full bg-warm px-2 py-0.5 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed">{s.text}</p>
                      {s.tip && <p className="mt-2 text-xs text-sage">💡 {s.tip}</p>}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 rounded-xl border py-2 text-sm disabled:opacity-40"
                >
                  上一步
                </button>
                <button
                  type="button"
                  disabled={step === recipe.steps.length - 1}
                  onClick={() => setStep((s) => s + 1)}
                  className="flex-1 rounded-xl bg-warm py-2 text-sm font-semibold text-white disabled:opacity-40"
                >
                  下一步
                </button>
              </div>
            </section>
          </div>

          {/* 评论区 */}
          <section className="mt-10 border-t border-gray-100 pt-8">
            <h2 className="mb-4 text-xl font-bold">厨友评价 ({recipeComments.length})</h2>
            <div className="mb-4 flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="分享你的做菜心得…"
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-warm"
              />
              <button
                type="button"
                onClick={() => { addComment(recipe.id, commentText); setCommentText(""); }}
                disabled={!commentText.trim()}
                className="rounded-xl bg-warm px-4 py-2 text-sm text-white disabled:opacity-40"
              >
                发布
              </button>
            </div>
            <div className="space-y-3">
              {recipeComments.map((c) => (
                <div key={c.id} className="rounded-xl bg-orange-50/50 p-4">
                  <p className="text-sm font-medium text-ink">{c.user} <span className="font-normal text-muted">{c.time}</span></p>
                  <p className="mt-1 text-sm">{c.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-ink">相关推荐</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
