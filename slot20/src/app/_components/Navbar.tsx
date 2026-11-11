"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuClosed, menuToggled, selectMenuOpen, selectTheme, themeToggled } from "@/lib/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CartBadge from "./CartBadge";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/counter", label: "Counter" },
  { href: "/todos", label: "Todo" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/notes", label: "Ghi chú" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const menuOpen = useAppSelector(selectMenuOpen);

  function linkClass(href: string) {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `rounded-lg px-3 py-2 text-sm font-medium transition ${
      active
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-blue-600">
          Next<span className="text-slate-900 dark:text-white">RTK</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={linkClass(href)} aria-current={pathname === href ? "page" : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CartBadge />
          <button
            type="button"
            onClick={() => dispatch(themeToggled())}
            className="rounded-lg p-2 text-lg transition hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Đổi giao diện sáng/tối"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            type="button"
            onClick={() => dispatch(menuToggled())}
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-slate-200 px-4 py-2 md:hidden dark:border-slate-800">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => dispatch(menuClosed())}
                className={`block ${linkClass(href)}`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
