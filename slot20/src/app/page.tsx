import Counter from "@/components/Counter";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md">
        <Counter />
        <p className="mt-6 text-center text-xs text-slate-500">
          Next.js · TypeScript · Tailwind CSS · Redux Toolkit
        </p>
      </div>
    </main>
  );
}
