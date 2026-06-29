"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { useApp, useCanAccessApp } from "@/lib/context";

const NAV = [
  { href: "/home", label: "首页" },
  { href: "/recipes", label: "菜谱" },
  { href: "/ranking", label: "排行榜" },
  { href: "/community", label: "社区" },
  { href: "/shopping", label: "购物清单" },
  { href: "/favorites", label: "收藏" },
];

export function Header() {
  const { user, logout, favorites, shoppingList } = useApp();
  const canAccess = useCanAccessApp();
  const pathname = usePathname();
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);

  if (pathname === "/" || !canAccess) return null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-orange-100/80 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/home" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-warm to-warm-dark text-lg text-white shadow">
              🍳
            </span>
            <div>
              <span className="text-lg font-bold text-ink">食趣</span>
              <span className="ml-2 hidden text-xs text-muted sm:inline">学做菜</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-warm ${pathname === item.href ? "text-warm" : "text-ink"}`}
              >
                {item.label}
                {item.href === "/favorites" && favorites.length > 0 && ` (${favorites.length})`}
                {item.href === "/shopping" && shoppingList.length > 0 && ` (${shoppingList.length})`}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link href="/profile" className="hidden text-sm text-muted hover:text-warm sm:inline">
                  你好，{user.name}
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); router.push("/"); }}
                  className="rounded-full border border-gray-200 px-4 py-1.5 text-sm transition hover:border-warm hover:text-warm"
                >
                  退出
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="rounded-full bg-gradient-to-r from-warm to-warm-dark px-5 py-2 text-sm font-semibold text-white shadow transition hover:opacity-90"
              >
                登录
              </button>
            )}
          </div>
        </div>
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const canAccess = useCanAccessApp();

  if (pathname === "/" || !canAccess) return null;

  const items = [
    { href: "/home", icon: "🏠", label: "首页" },
    { href: "/recipes", icon: "📖", label: "菜谱" },
    { href: "/ranking", icon: "🏆", label: "排行" },
    { href: "/community", icon: "💬", label: "社区" },
    { href: "/profile", icon: "👤", label: "我的" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-orange-100 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="flex justify-around py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs transition ${
              pathname === item.href ? "text-warm" : "text-muted"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
