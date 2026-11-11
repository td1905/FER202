import { deleteNote, getNote, updateNote } from "@/lib/server/notes";
import type { NoteUpdate } from "@/types";

type RouteContext = { params: Promise<{ id: string }> };

function parseId(id: string): number | null {
  if (!/^[1-9]\d*$/.test(id)) return null;
  const parsed = Number(id);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function getValidId(params: RouteContext["params"]) {
  const { id } = await params;
  return parseId(id);
}

export async function GET(_request: Request, { params }: RouteContext) {
  const id = await getValidId(params);
  const note = id === null ? null : await getNote(id);
  if (!note) {
    return Response.json({ error: "Không tìm thấy ghi chú" }, { status: 404 });
  }
  return Response.json(note);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const id = await getValidId(params);
  if (id === null) {
    return Response.json({ error: "Không tìm thấy ghi chú" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Nội dung JSON không hợp lệ" }, { status: 400 });
  }
  if (!isRecord(body)) {
    return Response.json({ error: "Dữ liệu cập nhật không hợp lệ" }, { status: 400 });
  }

  const update: NoteUpdate = {};
  if ("title" in body) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      return Response.json({ error: "Tiêu đề không được để trống" }, { status: 400 });
    }
    if (body.title.trim().length > 100) {
      return Response.json({ error: "Tiêu đề tối đa 100 ký tự" }, { status: 400 });
    }
    update.title = body.title.trim();
  }
  if ("content" in body) {
    if (typeof body.content !== "string") {
      return Response.json({ error: "Nội dung phải là chuỗi" }, { status: 400 });
    }
    update.content = body.content.trim();
  }
  if (Object.keys(update).length === 0) {
    return Response.json({ error: "Không có dữ liệu cập nhật" }, { status: 400 });
  }

  const note = await updateNote(id, update);
  if (!note) {
    return Response.json({ error: "Không tìm thấy ghi chú" }, { status: 404 });
  }
  return Response.json(note);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const id = await getValidId(params);
  const deleted = id !== null && (await deleteNote(id));
  if (!deleted) {
    return Response.json({ error: "Không tìm thấy ghi chú" }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}
