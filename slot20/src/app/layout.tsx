import { Suspense } from "react";
import type { Metadata } from "next";
import StoreProvider from "@/app/StoreProvider";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import ThemeSync from "@/app/_components/ThemeSync";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Slot 20 – Next.js + RTK",
    template: "%s | Slot 20",
  },
  description: "Next.js, Tailwind CSS và Redux Toolkit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Suspense fallback={null}>
          <StoreProvider>
            <ThemeSync />
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
              {children}
            </main>
            <Footer />
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
