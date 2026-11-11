"use client";

import { useGetNotesQuery } from "@/lib/features/notes/notesApi";
import { getErrorMessage } from "@/lib/errors";
import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";

const COLORS = [
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-pink-100",
  "bg-purple-100",
];

export default function NotesBoard() {
  const {
    data: notes = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetNotesQuery();

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          🗒️ Ghi chú ({notes.length})
          {isFetching && !isLoading && (
            <span className="text-xs font-normal text-slate-400">
              đang đồng bộ…
            </span>
          )}
        </h1>
        <NoteForm />
      </aside>

      <section>
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        )}
        {isError && (
          <div
            role="alert"
            className="rounded-xl bg-red-50 p-6 text-center text-red-700 dark:bg-red-950 dark:text-red-400"
          >
            {getErrorMessage(error)}
            <button
              type="button"
              onClick={() => refetch()}
              className="ml-2 underline"
            >
              Thử lại
            </button>
          </div>
        )}
        {!isLoading &&
          !isError &&
          (notes.length === 0 ? (
            <p className="text-slate-500">Chưa có ghi chú nào.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {notes.map((note, index) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  color={COLORS[index % COLORS.length]}
                />
              ))}
            </div>
          ))}
      </section>
    </div>
  );
}
