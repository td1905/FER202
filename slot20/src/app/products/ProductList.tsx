"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  fetchProducts,
  selectProductsError,
  selectProductsQuery,
  selectProductsStatus,
  selectSort,
  selectSortedProducts,
  sortChanged,
  type SortKey,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ProductCard from "./ProductCard";

const SORT_LABELS: Record<SortKey, string> = {
  default: "Mặc định",
  "price-asc": "Giá tăng dần",
  "price-desc": "Giá giảm dần",
  rating: "Đánh giá cao",
};

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectSortedProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const query = useAppSelector(selectProductsQuery);
  const sort = useAppSelector(selectSort);
  const [text, setText] = useState(query);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts(""));
  }, [status, dispatch]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(fetchProducts(text.trim()));
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <label htmlFor="product-search" className="sr-only">
            Tìm sản phẩm
          </label>
          <input
            id="product-search"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64 dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-blue-600 px-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Tìm
          </button>
        </form>

        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          Sắp xếp
          <select
            value={sort}
            onChange={(event) =>
              dispatch(sortChanged(event.target.value as SortKey))
            }
            className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === "loading" && <ProductSkeleton />}
      {status === "failed" && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950"
        >
          <p className="font-semibold text-red-700 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchProducts(query))}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      )}
      {status === "succeeded" &&
        (products.length === 0 ? (
          <p className="py-20 text-center text-slate-500">
            Không tìm thấy sản phẩm nào cho “{query}”.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
    </>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
      aria-label="Đang tải sản phẩm"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <div className="aspect-square bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2 p-4">
            <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
