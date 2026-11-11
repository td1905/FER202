"use client";

import {
  allToggled,
  completedCleared,
  selectTodoStats,
} from "@/lib/features/todos/todosSlice";
import { useAppDispatch, useAppSelector, useIsMounted } from "@/lib/hooks";

export default function TodoStats() {
  const dispatch = useAppDispatch();
  const { total, done, active, percent } = useAppSelector(selectTodoStats);
  const isMounted = useIsMounted();

  if (!isMounted || total === 0) return null;

  return (
    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
        role="progressbar"
        aria-label="Tiến độ công việc"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex flex-col justify-between gap-3 text-slate-500 sm:flex-row sm:items-center">
        <span>
          Còn <b className="text-slate-900 dark:text-white">{active}</b> việc ·
          Xong {done}/{total} ({percent}%)
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => dispatch(allToggled())}
            className="hover:text-blue-600 hover:underline"
          >
            Đảo tất cả
          </button>
          <button
            type="button"
            onClick={() => dispatch(completedCleared())}
            disabled={done === 0}
            className="hover:text-red-600 hover:underline disabled:opacity-40 disabled:no-underline"
          >
            Xóa việc đã xong
          </button>
        </div>
      </div>
    </div>
  );
}
