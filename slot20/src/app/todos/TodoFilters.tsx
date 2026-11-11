"use client";

import { filterChanged, selectTodoFilter } from "@/lib/features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import type { TodoFilter } from "@/types";

const LABELS: Record<TodoFilter, string> = {
  all: "Tất cả",
  active: "Chưa xong",
  done: "Đã xong",
};

export default function TodoFilters() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectTodoFilter);

  return (
    <div className="flex flex-wrap gap-2" aria-label="Lọc công việc">
      {(Object.keys(LABELS) as TodoFilter[]).map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => dispatch(filterChanged(filter))}
          aria-pressed={current === filter}
          className={`rounded-full px-4 py-1 text-sm transition ${
            current === filter
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          {LABELS[filter]}
        </button>
      ))}
    </div>
  );
}
