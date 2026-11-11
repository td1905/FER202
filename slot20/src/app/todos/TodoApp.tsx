"use client";

import { selectVisibleTodos } from "@/lib/features/todos/todosSlice";
import { useAppSelector } from "@/lib/hooks";
import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoStats from "./TodoStats";

export default function TodoApp() {
  const todos = useAppSelector(selectVisibleTodos);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <TodoForm />
      <div className="mt-5">
        <TodoFilters />
      </div>
      <ul className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
        {todos.length === 0 ? (
          <li className="py-10 text-center text-slate-400">
            Không có công việc nào 🎉
          </li>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>
      <TodoStats />
    </section>
  );
}
