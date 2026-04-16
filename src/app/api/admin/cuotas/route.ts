import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cuotas = await prisma.cuota.findMany({
      include: { user: { select: { id: true, name: true, seccion: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(cuotas);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Buscar si ya existe cuota para ese usuario/mes/año
    const existing = await prisma.cuota.findFirst({
      where: { userId: body.userId, mes: body.mes, anio: Number(body.anio) },
    });
    if (existing) {
      const updated = await prisma.cuota.update({
        where: { id: existing.id },
        data: {
          pagado: existing.pagado + Number(body.monto),
          estado: (existing.pagado + Number(body.monto)) >= existing.monto ? "pagado" : "parcial",
          fechaPago: new Date(),
          metodo: body.metodo ?? "efectivo",
          nota: body.nota ?? null,
        },
        include: { user: { select: { id: true, name: true, seccion: true } } },
      });
      return NextResponse.json(updated);
    }
    const cuota = await prisma.cuota.create({
      data: {
        userId: body.userId,
        mes: body.mes,
        anio: Number(body.anio),
        monto: Number(body.monto),
        pagado: Number(body.pagado ?? body.monto),
        estado: Number(body.pagado ?? body.monto) >= Number(body.monto) ? "pagado" : "parcial",
        fechaPago: new Date(),
        metodo: body.metodo ?? "efectivo",
        nota: body.nota ?? null,
      },
      include: { user: { select: { id: true, name: true, seccion: true } } },
    });
    return NextResponse.json(cuota, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
