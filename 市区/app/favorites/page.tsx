"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/lib/recipes";
import { useApp, useCanAccessApp } from "@/lib/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FavoritesPage() {
  const { favorites } = useApp();
  const canAccess = useCanAccessApp();
  const router = useRouter();
  const items = recipes.filter((r) => favorites.includes(r.id));

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  if (!canAccess) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h2 className="mb-6 text-2xl font-bold text-ink">我的收藏</h2>
      {items.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
          <p className="mb-4 text-4xl">🤍</p>
          <p className="text-muted">还没有收藏任何菜谱</p>
          <Link href="/recipes" className="mt-4 inline-block text-warm hover:underline">
            去发现美味 →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </section>
  );
}
