import { promises as fs } from "node:fs";
import path from "node:path";
import type { Note, NoteInput, NoteUpdate } from "@/types";

const FILE_PATH = path.join(process.cwd(), "data", "notes.json");
let operationQueue: Promise<unknown> = Promise.resolve();

function runExclusive<T>(operation: () => Promise<T>): Promise<T> {
  const currentOperation = operationQueue.then(operation, operation);
  operationQueue = currentOperation.then(
    () => undefined,
    () => undefined,
  );
  return currentOperation;
}

function isNote(value: unknown): value is Note {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    Number.isSafeInteger(value.id) &&
    "title" in value &&
    typeof value.title === "string" &&
    "content" in value &&
    typeof value.content === "string" &&
    "createdAt" in value &&
    typeof value.createdAt === "string"
  );
}

async function readAll(): Promise<Note[]> {
  const raw = await fs.readFile(FILE_PATH, "utf8");
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || !parsed.every(isNote)) {
    throw new Error("Kho ghi chú có định dạng không hợp lệ.");
  }
  return parsed;
}

async function writeAll(notes: Note[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(notes, null, 2), "utf8");
}

export function getNotes(): Promise<Note[]> {
  return runExclusive(async () => {
    const notes = await readAll();
    return [...notes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  });
}

export function getNote(id: number): Promise<Note | null> {
  return runExclusive(async () => {
    const notes = await readAll();
    return notes.find((note) => note.id === id) ?? null;
  });
}

export function createNote(input: NoteInput): Promise<Note> {
  return runExclusive(async () => {
    const notes = await readAll();
    const id = Math.max(Date.now(), ...notes.map((note) => note.id + 1));
    const note: Note = {
      id,
      ...input,
      createdAt: new Date().toISOString(),
    };
    notes.push(note);
    await writeAll(notes);
    return note;
  });
}

export function updateNote(id: number, data: NoteUpdate): Promise<Note | null> {
  return runExclusive(async () => {
    const notes = await readAll();
    const index = notes.findIndex((note) => note.id === id);
    if (index === -1) return null;

    const updatedNote: Note = { ...notes[index], ...data };
    notes[index] = updatedNote;
    await writeAll(notes);
    return updatedNote;
  });
}

export function deleteNote(id: number): Promise<boolean> {
  return runExclusive(async () => {
    const notes = await readAll();
    const remaining = notes.filter((note) => note.id !== id);
    if (remaining.length === notes.length) return false;
    await writeAll(remaining);
    return true;
  });
}
