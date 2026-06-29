"use client";

import { LandingPage } from "@/components/LandingPage";
import { useCanAccessApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const canAccess = useCanAccessApp();
  const router = useRouter();

  useEffect(() => {
    if (canAccess) router.replace("/home");
  }, [canAccess, router]);

  if (canAccess) return null;
  return <LandingPage />;
}
