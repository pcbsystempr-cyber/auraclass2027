import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const perfiles = await prisma.anuarioPerfil.findMany({
      include: { user: { select: { id: true, name: true, seccion: true, email: true } } },
    });
    return NextResponse.json(perfiles);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const perfil = await prisma.anuarioPerfil.upsert({
      where: { userId: body.userId },
      update: {
        frase: body.frase ?? null,
        logro: body.logro ?? null,
        apodo: body.apodo ?? null,
        destino: body.destino ?? null,
      },
      create: {
        userId: body.userId,
        frase: body.frase ?? null,
        logro: body.logro ?? null,
        apodo: body.apodo ?? null,
        destino: body.destino ?? null,
      },
      include: { user: { select: { id: true, name: true, seccion: true } } },
    });
    return NextResponse.json(perfil, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
