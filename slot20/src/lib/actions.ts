import { createAction } from "@reduxjs/toolkit";
import type { PersistedState } from "@/lib/persist";

export const hydrate = createAction<PersistedState>("app/hydrate");
