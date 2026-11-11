import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    resetCounter: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementByAmount, decrementByAmount, resetCounter } =
  counterSlice.actions;
export default counterSlice.reducer;
