import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certificados = await prisma.certificado.findMany({
      include: { user: { select: { id: true, name: true, seccion: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(certificados);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cert = await prisma.certificado.create({
      data: {
        userId: body.userId,
        tipo: body.tipo,
        titulo: body.titulo,
        descripcion: body.descripcion ?? null,
        firmante: body.firmante ?? null,
        cargo: body.cargo ?? null,
        fecha: new Date(),
      },
      include: { user: { select: { id: true, name: true, seccion: true } } },
    });
    return NextResponse.json(cert, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.certificado.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
