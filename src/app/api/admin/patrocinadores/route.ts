import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const patrocinadores = await prisma.patrocinador.findMany({
      orderBy: [
        { nivel: "asc" },   // platino primero (orden invertido abajo)
        { monto: "desc" },
      ],
    });
    // Ordenar por nivel: platino > oro > plata > bronce
    const orden: Record<string, number> = { platino: 0, oro: 1, plata: 2, bronce: 3 };
    patrocinadores.sort((a, b) => (orden[a.nivel] ?? 9) - (orden[b.nivel] ?? 9));
    return NextResponse.json(patrocinadores);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const p = await prisma.patrocinador.create({
      data: {
        nombre:      body.nombre,
        empresa:     body.empresa     ?? null,
        tipo:        body.tipo        ?? "particular",
        nivel:       body.nivel       ?? "bronce",
        monto:       Number(body.monto),
        descripcion: body.descripcion ?? null,
        instagram:   body.instagram   ?? null,
        telefono:    body.telefono    ?? null,
        website:     body.website     ?? null,
        visible:     body.visible     ?? true,
      },
    });
    return NextResponse.json(p, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const p = await prisma.patrocinador.update({
      where: { id: body.id },
      data: {
        nombre:      body.nombre,
        empresa:     body.empresa     ?? null,
        tipo:        body.tipo,
        nivel:       body.nivel,
        monto:       Number(body.monto),
        descripcion: body.descripcion ?? null,
        instagram:   body.instagram   ?? null,
        telefono:    body.telefono    ?? null,
        website:     body.website     ?? null,
        visible:     body.visible,
      },
    });
    return NextResponse.json(p);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.patrocinador.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
