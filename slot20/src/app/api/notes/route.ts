import { createNote, getNotes } from "@/lib/server/notes";
import type { NoteInput } from "@/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function GET() {
  return Response.json(await getNotes());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Nội dung JSON không hợp lệ" }, { status: 400 });
  }

  if (!isRecord(body) || typeof body.title !== "string") {
    return Response.json({ error: "Tiêu đề không được để trống" }, { status: 400 });
  }
  const title = body.title.trim();
  if (!title) {
    return Response.json({ error: "Tiêu đề không được để trống" }, { status: 400 });
  }
  if (title.length > 100) {
    return Response.json({ error: "Tiêu đề tối đa 100 ký tự" }, { status: 400 });
  }
  if (body.content !== undefined && typeof body.content !== "string") {
    return Response.json({ error: "Nội dung phải là chuỗi" }, { status: 400 });
  }

  const input: NoteInput = {
    title,
    content: typeof body.content === "string" ? body.content.trim() : "",
  };
  await new Promise((resolve) => setTimeout(resolve, 300));
  const note = await createNote(input);
  return Response.json(note, { status: 201 });
}
