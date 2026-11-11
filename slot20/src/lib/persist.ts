import type { RootState } from "@/lib/store";
import type { Theme } from "@/lib/features/ui/uiSlice";

export type PersistedState = {
  theme?: Theme;
};

const STORAGE_KEY = "slot20-state";

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
    return { theme };
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
