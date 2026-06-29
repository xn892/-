"use client";

import { useMemo, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { categories, recipes } from "@/lib/recipes";

export function RecipeExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchCat = category === "全部" || r.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [query, category]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-ink">探索菜谱</h2>
        <input
          type="search"
          placeholder="搜索菜名、食材、标签…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm outline-none transition focus:border-warm focus:ring-2 focus:ring-warm/20 sm:max-w-xs"
        />
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === cat
                ? "bg-warm text-white shadow"
                : "bg-white text-muted hover:bg-orange-50 hover:text-warm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">没有找到匹配的菜谱，换个关键词试试</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r, i) => (
            <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
