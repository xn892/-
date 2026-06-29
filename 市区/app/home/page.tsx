"use client";

import { Hero } from "@/components/HomeSections";
import { RecipeExplorer } from "@/components/RecipeExplorer";
import { useCanAccessApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const canAccess = useCanAccessApp();
  const router = useRouter();

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  if (!canAccess) return null;

  return (
    <>
      <Hero />
      <RecipeExplorer />
      <footer className="border-t border-orange-100 py-8 text-center text-sm text-muted">
        <p>食趣 · 让做饭变成一件有趣的事</p>
      </footer>
    </>
  );
}
