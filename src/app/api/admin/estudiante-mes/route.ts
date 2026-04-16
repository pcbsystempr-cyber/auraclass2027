import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MESES } from "@/lib/utils";

export async function GET() {
  try {
    const convocatorias = await prisma.estudianteMes.findMany({
      include: {
        nominaciones: {
          include: { nominado: { select: { id: true, name: true, seccion: true } } },
        },
        votos: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(convocatorias);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Crear nueva convocatoria o cerrar la actual y establecer ganador
    if (body.accion === "nueva") {
      // Cerrar convocatorias activas
      await prisma.estudianteMes.updateMany({ where: { activa: true }, data: { activa: false } });
      const nueva = await prisma.estudianteMes.create({
        data: { mes: body.mes, anio: Number(body.anio), activa: true },
      });
      return NextResponse.json(nueva, { status: 201 });
    }
    if (body.accion === "ganador") {
      const updated = await prisma.estudianteMes.update({
        where: { id: body.id },
        data: { ganadorId: body.ganadorId, activa: false },
      });
      return NextResponse.json(updated);
    }
    if (body.accion === "nominar") {
      const nom = await prisma.nominacion.create({
        data: {
          estudianteMesId: body.estudianteMesId,
          nominadoId: body.nominadoId,
          nominadorId: body.nominadorId,
          razon: body.razon,
          aprobada: true,
        },
      });
      return NextResponse.json(nom, { status: 201 });
    }
    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
