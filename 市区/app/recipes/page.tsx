"use client";

import { RecipeExplorer } from "@/components/RecipeExplorer";
import { useCanAccessApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RecipesPage() {
  const canAccess = useCanAccessApp();
  const router = useRouter();

  useEffect(() => {
    if (!canAccess) router.replace("/");
  }, [canAccess, router]);

  if (!canAccess) return null;
  return <RecipeExplorer />;
}
