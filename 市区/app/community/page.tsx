"use client";

import Link from "next/link";
import { recipes } from "@/lib/recipes";
import { useApp, useCanAccessApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommunityPage() {
  const { comments, addComment } = useApp();
  const canAccess = useCanAccessApp();
  const router = useRouter();
  const [text, setText] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("1");

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  if (!canAccess) return null;

  const handlePost = () => {
    addComment(selectedRecipe, text);
    setText("");
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-ink">💬 厨友社区</h1>
      <p className="mb-8 text-muted">分享你的做菜心得和成品照片</p>

      <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
        <select
          value={selectedRecipe}
          onChange={(e) => setSelectedRecipe(e.target.value)}
          className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-warm"
        >
          {recipes.map((r) => (
            <option key={r.id} value={r.id}>{r.title}</option>
          ))}
        </select>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="写下你的做菜心得…"
          rows={3}
          className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-warm focus:ring-2 focus:ring-warm/20"
        />
        <button
          type="button"
          onClick={handlePost}
          disabled={!text.trim()}
          className="rounded-full bg-warm px-6 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          发布
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((c) => {
          const recipe = recipes.find((r) => r.id === c.recipeId);
          return (
            <article key={c.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm">
                    👨‍🍳
                  </span>
                  <span className="font-medium text-ink">{c.user}</span>
                  <span className="text-xs text-muted">{c.time}</span>
                </div>
                {recipe && (
                  <Link href={`/recipes/${recipe.id}`} className="text-xs text-warm hover:underline">
                    #{recipe.title}
                  </Link>
                )}
              </div>
              <p className="text-sm leading-relaxed text-ink">{c.text}</p>
              <p className="mt-2 text-xs text-muted">❤️ {c.likes}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
