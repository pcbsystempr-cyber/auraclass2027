import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const actividades = await prisma.actividad.findMany({ orderBy: { fecha: "asc" } });
    return NextResponse.json(actividades);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const actividad = await prisma.actividad.create({
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: new Date(body.fecha),
        lugar: body.lugar ?? null,
        tipo: body.tipo ?? "general",
        meta: body.meta ? Number(body.meta) : null,
        estado: body.estado ?? "proxima",
      },
    });
    return NextResponse.json(actividad, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const actividad = await prisma.actividad.update({
      where: { id: body.id },
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: new Date(body.fecha),
        lugar: body.lugar ?? null,
        tipo: body.tipo,
        meta: body.meta ? Number(body.meta) : null,
        recaudacion: body.recaudacion ? Number(body.recaudacion) : undefined,
        estado: body.estado,
      },
    });
    return NextResponse.json(actividad);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.actividad.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
