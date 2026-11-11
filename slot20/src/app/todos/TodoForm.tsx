"use client";

import { useState, type FormEvent } from "react";
import { todoAdded } from "@/lib/features/todos/todosSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) return;
    dispatch(todoAdded(text));
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="todo-text" className="sr-only">
        Công việc mới
      </label>
      <input
        id="todo-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Hôm nay bạn cần làm gì?"
        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-lg bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Thêm
      </button>
    </form>
  );
}
