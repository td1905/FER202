"use client";

import { useState } from "react";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  selectCount,
  selectStep,
  stepChanged,
} from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const STEPS = [1, 5, 10] as const;
const COUNT_COLORS = {
  positive: "text-green-600",
  negative: "text-red-600",
  zero: "text-slate-400",
} as const;

export default function Counter() {
  const count = useAppSelector(selectCount);
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("2");
  const amountNumber = Number(amount);
  const canAddAmount = Number.isFinite(amountNumber) && amountNumber !== 0;
  const countColor =
    count > 0
      ? COUNT_COLORS.positive
      : count < 0
        ? COUNT_COLORS.negative
        : COUNT_COLORS.zero;

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg sm:p-9 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
        Giá trị hiện tại
      </p>
      <output
        aria-live="polite"
        aria-atomic="true"
        className={`my-4 block text-7xl font-black tabular-nums transition ${countColor}`}
      >
        {count}
      </output>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(decrement())}
          className="size-14 rounded-full bg-red-500 text-2xl font-bold text-white transition hover:bg-red-600 active:scale-90"
          aria-label="Giảm"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => dispatch(reset())}
          className="rounded-full border border-slate-300 px-6 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Đặt lại
        </button>
        <button
          type="button"
          onClick={() => dispatch(increment())}
          className="size-14 rounded-full bg-green-600 text-2xl font-bold text-white transition hover:bg-green-700 active:scale-90"
          aria-label="Tăng"
        >
          +
        </button>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm text-slate-500">Bước nhảy</p>
        <div className="inline-flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700">
          {STEPS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => dispatch(stepChanged(value))}
              aria-pressed={step === value}
              className={`px-4 py-1.5 text-sm font-semibold transition ${
                step === value
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <form
        className="mt-6 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (canAddAmount) dispatch(incrementByAmount(amountNumber));
        }}
      >
        <label htmlFor="counter-amount" className="sr-only">
          Số muốn cộng
        </label>
        <input
          id="counter-amount"
          type="number"
          step="any"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
        />
        <button
          type="submit"
          disabled={!canAddAmount}
          className="whitespace-nowrap rounded-lg bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40"
        >
          Cộng tùy ý
        </button>
      </form>
    </section>
  );
}
