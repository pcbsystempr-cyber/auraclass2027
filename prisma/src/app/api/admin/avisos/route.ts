import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const avisos = await prisma.aviso.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(avisos);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const aviso = await prisma.aviso.create({
      data: { titulo: body.titulo, contenido: body.contenido, tipo: body.tipo ?? "info", visible: body.visible ?? true },
    });
    return NextResponse.json(aviso, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const aviso = await prisma.aviso.update({
      where: { id: body.id },
      data: { titulo: body.titulo, contenido: body.contenido, tipo: body.tipo, visible: body.visible },
    });
    return NextResponse.json(aviso);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.aviso.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
