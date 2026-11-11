"use client";

import Image from "next/image";
import Link from "next/link";
import {
  cartCleared,
  quantityChanged,
  removedFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector, useIsMounted } from "@/lib/hooks";
import { formatUSD } from "@/lib/format";

export default function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);
  const isMounted = useIsMounted();
  const visibleItems = isMounted ? items : [];

  if (visibleItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">🛒</p>
        <p className="mt-4 text-slate-500">Giỏ hàng đang trống.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-slate-200 rounded-2xl bg-white dark:divide-slate-800 dark:bg-slate-900">
        {visibleItems.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative size-20 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${item.id}`}
                className="line-clamp-1 font-semibold hover:text-blue-600"
              >
                {item.title}
              </Link>
              <p className="text-sm text-slate-500">{formatUSD(item.price)}</p>
            </div>
            <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    quantityChanged({ id: item.id, quantity: item.quantity - 1 }),
                  )
                }
                className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={`Giảm số lượng ${item.title}`}
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{item.quantity}</span>
              <button
                type="button"
                disabled={item.quantity >= 99}
                onClick={() =>
                  dispatch(
                    quantityChanged({ id: item.id, quantity: item.quantity + 1 }),
                  )
                }
                className="px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
                aria-label={`Tăng số lượng ${item.title}`}
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold">
              {formatUSD(item.price * item.quantity)}
            </p>
            <button
              type="button"
              onClick={() => dispatch(removedFromCart(item.id))}
              className="text-red-500 hover:text-red-700"
              aria-label={`Xóa ${item.title}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 lg:sticky lg:top-20 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>
        <div className="flex justify-between text-sm text-slate-500">
          <span>Số lượng</span>
          <span>{isMounted ? count : 0} sản phẩm</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-4 text-xl font-bold dark:border-slate-800">
          <span>Tổng</span>
          <span className="text-red-600">{formatUSD(isMounted ? total : 0)}</span>
        </div>
        <button
          type="button"
          disabled
          title="Chức năng thanh toán chưa được triển khai"
          className="w-full cursor-not-allowed rounded-xl bg-blue-600 py-3 font-semibold text-white opacity-50"
        >
          Thanh toán
        </button>
        <button
          type="button"
          onClick={() => dispatch(cartCleared())}
          className="w-full text-sm text-slate-500 hover:text-red-600 hover:underline"
        >
          Xóa toàn bộ giỏ hàng
        </button>
      </aside>
    </div>
  );
}
