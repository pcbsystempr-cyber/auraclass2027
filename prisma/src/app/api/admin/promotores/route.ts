import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const promotores = await prisma.promotor.findMany({
      include: { user: { select: { id: true, name: true, seccion: true, email: true } } },
      orderBy: { ventas: "desc" },
    });
    return NextResponse.json(promotores);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const promotor = await prisma.promotor.upsert({
      where: { userId: body.userId },
      update: {
        ventas: { increment: Number(body.ventas ?? 0) },
        comision: { increment: Number(body.comision ?? 0) },
        nivel: body.nivel ?? undefined,
      },
      create: {
        userId: body.userId,
        codigo: body.codigo ?? `AURA-${Date.now().toString().slice(-4)}`,
        ventas: Number(body.ventas ?? 0),
        meta: Number(body.meta ?? 10),
        comision: Number(body.comision ?? 0),
        nivel: body.nivel ?? "bronce",
        activo: true,
      },
      include: { user: { select: { id: true, name: true, seccion: true } } },
    });
    return NextResponse.json(promotor, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const promotor = await prisma.promotor.update({
      where: { id: body.id },
      data: {
        ventas: body.ventas !== undefined ? Number(body.ventas) : undefined,
        meta: body.meta !== undefined ? Number(body.meta) : undefined,
        comision: body.comision !== undefined ? Number(body.comision) : undefined,
        nivel: body.nivel,
        activo: body.activo,
      },
      include: { user: { select: { id: true, name: true, seccion: true } } },
    });
    return NextResponse.json(promotor);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
