import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/lib/features/counter/counterSlice";
import cartReducer from "@/lib/features/cart/cartSlice";
import productsReducer from "@/lib/features/products/productsSlice";
import todosReducer from "@/lib/features/todos/todosSlice";
import uiReducer from "@/lib/features/ui/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      products: productsReducer,
      cart: cartReducer,
      ui: uiReducer,
      todos: todosReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
