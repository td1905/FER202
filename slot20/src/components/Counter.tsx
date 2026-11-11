"use client";

import { useState } from "react";
import {
  decrementByAmount,
  incrementByAmount,
  resetCounter,
} from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [stepInput, setStepInput] = useState("1");
  const step = Number(stepInput);
  const isStepValid =
    stepInput.trim() !== "" && Number.isFinite(step) && step > 0;

  return (
    <section className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-7 shadow-[0_24px_80px_-32px_rgba(30,64,175,0.35)] backdrop-blur sm:p-9">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
          Redux Toolkit
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Bộ đếm
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Tăng hoặc giảm theo bước nhảy bạn chọn.
        </p>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="mb-7 rounded-2xl bg-slate-50 px-5 py-7 text-center"
      >
        <p className="mb-2 text-sm font-medium text-slate-500">Giá trị hiện tại</p>
        <output className="text-6xl font-bold tabular-nums tracking-tight text-slate-900">
          {count}
        </output>
      </div>

      <label
        htmlFor="counter-step"
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        Bước nhảy
      </label>
      <input
        id="counter-step"
        type="number"
        min="0.01"
        step="any"
        value={stepInput}
        onChange={(event) => setStepInput(event.target.value)}
        aria-invalid={!isStepValid}
        aria-describedby={!isStepValid ? "step-error" : undefined}
        className="mb-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
      {!isStepValid && (
        <p id="step-error" role="alert" className="mb-4 text-sm text-red-600">
          Nhập một số lớn hơn 0.
        </p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={!isStepValid}
          onClick={() => dispatch(decrementByAmount(step))}
          className="rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          − Giảm
        </button>
        <button
          type="button"
          disabled={!isStepValid}
          onClick={() => dispatch(incrementByAmount(step))}
          className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Tăng
        </button>
      </div>
      <button
        type="button"
        onClick={() => dispatch(resetCounter())}
        className="mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Đặt lại
      </button>
    </section>
  );
}
