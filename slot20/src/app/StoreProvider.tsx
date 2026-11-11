"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { hydrate } from "@/lib/actions";
import { makeStore, type AppStore } from "@/lib/store";
import { loadState, saveState, selectPersisted } from "@/lib/persist";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    const savedState = loadState();
    if (savedState) store.dispatch(hydrate(savedState));

    const unsubscribe = store.subscribe(() => {
      saveState(selectPersisted(store.getState()));
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
