import { Suspense } from "react";
import type { Metadata } from "next";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bộ đếm | Redux Toolkit",
  description: "Ứng dụng đếm với bước nhảy tùy chỉnh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full">
        <Suspense fallback={null}>
          <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
