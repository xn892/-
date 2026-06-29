"use client";

import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import { useApp } from "@/lib/context";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(recipe.id);

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/recipes/${recipe.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
            unoptimized={recipe.image.includes("youtube.com")}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-sage">
            {recipe.difficulty}
          </span>
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-bold text-white shadow">
            ▶ 视频教学
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <Link href={`/recipes/${recipe.id}`}>
            <h3 className="font-bold text-ink transition group-hover:text-warm">
              {recipe.title}
            </h3>
          </Link>
          <button
            type="button"
            aria-label={fav ? "取消收藏" : "收藏"}
            onClick={() => toggleFavorite(recipe.id)}
            className="text-lg transition hover:scale-110"
          >
            {fav ? "❤️" : "🤍"}
          </button>
        </div>
        <p className="mb-2 line-clamp-2 text-sm text-muted">{recipe.description}</p>
        <div className="mb-2 flex items-center gap-1 text-xs text-amber-500">
          {"★".repeat(Math.round(recipe.rating))}
          <span className="text-muted">{recipe.rating} · {recipe.author}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>⏱ {recipe.time}</span>
          <span>🔥 {recipe.calories} kcal</span>
          <span>👍 {(recipe.likes / 1000).toFixed(1)}k</span>
        </div>
      </div>
    </article>
  );
}
