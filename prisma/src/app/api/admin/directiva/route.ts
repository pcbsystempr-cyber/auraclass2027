import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const directiva = await prisma.directivaConfig.findMany({
      include: { user: { select: { id: true, name: true, email: true, seccion: true } } },
      orderBy: { orden: "asc" },
    });
    return NextResponse.json(directiva);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = await prisma.directivaConfig.upsert({
      where: { userId: body.userId },
      update: {
        cargo: body.cargo,
        descripcion: body.descripcion ?? null,
        instagram: body.instagram ?? null,
        telefono: body.telefono ?? null,
        orden: Number(body.orden ?? 0),
      },
      create: {
        userId: body.userId,
        cargo: body.cargo,
        descripcion: body.descripcion ?? null,
        instagram: body.instagram ?? null,
        telefono: body.telefono ?? null,
        orden: Number(body.orden ?? 0),
      },
      include: { user: { select: { id: true, name: true, email: true, seccion: true } } },
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.directivaConfig.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
