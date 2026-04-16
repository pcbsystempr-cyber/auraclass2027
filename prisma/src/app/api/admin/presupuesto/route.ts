import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.presupuesto.findMany({ orderBy: { fecha: "desc" } });
    return NextResponse.json(entries);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = await prisma.presupuesto.create({
      data: {
        concepto: body.concepto,
        tipo: body.tipo,
        monto: Number(body.monto),
        categoria: body.categoria,
        fecha: body.fecha ? new Date(body.fecha) : new Date(),
        nota: body.nota ?? null,
      },
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.presupuesto.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
