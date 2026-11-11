import type { RootState } from "@/lib/store";
import type { Theme } from "@/lib/features/ui/uiSlice";
import type { TodosState } from "@/lib/features/todos/todosSlice";
import type { CartItem, Todo, TodoFilter } from "@/types";
import type { CartState } from "@/lib/features/cart/cartSlice";

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
  cart?: CartState;
};

const STORAGE_KEY = "slot20-state";

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme, todos: state.todos, cart: state.cart };
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

function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    Number.isInteger(value.id) &&
    typeof value.title === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    typeof value.thumbnail === "string" &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    value.quantity <= 99
  );
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
    const cart = isRecord(parsed.cart) ? parsed.cart : undefined;
    const persistedCart =
      cart && Array.isArray(cart.items) && cart.items.every(isCartItem)
        ? { items: cart.items }
        : undefined;
    return { theme, todos: persistedTodos, cart: persistedCart };
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
