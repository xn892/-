import type { Metadata } from "next";
import { AppProvider } from "@/lib/context";
import { Header, MobileNav } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "食趣 - 学做菜，厨房小白也能变大厨",
  description: "精选菜谱、视频教学、分步跟做、购物清单，让每一餐都充满乐趣。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="pb-20 lg:pb-0">
        <AppProvider>
          <Header />
          <main>{children}</main>
          <MobileNav />
        </AppProvider>
      </body>
    </html>
  );
}
