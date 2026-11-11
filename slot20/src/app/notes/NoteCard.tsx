"use client";

import { useState } from "react";
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "@/lib/features/notes/notesApi";
import { getErrorMessage } from "@/lib/errors";
import type { Note } from "@/types";

type Props = {
  note: Note;
  color: string;
};

export default function NoteCard({ note, color }: Props) {
  const [updateNote, { isLoading: saving }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: deleting }] = useDeleteNoteMutation();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    try {
      await updateNote({ id: note.id, title, content }).unwrap();
      setError(null);
      setEditing(false);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Xóa ghi chú "${note.title}"?`)) return;
    try {
      await deleteNote(note.id).unwrap();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  if (editing) {
    return (
      <article
        className={`flex flex-col gap-2 rounded-xl p-4 shadow-md ring-2 ring-blue-500 ${color}`}
      >
        <label htmlFor={`note-title-${note.id}`} className="sr-only">
          Tiêu đề ghi chú
        </label>
        <input
          id={`note-title-${note.id}`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
          className="rounded bg-white/70 px-2 py-1 font-bold text-slate-800 focus:outline-none"
        />
        <label htmlFor={`note-content-${note.id}`} className="sr-only">
          Nội dung ghi chú
        </label>
        <textarea
          id={`note-content-${note.id}`}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={4}
          className="resize-none rounded bg-white/70 px-2 py-1 text-sm text-slate-800 focus:outline-none"
        />
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setTitle(note.title);
              setContent(note.content);
              setError(null);
            }}
            className="rounded px-3 py-1 text-slate-600 hover:bg-white/60"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group flex flex-col rounded-xl p-4 text-slate-800 shadow-sm transition hover:-rotate-1 hover:shadow-md ${color} ${deleting ? "opacity-50" : ""}`}
    >
      <h2 className="font-bold">{note.title}</h2>
      <p className="mt-2 flex-1 whitespace-pre-line text-sm">{note.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <time dateTime={note.createdAt} className="text-xs text-slate-500">
          {new Date(note.createdAt).toLocaleDateString("vi-VN")}
        </time>
        <div className="flex gap-3 text-sm opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Sửa
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:underline disabled:opacity-50"
          >
            {deleting ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </article>
  );
}
