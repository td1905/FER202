import type { RootState } from "@/lib/store";
import type { Theme } from "@/lib/features/ui/uiSlice";
import type { TodosState } from "@/lib/features/todos/todosSlice";
import type { Todo, TodoFilter } from "@/types";

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
};

const STORAGE_KEY = "slot20-state";

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme, todos: state.todos };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTodo(value: unknown): value is Todo {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.text === "string" &&
    typeof value.done === "boolean" &&
    typeof value.createdAt === "string"
  );
}

function isTodoFilter(value: unknown): value is TodoFilter {
  return value === "all" || value === "active" || value === "done";
}

export function loadState(): PersistedState | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      console.warn("Ignoring invalid saved application state.");
      return undefined;
    }

    const theme =
      parsed.theme === "light" || parsed.theme === "dark"
        ? parsed.theme
        : undefined;
    const todos = isRecord(parsed.todos) ? parsed.todos : undefined;
    const persistedTodos =
      todos &&
      Array.isArray(todos.items) &&
      todos.items.every(isTodo) &&
      isTodoFilter(todos.filter)
        ? { items: todos.items, filter: todos.filter }
        : undefined;
    return { theme, todos: persistedTodos };
  } catch (error) {
    console.warn("Unable to read saved application state.", error);
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Unable to save application state.", error);
  }
}
