"use client";

import { useApp, useCanAccessApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShoppingPage() {
  const { shoppingList, removeFromShoppingList, clearShoppingList } = useApp();
  const canAccess = useCanAccessApp();
  const router = useRouter();

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  if (!canAccess) return null;

  const grouped = shoppingList.reduce<Record<string, typeof shoppingList>>((acc, item) => {
    if (!acc[item.recipe]) acc[item.recipe] = [];
    acc[item.recipe].push(item);
    return acc;
  }, {});

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">🛒 购物清单</h1>
          <p className="text-sm text-muted">从菜谱一键添加，买菜不遗漏</p>
        </div>
        {shoppingList.length > 0 && (
          <button
            type="button"
            onClick={clearShoppingList}
            className="text-sm text-red-500 hover:underline"
          >
            清空
          </button>
        )}
      </div>

      {shoppingList.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
          <p className="mb-4 text-4xl">🛒</p>
          <p className="text-muted">清单是空的</p>
          <p className="mt-2 text-sm text-muted">打开任意菜谱，点击「加入购物清单」</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([recipe, items]) => (
            <div key={recipe} className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="mb-3 font-bold text-warm">{recipe}</h3>
              <ul className="space-y-2">
                {items.map((item, idx) => {
                  const globalIdx = shoppingList.indexOf(item);
                  return (
                    <li key={`${item.name}-${idx}`} className="flex items-center justify-between rounded-xl bg-orange-50/50 px-4 py-2">
                      <label className="flex flex-1 cursor-pointer items-center gap-3">
                        <input type="checkbox" className="h-4 w-4 accent-warm" />
                        <span>{item.name}</span>
                        <span className="text-sm text-muted">{item.amount}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeFromShoppingList(globalIdx)}
                        className="ml-2 text-muted hover:text-red-500"
                      >
                        ✕
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
