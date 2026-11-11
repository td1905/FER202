import Link from "next/link";

const features = [
  { icon: "🔢", title: "Counter", desc: "createSlice, PayloadAction, typed hooks", href: "/counter" },
  { icon: "📝", title: "Todo", desc: "prepare, nanoid, createSelector", href: "/todos" },
  { icon: "🛒", title: "Shop", desc: "createAsyncThunk, giỏ hàng", href: "/products" },
  { icon: "🗒️", title: "Notes", desc: "Route Handlers + RTK Query", href: "/notes" },
];

export default function Home() {
  return (
    <>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Next.js +{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Redux Toolkit
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Quản lý state toàn cục đúng chuẩn App Router, giao diện bằng Tailwind CSS.
        </p>
      </section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h2 className="mt-4 text-lg font-semibold group-hover:text-blue-600">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {feature.desc}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
