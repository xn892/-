"use client";

import Link from "next/link";
import Image from "next/image";
import { getTopRecipes } from "@/lib/recipes";
import { useCanAccessApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RankingPage() {
  const canAccess = useCanAccessApp();
  const router = useRouter();
  const ranked = getTopRecipes(8);

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  if (!canAccess) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-ink">🏆 人气排行榜</h1>
      <p className="mb-8 text-muted">根据厨友点赞数实时更新</p>
      <div className="space-y-4">
        {ranked.map((r, i) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-lg"
          >
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-bold ${
              i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white" :
              i === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white" :
              i === 2 ? "bg-gradient-to-br from-orange-300 to-orange-400 text-white" :
              "bg-orange-50 text-warm"
            }`}>
              {i + 1}
            </span>
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <Image src={r.image} alt={r.title} fill className="object-cover" unoptimized={r.image.includes("youtube.com")} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink">{r.title}</p>
              <p className="text-sm text-muted">{r.likes.toLocaleString()} 赞 · {r.rating}★ · ▶ 视频教学</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
