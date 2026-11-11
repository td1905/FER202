"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  todoEdited,
  todoRemoved,
  todoToggled,
} from "@/lib/features/todos/todosSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { Todo } from "@/types";

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const cancelEdit = useRef(false);

  function save() {
    if (draft.trim()) {
      dispatch(todoEdited({ id: todo.id, text: draft }));
    } else {
      setDraft(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") save();
    if (event.key === "Escape") {
      cancelEdit.current = true;
      setDraft(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 py-3">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch(todoToggled(todo.id))}
        className="peer size-5 cursor-pointer accent-blue-600"
        aria-label={`Đánh dấu ${todo.text}`}
      />
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            if (cancelEdit.current) {
              cancelEdit.current = false;
              return;
            }
            save();
          }}
          onKeyDown={handleKeyDown}
          aria-label="Sửa công việc"
          className="flex-1 rounded border border-blue-400 px-2 py-1 focus:outline-none dark:bg-slate-800"
        />
      ) : (
        <label
          htmlFor={`todo-${todo.id}`}
          onDoubleClick={() => {
            setDraft(todo.text);
            setEditing(true);
          }}
          className="flex-1 cursor-pointer select-none transition peer-checked:text-slate-400 peer-checked:line-through"
          title="Nhấp đúp để sửa"
        >
          {todo.text}
        </label>
      )}
      <button
        type="button"
        onClick={() => dispatch(todoRemoved(todo.id))}
        className="rounded px-2 text-red-500 opacity-0 transition hover:bg-red-50 group-hover:opacity-100 focus:opacity-100 dark:hover:bg-red-950"
        aria-label={`Xóa ${todo.text}`}
      >
        ✕
      </button>
    </li>
  );
}
